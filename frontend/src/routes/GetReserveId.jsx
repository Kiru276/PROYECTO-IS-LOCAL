import React, { useState } from 'react';
import { getAllReservesByUserRut } from '../services/reserve.service';
import Swal from 'sweetalert2';

function ReservesByRut() {
  const [rut, setUserRut] = useState('');
  const [reserves, setReserves] = useState([]);

  const handleGetReserves = async () => {
    // Validar que el campo RUT no esté vacío
    if (!rut.trim()) {
      Swal.fire({
        title: 'Atención',
        text: 'Campo vacío, ingresar RUT del usuario para obtener reservas.',
        icon: 'warning',
      });
      return;
    }

    try {
      const response = await getAllReservesByUserRut(rut);

      if (Array.isArray(response)) {
        setReserves(response);
      } else if (response.status === 400) {
        Swal.fire({
          title: 'Atención',
          text: 'Error al obtener reservas: Datos incorrectos.',
          icon: 'warning',
        });
      } else if (response.status === 404) {
        Swal.fire({
          title: 'Reservas no encontradas',
          text: 'Error al obtener reservas: Usuario no encontrado.',
          icon: 'warning',
        });
      } else if (response.status === 500) {
        Swal.fire({
          title: 'ERROR',
          text: 'Error interno del servidor al obtener reservas.',
          icon: 'error',
        });
      } else {
        console.error('Error inesperado:', response.status, response.statusText);
        alert('Error inesperado al obtener reservas.');
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      alert('Error inesperado al obtener reservas.');
    }
  };

  return (
    <div>
      <label>
        RUT del Usuario para Obtener Reservas (Sin puntos ni guión):
        <input
          type="text"
          value={rut}
          onChange={(e) => setUserRut(e.target.value)}
        />
      </label>

      <button onClick={handleGetReserves}>
        Obtener Reservas
      </button>

      {/* Mostrar las reservas */}
      {Array.isArray(reserves) && reserves.length > 0 ? (
        <div>
          {reserves.map((reserve, index) => (
            <div key={reserve._id}>
              <p>-----------------------------------------------------------------------------------------------------</p>
              {index === reserves.length - 1 && (
                <p style={{ color: 'green' }}>Reserva actual válida:</p>
              )}
              <p>Fecha de Reserva: {new Date(reserve.fechaReserva).toLocaleDateString()}</p>
              <p>Hora de Reserva: {reserve.horaReserva}</p>
              <p>Tipo de examen: {reserve.tipoPrueba}</p>
              
              
            </div>
          ))}
        </div>
      ) : (
        <p>No hay reservas para mostrar.</p>
      )}
    </div>
  );
}

export default ReservesByRut;