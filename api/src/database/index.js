const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const basename = path.basename(__filename);

const modelDefiners = [];

mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            keepAlive: true, 
            keepAliveInitialDelay: 300000 
}).then(() => {
    // Leemos todos los archivos de la carpeta Models, 
    // los requerimos y agregamos al arreglo modelDefiners
    fs.readdirSync(path.join(__dirname, '../models'))
      .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
      .forEach((file) => {
        modelDefiners.push(require(path.join(__dirname, '../models', file)));
      });

    // Injectamos los schemas a la conexion de mongoose, creando también los modelos
    modelDefiners.forEach(model => mongoose.connection.model(model[0], model[1]));
    // Capitalizamos los nombres de los modelos ie: product => Product
    let entries = Object.entries(mongoose.models);
    let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
    mongoose.models = Object.fromEntries(capsEntries);
}).catch((error) => {
    console.error(error);
})



module.exports = {
    ...mongoose.models,
    conn: mongoose.connection
}