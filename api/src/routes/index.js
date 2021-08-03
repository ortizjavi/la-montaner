const {Router} = require('express');
const router = Router();
const routerProducts = require('./addProducts')
const detailsProducts = require('./detailsProducts');

router.use('/admin', routerProducts)
router.use('/products', detailsProducts)

module.exports = router;