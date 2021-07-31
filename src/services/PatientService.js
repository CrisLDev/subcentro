import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:4123/api';

//const API_URL = 'https://subcentroback.herokuapp.com/api';

export const createUser = async (dataToSend) => {
    return await axios.post(`${API_URL}/auth/register`, dataToSend);
}

export const getAllPatients = async () => {
    return await axios.get(`${API_URL}/auth/patients`);
}

export const getPatientById = async (id) => {
    return await axios.get(`${API_URL}/auth/patients/${id}`);
}