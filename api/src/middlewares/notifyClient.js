const User = require('../models/Users/User');
const { 
	processingOrder,
	completedOrder
} = require('../utils/sendMail');

module.exports = async (req, res, next) => {
	const total = req.order.cart.reduce((acum, product) => {
		return acum += product.price * product.stockSelected;
	},0)
	if (req.order.status === 'Procesando'){
		processingOrder(
			req.user.email, 
			req.user.given_name,
			{
				total,
				method: req.order.payment
			},
			{
				delivery: req.order.address.length,
				address: req.order.address
			}
		)
	} else if (req.order.status === 'Completa'){
		const user = await User.findOne({ _id: req.order.user })
		completedOrder(
			user.email, 
			user.given_name,
			{
				delivery: req.order.address.length,
				address: req.order.address
			}
		)
	}
    res.json(req.res);
}