const express = require("express");
const {
  handleOrdersGetUserID,
  handleOrdersGetAll,
} = require("../controllers/ordersGet");
const handleOrdersCreate = require("../controllers/ordersCreate");

const orderRouter = express();

orderRouter.route("/getuser").post(handleOrdersGetUserID);
orderRouter.route("/create").post(handleOrdersCreate);
// orderRouter.route("/remove").post(handleOrderGet);
orderRouter.route("/getall").post(handleOrdersGetAll);

module.exports = orderRouter;
