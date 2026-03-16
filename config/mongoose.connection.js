const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    dbgr("mongoose connected");
    console.log("mongodb connected");
  })
  .catch((err) => {
    dbgr(err);
    console.log("mongodb error", err);
  });

module.exports = mongoose.connection;