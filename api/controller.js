const pool = require("./db");
const bcrypt = require("bcrypt");
const salt = 10;

// get all users
const getAllEmployees = (req, res) => {
  try {
    const q = "SELECT * FROM employee_info ORDER BY user_id";
    pool.query(q, (err, data) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      // console.log(data);
      res.status(200).json(data.rows);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get user by name
const getUserByName = (req, res) => {
  try {
    const q =
      "SELECT * FROM employee_info WHERE first_name = $1 OR last_name = $2 ORDER BY user_id;";
    const { first_name, last_name } = req.body;

    pool.query(q, [first_name, last_name], (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json(data.rows);
      console.log(data);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//add user
const addEmployeeUser = (req, res) => {
  try {
    const q =
      'INSERT INTO employee_info ("user_id", "first_name", "last_name", "email", "address", "phone_number") VALUES ($1, $2, $3, $4, $5, $6)';

    const { user_id, first_name, last_name, email, address, phone_number } =
      req.body;

    pool.query(
      q,
      [user_id, first_name, last_name, email, address, phone_number],
      (err, data) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.sendStatus(500).json({ error: "Internal server error" });
        }
        res.status(200).json({ message: "Employee user added successfully." });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get user using user_id
const getUserById = (req, res) => {
  try {
    const q = "SELECT * FROM employee_info WHERE user_id = $1";
    const id = parseInt(req.params.id);
    // console.log(id);

    pool.query(q, [id], (error, data) => {
      if (error) {
        throw error;
      }
      res.status(200).json(data.rows);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//update user information
const updateUserById = (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const q =
      "UPDATE employee_info SET user_id = $1, first_name = $2, last_name = $3, email = $4, address = $5, phone_number = $6 WHERE user_id = $1";

    const { user_id, first_name, last_name, email, address, phone_number } =
      req.body;

    pool.query(
      q,
      [user_id, first_name, last_name, email, address, phone_number],
      (err, data) => {
        if (err) {
          console.error("Error executing query:", err);
          return res.sendStatus(500).json({ error: "Internal server error" });
        }
        res
          .status(200)
          .json({ message: `Employee ${id} user updated successfully.` });
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete a user
const deleteUserById = (req, res) => {
  try {
    const q = "DELETE FROM employee_info WHERE user_id = $1";
    const id = parseInt(req.params.id);
    // console.log(id);

    pool.query(q, [id], (error, data) => {
      if (error) {
        res.send("error");
      }
      res
        .status(200)
        .json({ message: `Employee ${id} was successfully deleted` });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//// LOGIN - REGISTER ////

const loginUser = (req, res) => {
  const q = `SELECT * FROM user_accounts WHERE username = $1`;
  const { username, password } = req.body;

  pool.query(q, [username], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const hashedPassword = data.rows[0].password;
    bcrypt.compare(password, hashedPassword, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (!result) {
        return res.status(401).json({ error: "Invalid password" });
      }
      // Passwords match, user is authenticated
      res.status(200).json({ message: "Login successful" });
    });
  });
};

const registerUser = async (req, res) => {
  try {
    const q = `INSERT INTO user_accounts (email, username, password, is_admin, date_joined) 
    VALUES ($1, $2, $3, $4, $5);`;

    const { email, username, password, is_admin, date_joined } = req.body;

    const newPassword = await bcrypt.hash(password, salt);

    await pool.query(q, [email, username, newPassword, is_admin, date_joined]);

    res.status(200).json({ message: "USER was successfully registered." });
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  loginUser,
  registerUser,
  getAllEmployees,
  getUserByName,
  addEmployeeUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
