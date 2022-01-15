const router = require("express").Router();
const invoiceController = require("./controller");
const { police_check } = require("../../middleware");

router.get(
  `/invoice/:order_id`,
  police_check("read", "Invoice"),
  invoiceController.getInvoice
);

module.exports = router;