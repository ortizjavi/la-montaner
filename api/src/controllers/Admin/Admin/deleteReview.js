const Product = require('../../../models/Product');
const Users = require('../../../models/Users/User');


module.exports = async (req, res, next) => {
    try{
    
    const { content, id, calification, idUsuario } = req.body;
    console.log(req.body);
    
    const findUser = await Users.findOne(req.user._id);

    const review = { name: req.user.name, content, calification, idUsuario};
    console.log('datos review ', review);

    const removeReview = await Product.findByIdAndDelete(id, {
        $pull: { reviews: review },
     });

    res.send('Review eliminada correctamente');

    } catch (e) {
        res.status(404).send({msg: 'error, no se pudo eliminar la review'});
    }
}