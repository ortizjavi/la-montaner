const {Router} = require('express');
const searchP = require('../controllers/searchProducts');
const router = Router();
const routerProducts = require('./addProducts')

router.use('/admin', routerProducts)
router.use('/search', searchP)
router.use('/categories', routerCategories);
router.use('/products', detailsProducts);

module.exports = router;