import axios from 'axios';

const API = process.env.API || 'http://localhost:4123/api';

//const API = 'https://subcentroback.herokuapp.com/api';

export const getSchedulesByUserId = async (id) => {
    return await axios.get(`${API}/schedules/${id}`);
}

export const deleteSchedule = async (id) => {
    return await axios.delete(`${API}/schedules/${id}`);
}

export const createSchedule = async (dataToSend) => {
    return await axios.post(`${API}/schedules`, dataToSend)
}