require('dotenv').config();
const User = require('../../../models/Users/User');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, FB_ACCESS_TOKEN } = process.env;
const verify = require('../../../utils/validateGoogleToken');
const crypto = require('crypto');
const axios = require('axios');

const googleLogin = (req, res, next) => {
	verify(req.body.google)
	.then((payload) => {
		return User.findOne({ email: payload.email })
		.then((user) => {
			if (user){
				return user;
			}

			return User.create({ 
				email : payload.email,
				verified : payload.email_verified,
				given_name: payload.given_name,
				family_name: payload.family_name,
				picture: payload.picture,
				name: payload.name,
				password: crypto.randomBytes(64).toString('hex')
			})
		})
	})
	.then((user) => {
		const { password, _id, ...userProps } = user._doc;
		signToken(_id, function(err, token){
			console.error(err);
			if (err) return res.sendStatus(500);
			res.status(200).json({ ...userProps, _id, token })
		});
	})
	.catch(err => {
		console.error(err);
		res.status(400).send('Invalid user or password');
	})
}

const facebookLogin = async (req, res, next) => {
	try {
		console.log(req.body.facebook);
	  const { data } = await axios({
	    url: 'https://graph.facebook.com/me',
	    method: 'get',
	    params: {
	      fields: ['id', 'email', 'first_name', 'last_name', 'picture', 'name'].join(','),
	      access_token: req.body.facebook,
	    },
	  });
	  console.log(data); // { id, email, first_name, last_name }
	  res.json(data);
	} catch (err){
		console.error(err);
		res.json('No');
	}
}

const signToken = (_id, cb) => {
	jwt.sign({ //create jwt token
		_id
	}, TOKEN_SECRET
	, { expiresIn: '36h' }
	, cb)
}


module.exports = (req, res, next) => {
	if (req.body.google){
		return googleLogin(req, res, next);
	}

	if (req.body.facebook){
		return facebookLogin(req, res, next);
	}

	const email = req.body.email;
	const passwordSent = req.body.password;
	User.findOne({ email }).orFail().then((user) => {
		const { password, _id, ...userProps } = user._doc;

		User.comparePassword(passwordSent, password).then((isEqual) => {

			if (!isEqual) //pass invalid
				return res.status(400).send('Invalid user or password');
			// create JWT
			signToken(_id, function(err, token){
				console.error(err);
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