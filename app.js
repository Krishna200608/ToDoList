import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { getDate, getDay } from "./date.js";
import mongoose from "mongoose";
import { Item, List } from "./models/item.js";
import _ from "lodash";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const item1 = new Item({ name: "Do Laundry" });
const item2 = new Item({ name: "Do Homework" });
const item3 = new Item({ name: "Have Lunch" });

const defaultItems = [item1, item2, item3];

const day = getDay();

app.get("/", (req, res) => {
  Item.find({})
    .then((foundItems) => {
      if (foundItems.length === 0) {
        Item.insertMany(defaultItems).catch((err) =>
          console.log("Failed to add", err)
        );
        res.redirect("/");
      } else {
        res.render("list", { listTitle: day, newListItems: foundItems });
      }
    })
    .catch((err) => console.log("Failed to fetch!", err));
});

app.post("/", (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const item = new Item({ name: itemName });

  if (listName === day) {
    item
      .save()
      .then(() => res.redirect("/"))
      .catch((err) => console.log("Error saving item:", err));
  } else {
    List.findOne({ name: listName })
      .then((foundList) => {
        foundList.items.push(item);
        return foundList.save();
      })
      .then(() => res.redirect("/" + listName))
      .catch((err) => console.log("Failed to load the webpage", err));
  }
});

app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === day) {
    Item.findByIdAndDelete(checkedItemId)
      .then(() => res.redirect("/"))
      .catch((err) => console.log("Failed to delete the item", err));
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      { new: true }
    )
      .then((updatedList) => {
        if (updatedList) {
          res.redirect("/" + listName);
        } else {
          console.log("List not found!");
        }
      })
      .catch((err) => console.error("Error removing item:", err));
  }
});

app.get("/:customListName", (req, res) => {
  let customListName = _.capitalize(req.params.customListName);

  List.findOne({ name: customListName })
    .then((foundList) => {
      if (!foundList) {
        const list = new List({ name: customListName, items: [] });
        return list.save().then(() => res.redirect("/" + customListName));
      } else {
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      }
    })
    .catch((err) => console.log("Error fetching list:", err));
});

app.get("/about", (req, res) => {
  res.render("about");
});

// ✅ Export app instead of running it (Vercel handles it)
export default app;
