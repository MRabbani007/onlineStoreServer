const cart = require("../db_schemas/cart");
const order = require("../db_schemas/order");
const { getUserID } = require("./userControllers");

const handleOrdersCreate = async (req, res) => {
  try {
    const action = req?.body?.action;

    if (action) {
      const { type, payload } = action;
      const userName = payload.userName;

      console.log("Order Create:", userName);
      const userID = await getUserID(userName);

      if (userID) {
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
          let data = await newOrder.save();
          let temp = await cart.deleteMany({ userID: userID }).exec();
          return res
            .status(200)
            .json({ status: "success", message: "Order placed" });
        } else {
          return res
            .status(204)
            .json({ statu: "failed", message: "Cart is Empty" });
        }
      } else {
        return res.status(204).json({ statu: "failed", message: "No userID" });
      }
    } else {
      return res.status(204).json({ statu: "failed", message: "No Action" });
    }
  } catch (error) {
    console.log("Error: Create Order", error);
    return res.sendStatus(500);
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

module.exports = handleOrdersCreate;
