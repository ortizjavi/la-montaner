const {Router} = require('express');
const router = Router();
const routerProducts = require('./addProducts')
const routerCategories = require('./categories')

router.use('/categories', routerCategories)
router.use('/admin', routerProducts)

module.exports = router;