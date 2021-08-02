import axios from 'axios';
import { API_URL } from '../../api';

export const createUser = async (dataToSend) => {
    return await axios.post(`${API_URL}/auth/register`, dataToSend);
}

export const getAllDoctors = async () => {
    return await axios.get(`${API_URL}/auth/doctors`);
}

export const loginUser = async (dataToSend) => {
    return await axios.post(`${API_URL}/auth/login`, dataToSend)
}

export const reloginUserInReload = async () => {
    return await axios.get(`${API_URL}/auth/me`);
}

export const getAllUsers = async () => {
    return await axios.get(`${API_URL}/auth/users`);
}

export const deleteUserInBd = async (id) => {
    return await axios.delete(`${API_URL}/auth/users/${id}`);
}

export const updateUser = async (dataToSend) => {
    return await axios.put(`${API_URL}/auth/user`, dataToSend)
}

export const uploadPhoto = async (formData) => {
    return await axios.post(`${API_URL}/auth/create`, formData)
}