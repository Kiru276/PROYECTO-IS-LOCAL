const Exams = require("../models/exams.model");
const { examsSchema, estadoSchema, examIdSchema } = require("../schema/exams.schema");
const mailer = require("../controllers/mailer.controller");

exports.getAllExams = async function(req, res) {
    try {
        const exams = await Exams.find();
        res.status(200).json({ status: 'success', data: exams });
    } catch (error) {
        console.error("Error al obtener los exámenes:", error.message);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getExamById = async function(req, res) {
    try {
        const exam = await Exams.findById(req.params.examId);
        res.status(200).json({ status: 'success', data: exam });
    } catch (error) {
        console.error("Error al obtener el examen:", error.message);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.getExamByPostulationId = async function(req, res) {
    try {
        const exam = await Exams.findOne({ PostulationId: req.params.postulationId });
        res.status(200).json({ status: 'success', data: exam });
    } catch (error) {
        console.error("Error al obtener el examen:", error.message);
        res.status(500).json({ status: 'error', message: error.message });
    }
};


exports.createExam = async function(req, res) {
    try {
        const examData = req.body;
        console.log("Datos del examen a crear:", examData);

        // Validar los datos con Joi
        const { error } = examsSchema.validate(examData);
        if (error) {
            console.error("Error en la validación:", error.message);
            return res.status(400).send(error.message);
        }

        const exam = new Exams(examData);
        const examCreated = await exam.save();
        mailer.sendMailType3(examCreated)
        res.status(201).json(examCreated);
    } catch (error) {
        console.error("Error al crear el examen:", error.message);
        res.status(500).send("Error al crear el examen");
    }
};


exports.updateExam = async function(req, res) {
    try {
        const examId = req.params.examId;
        console.log("Id del examen a actualizar:", examId);

        // Validar el examId con Joi
        const { error: errorExamId } = examIdSchema.validate(examId);
        if (errorExamId) {
            console.error("Error en la validación del examId:", errorExamId.message);
            return res.status(400).send(errorExamId.message);
        }

        const estado = req.body.estado;


        // Validar los datos con Joi
        const { error: errorEstado } = estadoSchema.validate(estado);
        if (errorEstado) {
            console.error("Error en la validación del estado:", errorEstado.message);
            return res.status(400).send(errorEstado.message);
        }



        const examUpdated = await Exams.findByIdAndUpdate(examId, { estado: estado });
    
        res.status(200).json(examUpdated);
        mailer.sendMailType2(examUpdated, estado)
    } catch (error) {
        console.error("Error al actualizar el examen:", error.message);
        res.status(500).send("Error al actualizar el examen");
    }
};



