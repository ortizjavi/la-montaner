const Category = require('../../../models/Category');

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
