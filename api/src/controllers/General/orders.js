const Order= require ("../../models/Orders");

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

    getOrders: async (req, res) => {
        try {
            const orders = await Order.find();
            res.json(orders)
        } catch (error) {
            console.log(error)
        }
    }
}