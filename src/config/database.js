import dotenv  from "dotenv"

dotenv.config();

import { Sequelize } from "sequelize";
const sequelize = new Sequelize('postgres://'+(process.env.DATABASE_USER || "postgres")+'@'+(process.env.DATABASE_HOST || "localhost")+':'+(process.env.DATABASE_PORT || "5432")+'/'+(process.env.DATABASE_NAME || "postgres"))
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

export default sequelize;
