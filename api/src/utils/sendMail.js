require('dotenv').config();
const nodemailer = require('nodemailer');
const fs = require('fs');
const os = require('os');
const path = require('path');

const transport = nodemailer.createTransport({
	port: 587,
	host:  'smtp.gmail.com',
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD
	},
})

const sendEmail = {};

sendEmail.sendFormEmail = (email,name) => {
	return transport.sendMail({
		from: `La Montañes <${process.env.MAIL_USER}>`,
		to: email,
		subject: "Gracias por contactarte con La Montañes!",
		html: `<span> Hola ${name},</span>
			<p> Hemos recibido tu consulta y pronto nos pondremos en contacto contigo.</p>
		`,
	});	
}


sendEmail.processingOrder = (email, name, payment, shipping) => {
	return fs.readFile(path.resolve(__dirname, '../html/emailTemplate.html'), (err, data) => {
		data = data.toString();
		data = data.replace('{title}', `Hola ${name}, tu orden fue confirmada!`);
		data = data.replace('{paymentTitle}', `Pagaste $ ${payment.total}`);
		let shippingTitle, shippingAddress;
		if(shipping.delivery){
			shippingTitle = 'Envío a domicilio';
			shippingAddress = shipping.address;
		} else {
			shippingTitle = 'Retiro por local';
			shippingAddress = 'Dirección de Chicha';
		}
		data = data.replace('{paymentInfo}', `con ${payment.method}`);
		data = data.replace('{shippingTitle}', shippingTitle);
		data = data.replace('{shippingInfo}', `${shippingAddress}`);
		
		return transport.sendMail({
			from: `La Montañes <${process.env.MAIL_USER}>`,
			to: email,
			subject: `Gracias por tu compra!`,
			html: data
		})
	})
}

module.exports = sendEmail;