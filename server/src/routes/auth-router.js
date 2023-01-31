import express from 'express';
import * as authController from '../controllers/auth-controller.js';
const router = express.Router();

router.post('/v1/login', authController.login);

router.post('/v1/user', authController.createUser);

export default router;