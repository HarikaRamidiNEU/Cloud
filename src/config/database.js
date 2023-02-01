import dotenv  from "dotenv"

dotenv.config();

import { Sequelize } from "sequelize";
const sequelize = new Sequelize('postgres://'+process.env.DATABASE_USER+':'+process.env.DATABASE_Password+'@'+process.env.DATABASE_HOST+':'+process.env.DATABASE_PORT+'/'+process.env.DATABASE_NAME)
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});

export default sequelize;


