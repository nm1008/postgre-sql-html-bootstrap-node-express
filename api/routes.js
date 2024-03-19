// router.js

const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getAllEmployees);

router.get("/:id", controller.getUserById);

router.post("/", controller.addEmployeeUser);

router.delete("/:id", controller.deleteUserById);

module.exports = router;
