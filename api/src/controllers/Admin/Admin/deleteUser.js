const User = require('../../../models/Users/User');
const ROLE = require('../../../models/Users/Role');


module.exports = async (req, res, next) => {
	const {id} = req.params;
	try {
		await User.findByIdAndDelete(id);
		res.json({
			ok: true,
			user: id
		})
	} catch (error) {
		console.log(error)
	}
}