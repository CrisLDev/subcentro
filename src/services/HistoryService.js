import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:4123/api';

//const API_URL = 'https://subcentroback.herokuapp.com/api';

export const createHistory = async (dataToSend) => {
    return await axios.post(`${API_URL}/histories`, dataToSend);
}

export const getHistoriesByPatientId = async (id) => {
    return await axios.get(`${API_URL}/histories/patient/${id}`);
}

export const getHistoryById = async (id) => {
    return await axios.get(`${API_URL}/histories/${id}`);
}

export const deleteHistoryById = async (id) => {
    return await axios.delete(`${API_URL}/histories/${id}`);
}

export const updateHistoryById = async (id, dataToSend) => {
    return await axios.put(`${API_URL}/histories/${id}`, dataToSend);
}

export const updateOnlyOneItemFromHistory = async (historyId, dataToSend) => {
    return await axios.put(`${API_URL}/histories/${historyId}/item`, dataToSend);
}

export const deleteOnlyOneItemFromHistory = async (historyId, itemId, type) => {
    return await axios.put(`${API_URL}/histories/${historyId}/${itemId}/${type}`);
}

export const createOnlyOneItemFromHistory = async (historyId, dataToSend) => {
    return await axios.put(`${API_URL}/histories/${historyId}/create`, dataToSend);
}