const express = require("express");
const handleOrderGet = require("../controllers/ordersGet");
const handleOrdersCreate = require("../controllers/ordersCreate");

const orderRouter = express();

orderRouter.route("/get").post(handleOrderGet);
orderRouter.route("/create").post(handleOrdersCreate);
orderRouter.route("/remove").post(handleOrderGet);

module.exports = orderRouter;
