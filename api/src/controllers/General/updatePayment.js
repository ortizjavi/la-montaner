const Order = require("../../models/Orders");

module.exports = (req, res, next) => {
	const { _id, preference_id } = req.body;
	Order.findOneAndUpdate(
		{ user: _id, mp_preference: preference_id},
		{ status : "Cancelled" },
		{ new : true},
		(err, doc) => {
			console.log(err);
			console.log(doc);
			res.json({ ok: true });
		}
	)
}