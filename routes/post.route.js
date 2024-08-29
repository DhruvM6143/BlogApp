import { Router } from 'express'
import { createPost, deleteById, readPost, singlePost, updateById } from '../controllers/post.controller.js';
import { authenticate, authroizeAdmin } from '../Middleware/auth.middleware.js'
import { validatePost } from '../Middleware/validatePost.middleware.js'
import { isAuthor } from '../Middleware/isPostAuthor.js';
const router = Router();
router.route('/').post(validatePost, authenticate, createPost);
router.route('/read').get(authenticate, readPost);
router.route('/:id').get(authenticate, singlePost);
router.route('/update/:id').put(authenticate, isAuthor, updateById);
router.route('/delete/:id').delete(authenticate, isAuthor, deleteById);

export default router;