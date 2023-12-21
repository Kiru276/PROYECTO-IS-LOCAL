const Joi = require("joi");

const archivoSchema = Joi.object({
    buffer: Joi.binary().required(),
    mimetype: Joi.string().required().valid("application/pdf").messages({
        "any.only": "El archivo debe ser de tipo PDF",
    }),
});

module.exports = {
    archivoSchema,
};
