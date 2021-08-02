import axios from 'axios';
import { API_URL } from '../../api';

export const getSchedulesByUserId = async (id) => {
    return await axios.get(`${API_URL}/schedules/${id}`);
}

export const deleteSchedule = async (id) => {
    return await axios.delete(`${API_URL}/schedules/${id}`);
}

export const createSchedule = async (dataToSend) => {
    return await axios.post(`${API_URL}/schedules`, dataToSend)
}