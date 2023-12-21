/* eslint-disable arrow-parens */
/* eslint-disable max-len */
/* eslint-disable no-console */
const PostulationService = require("../services/postulation.service");
const { postulationIdSchema, tipoDocumentoSchema } = require("../schema/postulation.schema");
const { archivoSchema } = require("../schema/archive.schema");
const TYPES = require("../constants/typesPostulations.constants");

exports.getAllPostulations = async function(req, res) {
    try {
        const postulations = await PostulationService.getAllPostulations();
        return res.status(200).json(postulations);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getPendingPostulations = async function(req, res) {
    try {
        const postulations = await PostulationService.getPendingPostulations();
        return res.status(200).json(postulations);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getProcessedPostulations = async function(req, res) {
    try {
        const postulations = await PostulationService.getProcessedPostulations();
        return res.status(200).json(postulations);
    } catch (error) {
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};


exports.getPostulationSpecific = async function(req, res) {
    const postId = req.params.postId;
    try {
        await postulationIdSchema.validateAsync({ postId });
        const data = await PostulationService.getPostulationAndApplicantData(postId);
        if (!data) {
            return res.status(404).json({ error: "Postulacion no existente." });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.setNuevoDocumento = async function(req, res) {
    try {
        const { postId, tipoDocumento } = req.body;
        if (!req.file) {
            return res.status(400).json({ error: "Debes subir un documento para continuar." });
        }
        const archivo = {
            buffer: req.file.buffer,
            mimetype: req.file.mimetype,
        };
        await postulationIdSchema.validateAsync({ postId });
        await tipoDocumentoSchema.validateAsync(tipoDocumento);
        await archivoSchema.validateAsync(archivo);
        const result = await PostulationService.uploadDocumento(postId, tipoDocumento, archivo);

        return res.status(200).json({ message: `${tipoDocumento} guardado exitosamente`, result });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.getDocumento = async function(req, res) {
    try {
        const postId = req.params.postId;
        const tipoDocumento = req.params.tipoDocumento;
        await postulationIdSchema.validateAsync({ postId });
        await tipoDocumentoSchema.validateAsync(tipoDocumento);
        
        const documentoRequerido = await PostulationService.getDocumento(postId, tipoDocumento);
    
        if (documentoRequerido) {
            res.setHeader("Content-Type", documentoRequerido.contentType);
            return res.status(200).send(documentoRequerido.data);
        } else {
            return res.status(404).json({ message: "Documento ingresado no existente" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createPostulation = async function(req, res) {
    try {
        const { solicitanteId } = req.body;
        const fechaHoraReserva = new Date();
        fechaHoraReserva.setUTCHours(fechaHoraReserva.getUTCHours() - 3);

        const existingPendingPostulation = await PostulationService.getPendingPostulationByUser(solicitanteId);

        if (existingPendingPostulation) {
            return res.status(409).json({ error: "Ya tienes una postulación pendiente. No puedes crear una nueva." });
        }
        
        const data = {
            fechaHoraReserva,
            solicitanteId,
        };
        
        for (const field of TYPES) {
            if (!req.files[field] || req.files[field].length === 0) {
                // Devuelve una respuesta de error
                return res.status(400).json({ error: "Debes subir los cuatro documentos para continuar." });
            }
            const archivoActual = req.files[field][0];
            const validationResult = archivoSchema.validate({
                buffer: archivoActual.buffer,
                mimetype: archivoActual.mimetype,
            });

            if (validationResult.error) {
                return res.status(400).json({ error: "El documento " + field +" no es formato PDF." });
            }

            data[field] = archivoActual;
        }
        
        const savedPostulation = await PostulationService.createPostulationWithFiles(data);

        return res.status(201).json({ message: "Postulación creada exitosamente", postulation: savedPostulation });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
