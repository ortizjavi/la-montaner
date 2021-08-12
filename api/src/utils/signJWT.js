require('dotenv').config()
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;

module.exports = (_id) => {
	return new Promise((resolve, reject) => {
		jwt.sign({ //create jwt token
			_id
		}, TOKEN_SECRET
		, { expiresIn: '12h' }
		, function(err, token){
			console.error(err);
			if (err) return reject(err);
			resolve(token);
		});
	})
}
