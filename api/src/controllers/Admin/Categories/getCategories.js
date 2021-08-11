const Category = require('../../../models/Category');

module.exports = (req, res) => {
	Category.find({}).then(Categories => {
	    return res.json(Categories);
	});
}