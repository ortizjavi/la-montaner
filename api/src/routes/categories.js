const { Router } = require('express');
const router = Router();
const controller = require('../controllers/categories')

router.post('/', controller.create);
router.get('/', controller.get);




module.exports=router