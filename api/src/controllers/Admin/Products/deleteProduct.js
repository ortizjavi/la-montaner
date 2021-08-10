const Product = require('../../../models/Product');

module.exports = async (req, res, next) => {
    const { id } = req.params;
    try {
        await Product.findByIdAndDelete(id)
        res.json({
            ok: true
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false
        })
    }
}
