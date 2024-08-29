import Post from '../Models/BlogPost.model.js'
export const isAuthor = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            res.status(404);
            throw new Error('Post not found');
        }

        if (post.author_id.toString() !== req.user._id.toString()) {
            return res.status(404).send("You are Not authorized")
        }
        else {
            next();

        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}