const server = require('./src/app');
const { conn }= require('./src/database');
require('dotenv').config();


// connection abierta
conn.once('open', () => {
  console.log('DB connected!');
  server.listen(process.env.PORT, () => {
    console.log(`%s listening at ${process.env.PORT}`); // eslint-disable-line no-console
  })
});

conn.on('error', (err) => {
    console.log('Failed to connect to database');
    process.exit(1);
})