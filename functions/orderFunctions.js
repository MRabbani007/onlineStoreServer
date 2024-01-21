const cart = require("../dbSchemas/cart");
const order = require("../dbSchemas/order");
const { getUserID } = require("./userFunctions");

const getOrders = async (userID) => {
  try {
    let orderData = await order.find({ userID: userID });
    return orderData;
  } catch (error) {
    console.log("Error: Get Order");
    return [];
  }
};

const calcOrderPrice = (cartData, shippingOptions) => {
  let itemsPrice = 0;
  let shippingPrice = 0;
  cartData.map((cartItem) => {
    itemsPrice += cartItem.priceCents * cartItem.quantity;
  });
  return { itemsPrice, shippingPrice };
};

const createOrder = async (userID, orderData) => {
  try {
    // check if items in cart
    const cartData = await cart.find({ userID: userID });
    if (cartData.length !== 0) {
      let { itemsPrice, shippingPrice } = calcOrderPrice(cartData);
      let products = [];
      cartData.map((cartItem) => {
        products.push({
          id: cartItem.id,
          name: cartItem.name,
          priceCents: cartItem.priceCents,
          property: cartItem.property,
          value: cartItem.value,
          quantity: cartItem.quantity,
          deliveryDate: "",
          deliveryStatus: false,
        });
      });
      let newOrder = new order({
        userID: userID,
        orderID: crypto.randomUUID(),
        orderDate: "",
        orderStatus: "pending",
        priceCents: {
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
        },
        products: products,
      });
      newOrder.save().then(function (error) {
        if (error) {
        } else {
          console.log("here");
        }
      });
      cart.deleteMany({ userID: userID }).exec();
      return "Order Created";
    } else {
      return "Cart is Empty";
    }
  } catch (error) {
    console.log("Error: Create Order", error);
    return [];
  }
};

const updateOrder = async (userID) => {};

const delecteOrder = async (userID) => {};

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
