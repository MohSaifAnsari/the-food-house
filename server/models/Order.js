const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  email: String,
  mobile: String,
  area: String,
  town: String,
  city: String,
  state: String,
  pincode: String,
  message: String,
  date: String,
  name: String,
  price: Number,
  image: String,
  status: {
    type: String,
    default: "pending", // ✅ Order status: pending | delivered
  },
});

module.exports = mongoose.model("Order", orderSchema);
