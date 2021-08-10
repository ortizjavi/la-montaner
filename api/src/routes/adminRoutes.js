const { Router } = require("express");

const router = Router();

const {
  getCategories,
  createCategory,
  deleteCategory
} = require("../controllers/Admin/Categories");

const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/Admin/Products");

// Categories
router.get("/category", getCategories);
router.post("/category", createCategory);
router.delete("/category", deleteCategory);
// Products
router.get("/product", getProducts);
router.post("/product", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);


module.exports = router;
