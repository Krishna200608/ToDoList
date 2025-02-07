import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // Load environment variables

mongoose.connect(process.env.MONGO_URI)
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