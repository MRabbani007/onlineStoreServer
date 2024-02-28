const express = require("express");
const productRouter = express();
const handleProductGet = require("../controllers/productGet");
const handleProductSearch = require("../controllers/productSearch");
const handleProductCreate = require("../controllers/productCreate");
const handleProductUpdate = require("../controllers/productUpdate");
const handleProductRemove = require("../controllers/productRemove");

productRouter.route("/get").post(handleProductGet);
productRouter.route("/search").post(handleProductSearch);
productRouter.route("/create").post(handleProductCreate);
productRouter.route("/update").post(handleProductUpdate);
productRouter.route("/remove").post(handleProductRemove);

module.exports = productRouter;
