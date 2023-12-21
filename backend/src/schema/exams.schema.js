"use strict";

const Joi = require('joi');

const examsSchema = Joi.object({
    tipoExamen: Joi.string()
        .valid('Psicotécnico', 'Oftalmológico', 'Práctico', 'Teórico')
        .required()
        .messages({
            'string.empty': 'El tipo de examen no puede estar vacío.',
            'any.required': 'El tipo de examen es obligatorio.',
            'string.base': 'El tipo de examen debe ser de tipo string.',
            'any.only': 'El tipo de examen proporcionado no es válido.',
        }),
    estado: Joi.string()
        .valid('Pendiente', 'Aceptado', 'Rechazado')
        .default('Pendiente')
        .messages({
            'string.empty': 'El estado no puede estar vacío.',
            'string.base': 'El estado debe ser de tipo string.',
            'any.only': 'El estado proporcionado no es válido.',
        }),
    PostulationId: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            'string.empty': 'El ID de la postulación no puede estar vacío.',
            'any.required': 'El ID de la postulación es obligatorio.',
            'string.base': 'El ID de la postulación debe ser de tipo string.',
            'string.pattern.base': 'El ID de la postulación otorgado no es válido.',
        }),

        Puntaje: Joi.number().min(0).max(100).messages({
            'number.base': 'El puntaje debe ser un número.',
            'number.min': 'El puntaje debe ser mayor o igual a 0.',
            'number.max': 'El puntaje debe ser menor o igual a 100.'
        }),
        

        fechaHoraReserva: Joi.date()
        .required()
        .min('now')
        .messages({
            'date.base': 'La fecha y hora de reserva deben ser una fecha válida.',
            'date.min': 'La fecha y hora de reserva no deben ser anteriores a la fecha actual.',
            'any.required': 'La fecha y hora de reserva son obligatorias.',
        }),
    
    Comment: Joi.string(),
});

const estadoSchema = Joi.string()
    .valid('Pendiente', 'Aceptado', 'Rechazado')
    .default('Pendiente')
    .messages({
        'string.empty': 'El estado no puede estar vacío.',
        'string.base': 'El estado debe ser de tipo string.',
        'any.only': 'El estado proporcionado no es válido.',
    });

    const examIdSchema = Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
        'string.empty': 'El ID del examen no puede estar vacío.',
        'any.required': 'El ID del examen es obligatorio.',
        'string.base': 'El ID del examen debe ser de tipo string.',
        'string.pattern.base': 'El ID del examen otorgado no es válido.',
    });


module.exports = {
    examsSchema,
    estadoSchema,
    examIdSchema,
};

