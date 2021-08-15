require('dotenv').config()
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

module.exports = (token) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			token,
			TOKEN_SECRET,
			function(err, user){
				console.error(err);
				if (err) return reject(err);
				resolve(user);
			}
		);
	})
}
