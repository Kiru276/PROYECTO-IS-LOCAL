import React, { useState } from 'react';
import { deleteReserve } from '../services/reserve.service';
import Swal from 'sweetalert2';
import '../css/reserveStyles.css';

function YourComponent() {
  const [reserveIdToDelete, setReserveIdToDelete] = useState('');

  const handleDeleteReserve = async () => {
    try {
      const response = await deleteReserve(reserveIdToDelete);
      
      if (response.status === 200) {
        Swal.fire({
          title: "Proceso exitoso",
          text: "Reserva eliminada con éxito",
          icon: "success"
        });
        // Realiza cualquier acción adicional necesaria después de la eliminación
      } else if (response.status === 400) {
        Swal.fire({
          title: "Reservas no encontradas",
          text: "Error al obtener reservas: Usuario no encontrado.",
          icon: "warning"
        });;
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
        console.error('Error al eliminar la reserva:', response.status, response.statusText);
        // Maneja otros casos de error según tus necesidades
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      // Maneja el error de acuerdo a tus necesidades
    }
  };

  return (
    <div className="reserve-container">
      <label>
        ID de la Reserva a Eliminar:
        <input
          type="text"
          value={reserveIdToDelete}
          onChange={(e) => setReserveIdToDelete(e.target.value)}
        />
      </label>

      <button onClick={handleDeleteReserve} className="reserve-submit">
        Eliminar Reserva
      </button>
    </div>
  );
}
export default YourComponent;
