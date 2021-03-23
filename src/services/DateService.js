import axios from 'axios';

const API = process.env.API || 'http://localhost:4123/api';

//const API = 'https://subcentroback.herokuapp.com/api';

export const getDates = async () => {
    return await axios.get(`${API}/dates`);
}

export const getDatesForCodeRoom = async (consultingroom) => {
    return await axios.get(`${API}/dates/${consultingroom}`);
}

export const consultDateByCodeService = async (code) => {
    return await axios.get(`${API}/dates/consult/${code}`);
}

export const consultDateByUserLogedId = async (userId) => {
    return await axios.get(`${API}/dates/consult/userLoged/${userId}`);
}

export const consultDate = async (dataToSend) => {
    return await axios.post(`${API}/dates/consulting`, dataToSend)
}

export const createDate = async (dataToSend) => {
    return await axios.post(`${API}/dates`, dataToSend)
}