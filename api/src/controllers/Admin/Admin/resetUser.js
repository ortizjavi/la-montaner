const User = require('../../../models/Users/User');
const ROLE = require('../../../models/Users/Role');


module.exports = (req, res, next) => {
	const { email } = req.body;

	User.findOne({ email }).then((user) => {
		if (!user) return res.status(400).send('User not found');
		User.updateOne({ email: user.email }, { $set : { reset: true } }).then((op) => {
			if (!op && !op.ok) return res.sendStatus(500);
			console.log(op);
			console.log(user);
			res.sendStatus(200);
		})
	})
}