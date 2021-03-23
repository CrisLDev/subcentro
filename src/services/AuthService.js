import axios from 'axios';

const API = process.env.API || 'http://localhost:4123/api';

//const API = 'https://subcentroback.herokuapp.com/api';

export const createUser = async (dataToSend) => {
    return await axios.post(`${API}/auth/register`, dataToSend);
}

export const loginUser = async (dataToSend) => {
    return await axios.post(`${API}/auth/login`, dataToSend)
}

export const reloginUserInReload = async () => {
    return await axios.get(`${API}/auth/me`);
}

export const getAllUsers = async () => {
    return await axios.get(`${API}/auth/users`);
}

export const deleteUserInBd = async (id) => {
    return await axios.delete(`${API}/auth/users/${id}`);
}

export const updateUser = async (dataToSend) => {
    return await axios.put(`${API}/auth/user`, dataToSend)
}

export const uploadPhoto = async (formData) => {
    return await axios.post(`${API}/auth/create`, formData)
}