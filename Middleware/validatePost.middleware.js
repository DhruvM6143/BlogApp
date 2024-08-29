export const validatePost = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(400).send('Title, content, and author_id are required');
    }
    next();
};