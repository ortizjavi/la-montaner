// SDK de Mercado Pago
const mercadopago = require("mercadopago");
// Agrega credenciales
mercadopago.configure({
  access_token:
    "TEST-7665548571999255-081017-8db4487dcda48e5cc676f0d587b05af6-13063487",
});

module.exports = {
  payProducts: async (req, res) => {
    try {
      let preference = {
        items: [
          {
            title: req.body.name,
            unit_price: req.body.price,
            quantity: 8,
          },
        ],
      };
      console.log("ahi voy");
      const wii = await mercadopago.preferences.create(preference);
      console.log(wii);
    } catch (err) {
      console.log(err);
    }

    /* const ids = req.body;
    const productsCopy = await repository.read();

    let preference = {
      items: ["producto"],
      back_urls: {
        success: "http://localhost:3000/feedback",
        failure: "http://localhost:3000/feedback",
        pending: "http://localhost:3000/feedback",
      },
      auto_return: "approved",
    };

    let error = false;
    ids.forEach((id) => {
      const product = productsCopy.find((p) => p.id === id);
      if (product.stock > 0) {
        product.stock--;
        preference.items.push({
          title: product.name,
          unit_price: product.price,
          quantity: 1,
        });
      } else {
        error = true;
      }
    });

    if (error) {
      res.send("Sin stock").statusCode(400);
    } else {
      const response = await mercadopago.preferences.create(preference);
      const preferenceId = response.body.id;
      await repository.write(productsCopy);
      res.send({ preferenceId });
    }*/
  },
};
