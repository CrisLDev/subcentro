import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:4123/api';

//const API_URL = 'https://subcentroback.herokuapp.com/api';

export const getConsulting = async () => {
    return await axios.get(`${API_URL}/consulting`);
}

export const getConsultingById = async (id) => {
    return await axios.get(`${API_URL}/consulting/${id}`);
}

export const consultRooms = async (dataForSend) => {
    return await axios.post(`${API_URL}/consulting/rooms`, dataForSend);
}

export const deleteRoomById = async (id) => {
    return await axios.delete(`${API_URL}/consulting/${id}`);
}

export const updateRoomById = async (id, dataToSend) => {
    return await axios.put(`${API_URL}/consulting/${id}`, dataToSend);
}

export const consultDateByCodeService = async (code) => {
    return await axios.get(`${API_URL}/dates/consult/${code}`);
}

export const consultDate = async (dataToSend) => {
    return await axios.post(`${API_URL}/dates/consulting`, dataToSend)
}

export const createConsulting = async (dataToSend) => {
    return await axios.post(`${API_URL}/consulting`, dataToSend)
}