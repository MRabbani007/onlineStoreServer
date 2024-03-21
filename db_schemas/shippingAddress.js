const mongoose = require("mongoose");

// Schema for Order Documents
const shippingAddressSchema = new mongoose.Schema({
  id: { type: String, required: false },
  userID: { type: String, required: false },
  country: { type: String, required: false },
  province: { type: String, required: false },
  state: { type: String, required: false },
  city: { type: String, required: false },
  street: { type: String, required: false },
  building: { type: String, required: false },
  entrance: { type: String, required: false },
  floor: { type: String, required: false },
  appartmentNum: { type: String, required: false },
  residenceType: { type: String, required: false },
  addDate: { type: Date, required: false },
  trash: Boolean,
});

const shippingAddress = mongoose.model(
  "shippingAddress",
  shippingAddressSchema
);

module.exports = shippingAddress;
