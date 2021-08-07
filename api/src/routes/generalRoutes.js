const { Router } = require('express');

const router = Router();

const { searchProducts} = require('../controllers/General/searchProducts');
const { getProductDetail } = require('../controllers/General/getProductDetail');


router.get('/', searchProducts);
router.get('/:id', getProductDetail);

module.exports = router;
