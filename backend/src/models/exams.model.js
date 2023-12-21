const mongoose = require("mongoose");
    
const { Schema } = mongoose;

const examsSchema = new mongoose.Schema(
    {
        tipoExamen: {
            type: String,
            enum: ["Psicotécnico", "Oftalmológico", "Práctico", "Teórico"],
            required: true,
        },
        estado: {
            type: String,
            enum: ["Pendiente", "Aceptado", "Rechazado"],
            default: "Pendiente",
            required: false,
        },
        PostulationId: {
            type: Schema.Types.ObjectId,
            ref: "postulation",
            required: true,
        },
        Puntaje: {
            type: Number,
            required: false,
        },

        fechaHoraReserva: {
            type: Date,
            required: true,
        },
        Comment: {
            type: String,
            required: false,
        },
    },
    { collection: "exams" },
);

const Exams = mongoose.model("Exams", examsSchema);
module.exports = Exams;