import { authRoute } from '../middlewares/authRoute.js';
import  * as userController from '../controllers/user-controller.js';
import express from 'express';
import { setError } from '../utils/http-utils.js';
const router = express.Router();
import StatsD from 'node-statsd';

const client = new StatsD();
// getUser Route
router.get('/:id', async (req, res)=> {
    client.increment("GetUser");
    const status = await authRoute(req, res);
    if(status === 200)
        userController.getUser(req, res);
    else
        res.status(status).send("");
});

// UpdateProfile Route
router.put('/:id', async (req, res)=> {
    client.increment("PutUser");
    const status = await authRoute(req, res);
    if(status === 200)
        userController.updateProfile(req, res);
    else
        res.status(status).send("");
});

export default router;