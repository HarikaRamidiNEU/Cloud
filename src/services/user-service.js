import { hashPassword } from '../config/crypto.js';
// import pool from '../config/database.js';
import User from "../models/User.js";

/**
 * This method used to update the user
 * @param user - user object with the details of user
 */
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, password, username, id, account_created, account_updated } = req.body;
    if(username || id || account_created || account_updated){
        res.status(400).send({
            message: "Bad request"
        });
    }
    else{
        const results = await User.update(req.body, {
            where: {
              id: userId
            }
          });
          if (results && results !== 0) {
                res.status(204).send({message: "User updated successfully"});
            } else {
                res.status(400).send({
                    message: "Bad request"
                });
            }
}
};


/**
 * This method used to get user details
 * @param user - user object with the details of user
 */
export const getUser = async (req, res) => {
    const userId = req.params.id;
    const row = await User.findByPk(userId);
    const user = {
        id: row.id,
        first_name: row.first_name,
        last_name: row.last_name,
        username: row.username,
        account_created: row.account_created,
        account_updated: row.account_updated
      }
    res.status(200).json(user);
  };
