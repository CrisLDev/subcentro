import axios from 'axios';

const API = process.env.API_URL || 'http://localhost:4123/api';

export const createUser = async (dataToSend) => {
    return await axios.post(`${API}/auth/register`, dataToSend);
}

export const loginUser = async (dataToSend) => {
    return await axios.post(`${API}/auth/login`, dataToSend)
}

export const reloginUserInReload = async () => {
    return await axios.get(`${API}/auth/me`);
}