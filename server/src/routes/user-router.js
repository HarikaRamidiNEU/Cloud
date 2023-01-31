import { authRoute } from '../middlewares/authRoute.js';
import  * as userController from '../controllers/user-controller.js';
import express from 'express';
const router = express.Router();

// getUser Route
router.route('/user/getUser/:id').get(authRoute, userController.getUser);

// UpdateProfile Route
router.route('/user/updateProfile/:id').post(authRoute,userController.updateProfile);

export default router;