const { transporter } = require('../config/configMailer');
const PostulationService = require("../services/postulation.service");

const mail = process.env.MailserUser;

const getPostulationAndApplicantData = async function(postId) {
    try {
      console.log("recibido: ", postId);
        const data = await PostulationService.getPostulationAndApplicantData(postId);
        return data;
    } catch (error) {
        console.error("Error al obtener datos:", error.message);
        throw new Error("Error interno del servidor");
    }
};

  const sendMailType1 = async (req, res) => {
    const postId = req.params.postId;
    const mensaje = req.body.mensaje;
    const data = await getPostulationAndApplicantData(postId);
    const { estadoReserva } = data.postulation;
    console.log(estadoReserva);
    const { nombre, 
            apellido,  
            email } = data.postulation.solicitanteId;

    let mailOptions = {
      from: mail,
      to: 'mathiasbr1137@gmail.com',
      subject: 'Asunto del correo 1',
      html: `<p>Hola ${nombre} ${apellido},</p>
             <p>Su postulacion se encuentra ${estadoReserva}:</p>
             <p><strong>${mensaje}</strong></p>`
    };
    
    sendMail(mailOptions, res);
}

const sendMailType2 = async (examUpdated, estado, req, res) => {

  console.log(examUpdated.PostulationId);

    const data = await getPostulationAndApplicantData(examUpdated.PostulationId);
    const { tipoExamen } = examUpdated;
    const { nombre, 
            apellido,  
            email } = data.postulation.solicitanteId;

    let mailOptions = {
      from: mail,
      to: 'mathiasbr1137@gmail.com',
      subject: 'Asunto del correo 2',
      html: `<p>Hola ${nombre} ${apellido},</p>
             <p>Su examen ${tipoExamen}, se ha cambiado a: ${estado}</p>`
    };
    
    sendMail(mailOptions, res);
}

const sendMailType3 = async (examCreated, req, res) => {
    const data = await getPostulationAndApplicantData(examCreated.PostulationId);
    const { estado, tipoExamen, fechaHoraReserva } = examCreated;
    const { nombre, 
      apellido,  
      email } = data.postulation.solicitanteId;

    let mailOptions = {
      from: mail,
      to: 'mathiasbr1137@gmail.com',
      subject: 'Asunto del correo 3',
      html: `<p>Hola ${nombre} ${apellido},</p>
             <p>Se ha creado el examen de tipo: ${tipoExamen}, para ser rendido el día: ${fechaHoraReserva}
             para más informacion visitar la página.</p>`
    };
    
    sendMail(mailOptions, res);
}


function sendMail(mailOptions, res) {
  transporter.sendMail(mailOptions, (error, info) => { // usa una función flecha como callback
      if (error) {
        console.log('Error al enviar el correo electrónico:', error);
        res.status(500).send('Error al enviar el correo electrónico');
      } else {
        console.log('Correo electrónico enviado correctamente:', info.response);
        res.status(200).send('Correo electrónico enviado correctamente');
      }
  });
}

module.exports = {sendMailType1, sendMailType2, sendMailType3 }; // exporta las funciones como un módulo CommonJS
