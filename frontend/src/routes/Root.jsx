// Root.jsx

import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
import '../css/Root.css'; // Importar el archivo de estilos modular
import { FaSignOutAlt,FaSignInAlt, FaEye, FaEnvelope } from 'react-icons/fa'; // Importar el ícono de correo

function Root() {
  return (
    <AuthProvider>
      <PageRoot />
    </AuthProvider>
  );
}

function PageRoot() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const handleCreateApplication = () => {
    navigate('/crearPostulacion');
  };

  const handleCreateReserveTeorical = () => {
    navigate('/crearReservaTeorica');
  };

  const handleCreateReservePsychotecnical = () => {
    navigate('/crearReservaPsicotecnica');
  };

  const handleCreateReserveOftalmologic = () => {
    navigate('/crearReservaOftalmologica');
  };

  const handleCreateReservePractical = () => {
    navigate('/crearReservaPractica');
  };

  const handleCreateReserveRenewer = () => {
    navigate('/crearReservaRenovacion');
  };

  const handleViewReserve = () => {
    navigate('/VerReserva');
  };

  const handleDeleteReserve = () => {
    navigate('/EliminarReserva');
  };

  const handleGetReserveRut = () => {
    navigate('/BuscarReservaRut');
  };

  const handleGetReserveId = () => {
    navigate('/BuscarReservaId');
  };

  const handleCreateRenewer = () => {
    navigate('/crearRenovacion');
  };

  const handleViewPendingApplications = () => {
    navigate('/verPostulacionesPendientes');
  };

  const handleViewPendingRevewers = () => {
    navigate('/verRenovacionesPendientes');
  };

  const handleSendEmail = () => {
    navigate('/enviarCorreo');
  };

  return (
    <div className="container">
      <div className="user-info-container">
        <div className="user-info">
          <p>{`Estás logueado como ${user.nombre} ${user.apellido}`}</p>
        </div>
        <div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Cerrar sesión
          </button>
          <button className="create-application-btn" onClick={handleCreateApplication}>
            <FaSignInAlt  /> Crear postulación
          </button>
          <button className="create-reserve-btn" onClick={handleCreateReserveTeorical}>
            <FaSignInAlt  /> Crear reserva teórica
          </button>
          <button className="create-reserve-btn" onClick={handleCreateReservePsychotecnical}>
            <FaSignInAlt  /> Crear reserva psicotécnica
          </button>
          <button className="create-reserve-btn" onClick={handleCreateReserveOftalmologic}>
            <FaSignInAlt  /> Crear reserva oftalmológica
          </button>
          <button className="create-reserve-btn" onClick={handleCreateReservePractical}>
            <FaSignInAlt  /> Crear reserva práctica
          </button>
          <button className="create-reserve-btn" onClick={handleCreateReserveRenewer}>
            <FaSignInAlt  /> Crear reserva de renovación
          </button>
          <button className="create-reserve-btn" onClick={handleGetReserveRut}>
            <FaEye  /> Ver última reserva válida
          </button>
          <button className="create-renewer-btn" onClick={handleCreateRenewer}>
            <FaSignInAlt  /> Crear renovación
          </button>
          {user.roles[0].name === 'admin' && (
            <>
              <button className="create-reserve-btn" onClick={handleViewReserve}>
              <FaEye /> Ver reservas
              </button>
              <button className="create-reserve-btn" onClick={handleGetReserveId}>
              <FaEye  /> Buscar reserva por RUT
              </button>
              
              <button className="create-reserve-btn" onClick={handleDeleteReserve}>
              <FaSignInAlt /> Eliminar reserva
              </button>

              <button className="view-pending-btn" onClick={handleViewPendingApplications}>
                <FaEye /> Ver postulaciones pendientes
              </button>
              

              <button className="view-pending-btn" onClick={handleViewPendingRevewers}>
                <FaEye /> Ver renovaciones pendientes
              </button>

              <button className="button send-email-btn" onClick={handleSendEmail}>
                <FaEnvelope /> Enviar correo
              </button>

            </>
          )}
        </div>
      </div>
      <div className="button-container">
        <Outlet />
      </div>
    </div>
  );
}

export default Root;
