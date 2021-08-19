const Order = require("../../models/Orders");

module.exports = (req, res, next) => {
	const { 
	 mp_preference, 
	 payment_method, 
	 status 
	} = req.body;
	const orderStatus = status !== 'null' ? 'Procesando' : 'Cancelada';

	Order.findOneAndUpdate({ mp_preference },
		{ payment_status: status, status: orderStatus, payment_method },
		{ new : true},
		(err, doc) => {
			res.json({ ok: true, order: doc });
		}
	)
}