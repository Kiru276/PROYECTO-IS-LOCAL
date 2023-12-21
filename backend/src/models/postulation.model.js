/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

const { Schema } = mongoose;

// Crea el esquema de la coleccion 'roles'
const postulationSchema = new mongoose.Schema(
    {
        fechaHoraReserva: {
            type: Date,
            required: true,
        },
        estadoReserva: {
            type: String,
            enum: ["Pendiente", "Aceptado", "Rechazado"],
            default: "Pendiente",
            required: false,
        },
        certificadoEgreso: {
            data: Buffer,
            contentType: { type: String, required: false },
        },
        antecedentesPenales: {
            data: Buffer,
            contentType: { type: String, required: false },
        },
        carnet: {
            data: Buffer,
            contentType: { type: String, required: false },
        },
        certificadoResidencia: {
            data: Buffer,
            contentType: { type: String, required: false },
        },
        solicitanteId: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: false,
        },
        examen: [{
            type: Schema.Types.ObjectId,
            ref: "Exams",
            required: false,
        }],
    },
    { collection: "postulation" },
);

postulationSchema.pre("save", async function(next) {
    try {
        const Exam = mongoose.model("Exams");
        const tiposExamen = ["Psicotécnico", "Oftalmológico", "Teórico", "Práctico"];

      // Verificamos si ya existen exámenes asociados a esta postulación
        const existingExams = await Exam.find({ PostulationId: this._id });

      // Creamos manualmente los exámenes que aún no existen
        const examsToCreate = tiposExamen.filter((tipo) => !existingExams.some((exam) => exam.tipoExamen === tipo));
        const newExams = examsToCreate.map((tipo) => new Exam({
            tipoExamen: tipo,
            estado: "Pendiente",
            PostulationId: this._id,
            fechaHoraReserva: this.fechaHoraReserva,
        }));

      // Guardamos los nuevos exámenes y almacenamos sus IDs en el array examen
        for (const exam of newExams) {
            await exam.save();
            this.examen.push(exam._id);
        }

        next();
        } catch (error) {
        next(error);
    }
});


// Crea el modelo de datos 'Postulation' a partir del esquema 'roleSchema'
const Postulation = mongoose.model("Postulation", postulationSchema);

module.exports = Postulation;
