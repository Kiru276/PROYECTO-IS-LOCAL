// renewer.model.js
"use strict";
const mongoose = require("mongoose");
const { Schema } = mongoose;

const renewerSchema = new mongoose.Schema(
    {
        fechaPeticion: {
            type: Date,
            required: true,
        },
        estadoTramite: {
            type: String,
            enum: ["Pendiente", "Aceptado", "Rechazado"],
            default: "Pendiente",
            required: false,
        },
        antecedentesPenales: {
            data: Buffer,
            contentType: { type: String, required: true },
        },
        solicitanteId: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        examen: {
            type: Schema.Types.ObjectId,
            ref: "Exams",
            required: false,
        },
    },
    { collection: "renewer" },
);

renewerSchema.pre('save', async function (next) {
    try {
        const Exam = mongoose.model('Exams');
        const tiposExamen = ["Psicotécnico"];

        // Usamos Promise.all para esperar que todas las promesas se resuelvan
        const exams = await Promise.all(tiposExamen.map(async tipo => {
            return Exam.create({
                tipoExamen: tipo,
                estado: "Pendiente",
                PostulationId: this._id,
                fechaHoraReserva: this.fechaPeticion,
            });
        }));

        const examIds = exams.map(exam => exam._id);
        this.examen = examIds;
        next();
    } catch (error) {
        next(error);
    }
});

const Renewer = mongoose.model("Renewer", renewerSchema);

module.exports = Renewer;
