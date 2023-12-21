/* eslint-disable no-console */
/* eslint-disable max-len */
const Postulation = require("../models/postulation.model");
const Applicant = require("../models/user.model");
const TYPES = require("../constants/typesPostulations.constants");

const PostulationService = {

    getPendingPostulationByUser: async (userId) => {
        const pendingPostulation = await Postulation.findOne({
            solicitanteId: userId,
            estadoReserva: "Pendiente",
        });

        if (!pendingPostulation) {
            return null;
        }
    
        return pendingPostulation;
    },

    getAllPostulations: async () => {
        return await Postulation.find().populate("solicitanteId");
    },

    getPendingPostulations: async () => {
        return await Postulation.find({ estadoReserva: "Pendiente" }).populate("solicitanteId");
    },

    getProcessedPostulations: async () => {
        return await Postulation.find({ estadoReserva: { $in: ["Rechazado", "Aprobado"] } }).populate("solicitanteId");
    },

    getPostulationAndApplicantData: async (postId) => {
        const postulation = await Postulation.findOne({ _id: postId }).populate("solicitanteId").populate("examen");

        if (!postulation) {
            throw new Error("Postulación no encontrada");
        }

        const applicantId = postulation.solicitanteId;
        const applicant = await Applicant.findById(applicantId);
        
        if (!applicant) {
            throw new Error("Solicitante no encontrado");
        }

        return {
            postulation: postulation,
        };
    },

    procesarArchivo: async (postulation, archivo, tipoDocumento) => {
        // Procesa el archivo y devuelve un objeto con data y contentType
        return {
            data: Buffer.from(archivo.buffer),
            contentType: archivo.mimetype,
        };
    },

    uploadDocumento: async (postId, tipoDocumento, archivo) => {
        try {
            // Busca la postulación por ID
            const postulation = await Postulation.findById(postId);
            // Verifica si la postulación existe
            if (!postulation) {
                throw new Error("Postulación no encontrada");
            }

            // Verifica si el tipo de documento es válido
            if (!TYPES.includes(tipoDocumento)) {
                throw new Error(`Tipo de documento no válido: ${tipoDocumento}`);
            }

            // Procesa el archivo y actualiza la postulación
            const documentoProcesado = await PostulationService.procesarArchivo(postulation, archivo, tipoDocumento);
            postulation[tipoDocumento] = documentoProcesado;

            // Guarda la postulación actualizada en la base de datos
            await postulation.save();

            // Devuelve un mensaje de éxito
            return { message: `${tipoDocumento} guardado exitosamente` };
        } catch (error) {
            // Manejo de errores: log y lanzamiento de un error interno del servidor
            console.error(`Error al guardar ${tipoDocumento}:`, error.message);
            throw new Error("Error interno del servidor");
        }
    },

    getDocumento: async (postId, tipoDocumento) => {
        try {
            const postulation = await Postulation.findById(postId);
    
            if (!postulation) {
                throw new Error("Postulación no encontrada");
            }

            if (postulation[tipoDocumento]) {
                return {
                    data: postulation[tipoDocumento].data,
                    contentType: postulation[tipoDocumento].contentType,
                };
            } else {
                // Si no hay certificado, lanza un error
                throw new Error(`El documento solicitado (${tipoDocumento}) no existe`);
            }
        } catch (error) {
            throw new Error("Error interno del servidor");
        };
    },

    createPostulationWithFiles: async (data) => {
        try {
            const newPostulation = new Postulation(data);
            const savedPostulation = await newPostulation.save();
            const certificadoEgreso = data.certificadoEgreso;
            const antecedentesPenales = data.antecedentesPenales;
            const carnet = data.carnet;
            const certificadoResidencia = data.certificadoResidencia;
            console.log("llega efectivamente al service: " + certificadoResidencia);
            if (certificadoEgreso) {
                await PostulationService.uploadDocumento(savedPostulation._id, "certificadoEgreso", certificadoEgreso);
            }

            if (antecedentesPenales) {
                await PostulationService.uploadDocumento(savedPostulation._id, "antecedentesPenales", antecedentesPenales);
            }

            if (carnet) {
                await PostulationService.uploadDocumento(savedPostulation._id, "carnet", carnet);
            }

            if (certificadoResidencia) {
                await PostulationService.uploadDocumento(savedPostulation._id, "certificadoResidencia", certificadoResidencia);
            }

            return savedPostulation;
        } catch (error) {
            throw new Error("Error: " + error.message);
        }
    },
};

module.exports = PostulationService;
