import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { createRenewer } from '../services/renewer.service.js';
import FileInput from '../components/FileInput'; // Importar el componente FileInput
import '../css/Postulation.css'; // Importar el archivo de estilos modular

function Renewer() {
  return <PageRenewer />;
}

function PageRenewer() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    antecedentesPenales: null, // Cambiado el nombre de la propiedad a antecedentesPenales
  });

  const [loading, setLoading] = useState(false); // Added loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Verifica si el tipo de archivo es PDF
      if (file.type === 'application/pdf') {
        setFormData((prevData) => ({
          ...prevData,
          antecedentesPenales: file, // Actualizado para coincidir con la propiedad en el estado
        }));
      } else {
        // Si el tipo de archivo no es PDF, muestra una notificación
        const notificationMessage = 'Por favor, selecciona un archivo PDF válido para antecedentes penales.';
        window.alert(notificationMessage);

        // Limpia el input de archivo después de un pequeño retraso
        setTimeout(() => {
          e.target.value = null;
        }, 100); // Ajusta el tiempo de retraso según sea necesario
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { id: userId } = user;

    try {
      setLoading(true); // Set loading to true when submitting
      console.log("llegada a llamar la funcion");
      // Llama a la función crear renovacion desde Renewer.service.js
      const response = await createRenewer(formData, userId);

      if (response.status === 201) {
        alert('La renovacion se envió correctamente.');
      } else if (response.status === 400) {
        alert('Debes subir el archivo de antecedentes penales para continuar. Intenta nuevamente.');
      } else if (response.status === 409) {
        alert('Ya tienes una renovacion pendiente. No puedes crear una nueva.');
      } else if (response.status === 500) {
        // Maneja el estado 500 según sea necesario
        console.error('Error interno del servidor:', response.statusText);
        alert('Hubo un error interno en el servidor. Por favor, inténtelo de nuevo más tarde.');
      } else {
        console.error('Error al enviar la renovacion:', response.status, response.statusText);
        // Puedes manejar otros códigos de estado según tus necesidades
        alert('Hubo un error al enviar la renovacion. Por favor, inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar la renovacion:', error);
      // Puedes manejar errores de red u otros errores aquí y mostrar un mensaje al usuario
      alert('Hubo un error en la conexión. Por favor, inténtelo de nuevo más tarde.');
    } finally {
      setLoading(false); // Set loading to false after the submission is complete
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Formulario de Renovación</h2>
        <form onSubmit={handleSubmit}>
          {/* Campo de entrada del archivo antecedentesPenales */}
          <FileInput
            label="Antecedentes Penales"
            onChange={handleFileChange}
          />
          <br />
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar renovacion'}
          </button>
        </form>
      </div>
      <Outlet />
    </div>
  );
}

export default Renewer;
