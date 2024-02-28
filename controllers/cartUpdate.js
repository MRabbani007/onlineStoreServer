const cart = require("../db_schemas/cart");
const { getUserID } = require("./userControllers");

const handleCartUpdateQuantity = async (req, res) => {
  try {
    const action = req?.body?.action;

    if (action) {
      const { type, payload } = action;
      const userName = payload.userName;

      console.log("Cart Update Quantity:", userName);
      const userID = await getUserID(userName);

      if (userID) {
        let data = await cart
          .updateOne(
            { userID: userID, id: payload.id },
            { $set: { quantity: payload.quantity } }
          )
          .exec();
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

const handleCartUpdateItem = async (req, res) => {
  try {
    const action = req?.body?.action;

    if (action) {
      const { type, payload } = action;
      const userName = payload.userName;

      console.log("Cart Update Item:", userName);
      const userID = await getUserID(userName);

      if (userID) {
        const { id, property, value } = payload.newItem;
        let data = await cart
          .updateOne({ userID: userID, id }, { $set: { property, value } })
          .exec();
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

module.exports = { handleCartUpdateItem, handleCartUpdateQuantity };
