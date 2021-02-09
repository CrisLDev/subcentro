import axios from 'axios';

export const isLogged = () => {
    return !!localStorage.getItem('token')
}

export const logout = () => {
    return localStorage.removeItem('token')
}

export const setAuthToken = () => {
    const token = localStorage.getItem('token');
    if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }else{
        delete axios.defaults.headers.common['Authorization']
    }
}