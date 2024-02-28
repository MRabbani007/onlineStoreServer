const cart = require("../db_schemas/cart");
const { getUserID } = require("./userControllers");

const handleCartAdd = async (req, res) => {
  try {
    const action = req?.body?.action;

    if (action) {
      const { type, payload } = action;
      const userName = payload.userName;

      console.log("Cart Add:", userName);
      const userID = await getUserID(userName);
      const { id, name, priceCents, property, value, quantity } =
        payload.newCartItem;
      if (userID) {
        let newCartItem = new cart({
          userID: userID,
          id,
          name,
          priceCents,
          property,
          value,
          quantity,
        });
        let data = await newCartItem.save();
        return res.status(200).json(data);
      } else {
        return res.status(204).json([]);
      }
    } else {
      return res.status(204).json({ status: "failed", message: "No action" });
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

module.exports = handleCartAdd;
