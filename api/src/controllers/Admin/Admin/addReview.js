const Product = require('../../../models/Product');
const Users = require('../../../models/Users/User');

module.exports = async (req, res, next) => {
    try{
        
    const { content, id, calification, idUsuario } = req.body;
    
    const findUser = await Users.findOne(req.user._id);

    const review = { name: req.user.name, content: content, calification: calification, idUsuario: idUsuario};

    const addReview = await Product.findByIdAndUpdate(id, {
        $push: { reviews: review },
     });

     const addCalification = await Product.findByIdAndUpdate(id, {
        $push: { rating: calification },
     });

    res.send('Review agregada correctamente');

    } catch (e) {
        res.status(404).send({msg: 'error, no se pudo agregar la review'});
    }
}
