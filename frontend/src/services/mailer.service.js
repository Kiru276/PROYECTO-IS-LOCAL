// mailer.service.js
import axios from 'axios';
import cookies from 'js-cookie';

const sendMail = async (postId, message) => {
    try {
        const token = cookies.get('jwt-auth');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
    
        const response = await axios.post(`http://localhost:3000/api/mailer/send/${postId}`, { mensaje: message }, { headers });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export default sendMail;
