import userRouter from './user-router.js';
import authRouter from './auth-router.js';
import express from 'express';
const app = express()

const routes = (app) => {
app.get('/healthz', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'Application is healthy, API Node.js + PostgreSQL'
    });
  });
  
  app.use('/',userRouter);
  
  app.use('/',authRouter);

}

export default routes;