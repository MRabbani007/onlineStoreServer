const cart = require("../db_schemas/cart");
const { getUserID } = require("./userControllers");

const handleCartRemove = async (req, res) => {
  try {
    const action = req?.body?.action;

    if (action) {
      const { type, payload } = action;
      const userName = payload.userName;

      console.log("Cart Remove:", userName);
      const userID = await getUserID(userName);
      if (userID) {
        let data = await cart
          .deleteOne({ userID: userID, id: payload.id })
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

module.exports = handleCartRemove;
