const express = require("express");
const productRouter = express();
const { handleProductGetID } = require("../controllers/productGet");
const {
  handleProductSearch,
  handleProductSearchSupplier,
} = require("../controllers/productSearch");
const handleProductCreate = require("../controllers/productCreate");
const handleProductUpdate = require("../controllers/productUpdate");
const handleProductRemove = require("../controllers/productRemove");

productRouter.route("/get").post(handleProductGetID);
productRouter.route("/search").post(handleProductSearch);
productRouter.route("/supplier").post(handleProductSearchSupplier);
productRouter.route("/create").post(handleProductCreate);
productRouter.route("/update").post(handleProductUpdate);
productRouter.route("/remove").post(handleProductRemove);

module.exports = productRouter;
