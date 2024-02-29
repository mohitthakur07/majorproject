const mongoose = require("mongoose");
const initData = require("../init/data.js");
const Listing = require("../models/listing.js");
const mongoUrl = "mongodb://127.0.0.1:27017/wanderLust";

main().then((res)=>{
    console.log("conect to DB");
  }).catch((err) =>{
    console.log(err);
});
async function main() {
  await mongoose.connect(mongoUrl);
};

const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner:"65bb8908bb123bc679380b52"}));
    await Listing.insertMany(initData.data);
    console.log("data was instiatilzed");
};

initDB();