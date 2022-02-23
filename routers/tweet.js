const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Tweet, createTweet, validate } = require('../models/tweet');

// createTweet("621439f7196c742b50ce9b7e");

router.get('/', async (req, res) => {
    const tweets = await Tweet.find();
    res.send(tweets);
});

router.get('/:id', async (req, res) => {
    const getTweetById = await Tweet.findById(req.params.id);

    if(!getTweetById) return res.status(404).send('The Id is not found!');

    res.send(getTweetById);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let tweet = new Tweet({
        tweet: req.body.tweet,
        user: req.body.user
    });
    tweet = await tweet.save();
    res.send(tweet);
});

exports.tweetRouter = router;