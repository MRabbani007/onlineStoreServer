const product = require("../db_schemas/product");

const handleProductRemove = async (req, res) => {
  try {
    const action = req?.body?.action;

    if (action) {
      const { type, payload } = action;
      const clientProduct = payload?.product;

      console.log("Product Remove:", product.id);

      const data = await product.deleteOne({ id: clientProduct.id });

      return res.sendStatus(200).json({ status: "success" });
    } else {
      return res.sendStatus(204);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

module.exports = handleProductRemove;
