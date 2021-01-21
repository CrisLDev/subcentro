import axios from 'axios';

const API = 'http://localhost:4123/api/dates';

export const getDates = async () => {
    return await axios.get(`${API}`);
}