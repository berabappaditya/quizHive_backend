const mongoose = require("mongoose");
const schema = mongoose.Schema;
const quizSchema = new schema(
  {
    category: String,
    type: String,
    difficulty: String,
    question: String,
    correct_answer: String,
    answers: Array,
  },
  {
    collection: "questions",
  }
);
module.exports = mongoose.model("questions", quizSchema);
