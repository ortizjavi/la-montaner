require('dotenv').config();
const User = require('../../../models/Users/User');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

module.exports = (req, res, next) => {
	const email = req.body.email;
	const passwordSent = req.body.password;
	User.findOne({ email }).then((user) => {
		const { password, _id, ...userProps } = user._doc;

		User.comparePassword(passwordSent, password).then((isEqual) => {

			if (!isEqual) //pass invalid
				return res.status(400).send('Invalid user or password');
			jwt.sign({ //create jwt token
				_id
			}, TOKEN_SECRET
			, { expiresIn: '36h' }
			, (err, token) => {
				console.log(err);
				if (err) return res.sendStatus(500);
				res.status(200).json({ ...userProps, _id, token })
			});
		}).catch(err => {
			console.error(err);
			res.status(400).send('Invalid user or password')
		})
	}).catch((err) => {
		res.status(400).send('Invalid user or password')//user invalid
	})
	
}