const express = require('express');
const router = express.Router();
const { Reply, createReply, validate } = require('../models/reply');

// createReply("621439ee48a2b60bece86bb2", "621439ee48a2b60bece86bb2", "6214399bd7fd2e3bd8038ebb", "62147656ef48171ff84a5069", "621474ccfe0154463863f17c");

router.get('/', async (req, res) => {
    const replys = await Reply.find();
    res.send(replys);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let reply = new Reply({
        reply: req.body.reply,
        userReplier: req.body.userReplier,
        comment: req.body.comment
    });
    reply = await reply.save();
    res.send(reply);
});

exports.replyRouter = router;