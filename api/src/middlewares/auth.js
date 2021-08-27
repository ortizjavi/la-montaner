const User = require('../models/Users/User');
const ROLE = require('../models/Users/Role')
const verifyJWT = require('../utils/verifyJWT');

const getUserById = (id, populate ='') => {
	return User.findById(id).orFail().populate(populate);
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

const authenticateToken = (req, res, next) => {
	const auth = req.headers['authorization'];
	let token = auth && auth.split(' ')[1];
	if (!token){
		return res.sendStatus(401);
	}
	verifyJWT(token).then((user) => {
			// valid token, save user in request
			getUserById(user._id, req.populate)
			.then((user) => {
				req.user = user;
				if (user.reset) return res.status(420);
				next(); 
			})
			.catch((err) => {
				res.status(400)
				.json({ message : 'Error, usuario no encontrado' });
			})
		}
	).catch(err => {
		console.error(err);
		if (err) return res.sendStatus(403); // jwt expired
	})
}


module.exports = {
	authAdmin: authRole(ROLE.ADMIN),
	authUser: authRole(ROLE.USER),
	authenticateToken
}
