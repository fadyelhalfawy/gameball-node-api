const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const { userRouter } = require('./routers/user');
const { commentRouter } = require('./routers/comment');
const { replyRouter } = require('./routers/reply');
const { tweetRouter } = require('./routers/tweet');
const { authRouter } = require('./routers/auth');
const app = express();

mongoose.connect('mongodb://localhost/gameball')
    .then(() => console.log('Connected To Game Ball Database'))
    .catch(err => console.log('Could not connect to MangoDB...', err))

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRouter);
app.use('/tweets', tweetRouter);
app.use('/comments', commentRouter);
app.use('/replies', replyRouter);
app.use('/auth', authRouter);

const port = 3900;
app.listen(port, () => console.log(`Listening on port ${port}...`));