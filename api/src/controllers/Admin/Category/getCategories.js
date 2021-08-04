const Category = require('../../../models/Category');

module.exports = {
  getCategories: (req, res) => {
    Category.find({}).then(Categories => {
        return res.json(Categories);
    });
  }
}
