// controller.js

const pool = require("./db");

const getAllEmployees = (req, res) => {
  try {
    const q = "SELECT * FROM employee_info";
    pool.query(q, (err, data) => {
      if (err) {
        res.status(500).json({ message: err.message });
        return;
      }
      res.status(200).json(data.rows);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addEmployeeUser = (req, res) => {
  const q =
    'INSERT INTO employee_info ("user_id", "first_name", "last_name") VALUES ($1, $2, $3)';

  const { user_id, first_name, last_name } = req.body;

  pool.query(q, [user_id, first_name, last_name], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json({ message: "Employee user added successfully." });
  });
};

module.exports = { getAllEmployees, addEmployeeUser };
