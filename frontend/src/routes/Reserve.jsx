import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { createReserve1 } from '../services/reserve.service.js';
import { getAllPostulation } from '../services/postulation.service.js';
import Swal from 'sweetalert2';
import '../css/reserveStyles.css';

function Reserve() {
  return (
    <AuthProvider>
      <PageReserve />
    </AuthProvider>
  );
}

function PageReserve() {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    // Manejar caso donde el usuario no está autenticado
    return <p>Usuario no autenticado</p>;
  }

  const [postulation, setPostulation] = useState([]);

  useEffect(() => {
    const fetchPostulation = async () => {
      try {
        const response = await getAllPostulation();
  
        // Encuentra la postulación correspondiente al usuario actual
        const userPostulation = response.data.find(
          (item) => item.solicitanteId._id === user.id
        );
  
        if (userPostulation) {
          console.log('Postulación encontrada');
          setPostulation(userPostulation);
        } else {
          console.log('Postulación no encontrada para el usuario con ID');
        }
      } catch (error) {
        console.error('Error al obtener las postulaciones:', error);
      }
    };
  
    fetchPostulation();
  }, [user]);
  

  const [formData, setFormData] = useState({
    fechaReserva: '',
    horaReserva: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos estén completos
    if (!formData.fechaReserva || !formData.horaReserva) {
      Swal.fire({
        title: 'Atención',
        text: 'Por favor, complete todos los campos del formulario',
        icon: 'warning',
      });
      return;
    }

    try {
      console.log('Postulación actual en el estado');
  
      // Verificar si existe una postulación y su estado es "Aprobado"
      if (postulation && postulation.estadoReserva === 'Aceptado') {
        console.log('La postulación está aprobada, procediendo a crear la reserva...');
  
        // Utiliza la función createReserve1 del servicio
        const response = await createReserve1({
          ...formData,
          solicitanteId: user ? user.id : '',
        });

        if (response.status === 201) {
          Swal.fire({
            title: 'Todo correcto',
            text: 'La reserva se creó correctamente',
            icon: 'success',
          });
        } else if (response.status === 400) {
          Swal.fire({
            title: 'Atención',
            text: 'Datos ingresados incorrectos, ingrese los datos de forma correcta',
            icon: 'warning',
          });
        } else if (response.status === 500) {
          Swal.fire({
            title: 'ERROR',
            text:
              'Hubo un error interno en el servidor. Por favor, inténtalo de nuevo más tarde.',
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: 'ERROR',
            text: 'Hubo un error al enviar la reserva. Por favor, inténtalo de nuevo.',
            icon: 'error',
          });
        }
      } else {
        Swal.fire({
          title: 'Atención',
          text: 'No puedes realizar reservas si tu postulación no está aprobada.',
          icon: 'warning',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'ERROR',
        text: 'Hubo un error inesperado, inténtelo más tarde.',
        icon: 'error',
      });
    }
  };

  return (
    <div className="reserve-container">
      <h2 className="reserve-title">Formulario de Reserva teórica</h2>
      <form className="reserve-form" onSubmit={handleSubmit}>
        <label>
          Fecha de Reserva:
          <input
            type="date"
            name="fechaReserva"
            value={formData.fechaReserva}
            onChange={handleChange}
          />
        </label>

        <br />

        <label>
          Hora de Reserva:
          <input
            type="time"
            name="horaReserva"
            value={formData.horaReserva}
            onChange={handleChange}
          />
        </label>

        <br />

        <br />
        <br />

        <button type="submit" className="reserve-submit">
          Crear Reserva
        </button>
      </form>
      <Outlet />
    </div>
  );
}

export default Reserve;
