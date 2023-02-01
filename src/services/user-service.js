import { hashPassword } from '../config/crypto.js';
import pool from '../config/database.js';

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
    if(first_name|| last_name || password){
    let querytext = "UPDATE public.\"Users\" SET ";
    let values = [];
    let i=0;
    if(first_name && first_name !== null){
        querytext = querytext + "first_name = $"+(++i);
        values.push(first_name);
    }
    if(last_name && last_name !== null){
        querytext = querytext + ", last_name = $"+(++i);
        values.push(last_name);
    }
    if(password && password !== null){
        querytext = querytext + ", password = $"+(++i);
        const hashedPassword = await hashPassword(password);
        values.push(hashedPassword);
    } 
    querytext = querytext + " WHERE id = $"+(++i);
    values.push(userId);
    await pool.query(
        "SELECT * from public.\"Users\" where id = $1", [userId], async (err, results) => {
          if (results && results.rowCount === 1) {
            await pool.query(
                querytext, values, (error, results) => {
                    res.status(204).send({message: "User updated successfully"});
                }
              );
          } else {
            res.status(400).send({
                message: "Bad request"
            });
          }
        }
      );
    }
}
};


/**
 * This method used to get user details
 * @param user - user object with the details of user
 */
export const getUser = async (req, res) => {
    const userId = req.params.id;
    await pool.query("select * from public.\"Users\" where id = $1",[userId], (err, results) => {
        const row = results.rows[0];
        const user = {
            id: row.id,
            first_name: row.first_name,
            last_name: row.last_name,
            username: row.username,
            account_created: row.account_created,
            account_updated: row.account_updated
          }
        res.status(200).json(user);
    });
  };
