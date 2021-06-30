const express = require("express");
const router = express.Router();
const quizModel = require("../models/Quiz");

router.get("/getQuiz", (req, res) => {
  //    quizModel.find({});

  quizModel.aggregate([{ $sample: { size: 5 } }], (err, data) => {
    if (err) {
      console.log("there is an error", err);
      res.status(400).send({ message: "this is an error" });
    } else {
      console.log("This is student data from from database:", data);

      res.send({ result: data });
    }
  });
});

router.post("/postQuiz", (req, res) => {
  const quizData = new quizModel(req.body);
  quizData.save((err) => {
    if (err) {
      console.log("data loading to database failed for", err);
      res.status(400).send({ message: "this is an error" });
    } else {
      console.log("successfully data loaded");
      res.send("data sent successfully");
    }
  });
});
module.exports = router;
