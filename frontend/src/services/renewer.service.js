import axios from 'axios';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

export const createRenewer = async (formData) => {
    try {
        const token = cookies.get('jwt-auth');
        const solicitanteId = jwtDecode(token).id;
        const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data', // Set the content type to 'multipart/form-data'
        };
        const formDataWithUserId = new FormData();

        formDataWithUserId.append('solicitanteId', solicitanteId);
        formDataWithUserId.append('archivo', formData.antecedentesPenales);

        const response = await axios.post(
        'http://localhost:3000/api/renewer/createRenewer',
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

export const getPendingRenewals = async () => {
        try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
    
        const response = await axios.get(
            'http://localhost:3000/api/renewer/getPendingRenewers',
            { headers }
        );
        return response;
        } catch (error) {
        // Si hay un error, devolver la respuesta del error
        return error.response || error;
        }
};

export const getAllRenewers = async () => {
    try {
    const adminToken = await getAdminToken();

    const headers = {
        Authorization: `Bearer ${adminToken}`,
    };

    const response = await axios.get(
        'http://localhost:3000/api/renewer/getAllRenewers',
        { headers }
    );

    return response;
    } catch (error) {
    
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
        return adminResponse.data.data.accessToken;
    } catch (error) {
        console.error('Error al obtener el token de administrador:', error);
        throw error; // Puedes manejar este error de la manera que prefieras
    }
};