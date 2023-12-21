import React, { useState } from 'react';
import { getAllReservesByUserId } from '../services/reserve.service';
import Swal from 'sweetalert2';

function ReservesById() {
  const [
    
    userId, setUserId] = useState('');
  const [reserves, setReserves] = useState([]);

  const handleGetReserves = async () => {
    try {
      const response = await getAllReservesByUserId(userId);

      if (Array.isArray(response)) {
        setReserves(response);
      } else if (response.status === 400) {
        Swal.fire({
          title: "Atencion",
          text: "Error al obtener reservas: Datos incorrectos.",
          icon: "warning"
        });
      } else if (response.status === 404) {
        Swal.fire({
          title: "Reservas no encontradas",
          text: "Error al obtener reservas: Usuario no encontrado.",
          icon: "warning"
        });;
      } else if (response.status === 500) {
        Swal.fire({
          title: "ERROR",
          text: "Error interno del servidor al obtener reservas.",
          icon: "error"
        });
      } else {
        console.error('Error inesperado:', response.status, response.statusText);
        // Manejar otros casos de error según tus necesidades
        alert('Error inesperado al obtener reservas.');
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      // Manejar el error de acuerdo a tus necesidades
      alert('Error inesperado al obtener reservas.');
    }
  };

  

  return (
    <div>
      <label>
        ID del Usuario para Obtener Reservas:
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </label>

      <button onClick={handleGetReserves}>
        Obtener Reservas
      </button>

      {/* Mostrar las reservas */}
      {Array.isArray(reserves) && reserves.length > 0 ? (
        reserves.map((reserve) => (
          <div key={reserve._id}>
            <p>---------------------------------------------</p>
            <p>Fecha de Reserva: {new Date(reserve.fechaReserva).toLocaleDateString()}</p>
            <p>Hora de Reserva: {reserve.horaReserva}</p>
            <p>Tipo de examen: {reserve.tipoPrueba}</p>
            
            {/* Otros detalles de la reserva */}
          </div>
        ))
      ) : (
        <p>No hay reservas para mostrar.</p>
      )}
    </div>
  );
}

export default ReservesById;
