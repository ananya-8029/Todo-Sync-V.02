const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });
const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
  mongoose.connect(mongoURI); 
};

module.exports = connectToMongo;
