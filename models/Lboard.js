const mongoose = require("mongoose");
const schema = mongoose.Schema;

const lboardSchema = new schema(
  {
    name: String,
    score: Number,
    date: Date,
  },
  {
    collection: "leaderboard",
  }
);
module.exports = mongoose.model("leaderboard", lboardSchema);
