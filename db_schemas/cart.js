const mongoose = require("mongoose");

// Schema for Cart Documents
const cartItemSchema = new mongoose.Schema({
  // TODO: Implement Cart Schema
  id: { type: String, required: false },
  userID: { type: String, required: false },
  prodID: { type: String, required: false },
  name: { type: String, required: false },
  supplier: { type: String, required: false },
  priceCents: { type: Number, required: false },
  property: [{ type: String, required: false }],
  value: [{ type: String, required: false }],
  quantity: { type: Number, required: false },
  imagesURL: { type: String, required: false },
});

const cart = mongoose.model("cart", cartItemSchema);

module.exports = cart;
