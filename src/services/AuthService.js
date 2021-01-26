import axios from 'axios';

const API = 'http://localhost:4123/api/auth';

export const createUser = async (dataToSend) => {
    return await axios.post(`${API}/register`, dataToSend);
}