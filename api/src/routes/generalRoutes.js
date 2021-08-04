const { Router } = require('express');

const router = Router();

const { getAllProducts } = require('../controllers/General/getAllProducts');
const { getProductDetail } = require('../controllers/General/getProductDetail');

router.get('/', getAllProducts);
router.get('/:id', getProductDetail);

module.exports = router;
