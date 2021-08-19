const sendEmail = require('../../utils/sendMail')



module.exports = {
    confirmationMail: async (req, res, next) => {
        sendEmail.sendFormEmail('ortizjavier160994@gmail.com', 'Javier')
            .catch(e => {
                console.log(e)
            })
    }
}