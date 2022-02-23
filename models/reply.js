const mongoose = require('mongoose');
const Joi = require('joi');
const { userSchema, User } = require('./user');
const { commentSchema, Comment } = require('./comment');
const { Tweet } = require('./tweet');

const Reply = mongoose.model('reply', new mongoose.Schema({
    reply: {
        type: String,
        required: true
    },
    userReplier: {
        type: userSchema,
        required: true,
    },
    comment: {
        type: commentSchema,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now()
    }
}));

async function createReply(userId, replier, commenter, commentId, tweetId) {
    const getTweet = await Tweet.findById(tweetId);
    const getUserTweet = await User.findById(userId);
    const getReplier = await User.findById(replier);
    const getComment = await Comment.findById(commentId);
    const getCommenter = await User.findById(commenter)
    
    const reply = new Reply({
        reply: 'I need to visit Egypt!',
        userReplier: {
            _id: getReplier._id,
            name: getReplier.name
        },
        comment: {
            _id: getComment._id,
            comment: getComment.comment,
            userCommenter: {
                _id: getCommenter._id,
                name: getCommenter.name
            },
            tweet: {
                _id: getTweet._id,
                tweet: getTweet.tweet,
                user: {
                    _id: getUserTweet._id,
                    name: getUserTweet.name
                }
            }
        }
    });

    return await reply.save();
};

const validateReply = reply => {
    const schema = {
        reply: Joi.string().required(),
        userReplier: Joi.object().required(),
        comment: Joi.object().required()
    };

    return Joi.validate(reply, schema);
};

exports.Reply = Reply;
exports.createReply = createReply;
exports.validate = validateReply;