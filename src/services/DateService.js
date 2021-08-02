import axios from 'axios';
import { API_URL } from '../../api';

export const getDates = async () => {
    return await axios.get(`${API_URL}/dates`);
}

export const getDatesForCodeRoom = async (consultingroom) => {
    return await axios.get(`${API_URL}/dates/${consultingroom}`);
}

export const consultDateByCodeService = async (code) => {
    return await axios.get(`${API_URL}/dates/consult/${code}`);
}

export const consultDateByUserLogedId = async (userId) => {
    return await axios.get(`${API_URL}/dates/consult/userLoged/${userId}`);
}

export const consultDateByDoctorId = async (id) => {
    return await axios.post(`${API_URL}/dates/consult/doctorLoged`, id);
}

export const consultDate = async (dataToSend) => {
    return await axios.post(`${API_URL}/dates/consulting`, dataToSend)
}

export const putDoctorId = async (id, doctor) => {
    return await axios.put(`${API_URL}/dates/${id}`, doctor)
}

export const updateDateToComplete = async (data) => {
    return await axios.put(`${API_URL}/dates/check/${data.id}`)
}

export const createDate = async (dataToSend) => {
    return await axios.post(`${API_URL}/dates`, dataToSend)
}