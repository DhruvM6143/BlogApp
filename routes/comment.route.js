import { Router } from 'express'
import { createComment, deleteComment, getAllCommentsByPostId, getSingleComment, updateComment } from '../controllers/comments.controller.js';
import { authenticate, authroizeAdmin } from '../Middleware/auth.middleware.js'
import { isAuthor } from '../Middleware/isPostAuthor.js';
import { updateById } from '../controllers/post.controller.js';
const router = new Router();

router.route('/:id').post(authenticate, createComment);
router.route('/:id').get(authenticate, authroizeAdmin, getAllCommentsByPostId);
router.route('/comment/:id').get(authenticate, authroizeAdmin, getSingleComment);
router.route('/:id').put(authenticate, isAuthor, updateComment);
router.route('/:id').delete(authenticate, deleteComment);


export default router;