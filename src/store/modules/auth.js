import { loginUser, reloginUserInReload, createUser, updateUser } from '../../services/AuthService';
import router from '../../router';
import {logout, setAuthToken} from '../../utils/auth';

const state = {
    user: {}
}

const getters = {
    userLoged: (state) => {
        return state.user
    }
}

const actions = {
    async loginUser({commit, dispatch}, dataToSend) {
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await loginUser(dataToSend)
            commit('UserLogedSuccessfully', response.data)
            snackbarData.text = 'Usuario logeado correctamente';
            dispatch('getUltimateSnackbarState', snackbarData)
            localStorage.setItem('token', response.data.token);
            return router.push('/dashboard');
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async reloginUser({commit}){
        try {
            setAuthToken();
            const response = await reloginUserInReload();
            const token = localStorage.getItem('token');
            const userData = {...response.data};
            const tokenValue = {token: token};
            Object.assign(userData, tokenValue);
            commit('UserRelogedSuccessfully', userData)
        } catch (err) {
            return logout()
        }
    },
    async logoutUser({commit, dispatch}){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        logout();
        commit('UserDeslogedSuccessfylly');
        snackbarData.text = 'Usuario deslogeado correctamente';
        dispatch('getUltimateSnackbarState', snackbarData)
        return router.push('/');
    },
    async registerUser({dispatch}, dataToSend) {
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await createUser(dataToSend)
            dispatch('UserRegisterSuccessfully', response.data)
            snackbarData.text = 'Usuario registrado correctamente';
            dispatch('getUltimateSnackbarState', snackbarData)
            return router.push('/');
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async updateUserInfo({dispatch}, dataToSend){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            await updateUser(dataToSend)
            snackbarData.text = 'Usuario actualizado correctamente';
            return dispatch('getUltimateSnackbarState', snackbarData)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    }
}

const mutations = {
    UserLogedSuccessfully:(state, addUser) => (state.user = addUser),
    UserRelogedSuccessfully:(state, reAddUser) => (state.user = reAddUser),
    UserDeslogedSuccessfylly:(state) => (state.user = {}),
    updateUsername (state, userName) {state.user.userName = userName},
    updateFullname (state, fullName) {state.user.fullName = fullName},
    updateEmail (state, email) {state.user.email = email},
    updateAdress (state, adress) {state.user.adress = adress},
    updateDate (state, age) {state.user.age = age},
}

export default {
    state,
    getters,
    actions,
    mutations
}