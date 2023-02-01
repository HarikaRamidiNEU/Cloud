import dotenv  from "dotenv"
import pkg from 'pg';
const { Pool } = pkg;
dotenv.config();

let mainPool = null;

function createPool(){
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_Password,
  port: process.env.DATABASE_PORT,
});
 return pool;
}

function getPool(){
  if(!mainPool){
    mainPool = createPool();
  }
  return mainPool;
}

export default getPool();