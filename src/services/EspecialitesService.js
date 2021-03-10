import axios from 'axios';

//const API = process.env.API || 'http://localhost:4123/api';

const API = 'https://subcentroback.herokuapp.com/api';

export const getEspecialities = async () => {
    return await axios.get(`${API}/especialities`);
}

export const consultDateByCodeService = async (code) => {
    return await axios.get(`${API}/dates/consult/${code}`);
}

export const consultDate = async (dataToSend) => {
    return await axios.post(`${API}/dates/consulting`, dataToSend)
}

export const createEspeciality = async (dataToSend) => {
    return await axios.post(`${API}/especialities`, dataToSend)
}