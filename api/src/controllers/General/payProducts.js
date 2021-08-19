// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token:
    "TEST-7665548571999255-081017-8db4487dcda48e5cc676f0d587b05af6-13063487",
});
//Tabla de ordenes de compra

module.exports = {
  payProducts: async (req, res) => {
    const cartItems = req.body.compra;
    try {
      let preference = {
        back_urls: {
          success: "http://localhost:3000/home/pay/success",
          failure: "http://localhost:3000/home/pay/failure",
          pending: "http://localhost:3000/home/pay/pending",
        },
        auto_return: "approved",
        items: [],
      };

      for (let i = 0; i < cartItems.length; i++) {
        let title = cartItems[i].name;
        let unit_price = cartItems[i].price;
        let cantidad = parseInt(cartItems[i].stockSelected);
        let quantity = cantidad;
        preference.items.push({ title, unit_price, quantity });
      }
      const wii = await mercadopago.preferences.create(preference);
      res.json(wii);
    } catch (err) {
      console.log(err);
    }
  },
};
