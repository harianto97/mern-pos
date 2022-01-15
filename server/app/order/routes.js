const router = require("express").Router();
const orderController = require("./controller");
const { police_check } = require("../../middleware");

router.post(
  "/order",
  police_check("create", "Order"),
  orderController.addOrder
);

router.get(
  "/order",
  police_check("read", "Order"),
  orderController.getOrder
);

module.exports = router;