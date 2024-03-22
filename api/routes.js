const express = require("express");
const router = express.Router();
const controller = require("./controller");

//get all employees
router.get("/", controller.getAllEmployees, );

//get user by id
router.get("/:id", controller.getUserById);

//get user by name
router.post("/search", controller.getUserByName)

//add user
router.post("/", controller.addEmployeeUser);

//update user information
router.put("/:id", controller.updateUserById);

//delete user by id
router.delete("/:id", controller.deleteUserById);

module.exports = router;
