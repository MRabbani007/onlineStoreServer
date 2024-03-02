const mongoose = require("mongoose");

// Schema for Order Documents
const orderItemSchema = new mongoose.Schema({
  id: { type: String, required: false },
  orderID: { type: String, required: false },
  userID: { type: String, required: false },
  prodID: { type: String, required: false },
  name: { type: String, required: false },
  supplier: { type: String, required: false },
  priceCents: { type: Number, required: false },
  property: [{ type: String, required: false }],
  value: [{ type: String, required: false }],
  quantity: { type: Number, required: false },
  orderDate: { type: Date, required: false },
  deliveryDate: { type: Date, required: false },
  deliveryStatus: Boolean,
});

const orderItem = mongoose.model("orderItem", orderItemSchema);

module.exports = orderItem;
