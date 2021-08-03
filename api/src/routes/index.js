const {Router} = require('express');
const router = Router();
const routerProducts = require('./addProducts')

router.use('/admin', routerProducts)

module.exports = router;