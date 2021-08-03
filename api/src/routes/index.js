const { Router } = require('express');
const router = Router();
const routerProducts = require('./addProducts')
const routerCategories = require('./categories')
const detailsProducts = require('./detailsProducts');

router.use('/categories', routerCategories)
router.use('/admin', routerProducts)
router.use('/products', detailsProducts)

module.exports = router;
