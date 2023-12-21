// Importa la instancia de axios de root.service.js
import axios from './root.service';

export const createReserve1 = async (formData) => {
  try {
    // Asegúrate de que el token se obtenga de cookies u otras fuentes
    const token = '...'; // Reemplaza esto con la lógica para obtener el token

    const response = await axios.post(
      '/reserve/createReserve1',
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response;
  } catch (error) {
    // Puedes manejar errores y devolver la respuesta del error
    return error.response || error;
  }
};

export const createReserve2 = async (formData) => {
  try {
    // Asegúrate de que el token se obtenga de cookies u otras fuentes
    const token = '...'; // Reemplaza esto con la lógica para obtener el token

    const response = await axios.post(
      '/reserve/createReserve2',
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response;
  } catch (error) {
    // Puedes manejar errores y devolver la respuesta del error
    return error.response || error;
  }
};

export const createReserve3 = async (formData) => {
  try {
    // Asegúrate de que el token se obtenga de cookies u otras fuentes
    const token = '...'; // Reemplaza esto con la lógica para obtener el token

    const response = await axios.post(
      '/reserve/createReserve3',
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response;
  } catch (error) {
    // Puedes manejar errores y devolver la respuesta del error
    return error.response || error;
  }
};

export const createReserve4 = async (formData) => {
  try {
    // Asegúrate de que el token se obtenga de cookies u otras fuentes
    const token = '...'; // Reemplaza esto con la lógica para obtener el token

    const response = await axios.post(
      '/reserve/createReserve4',
      formData,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response;
  } catch (error) {
    // Puedes manejar errores y devolver la respuesta del error
    return error.response || error;
  }
};

export const getAllReserves = async (formData) => {
  try {
    // Asegúrate de que el token se obtenga de cookies u otras fuentes
    const token = '...'; // Reemplaza esto con la lógica para obtener el token

    const response = await axios.get(
      '/reserve/getAllReserves',
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response;
  } catch (error) {
    // Puedes manejar errores y devolver la respuesta del error
    return error.response || error;
  }
};

export const deleteReserve = async (reserveId) => {
  try {
    const token = '...'; // Reemplaza esto con la lógica para obtener el token

    const response = await axios.delete(`/reserve/deleteReserve/${reserveId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response;
  } catch (error) {
    return error.response || error;
  }
};

export const getAllReservesByUserRut = async (rut) => {
  try {
    const token = '...';

    const response = await axios.get(`/reserve/getAllReservesByUserRut/${rut}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

      return response.data;
  } catch (error) {
      // Puedes manejar errores y devolver la respuesta del error
      return error.response || error;
  }
};

export const getAllReservesByUserId = async (userId) => {
  try {
    const token = '...'; // Reemplaza esto con la lógica para obtener el token

    const response = await axios.get(`/reserve/getAllReservesByUserId/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    // Manejar errores y devolver la respuesta del error
    return error.response || error;
  }
};