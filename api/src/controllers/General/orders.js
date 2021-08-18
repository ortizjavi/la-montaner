const Order = require("../../models/Orders");

module.exports = {
  createOrder: async (req, res) => {
    const order = new Order(req.body);
    //products, user, status(creado por default)
    try {
      const saveOrder = await order.save();

      res.json({
        ok: true,
        order: saveOrder,
      });
    } catch (error) {
      console.log(error);
      res.json({
        ok: false,
      });
    }
  },

  getOrders: async (req, res) => {
    try {
      const orders = await Order.find().populate("user", "_id name picture");
      res.json(orders);
    } catch (error) {
      console.log(error);
    }
  },
  updateOrders: async (req, res) => {
    const { id } = req.params;
    const update = { ...req.body };
    try {
      const newOrder = await Order.findByIdAndUpdate(id, update, { new: true });
      res.json({
        ok: true,
        orders: newOrder,
      });
    } catch (error) {
      console.log(error);
      res.json({ ok: false });
    }
  },
};
