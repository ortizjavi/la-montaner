const { Router } = require("express");

const router = Router();

const { searchProducts } = require("../controllers/General/searchProducts");
const { getProductDetail } = require("../controllers/General/getProductDetail");

const {createOrder, createCart} = require("../controllers/General/orders");
const { payProducts, getPayProducts } = require("../controllers/General/payProducts");

router.get("/", searchProducts);
router.get("/:id", getProductDetail);
router.post("/product/pay", payProducts);
//router.get("/products/pay/:id", getPayProducts);
router.post("/product/order", createOrder);
router.post("/products/cart", createCart);

module.exports = router;
