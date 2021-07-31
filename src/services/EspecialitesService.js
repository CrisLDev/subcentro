import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:4123/apiL';

//const API_URL = 'https://subcentroback.herokuapp.com/api';

export const getEspecialities = async () => {
    return await axios.get(`${API_URL}/especialities`);
}

export const getEspecialityById = async (id) => {
    return await axios.get(`${API_URL}/especialities/${id}`);
}

export const deleteEspecialityById = async (id) => {
    return await axios.delete(`${API_URL}/especialities/${id}`);
}

export const updateEspecialityById = async (id, dataToSend) => {
    return await axios.put(`${API_URL}/especialities/${id}`, dataToSend);
}

export const createEspeciality = async (dataToSend) => {
    return await axios.post(`${API_URL}/especialities`, dataToSend)
}