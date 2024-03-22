const pool = require("./db");

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
      "SELECT * FROM employee_info WHERE first_name = $1 AND last_name = $2;";
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

module.exports = {
  getAllEmployees,
  getUserByName,
  addEmployeeUser,
  getUserById,
  updateUserById,
  deleteUserById,
};
