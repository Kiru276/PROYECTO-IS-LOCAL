"use strict";

const Joi = require("joi");

const reserveSchema = Joi.object({
    fechaReserva: Joi.date()
        .required()
        .min("now")
        .max(new Date(new Date().setFullYear(new Date().getFullYear() + 1)))
        .messages({
            "any.required": "La fecha y hora de reserva son obligatorias.",
            "date.base": "La fecha y hora de reserva deben ser una fecha válida.",
            "date.min": "La fecha y hora de reserva no puede ser anterior a la fecha actual.",
            "date.max": "La fecha y hora de reserva no puede ser posterior a un año a partir de la fecha actual.",
            
        }),

    
    horaReserva: Joi.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
        .required()
        .messages({
            "string.empty": "La hora no puede ser un campo vacío",
            "string.pattern.base": "La hora de reserva debe tener un formato de hora válido, por ejemplo: 16:00 o 9:00.",
        }),

    solicitanteId: Joi.string()
        .required()
        .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
        .messages({
            "string.empty": "El ID de la postulacion no puede estar vacío.",
            "any.required": "El ID de la postulacion es obligatorio.",
            "string.base": "El ID de la postulacion debe ser de tipo string.",
            "string.pattern.base": "El ID de la postulacion otorgada no es valido.",
        }),

});


const reserveIdSchema = Joi.object({
    reserveId: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
        "string.empty": "El ID del examen no puede estar vacío.",
        "any.required": "El ID del examen es obligatorio.",
        "string.base": "El ID del examen debe ser de tipo string.",
        "string.pattern.base": "El ID del examen otorgado no es válido.",
    }),
});


const solicitanteIdSchema = Joi.object({
    solicitanteId: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
        "string.empty": "El ID del examen no puede estar vacío.",
        "any.required": "El ID del examen es obligatorio.",
        "string.base": "El ID del examen debe ser de tipo string.",
        "string.pattern.base": "El ID del examen otorgado no es válido.",
    }),
});

module.exports = {
    reserveSchema,
    reserveIdSchema,
    solicitanteIdSchema,
};
