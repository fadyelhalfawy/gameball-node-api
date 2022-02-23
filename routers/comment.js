const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Comment, createComment, validate } = require('../models/comment');

// createComment("6214399bd7fd2e3bd8038ebb", "621439f7196c742b50ce9b7e", "62148c0172cf7f25a8689e86");

router.get('/', async (req, res) => {
    const comments = await Comment.find();
    res.send(comments);
});

router.get('/:id', async (req, res) => {
    const getCommentById = await Comment.findById(req.params.id);

    if(!getCommentById) return res.status(404).send('The Id is not found!');

    res.send(getCommentById);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let comment = new Comment({
        comment: req.body.comment,
        userCommenter: req.body.userCommenter,
        tweet: req.body.tweet
    });
    comment = await comment.save();
    res.send(comment);
});

exports.commentRouter = router;