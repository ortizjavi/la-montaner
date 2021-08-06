const mongoose = require('mongoose');
const Category = require('../../../models/Category');
const Product = require('../../../models/Product');
const GroupedProducts = require('../../../models/GroupedProducts');

module.exports = {
  deleteCategories: (req, res) => {
  	const { _id, name } = req.body;
  		Category.findByIdAndDelete({ _id }).then((response) => {
	  		Product.updateMany({ 'categories.name' : name }, 
	  			{ $pull : { 'categories' : { _id, name } } })
	  		.then(response => {
	  			res.json({ _id : _id });
	    	});
  		})
  }
}
