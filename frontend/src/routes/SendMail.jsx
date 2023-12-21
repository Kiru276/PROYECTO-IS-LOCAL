import React, { useState, useEffect } from 'react';
import { getAllPostulation } from '../services/postulation.service.js';
import sendMail from '../services/mailer.service.js';
import { CircularProgress, TextField, Button, Select, MenuItem, FormControl, InputLabel, Typography } from '@mui/material';

const SendMail = () => {
    const [selectedPostulation, setSelectedPostulation] = useState('');
    const [message, setMessage] = useState('');
    const [postulations, setPostulations] = useState([]);
    const [mailStatus, setMailStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isPostulationsLoading, setPostulationsLoading] = useState(true); // Nuevo estado

    useEffect(() => {
        const fetchPostulations = async () => {
            const response = await getAllPostulation();
            setPostulations(response.data);
            setPostulationsLoading(false); // Desactivar la carga después de obtener las postulaciones
        };

        fetchPostulations();
    }, []);

    const handlePostulationChange = (event) => {
        setSelectedPostulation(event.target.value);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMail = async () => {
        if (message.trim() === '') {
            setMailStatus('El mensaje no puede estar vacío.');
            return;
        }

        if (selectedPostulation === '') {
            setMailStatus('Debes seleccionar una postulación.');
            return;
        }

        setIsLoading(true);
        try {
            await sendMail(selectedPostulation, message);
            setMailStatus('Correo enviado correctamente.');
        } catch (error) {
            setMailStatus('No se pudo enviar el correo.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom>Enviar correo</Typography>
            <FormControl fullWidth>
                <InputLabel id="postulation-select-label">Seleccionar postulación</InputLabel>
                <Select
                    labelId="postulation-select-label"
                    value={selectedPostulation}
                    onChange={handlePostulationChange}
                    label="Seleccionar postulación"
                >
                    {isPostulationsLoading ? (
                        <CircularProgress /> // Muestra el indicador de progreso si las postulaciones están cargando
                    ) : (
                        postulations.map((postulation) => (
                            <MenuItem key={postulation._id} value={postulation._id}>
                                {postulation.solicitanteId.nombre} {postulation.solicitanteId.apellido} - {postulation._id}
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>
            <TextField
                value={message}
                onChange={handleMessageChange}
                placeholder="Escribe tu mensaje aquí"
                multiline
                rows={4}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSendMail} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Enviar correo'}
            </Button>
            {mailStatus && <Typography variant="subtitle1">{mailStatus}</Typography>}
        </div>
    );
};

export default SendMail;
