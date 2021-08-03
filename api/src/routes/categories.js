const { Router } = require('express');
const router = Router();
const controller = require('../controllers/categories')

router.post('/', controller.create);




module.exports=router