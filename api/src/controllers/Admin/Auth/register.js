require('dotenv').config();
const User = require('../../../models/Users/User');
const { SALT_ROUNDS, TOKEN_SECRET } = process.env;
const signJWT = require('../../../utils/signJWT');

module.exports = (req, res, next) => {
    const { name, email, password } = req.body;
    User.hashPassword(password, Number(SALT_ROUNDS)).then((hashed) => {
        User.create({
            ...req.body,
            password : hashed,
            role: undefined,
            verified: false
        }, (err, user) => {
            if (err) {
                return res.status(400).send('Ese usuario ya existe!');
            }
            signJWT(user._id).then((token) => {
                const { password, ...userProps } = user._doc;
                return res.json({...userProps, token});
            }).catch((err) => {
                console.error(err);
                return res.sendStatus(500);
            })
        })
    })

}