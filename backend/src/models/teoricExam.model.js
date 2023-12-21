const mongoose = require('mongoose');

const TeoricExam = new mongoose.Schema({
    pregunta: {
        type: String,
        required: true
    },
    opciones: {
        type: [String],
        required: true
    },
    respuestaCorrecta: {
        type: String,
        required: true
    }
}, { collection: 'TeoricExam' });

module.exports = mongoose.model('TeoricExam', TeoricExam);
