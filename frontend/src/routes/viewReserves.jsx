import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getAllReserves } from '../services/reserve.service.js';
import { AuthProvider, useAuth } from '../context/AuthContext';
import '../css/viewReserves.css';

function ViewReserve() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [reserves, setReserves] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedRut, setSelectedRut] = useState(null);

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

  // Organizar las reservas por RUT
  const groupedReserves = reserves.reduce((grouped, reserve) => {
    const rut = reserve.solicitanteId.rut;
    if (!grouped[rut]) {
      grouped[rut] = [];
    }
    grouped[rut].push(reserve);
    return grouped;
  }, {});

  // Filtrar las reservas según el texto de búsqueda
  const filteredReserves = Object.keys(groupedReserves).filter((rut) => {
    const searchTerms = searchText.toLowerCase();
    return rut.includes(searchTerms);
  });

  const renderReserveDetails = (reserve) => (
    <table>
      <thead>
        <tr>
          <th>Datos de la reserva</th>
          <th>Datos de contacto</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Fecha reserva:</td>
          <td>{new Date(reserve.fechaReserva).toLocaleDateString()}</td>
        </tr>
        <tr>
          <td>Hora reserva:</td>
          <td>{reserve.horaReserva}</td>
        </tr>
        <tr>
          <td>Tipo reserva:</td>
          <td>{reserve.tipoPrueba}</td>
        </tr>
        <tr>
          <td>Correo:</td>
          <td>{reserve.solicitanteId.email}</td>
        </tr>
        <tr>
          <td>Telefono:</td>
          <td>{reserve.solicitanteId.telefono}</td>
        </tr>
      </tbody>
    </table>
  );

  const handleShowDetails = (rut) => {
    setSelectedRut(selectedRut === rut ? null : rut);
  };

  return (
    <div>
      <h2>Historial de datos relevantes de reservas </h2>
      <label>
        Buscar RUT:
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </label>
      <br />
      <div className="table-container">
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
            {filteredReserves.map((rut) => (
              <React.Fragment key={rut}>
                <tr>
                  <td>{rut}</td>
                  <td>{groupedReserves[rut][0].solicitanteId.nombre}</td>
                  <td>{groupedReserves[rut][0].solicitanteId.apellido}</td>
                  <td>
                    <button onClick={() => handleShowDetails(rut)}>
                      {selectedRut === rut ? 'Ocultar Detalles' : 'Ver Detalles'}
                    </button>
                    {selectedRut === rut && (
                      <div>
                        {groupedReserves[rut].map((reserve) => (
                          <React.Fragment key={reserve.id}>
                            {renderReserveDetails(reserve)}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Puedes utilizar Outlet si estás utilizando rutas anidadas */}
      <Outlet />
    </div>
  );
}

export default ViewReserve;