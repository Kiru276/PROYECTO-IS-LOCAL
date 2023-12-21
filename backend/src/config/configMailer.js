// mailer.js
const nodemailer = require('nodemailer');

user = process.env.MailserUser;
pass = process.env.MailserPass;



// Crea un objeto de configuración del transportador
const mailConfig = {
  host: 'smtp.gmail.com', // servidor SMTP de Gmail
  port: 465, // puerto para conexiones seguras
  secure: true, // usa SSL
  auth: {
    user: user, // tu dirección de Gmail
    pass: pass // tu contraseña de Gmail
  }
};

// Crea un transportador usando la configuración
const transporter = nodemailer.createTransport(mailConfig);

// Exporta el transportador como un módulo CommonJS
module.exports = { transporter };
