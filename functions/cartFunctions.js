const cart = require("../dbSchemas/cart");
const { getUserID } = require("./userFunctions");

// Get cart by user id
const fetchCartGet = async (userID) => {
  try {
    const data = await cart.find({ userID: userID });
    return data;
  } catch (error) {
    console.log("Error: Get Cart");
  }
};

// Add item to cart
const fetchCartAdd = async (userID, clientCartItem) => {
  try {
    let newCartItem = new cart({
      userID: userID,
      id: clientCartItem.id,
      name: clientCartItem.name,
      priceCents: clientCartItem.priceCents,
      property: clientCartItem.property,
      value: clientCartItem.value,
      quantity: clientCartItem.quantity,
    });
    newCartItem.save().then(
      (saveResult) => {
        result = "added";
        console.log("Cart item added");
        return result;
      },
      (err) => console.log(err)
    );
  } catch (error) {
    console.log(error);
  }
};

// Remove item from cart
const fetchCartRemove = async (userID, data) => {
  try {
    let temp = await cart.deleteOne({ userID: userID, id: data }).exec();
    const result = await cart.find({ userID: userID });
    return result;
  } catch (error) {
    console.log("Error: Cart Remove Item");
  }
};

// Update cart quantity
const fetchCartQuantity = async (userID, data) => {
  try {
    let temp = await cart
      .updateOne(
        { userID: userID, id: data.productID },
        { $set: { quantity: data.quantity } }
      )
      .exec();
    const result = await cart.find({ userID: userID });
    return result;
  } catch (error) {
    console.log("Error: Update Cart Quantity");
  }
};

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
