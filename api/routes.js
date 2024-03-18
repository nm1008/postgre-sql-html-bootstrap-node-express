// router.js

const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/", controller.getAllEmployees); 

router.post("/", controller.addEmployeeUser)

module.exports = router;
