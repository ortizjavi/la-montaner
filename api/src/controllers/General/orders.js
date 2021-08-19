const mercadopago = require('../../utils/mercadopago');
const Order = require("../../models/Orders");
const User = require("../../models/Users/User");

module.exports = {
    createOrder: async (req, res) => {
        const { cart, user } = req.body

        //products, user, status(creado por default)
        try {
            const mpResponse = await mercadopago(cart);
            const order = new Order({ cart, user, mp_preference: mpResponse.body.id });
            const saveOrder = await order.save();
            const { mp_preference, ...orderProps } = saveOrder._doc;
            await User.findByIdAndUpdate(user,
                { $push: { 'orders': saveOrder._id } }
            )
            res.json({
                ok: true,
                order: orderProps,
                mp_link: mpResponse.response.init_point
            });
        } catch (error) {
            console.log(error)
            res.json({
                ok: false
            })
        }
    },

    getOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            res.json(orders)
        } catch (error) {
            console.log(error)
        }
    },
    updateOrders: async (req, res) => {
        const { id } = req.params;
        const update = { ...req.body }
        try {
            const newOrder = await Order.findByIdAndUpdate(id, update, { new: true })

            res.json({
                ok: true,
                orders: newOrder
            })
        } catch (error) {
            console.log(error)
            res.json({ ok: false })
        }

    }
};
