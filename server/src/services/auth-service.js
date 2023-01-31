import { generateAccessToken } from "../utils/token.js";
import { hashPassword, comparePassword } from "../config/crypto.js";
import pool from "../config/database.js";
/**
 * This method is used to generate the accesstoken for the valid users
 * @param signInUser - user object with username and password
 */
 export const loginUser = async (signInUser) => {
    const results =  await pool.query("select * from public.\"Users\" where username=$1",[signInUser.username]);
    const user = results.rows[0];
      if (!user) {
        throw new Error("User Not found");
      }
      const passwordIsValid = await comparePassword(user.password, signInUser.password);
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
    const { first_name, last_name, password, username } = req.body;
    await pool.query(
        "SELECT * from public.\"Users\" where username = $1",
        [username],
        async function (err, rows) {
          if (err) throw err;
          if (rows && rows.rowCount === 0) {
            console.log("There is no such user, adding now");
            const hashedPassword = await hashPassword(password);
            pool.query({
                text: 'INSERT INTO public.\"Users\" (first_name, last_name, password, username ) VALUES ($1, $2, $3, $4)',
                values: [first_name, last_name, hashedPassword, username]
          });
            res.status(201).send({body: {token: generateAccessToken(username, password)}});
          } else {
            res.status(400).send({message: "User already exists in database"})
          }
        }
      );
};

