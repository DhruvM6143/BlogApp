import { Router } from 'express';
import { deleteUserById, getAllUser, getCurrentUserProfile, getUserById, login, logoutCurrentUser, register, updateUserById, updateUserProfile } from '../controllers/user.controller.js';
import { authenticate, authroizeAdmin } from '../Middleware/auth.middleware.js';

const router = Router();

router.route('/').post(register).get(authenticate, authroizeAdmin, getAllUser);
router.route('/login').post(login);
router.route('/logout').post(logoutCurrentUser);

//profile
router.route('/profile').get(authenticate, getCurrentUserProfile);
router.route('/update').put(authenticate, updateUserProfile);
//by Id

router.route("/:id").get(authenticate, authroizeAdmin, getUserById);
router.route("/:id").delete(authenticate, authroizeAdmin, deleteUserById);
router.route("/:id").put(authenticate, authroizeAdmin, updateUserById);


export default router;