import axios from 'axios';
import store from '../store';

export const isLogged = async () => {
    return await !!localStorage.getItem('token')
}

export const isAdmin = async () => {
    return await store.state.auth.user.role == 'admin'
}

export const isDoctor = async () => {
    return await store.state.auth.user.role == 'doctor'
}

export const logout = async () => {
    return await localStorage.removeItem('token')
}

export const setAuthToken = () => {
    const token = localStorage.getItem('token');
    if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }else{
        delete axios.defaults.headers.common['Authorization']
    }
}