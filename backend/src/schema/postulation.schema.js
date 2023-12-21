"use strict";

const Joi = require("joi");
const TYPES = require("../constants/typesPostulations.constants");

const postulationIdSchema = Joi.object({
    postId: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
        "string.empty": "El ID de la postulacion no puede estar vacío.",
        "any.required": "El ID de la postulacion es obligatorio.",
        "string.base": "El ID de la postulacion debe ser de tipo string.",
        "string.pattern.base": "El ID de la postulacion otorgada no es valido.",
    }),
});

const tipoDocumentoSchema = Joi.string()
    .valid(...TYPES)
    .required()
    .messages({
        "string.empty": "El tipo de documento no puede estar vacío.",
        "any.required": "El tipo de documento es obligatorio.",
        "string.base": "El tipo de documento debe ser de tipo string.",
        "any.only": "El tipo de documento proporcionado no es válido.",
});

const archivoSchema = Joi.object({
    buffer: Joi.binary().required(),
    mimetype: Joi.string().required(),
});

module.exports = {
    postulationIdSchema,
    tipoDocumentoSchema,
    archivoSchema,
};
