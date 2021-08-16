const User = require('../../../models/Users/User');
const ROLE = require('../../../models/Users/Role');


module.exports = (req, res, next) => {
	User.find({ role: ROLE.USER }, { password: 0 }).then((users) => {
		res.json(users);
	})
}