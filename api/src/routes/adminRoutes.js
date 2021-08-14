const { Router } = require("express");
const { authenticateToken, authAdmin } = require("../middlewares/auth");

const router = Router();

const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/Admin/Categories");

const { getUsers } = require("../controllers/Admin/Users/users");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/Admin/Products");

// Categories
router.get("/category", getCategories);
router.post("/category", authenticateToken, authAdmin, createCategory);
router.delete("/category", authenticateToken, authAdmin, deleteCategory);
// Products
router.get("/product", getProducts);
router.post("/product", authenticateToken, authAdmin, createProduct);
router.put("/product/:id", authenticateToken, authAdmin, updateProduct);
router.delete("/product/:id", authenticateToken, authAdmin, deleteProduct);
// Users
router.get("/users", getUsers);

module.exports = router;
