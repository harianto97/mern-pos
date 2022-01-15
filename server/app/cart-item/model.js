const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const cartItemSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  image_url: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
});

module.exports = model("cartItems", cartItemSchema);