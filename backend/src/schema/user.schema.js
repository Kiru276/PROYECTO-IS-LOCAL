"use strict";

const Joi = require("joi");
const ROLES = require("../constants/roles.constants");

/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */
const userBodySchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "El nombre de usuario no puede estar vacío.",
    "any.required": "El nombre de usuario es obligatorio.",
    "string.base": "El nombre de usuario debe ser de tipo string.",
  }),
  password: Joi.string().required().min(5).messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "any.required": "La contraseña es obligatoria.",
    "string.base": "La contraseña debe ser de tipo string.",
    "string.min": "La contraseña debe tener al menos 5 caracteres.",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "El email no puede estar vacío.",
    "any.required": "El email es obligatorio.",
    "string.base": "El email debe ser de tipo string.",
    "string.email": "El email debe tener un formato válido.",
  }),
  roles: Joi.array()
    .items(Joi.string().valid(...ROLES))
    .required()
    .messages({
      "array.base": "El rol debe ser de tipo array.",
      "any.required": "El rol es obligatorio.",
      "string.base": "El rol debe ser de tipo string.",
      "any.only": "El rol proporcionado no es válido.",
    }),
  nombre: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "any.required": "El nombre es obligatorio.",
    "string.base": "El nombre debe ser de tipo string.",
  }),
  apellido: Joi.string().required().messages({
    "string.empty": "El apellido no puede estar vacío.",
    "any.required": "El apellido es obligatorio.",
    "string.base": "El apellido debe ser de tipo string.",
  }),
  direccion: Joi.string().required().messages({
    "string.empty": "La direccion no puede estar vacío.",
    "any.required": "La direccion es obligatorio.",
    "string.base": "La direccion debe ser de tipo string.",
  }),
  telefono: Joi.string().required().min(9).max(9).messages({
    "string.empty": "El numero no puede estar vacío.",
    "any.required": "El numero es obligatorio.",
    "string.base": "El numero debe ser de tipo string.",
  }),
  rut: Joi.string().required().min(9).max(9).messages({
    "string.empty": "El rut no puede estar vacío.",
    "any.required": "El rut es obligatorio.",
    "string.base": "El rut debe ser de tipo string.",
    "string.min": "La contraseña debe tener 9 caracteres.",
    "string.max": "La contraseña debe tener 9 caracteres.",
  }),
  nacimiento: Joi.date().required().min(new Date("1995-01-01")).messages({
    "date.empty": "La fecha de nacimiento no puede estar vacía.",
    "any.required": "La fecha de nacimiento es obligatoria.",
    "date.invalid": "La fecha de nacimiento no es válida.",
    "date.min": "La fecha de nacimiento debe ser mayor de 18 años.",
  }),
  newPassword: Joi.string().min(5).messages({
    "string.empty": "La contraseña no puede estar vacía.",
    "string.base": "La contraseña debe ser de tipo string.",
    "string.min": "La contraseña debe tener al menos 5 caracteres.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de usuario.
 * @constant {Object}
 */
const userIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

const userRutSchema = Joi.object({
  rut: Joi.string()
    .required()
    .min(9)
    .max(9)
    .custom((value, helpers) => {
      // Verificar que los primeros 8 caracteres no tengan letras ni caracteres especiales
      const firstEightChars = value.slice(0, 8);
      const lastChar = value.slice(-1).toUpperCase(); // Convertir a mayúscula para permitir "K" o "k"

      if (!/^[0-9]+$/.test(firstEightChars)) {
        return helpers.error('string.rutInvalidChars');
      }

      // Verificar que el último carácter sea "K" o un número
      if (!/^[0-9Kk]+$/.test(lastChar)) {
        return helpers.error('string.rutInvalidLastChar');
      }

      return value;
    })
    .messages({
      "string.empty": "El rut no puede estar vacío.",
      "any.required": "El rut es obligatorio.",
      "string.base": "El rut debe ser de tipo string.",
      "string.min": "El rut debe tener 9 caracteres.",
      "string.max": "El rut debe tener 9 caracteres.",
      "string.rutInvalidChars": "Los primeros 8 caracteres del rut no pueden contener letras ni caracteres especiales.",
      "string.rutInvalidLastChar": "El último carácter del rut debe ser 'K' o un número.",
    }),

});

module.exports = { userBodySchema, userIdSchema, userRutSchema };
