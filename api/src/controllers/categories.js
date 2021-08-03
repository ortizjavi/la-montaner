const { Category } = require('../models/');

const create = (req, res, next) => {
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

const get = (req, res, next) => {
    Category.find({}).then(Categories => {
        return res.json(Categories);
    })
}

module.exports = {
    create,
    get
}

