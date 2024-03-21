const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");

const router = express();

// Routers for client requests
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");
const adminRouter = require("./adminRouter");

// Handle user registration and authentication
router.use("/user", userRouter);

// Verify JWT Middleware applies to website content
// router.use(verifyJWT);

router.use("/products", productRouter);
router.use("/cart", cartRouter);
router.use("/order", orderRouter);

router.use("/admin", adminRouter);

module.exports = router;
