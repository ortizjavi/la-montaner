require('dotenv').config();
// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token: process.env.MP_TOKEN,
});

module.exports = (cartItems) => {
  return new Promise(async (resolve, reject) => {
    try {
      let preference = {
        back_urls: {
          success: "https://la-montaner.vercel.app/home/pay/success",
          failure: "https://la-montaner.vercel.app/home/pay/failure",
          pending: "https://la-montaner.vercel.app/home/pay/pending",
        },
        auto_return: "approved", 
        items: []   
      };

      for(let i=0; i<cartItems.length; i++){
        let title = cartItems[i].name;
        let unit_price = cartItems[i].price;
        let cantidad = parseInt(cartItems[i].stockSelected);
        let quantity = cantidad;
        preference.items.push({title, unit_price,quantity})
      }
      const wii = await mercadopago.preferences.create(preference);
      resolve(wii);
    } catch (err) {
      reject(err);
    }
  });
}
