const { processingOrder } = require('../utils/sendMail');

module.exports = (req, res, next) => {
	const total = req.order.cart.reduce((acum, product) => {
		return acum += product.price * product.stockSelected;
	},0)
	if (req.order.status === 'Procesando'){
		processingOrder(
			req.user.email, 
			req.user.name,
			{
				total,
				method: req.order.payment_method
			},
			{
				delivery: req.order.address.length,
				address: req.order.address
			}
		)
	}
    res.json(req.res);
}