import axios from 'axios';

const API = process.env.API || 'http://localhost:4123/api';

//const API = 'https://subcentroback.herokuapp.com/api';

export const createHistory = async (dataToSend) => {
    return await axios.post(`${API}/histories`, dataToSend);
}

export const getHistoriesByPatientId = async (id) => {
    return await axios.get(`${API}/histories/patient/${id}`);
}

export const getHistoryById = async (id) => {
    return await axios.get(`${API}/histories/${id}`);
}

export const deleteHistoryById = async (id) => {
    return await axios.delete(`${API}/histories/${id}`);
}

export const updateHistoryById = async (id, dataToSend) => {
    return await axios.put(`${API}/histories/${id}`, dataToSend);
}

export const updateOnlyOneItemFromHistory = async (historyId, dataToSend) => {
    return await axios.put(`${API}/histories/${historyId}/item`, dataToSend);
}

export const deleteOnlyOneItemFromHistory = async (historyId, itemId, type) => {
    return await axios.put(`${API}/histories/${historyId}/${itemId}/${type}`);
}

export const createOnlyOneItemFromHistory = async (historyId, dataToSend) => {
    return await axios.put(`${API}/histories/${historyId}/create`, dataToSend);
}