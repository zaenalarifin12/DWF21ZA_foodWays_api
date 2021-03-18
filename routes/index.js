const express = require("express");
const router = express.Router();

const AuthController = require("../controller/auth");
const UserController = require("../controller/users");
const ProductController = require("../controller/product");
// auth
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);

// users
router.get("/users", UserController.getUser);
router.delete("/user/:id", UserController.deleteUser);

// products

router.get("/products", ProductController.getAllProduct);
router.get("/products/:userId", ProductController.getProductByPartner);
router.get("/product/:productId", ProductController.getDetailProduct);
router.get("/product", ProductController.addProduct);
router.get("/product/:productId", ProductController.editProduct);

module.exports = router;
