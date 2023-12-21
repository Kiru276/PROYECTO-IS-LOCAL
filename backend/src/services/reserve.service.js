/* eslint-disable spaced-comment */
/* eslint-disable max-len */

"use strict";

const Reserve = require("../models/reserve.model");
const User = require("../models/user.model");

const ReserveService = {
    getAllReserves: async () => {
        try {
            return await Reserve.find().populate("solicitanteId");
        } catch (error) {
            throw new Error(`Error al obtener las reservas: ${error.message}`);
        }
    },

    getAllReservesByUserId: async (userId) => {
        try {
            // Realiza la consulta a la base de datos filtrando por el ID de usuario
            const reserves = await Reserve.find({ solicitanteId: userId }).populate("solicitanteId");
            if (reserves.length === 0) {
                return null;
            }
            return reserves;
        } catch (error) {
            throw new Error(`Error al obtener las reservas por ID de usuario: ${error.message}`);
        }
    },
    
    getAllReservesByUserRut: async (rut) => {
        try {
            const user = await User.findOne({ rut: rut });
            //Comprobacion clave para status 404
            if (!user) {
                return null;
            }

            const reserves = await Reserve.find({ solicitanteId: user._id });

            return reserves;
        } catch (error) {
            throw new Error(`Error al obtener las reservas por el rut del usuario: ${error.message}`);
        }
    },
    

    createReserve: async (data) => {
        try {
            const newReserve = new Reserve(data);

            // Guarda la nueva reserva en la base de datos
            const savedReserve = await newReserve.save();

            return savedReserve;
        } catch (error) {
            throw new Error(`Error al crear una nueva reserva: ${error.message}`);
        }
    },

    // Servicio para eliminar una reserva
    deleteReserve: async (reserveId) => {
        try {
            // Utiliza el modelo de reserva para buscar y eliminar la reserva por su ID
            const deletedReserve = await Reserve.findByIdAndDelete(reserveId);

            // Verifica si la reserva se eliminó correctamente
            if (!deletedReserve) {
                throw new Error("Reserva no encontrada");
            }

            return deletedReserve;
        } catch (error) {
            throw new Error(`Error al eliminar la reserva: ${error.message}`);
        }
    },

};

module.exports = ReserveService;

