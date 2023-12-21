const TeoricExam = require('../models/teoricExam.model');

exports.getAllTeoricExams = async function(req, res) {
    try {
        const teoricExams = await TeoricExam.find();
        return res.status(200).json(teoricExams);
    } catch (error) {
        console.error("Error al obtener las postulaciones:", error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}