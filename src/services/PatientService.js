import axios from 'axios';

//const API = process.env.API || 'http://localhost:4123/api';

const API = 'https://subcentroback.herokuapp.com/api';

export const createUser = async (dataToSend) => {
    return await axios.post(`${API}/auth/register`, dataToSend);
}

export const getAllPatients = async () => {
    return await axios.get(`${API}/auth/patients`);
}

export const getPatientById = async (id) => {
    return await axios.get(`${API}/auth/patients/${id}`);
}