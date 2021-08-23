const crypto = require('crypto');

const randomCode = () => {
    return crypto.randomBytes(8).toString('hex')
}






module.exports = {
    randomCode
    }