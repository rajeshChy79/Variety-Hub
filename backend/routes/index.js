const express = require("express");
const router = express.Router();

const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const userLogout = require("../controller/user/userLogout");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/user/userDetails");
const allUsers = require("../controller/user/allUsers");
const updateUser = require("../controller/user/updateUser");
const uploadProductController = require("../controller/product/uploadProduct");
const getProductController = require("../controller/product/getProduct");
const updateProductController = require("../controller/product/updateProduct");
const getCategoryProductController = require("../controller/product/getCategoryProductOne");
const getCategoryWiseProduct = require("../controller/product/getCategoryWiseProduct");
const getProductDetails = require("../controller/product/getProductDetails");
const addToCartController = require("../controller/user/addToCartController");
const countAddToCartController = require("../controller/user/countAddToCart");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controller/user/deleteAddToCartProduct");
const searchProduct = require("../controller/product/searchProduct");
const filterProductController = require("../controller/product/filterProduct");
const paymentController = require("../controller/order/paymentController");

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

// Admin Panel
router.get("/allUser", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// Products
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-category", getCategoryProductController);
router.post("/category-products", getCategoryWiseProduct);
router.post("/get-product-details", getProductDetails);
router.get("/search-product", searchProduct);
router.post("/filter-product", filterProductController);

// Cart
router.post("/addtocart", authToken, addToCartController);
router.get("/countaddtocartproduct", authToken, countAddToCartController);
router.get("/view-add-to-cart", authToken, addToCartViewProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

// Payments & Orders
router.post("/checkout", authToken, paymentController);

module.exports = router;
