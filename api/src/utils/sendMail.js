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

let html_template = '', processTemplate = '', completedTemplate = '';
fs.readFile(path.resolve(__dirname, '../html/emailTemplate.html'), (err, data) => {
	html_template = data.toString();
	processTemplate = html_template.replace('<!-- ORDER_SUMMARY', '')
											.replace('ORDER_SUMMARY -->', '');
	completedTemplate = html_template.replace('<!-- COMPLETED_ORDER', '')
											.replace('COMPLETED_ORDER -->', '');
});


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
	let data = html_template;
	data = data.replace('{title}', `Hola ${name}, tu orden fue confirmada!`);
	let paymentTitle;
	if (payment.method === 'Efectivo'){
		paymentTitle = 'A pagar'
	} else {
		paymentTitle = 'Pagaste'
	}
	data = data.replace('{paymentTitle}', `${paymentTitle} $ ${payment.total}`);
	let shippingTitle, shippingAddress;
	if(shipping.delivery){
		shippingTitle = 'Envío a domicilio';
		shippingAddress = shipping.address;
	} else {
		shippingTitle = 'Retiro por local';
		shippingAddress = 'Dirección de Chicha';
	}
	data = data.replace('{paymentInfo}', `con ${payment.method}`);
	data = data.replace('{shippingTitle}', `${shippingTitle}`);
	data = data.replace('{shippingInfo}', `${shippingAddress}`);
	
	return transport.sendMail({
		from: `La Montañes <${process.env.MAIL_USER}>`,
		to: email,
		subject: `Gracias por tu compra!`,
		html: data
	})
}

sendEmail.completedOrder = (email, name, shipping) => {
	let data = completedTemplate;
	data = data.replace(/{title}/g, `Hola ${name}, tu orden fue actualizada!`);

	let shippingTitle, shippingAddress;
	if(shipping.delivery){
		data = data.replace('{deliveryMssg}', 'Tu birra está en camino 🍺');
		shippingTitle = 'Dirección de envío';
		shippingAddress = shipping.address;
	} else {
		data = data.replace('{deliveryMssg}', 'Tu birra te espera 🍺');
		shippingTitle = 'Retiro por local';
		shippingAddress = 'Dirección de Chicha';
	}
	data = data.replace(/{shippingTitle}/g, `${shippingTitle}`);
	data = data.replace(/{shippingInfo}/g, `${shippingAddress}`);

	return transport.sendMail({
		from: `La Montañes <${process.env.MAIL_USER}>`,
		to: email,
		subject: `Tu orden está lista!`,
		html: data
	})
}


sendEmail.passRecoveryEmail = (email,name, newPass) => {
	let data = html_template;
	data = data.replace('{title}', `Hola ${name}`);
	data = data.replace('{shippingTitle}', newPass);
	return transport.sendMail({
		from: `La Montañes <${process.env.MAIL_USER}>`,
		to: email,
		subject: "Gracias por contactarte con La Montañes!",
		html: data
	});	
}

module.exports = sendEmail;