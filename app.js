import express from 'express';

import cors from 'cors';
import cookieParser from 'cookie-parser';


const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN
}))
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))

//importing routes for users
import userRoute from './routes/user.route.js';
app.use('/api/v1/users', userRoute);

//import routes for posts

import postRoute from './routes/post.route.js';
app.use('/api/v1/posts', postRoute);

//import routes for comments

import commentRoute from './routes/comment.route.js'
app.use('/api/v1/comments', commentRoute);


export { app };
