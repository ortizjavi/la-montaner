const Order = require("../../models/Orders");
const { processingOrder } = require('../../utils/sendMail');

module.exports = (req, res, next) => {
	const { 
	 mp_preference, 
	 payment_method, 
	 status 
	} = req.body;
	const statusNotNull = status !== 'null';
	const orderStatus =  statusNotNull ? 'Procesando' : 'Cancelada';

	Order.findOneAndUpdate({ mp_preference },
		{ payment_status: status, status: orderStatus, payment_method },
		{ new : true},
		(err, doc) => {
			let total = doc.cart.reduce((acum, product) => {
				return acum += product.price;
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
				).then(() => {
					console.log('email sent');
				}).catch((err) => {
					console.error(err);	
				})
			}
			res.json({ ok: true, order: doc });
		}
	)
}