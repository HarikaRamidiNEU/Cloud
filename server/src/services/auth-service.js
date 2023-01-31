import { generateAccessToken } from "../utils/token.js";
import { comparePassword } from "../config/crypto.js";
import pool from "../config/database.js";
/**
 * This method is used to generate the accesstoken for the valid users
 * @param signInUser - user object with username and password
 */
 export const loginUser = async (signInUser) => {
    const user =  await db.query("select password from public.'Users' where username=$1",[signInUser.username]);
      if (!user) {
        throw new Error("User Not found");
      }
      const passwordIsValid = await comparePassword(signInUser.password, user);
      if (!passwordIsValid) {
        throw new Error("Invalid Password");
      }
      else{
      const aToken =  generateAccessToken(signInUser.username, signInUser.password);

      const res = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        accessToken: aToken,
      }
      return res;
    }
  };


/**
 * This method used to create a new user
 * @param user - user object with the details of user
 */
 export const createUser = async (req, res) => {
    console.log("In auth service")
    const { first_name, last_name, password, username } = req.body;
    await pool.query(
        "SELECT * from public.'Users' where username = $1",
        [username],
        async function (err, rows) {
          if (err) throw err;
          if (rows && rows.rowCount === 0) {
            console.log("There is no such user, adding now");
            const hashedPassword = await hashPassword(password);
            pool.query(
                "INSERT INTO public.'Users' (first_name, last_name, password, username ) VALUES ($1, $2, $3, $4)",
                [first_name, last_name, hashedPassword, username]
            );
            return {
              token: generateAccessToken()
            };
          } else {
            console.log("User already exists in database");
          }
        }
      );
  
  await pool.query(
    "INSERT INTO public.Users (first_name, last_name, password, username ) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, password, username], (error, results) => {
        if(error){
            return error;
        }
        res.status(201).json(results.rows);
    }
  );
};

