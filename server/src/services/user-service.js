const db = require("../config/database");

/**
 * This method used to create a new user
 * @param user - user object of type IUser with the details of user
 */
exports.createUser = async (req, res) => {
    const { first_name, last_name, password, username } = req.body;
    db.query(
        "SELECT * from users where email = $1",
        [username],
        async function (err, rows) {
          if (err) throw err;
          if (rows && rows.rowCount === 0) {
            console.log("There is no such user, adding now");
            const hashedPassword = await hash(password, 10);
            db.query(
                "INSERT INTO users (first_name, last_name, password, username ) VALUES ($1, $2, $3)",
                [first_name, last_name, password, username]
            );
            return {
              token: sign({ email: req.body.user.email }, process.env.app_secret)
            };
          } else {
            console.log("User already exists in database");
          }
        }
      );

  
  const { rows } = await db.query(
    "INSERT INTO users (first_name, last_name, password, username ) VALUES ($1, $2, $3)",
    [first_name, last_name, password, username]
  );

  res.status(201).send({
    message: "User created successfully!",
    body: {
      user: { id, first_name, last_name, username, account_created, account_updated }
    },
  });
};

exports.getUser = async (req, res) => {
    const { first_name, last_name, password, username,  } = req.body;
    const { rows } = await db.query(
      "INSERT INTO users (first_name, last_name, password, username ) VALUES ($1, $2, $3)",
      [first_name, last_name, password, username]
    );
  
    res.status(201).send({
      message: "User created successfully!",
      body: {
        user: { id, first_name, last_name, username, account_created, account_updated }
      },
    });
  };
