const express = require("express");
const router = express.Router();

const UserController = require("../controller/auth");

router.get("/login", UserController.login);


module.exports = router