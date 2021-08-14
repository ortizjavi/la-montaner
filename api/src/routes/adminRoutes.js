const { Router } = require("express");
const { 
	authenticateToken,
	authAdmin
} = require('../middlewares/auth');

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

const {
  newAdmin,
  getUsers,
  deleteUser
} = require("../controllers/Admin/Admin");

// Categories
router.get("/category", getCategories);
router.post("/category", authenticateToken, authAdmin, createCategory);
router.delete("/category", authenticateToken, authAdmin, deleteCategory);
// Products
router.get("/product", getProducts);
router.post("/product", authenticateToken, authAdmin, createProduct);
router.put("/product/:id", authenticateToken, authAdmin, updateProduct);
router.delete("/product/:id", authenticateToken, authAdmin, deleteProduct);
// Admin
router.post('/new', authenticateToken, authAdmin, newAdmin);
router.get('/users', authenticateToken, authAdmin, getUsers);
router.delete('/users', authenticateToken, authAdmin, deleteUser);


module.exports = router;
