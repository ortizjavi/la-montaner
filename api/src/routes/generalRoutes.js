const { Router } = require("express");

const router = Router();

const { authenticateToken } = require('../middlewares/auth');
const notifyClient = require('../middlewares/notifyClient');
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

const updateUsers = require("../controllers/General/updateUsers");

router.get("/", searchProducts);
router.get("/:id", getProductDetail);
router.post("/product/pay", authenticateToken, payProducts);
router.post("/product/order", authenticateToken, createOrder, notifyClient);
router.get("/product/order", authenticateToken, getOrders);
router.put("/product/order", authenticateToken, updatePayment, notifyClient);
router.put("/product/order/:id", authenticateToken, updateOrders, notifyClient);
router.put("/user/:id", authenticateToken, updateUsers);

module.exports = router;
