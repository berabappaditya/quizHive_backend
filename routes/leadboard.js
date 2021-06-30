const express = require("express");
const router = express.Router();
const lboardModel = require("../models/Lboard");

router.post("/postleader", (req, res) => {
  const userData = new lboardModel(req.body);
  userData.save((err) => {
    if (err) {
      console.log("data loading to database failed for", err);
      res.status(400).send({ message: "this is an error" });
    } else {
      console.log("successfully data loaded");
      res.send("data sent successfully");
    }
  });
});
router.get("/getleader", (req, res) => {
  lboardModel.find({}, (err, data) => {
    if (err) {
      console.log("there is an error", err);
      res.status(400).send({ message: "this is an error" });
    } else {
      console.log("This is student data from from database:", data);

      res.send({ result: data });
    }
  });
});

module.exports = router;
