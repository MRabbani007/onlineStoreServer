const order = require("../db_schemas/order");
const { getUserID } = require("./userControllers");

const handleOrdersGetUserID = async (req, res) => {
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

const handleOrdersGetAll = async (req, res) => {
  try {
    console.log("first");
    const action = req?.body?.action;
    if (action) {
      const { type, payload } = action;
      const userName = payload.userName;

      console.log("Order Get:", userName);
      const userID = await getUserID(userName);

      console.log("first");
      let data = await order.find({});
      return res.status(200).json(data);
    } else {
      return res.status(200).json([]);
    }
  } catch (error) {
    console.log("error");
    return res.sendStatus(500);
  }
};

module.exports = { handleOrdersGetUserID, handleOrdersGetAll };
