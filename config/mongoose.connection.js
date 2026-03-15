const mongoose = require("mongoose");
const config = require(`config`);
const dbgr = require(`debug`)("development: mongoose");


mongoose
  .connect(`${config.get("MONGODB_URL")}/scatch`)
  .then(function () {
    dbgr("mongoose connected");
    console.log("mongodb connected");
    
  })
  .catch(function (err) {
    dbgr(err);
    console.log("mongodb error");
    
  });

module.exports = mongoose.connection;
