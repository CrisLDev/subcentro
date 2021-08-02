import axios from 'axios';
import { API_URL } from '../../api';

export const createUser = async (dataToSend) => {
    return await axios.post(`${API_URL}/auth/register`, dataToSend);
}

export const getAllPatients = async () => {
    return await axios.get(`${API_URL}/auth/patients`);
}

export const getPatientById = async (id) => {
    return await axios.get(`${API_URL}/auth/patients/${id}`);
}