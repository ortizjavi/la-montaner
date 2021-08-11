const axios = require('axios');

module.exports = (token) => {
	return axios({
	    url: 'https://graph.facebook.com/me',
	    method: 'get',
	    params: {
	      fields: ['id', 'email', 'first_name', 'last_name', 'picture', 'name'].join(','),
	      access_token: token,
	    },
  	});
}
