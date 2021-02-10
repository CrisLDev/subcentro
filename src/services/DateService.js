import axios from 'axios';

//const API = process.env.THEURL || 'http://localhost:4123/api';

const API = 'https://subcentroback.herokuapp.com/api';

export const getDates = async () => {
    return await axios.get(`${API}/dates`);
}

export const consultDate = async (dataToSend) => {
    return await axios.post(`${API}/dates/consulting`, dataToSend)
}

export const createDate = async (dataToSend) => {
    return await axios.post(`${API}/dates`, dataToSend)
}