// controller.js

const pool = require("./db");

// get all users
const getAllEmployees = (req, res) => {
  try {
    const q = "SELECT * FROM employee_info";
    pool.query(q, (err, data) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      console.log(data);
      res.status(200).json(data.rows);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//add user
const addEmployeeUser = (req, res) => {
  const q =
    'INSERT INTO employee_info ("user_id", "first_name", "last_name") VALUES ($1, $2, $3)';

  const { user_id, first_name, last_name } = req.body;

  pool.query(q, [user_id, first_name, last_name], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.sendStatus(500).json({ error: "Internal server error" });
    }
    res.status(200).json({ message: "Employee user added successfully." });
  });
};

//get user using user_id
const getUserById = (req, res) => {
  const q = "SELECT * FROM employee_info WHERE user_id = $1";
  const id = parseInt(req.params.id);
  console.log(id);

  pool.query(q, [id], (error, res) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

//delete a user
const deleteUserById = (req, response) => {
  const q = "DELETE FROM employee_info WHERE user_id = $1";
  const id = parseInt(req.params.id);
  console.log(id);

  pool.query(q, [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

module.exports = {
  getAllEmployees,
  addEmployeeUser,
  getUserById,
  deleteUserById,
};
