const { Router } = require('express');

const generalRoutes = require('./generalRoutes');
const adminRoutes = require('./adminRoutes');
const authRoutes= require('./authRoutes');

const router = Router();

router.use('/', authRoutes);
router.use('/admin', adminRoutes);
router.use('/', generalRoutes);


module.exports = router;
