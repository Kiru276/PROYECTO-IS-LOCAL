import { ca } from 'date-fns/locale';
import axios from './root.service';
import cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';


export const getExamByID  = async (id) => {
  try {
    const token = cookies.get('jwt-auth');
    const headers = {
        Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`http://localhost:3000/api/exam/getExamById/${id}`, { headers });
    const { status, data } = response;
    if (status === 200) {
      return data.data;
    }
  } catch (error) {
    console.log(error);
  }
}

export const updateExam = async (id, estado) => { 
    try {   
        const token = cookies.get('jwt-auth');
        const headers = {
            Authorization: `Bearer ${token}`,
        };

        const response = await axios.put(`http://localhost:3000/api/exam/updateExam/${id}`, {estado: estado}, { headers });
        const { status, data } = response;

            return data.data;

    } catch (error) {
        console.log(error);
    }
}