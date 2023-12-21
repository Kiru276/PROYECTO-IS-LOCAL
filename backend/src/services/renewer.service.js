/* eslint-disable no-console */
/* eslint-disable max-len */
// renewer.service.js
"use strict";
const Renewer = require("../models/renewer.model");
const Applicant = require("../models/user.model");

const RenewerService = {

    getPendingRenewerByUser: async (userId) => {
        const pendingRenewer = await Renewer.findOne({
            solicitanteId: userId,
            estadoTramite: "Pendiente",
        });

        if (!pendingRenewer) {
            return null;
        }
    
        return pendingRenewer;
    },

    getAllRenewers: async () => {
        return await Renewer.find().populate("solicitanteId");
    },
    getAllPending: async () => {
        try {
            const renewersPendientes = await Renewer.find({ estadoTramite: "Pendiente" })
                .populate("solicitanteId")
                .exec();
            return renewersPendientes;
        } catch (error) {
            throw error;
        }
    },
    getSpecificRenewer: async (postId) => {
        const renewer = await Renewer.findOne({ _id: postId }).populate("examen");

        if (!renewer) {
            throw new Error("Renovacion no encontrada");
        }

        const applicantId = renewer.solicitanteId;
        const applicant = await Applicant.findById(applicantId);
        
        if (!applicant) {
            throw new Error("Solicitante no encontrado");
        }

        return {
            renewer: renewer,
        };
    },
    getAllAccept: async () => {
        try {
            const renewersPendientes = await Renewer.find({ estadoTramite: "Aprobado" })
                .populate("solicitanteId")
                .exec();
            return renewersPendientes;
        } catch (error) {
            throw error;
        }
    },
    getAllRejected: async () => {
        try {
            const renewersPendientes = await Renewer.find({ estadoTramite: "Rechazado" })
                .populate("solicitanteId")
                .exec();
            return renewersPendientes;
        } catch (error) {
            throw error;
        }
    },

    procesarArchivo: async (postulation, archivo, tipoDocumento) => {
        // Procesa el archivo y devuelve un objeto con data y contentType
        return {
            data: Buffer.from(archivo.buffer),
            contentType: archivo.mimetype,
        };
    },

    createRenewalWithFiles: async (data) => {
        try {
            data.antecedentesPenales = {
            data: Buffer.from(data.antecedentesPenales.buffer),
            contentType: data.antecedentesPenales.mimetype,
            };
            
            const newRenewal = new Renewer(data);
            const savedRenewal = await newRenewal.save();

            return savedRenewal;
        } catch (error) {
            console.error("Error al crear la postulación:", error.message);
            throw new Error("Error interno del servidor");
        }
    },


};

module.exports = RenewerService;
