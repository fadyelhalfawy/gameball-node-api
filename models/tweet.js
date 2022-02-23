const mongoose = require('mongoose');
const Joi = require('joi');
const { userSchema, User } = require('./user');

const tweetSchema = new mongoose.Schema({
    tweet: {
        type: String,
        required: true,
        maxlength: 140
    },
    user: {
        type: userSchema,
        required: true,
    },
    date: {
        type: Date, 
        default: Date.now()
    }
});

const Tweet = mongoose.model('tweet', tweetSchema);

async function createTweet(id) {
    const user = await User.findById(id);

    const tweet = new Tweet({
        tweet: 'I am programmer I have no life!',
        user: {
            _id: user._id,
            name: user.name
        }
    });

    return await tweet.save();
}

const validateTweet = tweet => {
    const schema = {
        tweet: Joi.string().required(),
        user: Joi.object().required()
    };

    return Joi.validate(tweet, schema);
};

exports.Tweet = Tweet;
exports.tweetSchema = tweetSchema;
exports.createTweet = createTweet;
exports.validate = validateTweet;