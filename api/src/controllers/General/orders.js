const Order= require ("../../models/Orders");
const Cart = require("../../models/Cart");

module.exports = {
    createOrder: async (req, res) => {
    const order = new Order(req.body);
    //products, user, status(creado por default)
    try {
        const saveOrder = await order.save();

        res.json({
            ok: true,
            order: saveOrder
        });
    } catch (error) {
        console.log(error)
        res.json({
            ok: false
        })
    }
    },

    createCart: async(req, res) => {
        const cart = new Cart(req.body);
        //[{producto1}{producto2}], [cant1, cant2]

        try {
            const saveCart = await cart.save();

            res.json({
                ok: true,
                cart: saveCart
            })
        } catch (error) {
            console.log(error);
            res.json({
                ok: false
            })
        }
    }
}