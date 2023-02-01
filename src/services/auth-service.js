import { generateAccessToken } from "../utils/token.js";
import { hashPassword, comparePassword } from "../config/crypto.js";
// import pool from "../config/database.js";
import { isValidEmail } from "../config/validators.js";
import User from "../models/User.js";

/**
 * This method is used to generate the accesstoken for the valid users
 * @param signInUser - user object with username and password
 */
 export const loginUser = async (signInUser) => {
    const user = await User.findOne({where: {username: signInUser.username}})
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
        account_created: user.account_created,
        account_updated: user.account_updated,
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
    if(!first_name || !last_name || !password || !username || !isValidEmail(username))
        res.status(400).send({message: "Bad request"})
    else{
      const user = await User.findOne({where: {username: username}})
      if(!user){
        console.log("There is no such user, adding now");
        const hashedPassword = await hashPassword(password);
        const row = await User.create(req.body);
        const user = {
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    username: row.username,
                    account_created: row.account_created,
                    account_updated: row.account_updated,
                    token: generateAccessToken(username, password)
                }
                res.status(201).send(user);
              } else {
                res.status(400).send({message: "Bad Request, User already exists!"})
              }
    }
};
