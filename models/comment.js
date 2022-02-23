const mongoose = require('mongoose');
const Joi = require('joi');
const { userSchema, User } = require('./user');
const { tweetSchema, Tweet } = require('./tweet');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    userCommenter: {
        type: userSchema,
        required: true,
    },
    tweet: {
        type: tweetSchema,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now()
    }
});

const Comment = mongoose.model('comment', commentSchema);

async function createComment(userId, userTweetId, tweetId) {
    const user = await User.findById(userId);
    const getUserTweet = await User.findById(userTweetId);
    const getTweet = await Tweet.findById(tweetId);

    const comment = new Comment({
        comment: 'I am programmer too!',
        tweet: {
            _id: getTweet._id,
            tweet: getTweet.tweet,
            user: {
                _id: getUserTweet._id,
                name: getUserTweet.name
            }
        },
        userCommenter: {
            _id: user._id,
            name: user.name
        }
    });

    return await comment.save();
}

const validateComment = comment => {
    const schema = {
        comment: Joi.string().required(),
        userCommenter: Joi.object().required(),
        tweet: Joi.object().required()
    };

    return Joi.validate(comment, schema);
};

exports.Comment = Comment;
exports.commentSchema = commentSchema;
exports.createComment = createComment;
exports.validate = validateComment;