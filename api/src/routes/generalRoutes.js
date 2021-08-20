const { Router } = require("express");

const router = Router();

const { searchProducts } = require("../controllers/General/searchProducts");
const { getProductDetail } = require("../controllers/General/getProductDetail");

const {
  createOrder,
  createAddress,
  getOrders,
  updateOrders,
} = require("../controllers/General/orders");
const updatePayment = require("../controllers/General/updatePayment");

const { payProducts } = require("../controllers/General/payProducts");

const updateUsers = require("../controllers/General/updateUsers")

router.get("/", searchProducts);
router.get("/:id", getProductDetail);
router.post("/product/pay", payProducts);
router.post("/product/order", createOrder);
router.get("/product/order", getOrders);
router.put("/product/order", updatePayment);
router.put("/product/order/:id", updateOrders);
router.put("/user/:id", updateUsers);

module.exports = router;
