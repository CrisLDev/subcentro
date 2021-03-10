import { loginUser, reloginUserInReload, createUser, updateUser, getAllUsers, deleteUserInBd } from '../../services/AuthService';
import router from '../../router';
import {logout, setAuthToken} from '../../utils/auth';

const state = {
    user: {},
    users: {},
    userToEdit:{}
}

const getters = {
    userLoged: (state) => {
        return state.user
    },
    usersInBd: (state) => {
        return state.users
    }
}

const actions = {
    async getusersFromBD({commit}) {
        try {
            const response = await getAllUsers()
            return commit('usersObtainedSuccessfully', response.data)
        } catch (err) {
            return commit('usersObtainedFailed', err.response.data.msg)
        }
    },
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
    async registerUser({commit,dispatch}, dataToSend) {
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await createUser(dataToSend)
            snackbarData.text = 'Usuario registrado correctamente';
            dispatch('getUltimateSnackbarState', snackbarData)
            const registerRoute = router.currentRoute.name;
            if(registerRoute == 'admin'){
                commit('UserRegisterSuccessfully', response.data)
            }else{
                dispatch('UserRegisterSuccessfully', response.data)
            }
            if(registerRoute != 'admin'){
                return router.push('/');
            }
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
            snackbarData.text = 'Consultorio actualizado correctamente';
            return dispatch('getUltimateSnackbarState', snackbarData)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async deleteUser({commit, dispatch}, user_id) {
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await deleteUserInBd(user_id);
            commit('deleteItemInStore', response.data._id)
            snackbarData.text = 'Usuario eliminado correctamente';
            dispatch('getUltimateSnackbarState', snackbarData)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
}

const mutations = {
    UserRegisterSuccessfully:(state, newUser) => state.users.push(newUser),
    usersObtainedSuccessfully:(state, users) => (state.users = users),
    usersObtainedFailed:(state, error) => (state.user = error),
    UserLogedSuccessfully:(state, addUser) => (state.user = addUser),
    UserRelogedSuccessfully:(state, reAddUser) => (state.user = reAddUser),
    UserDeslogedSuccessfylly:(state) => (state.user = {}),
    updateUsername (state, userName) {state.user.userName = userName},
    updateFullname (state, fullName) {state.user.fullName = fullName},
    updateEmail (state, email) {state.user.email = email},
    updateAdress (state, adress) {state.user.adress = adress},
    updateDate (state, age) {state.user.age = age},
    updateTelephoneNumber (state, telephoneNumber) {state.user.telephoneNumber = telephoneNumber},
    userToEditUpdateUsername (state, userName) {state.userToEdit.userName = userName},
    userToEditUpdateFullname (state, fullName) {state.userToEdit.fullName = fullName},
    userToEditUpdateEmail (state, email) {state.userToEdit.email = email},
    userToEditUpdateAdress (state, adress) {state.userToEdit.adress = adress},
    userToEditUpdateDate (state, age) {state.userToEdit.age = age},
    userToEditUpdateTelephoneNumber (state, telephoneNumber) {state.userToEdit.telephoneNumber = telephoneNumber},
    userToEditUpdateRole (state, role) {state.userToEdit.role = role},
    loadUserToEdit: (state, id) => state.userToEdit = state.users.filter(user => user._id === id)[0],
    deleteItemInStore: (state, id) => state.users = state.users.filter((user) => user._id !== id)
}

export default {
    state,
    getters,
    actions,
    mutations
}