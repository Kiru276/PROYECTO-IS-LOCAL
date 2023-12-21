import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAllReserves } from '../services/reserve.service.js';
import { AuthProvider, useAuth } from '../context/AuthContext';

function ViewReserve() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [reserves, setReserves] = useState([]);

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

  return (
    <div>
      <h2>Todas las Reservas</h2>
      {reserves.map((reserve) => (
        <div key={reserve.id}>
          <p>Fecha de Reserva: {reserve.fechaReserva}</p>
          <p>Hora de Reserva: {reserve.horaReserva}</p>
          <p>Tipo de reserva: {reserve.tipoPrueba}</p>
          <p>-------------------------------------------</p>
          {/* ... Otros detalles de la reserva */}
          
        </div>
      ))}

      {/* Puedes utilizar Outlet si estás utilizando rutas anidadas */}
      <Outlet />
    </div>
  );
}

export default ViewReserve;
