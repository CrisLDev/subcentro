import { loginUser } from '../../services/AuthService';
import router from '../../router';

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
            return router.push('/');
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    }
}

const mutations = {
    UserLogedSuccessfully:(state, addUser) => (state.user = addUser)
}

export default {
    state,
    getters,
    actions,
    mutations
}