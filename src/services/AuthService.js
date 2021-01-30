import axios from 'axios';

const API = 'http://localhost:4123/api/auth';

export const createUser = async (dataToSend) => {
    return await axios.post(`${API}/register`, dataToSend);
}

export const loginUser = async (dataToSend) => {
    return await axios.post(`${API}/login`, dataToSend)
}

export const reloginUserInReload = async () => {
    return await axios.get(`${API}/me`);
}