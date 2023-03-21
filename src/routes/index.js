import userRouter from './user-router.js';
import authRouter from './auth-router.js';
import express from 'express';
import productRouter from './product-router.js';
import logger from '../config/logger.js'
const app = express()

const routes = (app) => {
app.get('/healthz', (req, res) => {
    logger.info("healthz API is triggered");
    res.status(200).send({
      success: 'true',
      message: 'Application is healthy, API Node.js + PostgreSQL'
    });
  });
  
  app.use('/v1/user',userRouter);
  
  app.use('/v1/user',authRouter);

  app.use('/v1/product',productRouter);

}

export default routes;