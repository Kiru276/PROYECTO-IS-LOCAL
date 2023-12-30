import axios from 'axios';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const createPostulation = async (formData) => {
    try {
        const token = cookies.get('jwt-auth');
        const solicitanteId = jwtDecode(token).id;
        const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Set the content type to 'multipart/form-data'
        };
        const formDataWithUserId = new FormData();
        console.log(solicitanteId);
        formDataWithUserId.append('solicitanteId', solicitanteId);
        formDataWithUserId.append('carnet', formData.files.carnet);
        formDataWithUserId.append('certificadoResidencia', formData.files.certificadoResidencia);
        formDataWithUserId.append('certificadoEgreso', formData.files.certificadoEgreso);
        formDataWithUserId.append('antecedentesPenales', formData.files.antecedentesPenales);

        const response = await axios.post(
        'http://localhost:3000/api/postulation/createPostulation',
        formDataWithUserId,
        {
            headers,
        }
        );

        return response;
    } catch (error) {
        // Si hay un error, devolver la respuesta del error
        return error.response || error;
    }
};

export const getPendingPostulations = async () => {
        try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
    
        const response = await axios.get(
            'http://localhost:3000/api/postulation/getPendingPostulations',
            { headers }
        );
    
        return response;
        } catch (error) {
        // Si hay un error, devolver la respuesta del error
        return error.response || error;
        }
};


export const getPostulationByID = async (postId) => {
    try {
    const token = cookies.get('jwt-auth');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
        `http://localhost:3000/api/postulation/getPostulation/${postId}`,
        { headers }
    );

    return response;
    } catch (error) {
    // Si hay un error, devolver la respuesta del error
    return error.response || error;
    }
};

export const getAllPostulation = async () => {
    try {
      const adminToken = await getAdminToken(); // Obtener el token de administrador
  
      const headers = {
        Authorization: `Bearer ${adminToken}`,
      };
  
      const response = await axios.get(
        'http://localhost:3000/api/postulation/getAllPostulations',
        { headers }
      );
  
      return response;
    } catch (error) {
      // Si hay un error, devolver la respuesta del error
      return error.response || error;
    }
  };


const getAdminToken = async () => {
    try {
      const adminCredentials = {
        email: 'admin@email.com',
        password: 'admin123',
      };
  
      const adminResponse = await axios.post(
        'http://localhost:3000/api/auth/login',
        adminCredentials
      );
        console.log(adminResponse.data.data.accessToken);
      return adminResponse.data.data.accessToken;
    } catch (error) {
      console.error('Error al obtener el token de administrador:', error);
      throw error; // Puedes manejar este error de la manera que prefieras
    }
  };