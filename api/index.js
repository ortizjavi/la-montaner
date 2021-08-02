const server = require('./src/app');
const {dbConnection}=require('./src/database/config')
require('dotenv').config();


// Syncing all the models at once.
dbConnection().then(() => {
  console.log('base de datos conectada!')
  server.listen(process.env.PORT, () => {
    console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
  });
});