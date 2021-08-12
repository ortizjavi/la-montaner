require('dotenv').config();
const User = require('../../../models/Users/User');
const externalLogin = require('./externalLogin');
const signJWT = require('../../../utils/signJWT');

module.exports = (req, res, next) => {
	if (req.body.google || req.body.facebook){
		return externalLogin(req, res, next);
	}

	const email = req.body.email;
	const passwordSent = req.body.password;
	User.findOne({ email }).orFail().then((user) => {
		const { password, _id, ...userProps } = user._doc;

		User.comparePassword(passwordSent, password).then((isEqual) => {
			if (!isEqual) //pass invalid
				return res.status(400).send('Invalid user or password');
			// create JWT
			signJWT(_id).then(() => {
				res.status(200).json({ ...userProps, _id, token });
			}).catch((err) => {
				console.error(err);
				return res.sendStatus(500);
			})
		}).catch(err => {
			console.error(err);
			res.status(400).send('Invalid user or password')
		})
	}).catch((err) => {
		res.status(400).send('Invalid user or password')//user invalid
	})
	
}