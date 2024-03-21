const mongoose = require("mongoose");

// Schema for User Documents
const userSchema = new mongoose.Schema({
  id: { type: String, required: false },
  username: { type: String, required: false },
  password: { type: String, required: false },
  password_date: { type: Date, required: false },
  name: { type: String, required: false },
  firstname: { type: String, required: false },
  lastname: { type: String, required: false },
  email: { type: String, required: false },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Supplier: Number,
    Admin: Number,
  },
  createDate: { type: Date, required: false },
  lastSignin: { type: Date, required: false },
  active: { type: Boolean, required: false },
  key: { type: String, required: false },
  accessToken: { type: String, required: false },
  refreshToken: { type: String, required: false },

  language: String,
  currency: String,
  itemsPerPage: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
