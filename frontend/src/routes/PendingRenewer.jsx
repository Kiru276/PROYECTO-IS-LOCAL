import React, { useEffect, useState } from 'react';
import { getPendingRenewals } from '../services/renewer.service.js';

function RenewalsPending({ userId }) {
  const [pendingRenewals, setPendingRenewals] = useState([]);

  useEffect(() => {
    const fetchPendingRenewals = async () => {
      try {
        const response = await getPendingRenewals(userId);
        setPendingRenewals(response.data);
        console.log('Renovaciones obtenidas:', response.data);
      } catch (error) {
        console.error('Error al obtener renovaciones pendientes:', error);
      }
    };

    fetchPendingRenewals();
  }, [userId]);

  return (
    <div>
      <h2>Renovaciones Pendientes</h2>
      {Array.isArray(pendingRenewals) && pendingRenewals.length > 0 ? (
        <ul>
          {pendingRenewals.map((renewal) => (
            <li key={renewal._id}>
              <p>
                Solicitante: {`${renewal.solicitanteId.nombre} ${renewal.solicitanteId.apellido}`}
              </p>
              <p>
                Fecha de Trámite: {new Date(renewal.fechaPeticion).toLocaleDateString()}
              </p>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay renovaciones pendientes.</p>
      )}
    </div>
  );
}

export default RenewalsPending;
