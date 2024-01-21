const mongoose = require("mongoose");

// Schema for User Documents
const userSchema = new mongoose.Schema({
  userName: { type: String, required: false },
  password: { type: String, required: false },
  email: { type: String, required: false },
  key: { type: String, required: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
