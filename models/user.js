const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    date: {
        type: Date, 
        default: Date.now()
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
      {
        _id: this._id,
        name: this.name
      },
      "jwtPrivateKey"
    );
    return token;
  };

const User = mongoose.model('user', userSchema);

async function createUser() {
    const user = new User({
        name: 'Michel'
    });

    return await user.save();
}

const validateUser = user => {
    const schema = {
        name: Joi.string().required().min(3).max(255)
    };

    return Joi.validate(user, schema);
};

exports.userSchema = userSchema;
exports.User = User;
exports.createUser = createUser;
exports.validate = validateUser;