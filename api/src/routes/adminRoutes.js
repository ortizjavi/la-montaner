const { Router } = require('express');

const router = Router();

const { createCategory } = require('../controllers/Admin/Category/createCategory');
const { getCategories } = require('../controllers/Admin/Category/getCategories');
const { createProduct } = require('../controllers/Admin/Products/createProduct');
const { updateProduct } = require('../controllers/Admin/Products/updateProduct');
const { deleteProduct } = require('../controllers/Admin/Products/deleteProduct');

router.get('/category', getCategories);
router.post('/category', createCategory);

router.put('/product', updateProduct);
router.post('/product', createProduct);
router.delete('/product/:id', deleteProduct);

module.exports=router;
