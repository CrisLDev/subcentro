import axios from 'axios';
import store from '../store';

export const isLogged = () => {
    return !!localStorage.getItem('token')
}

export const isAdmin = () => {
    return store.state.auth.user.role == 'admin'
}

export const isDoctor = () => {
    return store.state.auth.user.role == 'doctor'
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