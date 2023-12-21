/* eslint-disable max-len */
/* eslint-disable no-console */
const RenewerService = require("../services/renewer.service");
const { archivoSchema } = require("../schema/archive.schema");
const { postulationIdSchema, tipoDocumentoSchema } = require("../schema/postulation.schema");

exports.getAllRenewers = async function(req, res) {
    try {
        const renewers = await RenewerService.getAllRenewers();
        renewers.forEach((renewer) => {
        console.log(renewer);
        });
        return res.status(200).json(renewers);
    } catch (error) {
        console.error("Error al obtener las postulaciones:", error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.getSpecificRenewer = async function(req, res) {
    const postId = req.params.postId;
    try {
        console.log(postId)
        await postulationIdSchema.validateAsync({ postId });
        const data = await RenewerService.getSpecificRenewer(postId);
        if (!data) {
            return res.status(404).json({ error: "Renovacion no existente." });
        }
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getPendingRenewers = async function(req, res) {
    try {
        const renewers = await RenewerService.getAllPending();
        return res.status(200).json(renewers);
    } catch (error) {
        console.error("Error al obtener las postulaciones pendientes:", error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.getAcceptRenewers = async function(req, res) {
    try {
        const renewers = await RenewerService.getAllAccept();
        return res.status(200).json(renewers);
    } catch (error) {
        console.error("Error al obtener las postulaciones pendientes:", error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.getRejectedRenewers = async function(req, res) {
    try {
        const renewers = await RenewerService.getAllRejected();
        return res.status(200).json(renewers);
    } catch (error) {
        console.error("Error al obtener las postulaciones pendientes:", error.message);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
};

exports.createRenewer = async function (req, res) {
    try {
        const { solicitanteId } = req.body;
        const existingPendingRenewer = await RenewerService.getPendingRenewerByUser(solicitanteId);

        if (existingPendingRenewer) {
            return res.status(409).json({ error: "Ya tienes una renovacion pendiente. No puedes crear una nueva." });
        }

        if (!req.file) {
            return res.status(400).json({ error: "Error de validación del archivo: No has subido ningun archivo."});
        }


        const antecedentesPenales = {
            buffer: req.file.buffer,
            mimetype: req.file.mimetype,
        };

        
        if (!solicitanteId) {
            return res.status(400).json({ error: "Error de validación del usuario: Usuario invalido."});
        }



        const fechaPeticion = new Date();
        fechaPeticion.setUTCHours(fechaPeticion.getUTCHours() - 3);
        
        try {
            await archivoSchema.validateAsync(antecedentesPenales);
        } catch (validationError) {
            // Devuelve un código de estado 400 (Bad Request) en caso de error de validación
            return res.status(400).json({ error: "Error de validación del archivo: " + validationError.message });
        }
        // Crea un objeto de datos que se utilizará para crear la renovación
        const data = {
            solicitanteId, // Asegúrate de que esto sea el ID del solicitante correcto
            fechaPeticion,
            antecedentesPenales,
        };

        // Crea la renovación y guarda los datos en la base de datos
        const savedRenewer = await RenewerService.createRenewalWithFiles(data);

        return res.status(201).json({ message: "Petición de renovación creada exitosamente", renewer: savedRenewer });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


