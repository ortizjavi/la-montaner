const Order = require("../../models/Orders");
const { processingOrder } = require('../../utils/sendMail');

module.exports = (req, res, next) => {
	const { 
	 mp_preference, 
	 payment_type, 
	 status 
	} = req.body;
	const statusNotNull = status !== 'null';
	const orderStatus =  statusNotNull ? 'Procesando' : 'Cancelada';

	Order.findOneAndUpdate({ mp_preference },
		{ payment_status: status, status: orderStatus, payment_method: payment_type },
		{ new : true},
		(err, doc) => {
			let total = doc.cart.reduce((acum, product) => {
				return acum += product.price * product.stockSelected;
			},0)
			if (statusNotNull){
				processingOrder(
					req.user.email, 
					req.user.name,
					{
						total,
						method: doc.payment_method
					},
					{
						delivery: doc.address.length,
						address: doc.address
					}
				)
			}
			res.json({ ok: true, order: doc });
		}
	)
}