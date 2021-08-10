require('dotenv').config();
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;
const User = require('../models/Users/User');
const ROLE = require('../models/Users/Role')

const getUserById = (id) => {
	return User.findById(id);
}

const authRole  = (role) => {
	return function(req, res, next){
		if (req.user.role !== role) {
			res.status(401);
			return res.json({ message: 'Not allowed'});
		}
		next();
	}
}

function authenticateToken(req, res, next){
	const auth = req.headers['authorization'];
	const token = auth && auth.split(' ')[1];

	if (!token){
		return res.sendStatus(401);
	}

	jwt.verify(token, TOKEN_SECRET, (err, user) => {
		if (err) return res.sendStatus(403); // jwt expired
		// valid token, save user in request
		getUserById(req.user._id)
		.then((user) => {
			req.user = user;
			next(); 
		})
		.catch((err) => {
			res.status(400)
			.json({ message : 'Error, usuario no encontrado' });
		})
		
	})
}


module.exports = {
	authAdmin: authRole(ROLE.ADMIN),
	authUser: authRole(ROLE.USER),
	authenticateToken
}
