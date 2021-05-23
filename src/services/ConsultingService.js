import axios from 'axios';

//const API = process.env.API || 'http:localhost:4123/api';

const API = 'https:subcentroback.herokuapp.com/api';

export const getConsulting = async () => {
    return await axios.get(`${API}/consulting`);
}

export const getConsultingById = async (id) => {
    return await axios.get(`${API}/consulting/${id}`);
}

export const consultRooms = async (dataForSend) => {
    return await axios.post(`${API}/consulting/rooms`, dataForSend);
}

export const deleteRoomById = async (id) => {
    return await axios.delete(`${API}/consulting/${id}`);
}

export const updateRoomById = async (id, dataToSend) => {
    return await axios.put(`${API}/consulting/${id}`, dataToSend);
}

export const consultDateByCodeService = async (code) => {
    return await axios.get(`${API}/dates/consult/${code}`);
}

export const consultDate = async (dataToSend) => {
    return await axios.post(`${API}/dates/consulting`, dataToSend)
}

export const createConsulting = async (dataToSend) => {
    return await axios.post(`${API}/consulting`, dataToSend)
}