require('dotenv').config();
const User = require('../../../models/Users/User');
const verifyGoogle = require('../../../utils/validateGoogleToken');
const verifyFB = require('../../../utils/validateFBToken');
const signJWT = require('../../../utils/signJWT');
const crypto = require('crypto');


const mapFacebookProperties = ({data}) => {
	return {
		...data,
		given_name: data.first_name,
		family_name: data.last_name,
		picture: data.picture.data.url,
		email_verified: false
	}
}

const googleLogin = (googleToken) => {
	return verifyGoogle(googleToken);	
}

const facebookLogin = (facebookToken) => {
	return verifyFB(facebookToken)
			.then(mapFacebookProperties)
}

module.exports = (req, res, next) => {
	let token = '', login = null;
	if (req.body.google){
		token = req.body.google;
		login = googleLogin;
	} else {
		token = req.body.facebook;
		login = facebookLogin;
	}
	
	login(token).then((payload) => {
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
		signJWT(_id).then(() => {
			res.status(200).json({ ...userProps, _id, token });
		}).catch((err) => {
			console.error(err);
			return res.sendStatus(500);
		})
	})
	.catch(err => {
		console.error(err);
		res.status(400).json({ message: 'Invalid user or password' });
	})
}


