const User = require('../../../models/Users/User');
const ROLE = require('../../../models/Users/Role');


module.exports = (req, res, next) => {
	const { email } = req.body;

	User.findOne({ email }).then((user) => {
		if (!user) return res.status(400).send('User not found');
		User.updateOne(user, { $set : { reset: true } }).then((op) => {
			if (!op && !op.ok) return res.sendStatus(500);
			res.sendStatus(200);
		})
	})
}