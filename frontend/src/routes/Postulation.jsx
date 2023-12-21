import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createPostulation } from '../services/postulation.service.js';
import FileInput from '../components/FileInput'; // Importar el componente FileInput
import '../css/Postulation.css'; // Importar el archivo de estilos modular

import 'bootstrap/dist/css/bootstrap.min.css'; // Importar estilos de Bootstrap

function Postulation() {
  return <PagePostulation />;
}

function PagePostulation() {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    files: {
      carnet: null,
      certificadoResidencia: null,
      antecedentesPenales: null,
      certificadoEgreso: null,
    },
  });

  const [loading, setLoading] = useState(false);

const handleFileChange = (e, fieldName) => {
    const fileInput = e.target;
    const file = fileInput.files[0];
  
    if (file) {
      // Verifica si el tipo de archivo es PDF
      if (file.type === 'application/pdf' && file.name.toLowerCase().endsWith('.pdf') &&
        ['carnet', 'certificadoResidencia', 'antecedentesPenales', 'certificadoEgreso'].includes(fieldName)
      ) {
        setFormData((prevData) => ({
          ...prevData,
          files: {
            ...prevData.files,
            [fieldName]: file,
          },
        }));
      } else {
        // Si el tipo de archivo no es PDF, muestra una notificación y borra el archivo seleccionado
        const notificationMessage = `Por favor, selecciona un archivo PDF válido para ${fieldName}.`;
        window.alert(notificationMessage);
  
        // Borra el archivo seleccionado
        fileInput.value = ''; // Restablece el valor del input a una cadena vacía
  
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
      setLoading(true);

      const response = await createPostulation(formData, userId);

      if (response.status === 201) {
        alert('La postulación se envió correctamente.');
      } else if (response.status === 400) {
        alert('Debes subir los cuatro archivos para continuar. Intenta nuevamente.');
      } else if (response.status === 409) {
        alert('Ya tienes una postulación pendiente. No puedes crear una nueva.');
      } else if (response.status === 500) {
        alert('Hubo un error interno en el servidor. Por favor, inténtelo de nuevo más tarde.');
      } else {
        alert('Hubo un error al enviar la postulación. Por favor, inténtelo de nuevo.');
      }
    } catch (error) {
      alert('Hubo un error en la conexión. Por favor, inténtelo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const fileDisplayNames = {
    carnet: 'Carnet',
    certificadoResidencia: 'Certificado de Residencia',
    antecedentesPenales: 'Antecedentes Penales',
    certificadoEgreso: 'Certificado de Egreso',
  };

  const fileNames = Object.keys(formData.files);

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2 className="mt-4 mb-4">Formulario de Postulación</h2>
        <form onSubmit={handleSubmit}>
          {fileNames.map((fileName, index) => (
            <FileInput
              key={index}
              label={fileDisplayNames[fileName]}
              onChange={(e) => handleFileChange(e, fileName)}
            />
          ))}
          <div className="mt-4">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar Postulación'}
            </button>
          </div>
        </form>
      </div>
      <Outlet />
    </div>
  );
}

export default Postulation;
