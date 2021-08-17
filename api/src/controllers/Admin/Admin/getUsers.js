const User = require('../../../models/Users/User');
const ROLE = require('../../../models/Users/Role');


module.exports = (req, res, next) => {
	User.find({}, { password: 0 }).then((users) => {
		res.json(users);
	})
}