import {createEspeciality, getEspecialities, getEspecialityById, updateEspecialityById, deleteEspecialityById} from '../../services/EspecialitesService';

const state = {
    especialities: {},
    especialityToEdit: {},
    charginEspecialities: false
}

const getters = {
    especialititesInBd: (state) => {
        return state.especialities
    },
    especialityToEdit: (state) => {
        return state.especialityToEdit
    },
    charginEspecialities: (state) => {
        return state.charginEspecialities
    },
}

const actions = {
    async getEspecialitiesFromBD({commit, dispatch}) {
        try {
            const response = await getEspecialities()
            dispatch('activateEspecialityInput');
            return commit('especialitiesObtainedSuccessfully', response.data)
        } catch (err) {
            return commit('especialitiesObtainedFailed', err.response.data.msg)
        }
    },
    async createNewEspeciality({dispatch, commit}, dataToSend) {
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            commit('putLoadingEspecialities');
            const response = await createEspeciality(dataToSend)
            snackbarData.text = 'Especialidad agregado correctamente';
            dispatch('getUltimateSnackbarState', snackbarData);
            commit('especialityCreatedSuccessfully', response.data)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            commit('putUnLoadingEspecialities');
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async getEspecialityFromBDById({commit}, especiality_id) {
        try {
            const response = await getEspecialityById(especiality_id)
            return commit('especialityToEditObtainedSuccessfully', response.data)
        } catch (err) {
            return commit('especialityObtainedFailed', err.response.data.msg)
        }
    },
    async updateEspeciality({dispatch, commit},dataToSend){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            commit('putLoadingEspecialities')
            const response = await updateEspecialityById(dataToSend.id ,dataToSend)
            snackbarData.text = 'Especialidad actualizada correctamente';
            commit('EspecialityUpdatedSuccessfully', response.data); 
            return dispatch('getUltimateSnackbarState', snackbarData)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            commit('putUnLoadingEspecialities');
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async deleteEspeciality({commit, dispatch}, especialityId){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            commit('putLoadingEspecialities');
            const response = await deleteEspecialityById(especialityId)
            snackbarData.text = 'Especialidad eliminada correctamente';
            commit('deleteEspecialityInStore', response.data._id)
            dispatch('getConsultingFromBD')
            return dispatch('getUltimateSnackbarState', snackbarData)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            commit('putUnLoadingEspecialities');
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async clearEspecialities({commit}){
        return commit('clearEspecialities')
    }
}

const mutations = {
    especialityCreatedSuccessfully:(state, newEspeciality) => (state.especialities.unshift(newEspeciality), state.charginEspecialities = false),
    especialitiesObtainedSuccessfully:(state, especialities) => (state.especialities = especialities),
    especialitiesObtainedFailed:(state, error) => (state.especialities = error),
    especialityObtainedFailed:(state, error) => (state.especialities = error),
    especialityToEditObtainedSuccessfully: (state, especiality) => (state.especialityToEdit = especiality),
    updateEspecialityName (state, name) {state.especialityToEdit.name = name},
    deleteEspecialityInStore: (state, id) => (state.especialities = state.especialities.filter((especiality) => especiality._id !== id), state.charginEspecialities = false),
    EspecialityUpdatedSuccessfully: (state, especialityUpdated) =>{
        const index = state.especialities.findIndex(especiality => especiality._id === especialityUpdated._id);
    
        if (index !== -1) {
          state.especialities.splice(index, 1, especialityUpdated);
        }
        state.charginEspecialities = false
    },
    clearEspecialities: (state) => {state.especialities = {}},
    putUnLoadingEspecialities:(state) => (state.charginEspecialities = false),
    putLoadingEspecialities: (state) => (state.charginEspecialities = true),
}

export default {
    state,
    getters,
    actions,
    mutations
}