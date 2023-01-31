import dotenv  from "dotenv"
import pkg from 'pg';
const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_Password,
  port: process.env.DATABASE_PORT,
});

pool.on('connect', () => {
  console.log('Connected to Database successfully!');
});

export default pool;