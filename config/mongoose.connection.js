const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

mongoose
  .connect("mongodb+srv://piyushsinghtomar777_db_user:2DdpQPJcCnZFJNwf@cluster0.aahupud.mongodb.net/?appName=Cluster0")
  .then(() => {
    dbgr("mongoose connected");
    console.log("mongodb connected");
  })
  .catch((err) => {
    dbgr(err);
    console.log("mongodb error", err);
  });

module.exports = mongoose.connection;