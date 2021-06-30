const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/User");

//VALIDATION OF USER INPUTS PREREQUISITES
const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

//signup user
router.post("/register", async (req, res) => {
  //checking if user email already exists
  const emailExist = await userModel.findOne({ email: req.body.email });
  //If Email Exists then return
  if (emailExist) {
    res.status(400).send("Email already exists");
    return;
  }

  //HASHING THE PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //ON PROCESS OF ADDING NEW USER
  const user = new userModel({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    //VALIDATION OF USER INPUTS

    const { error } = await registerSchema.validateAsync(req.body);
    //WE CAN JUST GET THE ERROR(IF EXISTS) WITH OBJECT DECONSTRUCTION

    //   IF ERROR EXISTS THEN SEND BACK THE ERROR
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    } else {
      //NEW USER IS ADDED

      const saveUser = await user.save();
      res.status(200).send("user created");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

//LOGIN USER

router.post("/login", async (req, res) => {
  //CHECKING IF USER EMAIL EXISTS
  const user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect Email- ID");

  //CHECKING IF USER PASSWORD MATCHES

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Incorrect Password");

  try {
    //VALIDATION OF USER INPUTS

    const { error } = await loginSchema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      //SENDING BACK THE TOKEN
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);
      res.header("auth-token", token).send({ auth_token: token, user });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports = router;
