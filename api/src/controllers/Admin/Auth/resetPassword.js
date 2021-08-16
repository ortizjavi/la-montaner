require('dotenv').config();
const { SALT_ROUNDS } = process.env;
const User = require('../../../models/Users/User');
const verifyJWT = require('../../../utils/verifyJWT');


module.exports = (req, res, next) => {
	const { oldPassword, password } = req.body;
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1]

	if (!token){
		return res.sendStatus(401);
	}
	verifyJWT(token)
	.then(user => {
		return User.findById(user._id).orFail();
	})
	.then(user => {
		User.comparePassword(oldPassword, user.password)
		.then(isEqual => {
			if (!isEqual) return res.sendStatus(406);
			User.hashPassword(password, Number(SALT_ROUNDS))
			.then((hashed) => {
				User.updateOne(
					user, 
					{ $set : { password : hashed, reset : false } }
				).then(() => {
					const { password, ...userProps } = user._doc;
					res.status(200).json({ ...userProps, reset : false });
				});
			})
		})
	})
	.catch(err => {
		return res.sendStatus(403); // jwt expired
	})
}