const cart = require("../db_schemas/cart");
const { getUserID } = require("./userControllers");

const handleCartGet = async (req, res) => {
  try {
    const action = req?.body?.action;

    if (action) {
      const { type, payload } = action;
      const userName = payload.userName;

      console.log("Get Cart:", userName);
      const userID = await getUserID(userName);
      if (userID) {
        const data = await cart.find({ userID });
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

module.exports = handleCartGet;
