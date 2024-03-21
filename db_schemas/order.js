const mongoose = require("mongoose");

// Schema for Order Documents
const orderSchema = new mongoose.Schema({
  // TODO: Implement Order Schema
  userID: { type: String, required: false },
  orderID: { type: String, required: false },
  orderDate: { type: String, required: false },
  orderStatus: { type: String, required: false },
  priceCents: {
    itemsPrice: { type: Number, required: false },
    shippingPrice: { type: Number, required: false },
  },
  products: [
    {
      id: { type: String, required: false },
      name: { type: String, required: false },
      priceCents: { type: Number, required: false },
      property: [{ type: String, required: false }],
      value: [{ type: String, required: false }],
      quantity: { type: Number, required: false },
      deliveryDate: { type: Date, required: false },
      deliveryStatus: Boolean,
      imagesURL: { type: String, required: false },
    },
  ],
});

const order = mongoose.model("order", orderSchema);

module.exports = order;
