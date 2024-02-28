const product = require("../db_schemas/product");

const handleProductGet = async (req, res) => {
  try {
    const action = req?.body?.action;
    if (action) {
      const { type, payload } = action;
      let { productID } = payload;
      console.log("Request Get Product: ", productID);

      const data = await product.findOne({ id: productID }).exec();
      return res.status(200).json(data);
    } else {
      return res.status(204).json({ status: "failed", message: "No action" });
    }
  } catch (error) {
    return "Error: Product Get";
  }
};

module.exports = handleProductGet;
