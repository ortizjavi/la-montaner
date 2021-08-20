const Product = require('../../../models/Product');
const Users = require('../../../models/Users/User');

module.exports = async (req, res, next) => {
    try {
        const allReviews = await Product.find({})
        const { reviews } = allReviews;

        const filterReviews = allReviews.map(elem => elem.reviews);
        console.log(filterReviews);
        
        res.json(filterReviews);
    } catch (error) {
        console.log(error);
    }
}

