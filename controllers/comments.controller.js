import asyncHandler from '../Middleware/asyncHandler.middleware.js'
import Comments from '../Models/Comments.model.js'
import Post from '../Models/BlogPost.model.js';

export const createComment = asyncHandler(async (req, res) => {
    try {
        const { content } = req.body;
        if (!content) {
            return res.status(400).json({ message: 'Content is required' });
        }

        const newComment = new Comments({ post: req.params.id, content, author: req.user._id });
        await newComment.save();
        const post = await Post.findById(req.params.id);
        post.comments.push(newComment._id);
        await post.save();
        res.status(201).send(newComment);
    } catch (error) {
        console.log("Error saving comment");

        res.status(500).send(error.message);

    }

})

export const getAllCommentsByPostId = asyncHandler(async (req, res) => {
    try {
        const comment = await Comments.find({ post: req.params.id }).populate('author', 'username email')
        res.status(200).send(comment);
    } catch (error) {
        console.log('error reading comments:', error.message);
        res.status(500).send(error.message);

    }
})

export const getSingleComment = asyncHandler(async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.id).populate('author', 'username email');
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found' });
        }
        res.status(200).send(comment);
    } catch (error) {
        console.log('Error reading comment:', error.message);
        res.status(500).send(error.message);
    }
})

export const updateComment = asyncHandler(async (req, res) => {
    try {
        const { content } = req.body;
        const comment = await Comments.findById(req.params.id);
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found' });
        }
        comment.content = content;
        await comment.save();
        res.status(200).send(comment);
    } catch (error) {
        console.log('Error updating comment:', error.message);
        res.status(500).send(error.message);
    }
})

export const deleteComment = asyncHandler(async (req, res) => {
    try {
        const comment = await Comments.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found' });
        }
        await comment.deleteOne({});
        res.status(200).send("Deleted Successfully");
    } catch (error) {
        console.log('Error deleting comment:', error.message);
        res.status(500).send(error.message);
    }

})