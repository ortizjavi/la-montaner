const {Router} = require('express');
const searchP = require('../controllers/searchProducts');
const router = Router();
const routerProducts = require('./addProducts')
const routerCategories = require('./categories')
const detailsProducts = require('./detailsProducts')

router.use('/admin', routerProducts)
router.use('/search', searchP)
router.use('/categories', routerCategories);
router.use('/products', detailsProducts);

module.exports = router;