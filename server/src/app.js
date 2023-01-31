import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import * as dotenv from 'dotenv';
const port = 8080;
/**
 * Creating express server
 */
const app = express();
dotenv.config();

// Express Server Middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

// Custom routing
routes(app);

// Enable Server to listen on port
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});