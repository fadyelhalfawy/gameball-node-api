const auth = require('../middleware/auth');
const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const router = express.Router();
const { User, createUser, validate } = require('../models/user');

createUser();

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    res.send(user);
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
    let user = await User.findOne({ name: req.body.name });
    if (user) return res.status(400).send("User already registered.");
  
    user = new User(_.pick(req.body, ["name"]));
    await user.save();
  
    const token = user.generateAuthToken();

    res
      .header("x-auth-token", token)
      .send(_.pick(user, ["_id", "name"]));
  });


exports.userRouter = router;