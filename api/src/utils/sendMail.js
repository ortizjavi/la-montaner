require('dotenv').config();
const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
	port: 587,
	host:  'smtp.gmail.com',
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASSWORD
	},
	secure: true
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

sendEmail.emailNotification = (email,name, desc) => {
	return transport.sendMail({
		from: `La Montañes <${process.env.MAIL_USER}>`,
		to: process.env.MAIL_NOTIFIED,
		subject: `${name} se ha contactado por la web de La Montañes`,
		html: ` <span> Hola Chicha,</span>
			<p> Te dejamos los datos de la consulta envíada por la web: </p>
			<p>
				&nbsp;&nbsp;&nbsp;&nbsp; Nombre: ${name}
			<br>
				&nbsp;&nbsp;&nbsp;&nbsp; Correo: ${email}
			<br>
				&nbsp;&nbsp;&nbsp;&nbsp; Consulta: ${desc}
			</p>
		`,
	});	
}