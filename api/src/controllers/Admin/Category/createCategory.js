<<<<<<< Updated upstream:api/src/controllers/Admin/Category/createCategory.js
const Category = require('../../../models/Category');
=======
const  Category  = require('../models/Category');
const  GroupedProducts  = require('../models/GroupedProducts');
>>>>>>> Stashed changes:api/src/controllers/categories.js

module.exports = {
  createCategory: (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(404).send('Debes ingresar Nombre');
    }
    const newCategory = new Category({ name });
    newCategory.save(function (err) {
        if (err) return res.status(400).json(err);
        res.json(newCategory);
    });
  }
}


const createGroup = (req, res, next) => {
   const newGroup = new GroupedProducts(req.body);
   console.log(newGroup)
   res.send('Ok')
}
