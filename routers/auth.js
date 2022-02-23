const Joi = require('joi');
const _ = require('lodash');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ name: req.body.name });
    if (!user) return res.status(400).send('Invalid username.');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req) {
  const schema = {
    name: Joi.string().required()
  };

  return Joi.validate(req, schema);
}

exports.authRouter = router; 
