const order = require("../db_schemas/order");
const { getUserID } = require("./userControllers");

const handleOrdersGet = async (req, res) => {
  try {
    const action = req?.body?.action;

    if (action) {
      const { type, payload } = action;
      const userName = payload.userName;

      console.log("Order Get:", userName);
      const userID = await getUserID(userName);

      if (userID) {
        let data = await order.find({ userID });
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

module.exports = handleOrdersGet;
