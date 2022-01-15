const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const orderItemSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "products",
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: "orders",
  },
});

module.exports = model("orderItems", orderItemSchema);