import mongoose from "mongoose";

mongoose.connect("mongodb+srv://KrishnaSikheriya:Wmj4lka7NexQ0kHL@cluster0.ix5ng.mongodb.net/todolistDB")
.then(()=>console.log("Successfully connected to MongoDB"))
.catch((err)=>console.log("Connection failed : ",err));

const itemsSchema = new mongoose.Schema({
  name: String, 
});

const Item = mongoose.model( "Item", itemsSchema
);

const listSchema = {
  name: String,
  items : [itemsSchema]
};

const List = mongoose.model("List", listSchema);

export {Item, List};