require('dotenv').config();
const User = require('../../../models/Users/User');
const { passRecoveryEmail } = require('../../../utils/sendMail');
const { randomCode } = require('../../../utils/index')
const { SALT_ROUNDS } = process.env

module.exports = (req, res) => {
    const newPass = randomCode();
    const email = req.body.email;
    const name = req.body.name;
    console.log(req.body)
    User.findOne({ email }).orFail().then((user => {
        User.hashPassword(newPass, Number(SALT_ROUNDS))
            .then((hashed) => {
                User.updateOne(
                    user,
                    { $set: { password: hashed, reset: true } }

                ).then(() => {
                    passRecoveryEmail(email, user.name, newPass)
                }).then(() => {
                    res.sendStatus(200);
                });
            })

    })).catch((err) => {
        res.status(400).send('Invalid user')//user invalid
    })

}

