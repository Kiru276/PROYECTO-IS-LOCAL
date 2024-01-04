import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAllReserves } from '../services/reserve.service.js';
import { AuthProvider, useAuth } from '../context/AuthContext';

function ViewReserve() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [reserves, setReserves] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedReserve, setSelectedReserve] = useState(null);

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

  // Filtrar las reservas según el texto de búsqueda
  const filteredReserves = reserves.filter((reserve) => {
    const searchTerms = searchText.toLowerCase();
    const reserveInfo = `${reserve.fechaReserva} ${reserve.horaReserva} ${reserve.tipoPrueba} ${reserve.solicitanteId.rut} ${reserve.solicitanteId.nombre} ${reserve.solicitanteId.apellido} ${reserve.solicitanteId.email} ${reserve.solicitanteId.telefono}`.toLowerCase();
    return reserveInfo.includes(searchTerms);
  });

  const handleShowDetails = (reserve) => {
    setSelectedReserve(selectedReserve === reserve ? null : reserve);
  };

  return (
    <div>
      <h2>Historial de datos relevantes de reservas </h2>
      <label>
        Buscar reservas:
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </label>
      <br />
      <p>---------------------------------------------------------------------------------------------------------------------------------</p>
      <table>
        <thead>
          <tr>
            <th>RUT</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Datos de sus reservas</th>
          </tr>
        </thead>
        <tbody>
          {filteredReserves.map((reserve) => (
            <tr key={reserve.id}>
              <td>{reserve.solicitanteId.rut}</td>
              <td>{reserve.solicitanteId.nombre}</td>
              <td>{reserve.solicitanteId.apellido}</td>
              <td>
                <button onClick={() => handleShowDetails(reserve)}>
                  {selectedReserve === reserve ? 'Ocultar Detalles' : 'Ver Detalles'}
                </button>
                {selectedReserve === reserve && (
                  <div>
                    <h4>Datos de la reservas: </h4>
                    <p>Fecha reserva: {new Date(reserve.fechaReserva).toLocaleDateString()}</p>
                    <p>Hora reserva: {reserve.horaReserva}</p>
                    <p>Tipo reserva: {reserve.tipoPrueba}</p>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Puedes utilizar Outlet si estás utilizando rutas anidadas */}
      <Outlet />
    </div>
  );
}

export default ViewReserve;
