const server = require('./src/app');
const { conn }= require('./src/database');
require('dotenv').config();
const {dbConnection} = require('./src/database/index')



dbConnection().then(() => {
  server.listen(process.env.PORT, () => {
  console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
})})

