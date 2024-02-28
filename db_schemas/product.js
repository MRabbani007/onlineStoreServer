const mongoose = require("mongoose");

// Schema for User Documents
const productSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: false },
  category: { type: String, required: false },
  rating: {
    stars: {
      type: Number,
      required: false,
    },
    count: { type: Number, required: false },
  },
  reviews: { type: Number, required: false },
  priceCents: { type: Number, required: false, min: 0 },
  brand: { type: String, required: false },
  supplier: { type: String, required: false },
  keywords: { type: String, required: false },
  properties: { type: [String], required: false },
  values: [[{ type: String, required: false }]],
  images: [[{ type: String, required: false }]],
  imagesNames: [{ type: String, required: false }],
  imagesBasedOn: { type: String, required: false },
  information: { type: String, required: false },
  delivery: { type: String, required: false },
  itemWeight: {
    unit: { type: String, required: false, enum: ["g", "kg", "p", "o"] },
    weight: { type: Number, required: false, min: 0 },
  },
  about: { type: [String], required: false },
  details: [{ name: { type: [String] }, value: { type: [String] } }],
  // TODO: Implement Product Schema
});

const product = mongoose.model("products", productSchema);

module.exports = product;
