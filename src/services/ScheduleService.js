import axios from 'axios';

const API_URL = process.env.API_URL || 'http://localhost:4123/api';

//const API_URL = 'https://subcentroback.herokuapp.com/api';

export const getSchedulesByUserId = async (id) => {
    return await axios.get(`${API_URL}/schedules/${id}`);
}

export const deleteSchedule = async (id) => {
    return await axios.delete(`${API_URL}/schedules/${id}`);
}

export const createSchedule = async (dataToSend) => {
    return await axios.post(`${API_URL}/schedules`, dataToSend)
}