const Sale = require("../../../models/Sales");

module.exports = {
    createSale: async (req, res, next) => {
  const sale = new Sale(req.body);
  //date, porcentaje, precio base

  try {
    const saleSave = await sale.save();

    res.json({
      ok: true,
      sale: saleSave,
    });
  } catch (error) {
    console.log(error);
    res.json({
      ok: false,
    });
  }
},
getSales: async (req, res) => {
    try {
        const sales = await Sale.find();
        res.json(sales)
    } catch (error) {
        console.log(error)
    }
},
}
