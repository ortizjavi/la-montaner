require('dotenv').config();
const User = require('../../../models/Users/User');
const { SALT_ROUNDS, TOKEN_SECRET } = process.env;


module.exports = (req, res, next) => {
	const { email, password } = req.body;
	User.hashPassword(password, Number(SALT_ROUNDS)).then((hashed) => {
		User.create({
			...req.body,
			password : hashed,
			role: undefined
		}).then(() => {
			res.send('Ok');
		}).catch((err) => {
			res.status(400).send('User already exists')
		})
	})
	
}