import { hashPassword } from "../config/crypto.js";
import { isValidEmail } from "../config/validators.js";
import User from "../models/User.js";

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
        req.body.password = hashedPassword;
        const row = await User.create(req.body);
        const user = {
                    id: row.id,
                    first_name: row.first_name,
                    last_name: row.last_name,
                    username: row.username,
                    account_created: row.account_created,
                    account_updated: row.account_updated
                }
                res.status(201).send(user);
              } else {
                res.status(400).send({message: "Bad Request, User already exists!"})
              }
    }
};
