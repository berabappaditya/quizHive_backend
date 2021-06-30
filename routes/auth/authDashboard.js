const express = require("express");
const router = express.Router();
const userModel = require("../../models/User");
const verify = require("./authVerify");

router.get("/allusers", verify, async (req, res) => {
  try {
    const results = await userModel.find().exec();
    res.send(results);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
