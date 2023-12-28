import React, { useState, useEffect } from 'react';
import { getAllReserves, deleteReserve } from '../services/reserve.service';
import Swal from 'sweetalert2';
import '../css/reserveStyles.css';

function DeleteReserve() {
  const [reserves, setReserves] = useState([]);
  const [reserveIdToDelete, setReserveIdToDelete] = useState('');

  useEffect(() => {
    const fetchReserves = async () => {
      try {
        const response = await getAllReserves();
        setReserves(response.data);
      } catch (error) {
        console.error('Error al obtener las reservas:', error);
      }
    };

    fetchReserves();
  }, []);

  const handleDeleteReserve = async (id) => {
    // Mostrar la ventana de confirmación
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la reserva permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    // Si el usuario confirma la eliminación, proceder con la llamada a la API
    if (result.isConfirmed) {
      try {
        const response = await deleteReserve(id);

        if (response.status === 200) {
          Swal.fire({
            title: 'Proceso exitoso',
            text: 'Reserva eliminada con éxito',
            icon: 'success',
          });
          // Actualiza la lista de reservas después de la eliminación
          setReserves((prevReserves) => prevReserves.filter((reserve) => reserve._id !== id));
        } else {
          Swal.fire({
            title: 'Error al eliminar reserva',
            text: 'Ha ocurrido un error al eliminar la reserva',
            icon: 'error',
          });
        }
      } catch (error) {
        console.error('Error inesperado:', error);
        // Maneja el error de acuerdo a tus necesidades
      }
    }
  };

  return (
    <div className="reserve-container">
      <h2>Reservas disponibles a eliminar</h2>
      <div className="reserves-list">
      <p>---------------------------------------------------------------------------------------------------------------------------------</p>
        {reserves.map((reserve) => (
          <div key={reserve._id} className="reserve-item">
            <p>RUT solicitante: {reserve.solicitanteId.rut}</p>
            <p>Fecha de Reserva: {new Date(reserve.fechaReserva).toLocaleDateString()}</p>
            <p>Hora de Reserva: {reserve.horaReserva}</p>
            <p>Tipo de reserva: {reserve.tipoPrueba}</p>
            <button onClick={() => handleDeleteReserve(reserve._id)} className="delete-btn">
              Eliminar Reserva
            </button>
            <p>---------------------------------------------------------------------------------------------------------------------------</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeleteReserve;
