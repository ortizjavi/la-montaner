const { Router } = require("express");
const { authenticateToken, authAdmin } = require("../middlewares/auth");

const router = Router();

const {
  getCategories,
  createCategory,
  deleteCategory,
} = require("../controllers/Admin/Categories");

const { getUsersList } = require("../controllers/Admin/Users/users");
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/Admin/Products");

const {
  newAdmin,
  getUsers,
  deleteUser,
  resetUser,
  addReview,
  getReviews,
} = require("../controllers/Admin/Admin");

const {
  createSale,
  getSales,
  deleteSales
} = require("../controllers/Admin/Sales/sales")

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
router.get("/usersList", getUsersList);
// User Review
router.get("/addReview", getReviews);
router.put('/addReview', authenticateToken, addReview);

// Admin
router.post("/new", authenticateToken, authAdmin, newAdmin);
router.get("/users", authenticateToken, authAdmin, getUsers);
router.delete("/users/:id", authenticateToken, authAdmin, deleteUser);
//router.delete("/users/:id", deleteUser);
router.put("/users", authenticateToken, authAdmin, resetUser);

//Sales
router.post("/sales", authenticateToken, authAdmin, createSale);
router.delete("/sales/:id",authenticateToken, authAdmin, deleteSales);
router.get("/sales",getSales);

module.exports = router;
