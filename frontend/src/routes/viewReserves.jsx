import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAllReserves } from '../services/reserve.service.js';
import { AuthProvider, useAuth } from '../context/AuthContext';

function ViewReserve() {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log('Valor de user:', user);

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

  function GuionRut(str) {
    if (typeof str !== 'string') {
      return str;
    }
    const lastChar = str.slice(-1);

    const restOfRut = str.slice(0, -1);

    return restOfRut + '-' + lastChar;
  }

  return (
    <div>
      <h2>Historial de datos relevantes de reservas </h2>
      <br />
      {reserves.map((reserve) => (
        <div key={reserve.id}>
          <p>Fecha de Reserva: {new Date(reserve.fechaReserva).toLocaleDateString()}</p>
          <p>Hora de Reserva: {reserve.horaReserva}</p>
          <p>Tipo de reserva: {reserve.tipoPrueba}</p>
          <h4>Datos contacto del solicitante: </h4>
          <p>RUT del solicitante: {GuionRut(reserve.solicitanteId.rut)}</p>
          <p>Nombre: {reserve.solicitanteId.nombre} {reserve.solicitanteId.apellido}</p>
          <p>Correo: {reserve.solicitanteId.email}</p>
          <p>Teléfono: {reserve.solicitanteId.telefono}</p>

          <p>---------------------------------------------------------------------------------------------------------------------------------</p>
          {/* ... Otros detalles de la reserva */}
        </div>
      ))}

      {/* Puedes utilizar Outlet si estás utilizando rutas anidadas */}
      <Outlet />
    </div>
  );
}

export default ViewReserve;
