import { hashPassword } from '../config/crypto.js';
import pool from '../config/database.js';

/**
 * This method used to update the user
 * @param user - user object with the details of user
 */
export const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { first_name, last_name, password, username } = req.body;
    pool.query(
        "SELECT * from public.'Users' where username = $1",
        [username],
        async function (err, rows) {
          if (err) throw err;
          if (rows && rows.rowCount === 1) {
            const hashedPassword = await hashPassword(password);
            pool.query(
                "UPDATE public.'Users' SET first_name = $1, last_name = $2, username = $3, password = $4 WHERE id = $5",
                [first_name, last_name, username, password, userId], (error, results) => {
                    if(error){
                        return error;
                    }
                    res.status(204).json(results.rows);
                }
              );
          } else {
            console.log("User doesn't exists in database");
            res.status(400).send({
                message: "User doesn't exists in database"
            });
          }
        }
      );
};


/**
 * This method used to get user details
 * @param user - user object with the details of user
 */
export const getUser = async (req, res) => {
    const userId = req.params.id;
    await pool.query(
      "Select * from public.'Users' where id = $1",[userId], (error, results) => {
        if (error) {
            throw error
          }
          res.status(200).json(results.rows)
      }
    );
  };
