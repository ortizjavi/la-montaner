require('dotenv').config();
const User = require('../../../models/Users/User');
const { SALT_ROUNDS, TOKEN_SECRET } = process.env;


module.exports = (req, res, next) => {
	const { name, email, password } = req.body;
	User.hashPassword(password, Number(SALT_ROUNDS)).then((hashed) => {
		User.create({
			...req.body,
			password : hashed,
			role: undefined,
			verified: false
		}).then(() => {
			res.send(`${name}`);
		}).catch((err) => {
			res.status(400).send('User already exists')
		})
	})
	
}