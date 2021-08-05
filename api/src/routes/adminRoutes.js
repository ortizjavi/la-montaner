const { Router } = require('express');

const router = Router();

const { createCategory } = require('../controllers/Admin/Category/createCategory');
const { getCategories } = require('../controllers/Admin/Category/getCategories');
const { createProduct } = require('../controllers/Admin/Products/createProduct');
const { getProducts } = require('../controllers/Admin/Products/getProducts')
const { updateProduct } = require('../controllers/Admin/Products/updateProduct');
const { deleteProduct } = require('../controllers/Admin/Products/deleteProduct');

router.get('/category', getCategories);
router.post('/category', createCategory);

router.get('/product', getProducts);
router.put('/product', updateProduct);
router.post('/product', createProduct);
router.delete('/product/:id', deleteProduct);

module.exports=router;
