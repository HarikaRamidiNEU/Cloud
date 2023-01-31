import { authRoute } from '../middlewares/authRoute.js';
import  * as userController from '../controllers/user-controller.js';
import express from 'express';
const router = express.Router();

// getUser Route
router.get('/v1/user/:id', (req, res)=> {
    authRoute(req, res);
    userController.getUser(req, res);
});

// UpdateProfile Route
router.put('/v1/user/:id', (req, res)=> {
    authRoute(req, res);
    userController.updateProfile(req, res);
});

export default router;