import axios from 'axios';

const API = 'http://localhost:4123/api/dates';

export const getDates = async () => {
    return await axios.get(`${API}`);
}

export const consultDate = async (dataToSend) => {
    return await axios.post(`${API}/consulting`, dataToSend)
}

export const createDate = async (dataToSend) => {
    return await axios.post(`${API}`, dataToSend)
}