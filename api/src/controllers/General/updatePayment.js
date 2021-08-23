const Order = require("../../models/Orders");

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
            req.res = { ok: true, order: doc }
			if (statusNotNull){
				req.order = doc;
				next();
			}
			res.json(req.res);
		}
	)
}