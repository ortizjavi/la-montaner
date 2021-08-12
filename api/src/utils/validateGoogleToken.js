require('dotenv').config();
const { CLIENT_ID } = process.env
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(CLIENT_ID);

module.exports = async function verify(token){
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
  });
  const payload = ticket.getPayload();
  return payload;
}