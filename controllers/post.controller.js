import Post from '../Models/BlogPost.model.js';
import asyncHandler from '../Middleware/asyncHandler.middleware.js'

export const createPost = asyncHandler(async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Post({ title, content, author_id: req.user._id });
        await newPost.save();
        res.status(201).send(newPost);
    } catch (error) {
        res.status(500).send(error.message);
    }

})

export const readPost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.find().populate('author_id', 'username email')
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

export const singlePost = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author_id', 'username email')
        if (!post) return res.status(404).send('Post Not Found');
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

export const updateById = asyncHandler(async (req, res) => {
    try {
        const { title, content } = req.body;

        const post = await Post.findByIdandUpdate(req.params.id, { title, content }, { new: true, runValidators: true });
        if (!post) return res.status(404).send('Post Not Found');
        res.status(200).send(post);
    } catch (error) {
        res.status(500).send(error.message);
    }

})

export const deleteById = asyncHandler(async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).send('Post Not Found');
        res.status(200).send("Post deleted successfully");
    } catch (error) {
        res.status(500).send(error.message);
    }

})
