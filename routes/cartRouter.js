const express = require("express");
const cartRouter = express();
const handleCartGet = require("../controllers/cartGet");
const handleCartAdd = require("../controllers/cartAdd");
const handleCartRemove = require("../controllers/cartRemove");
const {
  handleCartUpdateQuantity,
  handleCartUpdateItem,
} = require("../controllers/cartUpdate");

cartRouter.route("/get").post(handleCartGet);
cartRouter.route("/add").post(handleCartAdd);
cartRouter.route("/remove").post(handleCartRemove);
cartRouter.route("/updateQuantity").post(handleCartUpdateQuantity);
cartRouter.route("/updateItem").post(handleCartUpdateItem);

module.exports = cartRouter;
