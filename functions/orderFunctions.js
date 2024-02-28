const cart = require("../dbSchemas/cart");
const order = require("../dbSchemas/order");
const { getUserID } = require("./userFunctions");

const handleOrderRequests = async (orderOption, userName, orderData) => {
  let result = [];
  switch (orderOption) {
    case "get": {
      result = await getOrders(await getUserID(userName));
      break;
    }
    case "create": {
      result = await createOrder(await getUserID(userName), orderData);
      break;
    }
    case "update": {
      result = await updateOrder(await getUserID(userName), orderData);
      break;
    }
    case "remove": {
      result = await delecteOrder(await getUserID(userName), CartData);
      break;
    }
    default: {
    }
  }
  return { result: result };
};

module.exports = { handleOrderRequests };
