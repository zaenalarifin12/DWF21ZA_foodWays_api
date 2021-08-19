const express = require("express");
const router = express.Router();

const { authenticated } = require("../middleware/auth");
const { uploadFile } = require("../middleware/upload");
const { permit } = require("../middleware/permit");

const AuthController = require("../controller/auth");
const UserController = require("../controller/users");
const ProductController = require("../controller/product");
const TransactionController = require("../controller/transaction");

// auth
router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.get("/check-auth", authenticated, AuthController.checkAuth);


// users
router.get("/users", UserController.getUser);
router.put(
  "/user",
  authenticated,
  uploadFile("image"),
  UserController.editUser
);
router.delete(
  "/user/:id",
  authenticated,

  UserController.deleteUser
);

router.get(
  "/user/:userId",
  UserController.showUser
);

router.patch(
  "/userLocation",
  authenticated,
  UserController.editLocation
);

// products
router.get("/products", ProductController.getAllProduct);
router.get("/products/:userId", ProductController.getProductByPartner);
router.get("/product/:productId", ProductController.getDetailProduct);
router.post(
  "/product",
  authenticated,
  permit("partner"),
  uploadFile("image"),
  ProductController.addProduct
);
router.put(
  "/product/:productId",
  authenticated,
  // permit("partner"),
  uploadFile("image"),
  ProductController.editProduct
);
router.delete(
  "/product/:productId",
  // permit("partner"),
  ProductController.deleteProduct
);

router.get("/product-last/:userId", ProductController.getLastProduct);


router.get(
  "/my-products",
  authenticated,
  permit("partner"),
  ProductController.myProducts
);
// transaction
router.get("/transactions/:userId", TransactionController.getTransaction);
router.get("/transaction/:id", TransactionController.getDetailTransaction);
router.post(
  "/transaction",
  authenticated,
  TransactionController.addTransaction
);
router.put(
  "/transaction/:id",
  authenticated,
  TransactionController.editTransaction
);
router.delete(
  "/transaction/:id",
  authenticated,
  TransactionController.deleteTransaction
);
router.get(
  "/my-transactions",
  authenticated,
  TransactionController.myTransaction
);

module.exports = router;
