import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { getPendingPostulations } from '../services/postulation.service.js';
import '../css/PostulationPending.css'; // Agrega estilos personalizados aquí

import 'bootstrap/dist/css/bootstrap.min.css'; // Importa estilos de Bootstrap

function PostulationPending() {
  return <PagePostulationPending />;
}

function PagePostulationPending() {
  const [pendingPostulations, setPendingPostulations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingPostulations = async () => {
      try {
        const response = await getPendingPostulations();
        if (response.status === 200) {
          setPendingPostulations(response.data);
        } else {
          console.error(
            'Error al obtener las postulaciones pendientes:',
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error('Error al obtener las postulaciones pendientes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingPostulations();
  }, []);

  return (
    <div className="container">
      <div className="postulations-pending-wrapper">
        <h2>Postulaciones Pendientes</h2>
        {loading ? (
          <p>Cargando postulaciones pendientes...</p>
        ) : (
          <ul className="list-group">
            {pendingPostulations.map((postulation) => (
              <li key={postulation._id} className="list-group-item">
                <Link to={`/verDetallePostulacion/${postulation._id}`}>
                  <strong>{`${postulation.solicitanteId.nombre} ${postulation.solicitanteId.apellido}`}</strong>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Outlet />
    </div>
  );
}

export default PostulationPending;
