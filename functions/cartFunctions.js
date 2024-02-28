const cart = require("../db_schemas/cart");
const { getUserID } = require("./userFunctions");

// Handle cart requests
const handleCartRequests = async (cartOption, userName, CartData) => {
  let result = [];
  switch (cartOption) {
    case "get": {
      result = await fetchCartGet(await getUserID(userName));
      break;
    }
    case "add": {
      result = await fetchCartAdd(await getUserID(userName), CartData);
      break;
    }
    case "remove": {
      result = await fetchCartRemove(await getUserID(userName), CartData);
      break;
    }
    case "update": {
      result = updateCartItem(CartData);
      break;
    }
    case "update_quantity": {
      result = await fetchCartQuantity(await getUserID(userName), CartData);
      break;
    }
    default: {
    }
  }
  return { result: result };
};

module.exports = { handleCartRequests };
