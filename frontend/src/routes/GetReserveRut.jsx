// Codigo que muestra ultima reserva válida de usuario
import React, { useState, useEffect } from 'react';
import { getAllReservesByUserId } from '../services/reserve.service';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthContext';
import '../css/reserveStyles.css';

function GetReservesRut() {
  const { user, loading } = useAuth();
  const [reserves, setReserves] = useState([]);

  const handleGetReserves = async () => {
    try {
      if (!user || !user.id) {
        Swal.fire({
          title: 'Usuario no válido',
          text: 'El usuario autenticado no tiene un RUT válido.',
          icon: 'warning',
        });
        return;
      }

      const response = await getAllReservesByUserId(user.id);

      if (Array.isArray(response)) {
        setReserves(response);
      } else if (response.status === 404) {
        Swal.fire({
          title: 'Reservas no encontradas',
          text: 'No hay reservas para el usuario autenticado.',
          icon: 'warning',
        });
      } else if (response.status === 500) {
        Swal.fire({
          title: 'ERROR',
          text: 'Error interno del servidor al obtener reservas.',
          icon: 'error',
        });
      } else {
        alert('Error inesperado al obtener reservas.');
      }
    } catch (error) {
      console.error('Error inesperado:', error);
      alert('Error inesperado al obtener reservas.');
    }
  };

  useEffect(() => {
    // Obtener las reservas al cargar el componente y cuando el usuario cambie
    if (!loading) {
      handleGetReserves();
    }
  }, [loading, user]); // Ejecutar al cargar el componente y cuando loading o user cambien

  function GuionRut(str) {
    if (typeof str !== 'string') {
      return str;
    }
    const lastChar = str.slice(-1);
    const restOfRut = str.slice(0, -1);
    return restOfRut + '-' + lastChar;
  }

  return (
    <div className="reserve-container">
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

export default GetReservesRut;
