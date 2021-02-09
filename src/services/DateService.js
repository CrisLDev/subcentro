import axios from 'axios';

const API = process.env.API_URL || 'http://localhost:4123/api';

export const getDates = async () => {
    return await axios.get(`${API}/dates`);
}

export const consultDate = async (dataToSend) => {
    return await axios.post(`${API}/dates/consulting`, dataToSend)
}

export const createDate = async (dataToSend) => {
    return await axios.post(`${API}/dates`, dataToSend)
}