const express = require("express");
const router = express.Router();

const AuthController = require("../controller/auth");
const UserController = require("../controller/users")

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);


router.get("/users", UserController.getUser);
router.delete("/users/:id", UserController.deleteUser);


module.exports = router