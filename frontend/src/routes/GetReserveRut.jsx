import React, { useState } from 'react';
import { getAllReservesByUserRut } from '../services/reserve.service';
import Swal from 'sweetalert2';
import '../css/reserveStyles.css';


function ReservesByRut() {
  const [rut, setRut] = useState('');
  const [reserves, setReserves] = useState([]);

  const handleGetReserves = async () => {
    try {
      const response = await getAllReservesByUserRut(rut);

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
          });
      } else if (response.status === 500) {
        Swal.fire({
            title: "ERROR",
            text: "Error interno del servidor al obtener reservas.",
            icon: "error"
          });
      } else {
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
    <div className="reserve-container">
      <label>
        Ingresa RUT del Usuario para Obtener última reserva agendada (sin puntos ni guión):
        <input
          type="text"
          value={rut}
          onChange={(e) => setRut(e.target.value)}
        />
      </label>

      <button onClick={handleGetReserves} className="reserve-submit">
        Obtener Reservas
      </button>

      {/* Mostrar la última reserva */}
      {Array.isArray(reserves) && reserves.length > 0 ? (
        <div key={reserves[reserves.length - 1]._id} className="reserve-form">
          <p>Fecha de Reserva: {new Date(reserves[reserves.length - 1].fechaReserva).toLocaleDateString()}</p>
          <p>Hora de Reserva: {reserves[reserves.length - 1].horaReserva}</p>
          <p>Tipo de examen: {reserves[reserves.length - 1].tipoPrueba}</p>
        </div>
      ) : (
        <p className="reserve-no-reservations">No hay reservas para mostrar.</p>
      )}
    </div>
  );
}

export default ReservesByRut;
