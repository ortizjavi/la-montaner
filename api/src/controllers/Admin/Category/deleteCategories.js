const Category = require('../../../models/Category');
const Product = require('../../../models/Product');
const GroupedProducts = require('../../../models/GroupedProducts');

module.exports = {
  deleteCategories: (req, res) => {
  	const {id} = req.params;

  	Category.findByIdAndDelete({ _id: id }).then(() => {
  		Product.find({  categories:   { id }})
  		.then(response => {
  			console.log(response);
  			res.json({ _id : "123" });
    	});

  		/*Product.updateMany({  categories:   { _id: id }}, { $pull : {categories: {_id: id}} })
  		.then(response => {
  			console.log(response);
  			res.json({ _id : id });
    	});*/
  	})
  }
}
