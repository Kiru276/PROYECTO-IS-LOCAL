import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostulationByID } from '../services/postulation.service.js';
import { getExamByID , updateExam } from '../services/exam.service.js';
import { format } from 'date-fns';
import { Button, CircularProgress } from '@mui/material';

const formatRut = (rut) => {
    const rutDigits = rut.replace(/[^\dKk]/g, '');
    const rutPart = rutDigits.slice(0, -1);
    const rutVerifier = rutDigits.slice(-1).toUpperCase();
    return `${rutPart.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}-${rutVerifier}`;
};

function PostulationDetail() {
    const { postId } = useParams();
    const [postulationDetail, setPostulationDetail] = useState({});
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false); 
    const [updatingExam, setUpdatingExam] = useState(null); 

    useEffect(() => {
        const fetchPostulationDetail = async () => {
            try {
                const response = await getPostulationByID(postId);
                if (response.status === 200) {
                    const postulationData = response.data;
                    for (let i = 0; i < postulationData.postulation.examen.length; i++) {
                        const examId = postulationData.postulation.examen[i]._id;
                        const examDetail = await getExamByID(examId);
                        const { tipoExamen, estado, _id } = examDetail; 
                        postulationData.postulation.examen[i] = { tipoExamen, estado , _id}; 
                    }
                    const examOrder = ['Teórico', 'Psicotécnico', 'Oftalmológico', 'Práctico'];
                    postulationData.postulation.examen.sort((a, b) => examOrder.indexOf(a.tipoExamen) - examOrder.indexOf(b.tipoExamen));
                    setPostulationDetail(postulationData);
                } else {
                    console.error('Error al obtener los detalles de la postulación:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener los detalles de la postulación:', error);
            } finally {
                setLoading(false);
                setUpdatingExam(null); // Restablece el estado de 'updatingExam' a 'null' después de que todos los datos se hayan cargado
            }
        };
    
        fetchPostulationDetail();
    }, [postId, refresh]); 
    
    const handleUpdateExam = async (examId, newState) => {
        setUpdatingExam(examId);
        try {
            const updatedExam = await updateExam(examId, newState);
            setRefresh(!refresh);
        } catch (error) {
            console.error('Error al actualizar el examen:', error);
        }
    };
    
    
    return (
        <div className="container">
            <div className="postulation-detail-wrapper">
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <h2>{`Identificación de la Postulación #${postId}`}</h2>
                        {postulationDetail.postulation.solicitanteId ? (
                            <>
                                <p>{`Solicitante: ${postulationDetail.postulation.solicitanteId.nombre} ${postulationDetail.postulation.solicitanteId.apellido}`}</p>
                                <p>{`RUT: ${formatRut(postulationDetail.postulation.solicitanteId.rut)}`}</p>
                                <p>{`Estado postulación: ${postulationDetail.postulation.estadoReserva}`}</p>
                                <p>{`Fecha de postulación: ${format(new Date(postulationDetail.postulation.fechaHoraReserva), 'dd-MM-yyyy')}`}</p>
                                <h3>Examenes:</h3>
                                <ul>
                                {postulationDetail.postulation.examen.map((exam, index) => (
                                <li key={exam._id + exam.estado}>
                                    {`Examen ${index + 1}: Tipo - ${exam.tipoExamen}, Estado - ${exam.estado}`}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Button 
                                            variant="contained" 
                                            style={{
                                                backgroundColor: updatingExam === exam._id ? '#95a5a6' : '#2ecc71', 
                                                color: 'white'
                                            }} 
                                            onClick={() => handleUpdateExam(exam._id, 'Aceptado')} 
                                            disabled={updatingExam !== null}
                                        >
                                            Aceptar
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            style={{
                                                backgroundColor: updatingExam === exam._id ? '#95a5a6' : '#c0392b', 
                                                color: 'white'
                                            }} 
                                            onClick={() => handleUpdateExam(exam._id, 'Rechazado')} 
                                            disabled={updatingExam !== null}
                                        >
                                            Rechazar
                                        </Button>
                                        {updatingExam === exam._id && <CircularProgress />}
                                    </div>
                                </li>
                            ))}


                                </ul>
                            </>
                        ) : (
                            <p>Detalles del solicitante no disponibles</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default PostulationDetail;
