const { Router } = require('express');

const generalRoutes = require('./generalRoutes');
const adminRoutes = require('./adminRoutes');

const router = Router();

router.use('/admin', adminRoutes);
router.use('/general', generalRoutes);

module.exports = router;
