const { Router } = require("express");
const express = require("express");
const adminRoute = express.Router();

const userController = require("../controllers/adminController");

adminRoute.get("/users", userController.getAllUsers);

module.exports = adminRoute;