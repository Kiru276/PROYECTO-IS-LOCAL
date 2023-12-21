"use strict";
const mongoose = require("mongoose");

const { Schema } = mongoose;

const reserveSchema = new mongoose.Schema(
    {
        fechaReserva: {
            type: Date,
            required: true,
        },
        horaReserva: {
            type: String,
            required: true,
        },
        tipoPrueba: {
            type: String,
            enum: ["Teorico", "Psicotecnico", "Oftalmologico", "Practico"],
            required: true,
        },
        solicitanteId: {
            type: Schema.Types.ObjectId,
            ref: "Users",
            required: true,
        },
        examen: [{
            type: Schema.Types.ObjectId,
            ref: "Exams",
            required: false,
        }],
    },
    { collection: "reserve" },
);
const Reserve = mongoose.model("Reserve", reserveSchema);

module.exports = Reserve;
