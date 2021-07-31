import axios from 'axios';

const API = process.env.API || 'http://localhost:4123/api';

//const API = 'https://subcentroback.herokuapp.com/api';

export const getEspecialities = async () => {
    return await axios.get(`${API}/especialities`);
}

export const getEspecialityById = async (id) => {
    return await axios.get(`${API}/especialities/${id}`);
}

export const deleteEspecialityById = async (id) => {
    return await axios.delete(`${API}/especialities/${id}`);
}

export const updateEspecialityById = async (id, dataToSend) => {
    return await axios.put(`${API}/especialities/${id}`, dataToSend);
}

export const createEspeciality = async (dataToSend) => {
    return await axios.post(`${API}/especialities`, dataToSend)
}