import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { getDate, getDay } from './date.js';
import mongoose from 'mongoose';
import { Item , List} from "./models/item.js";
import _ from 'lodash'

const app = express();
// const items = ["Buy Food", "Cook Food", "Eat Food"]; 
// const workItems = [];


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//----------------------------------------------------------------------------------------

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));


const item1 = new Item ({
  name : "Do Laundry"
});
const item2 = new Item ({
  name : "Do Homework"
});
const item3 = new Item ({
  name : "Have Lunch"
});

const defaultItems = [item1, item2, item3];





app.get("/", (req, res) => {

  Item.find({})
  .then((foundItems)=>{

    if(foundItems.length == 0){
      Item.insertMany(defaultItems)
      // .then(()=>console.log("successfully Added!"))
      .catch((err)=>console.log("Failed to add", err));
      
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems : foundItems});
    }
  })
  .catch((err)=>console.log("Failed to fetch!", err));
});


app.post("/", (req, res) => {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({
    name: itemName
  });

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  } else {
    List.findOne({name : listName})
    .then((foundList)=>{
      foundList.items.push(item);
      foundList.save();
      res.redirect("/" + listName)
    })
    .catch((err)=>console.log("Failed to load the webpage",err));
  }

})

app.post("/delete", function(req, res){

  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;
  //console.log(checkedItemId);

  if(listName == "Today"){
    Item.findByIdAndDelete(checkedItemId)
    .then(()=>{ 
      //console.log("Item deleted")
      res.redirect("/")
    })
    .catch((err)=>console.log("Failed to delete the item", err));
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      { new: true }
    )
    .then(updatedList => {
      if (updatedList) {
       // console.log("Item removed successfully:", updatedList);
       res.redirect("/"+listName);

      } else {
        console.log("List not found!");
      }
    })
    .catch(err => console.error("Error removing item:", err));    
  }
})

app.get("/:customListName", function(req, res) {
  let customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName })
    .then((foundList) => {
      if (!foundList) {
        // List doesn't exist, create a new one (empty list)
        const list = new List({
          name: customListName,
          items: [] // Empty list instead of default items
        });

        list.save().then(() => {
          //console.log(`Created new empty list: ${customListName}`);
          res.redirect("/" + customListName);
        }).catch(err => console.log("Error saving new list:", err));

      } else {
        // List exists, render it even if it's empty
        //console.log(`Using existing list: ${customListName}`);
        res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
      }
    })
    .catch(err => console.log("Error fetching list:", err));
});



app.get("/about", (req, res)=>{
  res.render("about");
})


app.listen(3000, function () {
  console.log("Server is running on port 3000");
});


// Info  
// variable created inside the if ,else, while, for loops statements
// var : global(can be accessed from anywhere)
// let, const : local (only access inside the if statement)