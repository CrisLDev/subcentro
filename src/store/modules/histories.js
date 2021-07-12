import {createHistory, deleteHistoryById, getHistoryById, getHistoriesByPatientId, updateHistoryById, updateOnlyOneItemFromHistory, deleteOnlyOneItemFromHistory, createOnlyOneItemFromHistory} from '../../services/HistoryService';
import router from '../../router';

const state = {
    historiesByPatientId: {},
    historyToEdit: {
                non_communicable_diseases: '',
                sexually_transmitted_diseases: '',
                degenerative_diseases: '',
                others: '',
                blood_type: '',
                adictions: '',
                allergies: '',
                antibiotics: '',
                has_been_hospitalized: '',
                respiratory: '',
                cardiovascular: '',
                genitourinary: '',
                endocrine: '',
                nervous: '',
                muscular: '',
                conclusions: '',
                temperature: '',
                pulse: '',
                frequency: '',
                presure: '',
                symptom: '',
                hereditary: '',
                disabilities: ''
    },
    charginHistories: false
}

const getters = {
    historiesInBd: (state) => {
        return state.historiesByPatientId
    },
    historyToEdit: (state) => {
        return state.historyToEdit
    },
    charginHistories: (state) => {
        return state.charginHistories
    },
}

const actions = {
    async getHistoriesFromBDByPatientId({commit, dispatch}, id) {
        try {
            const response = await getHistoriesByPatientId(id)
            dispatch('activateEspecialityInput');
            return commit('historiesObtainedSuccessfully', response.data)
        } catch (err) {
            return commit('histotiesObtainedFailed', err.response.data.msg)
        }
    },
    async createNewHistory({dispatch, commit}, dataToSend) {
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            await createHistory(dataToSend)
            snackbarData.text = 'Historia clínica agregada correctamente';
            dispatch('getUltimateSnackbarState', snackbarData);
            return router.push('/pacientes');
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            commit('putUnLoadingEspecialities');
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async updateHistoryById({dispatch, commit},dataToSend){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await updateHistoryById(dataToSend._id ,dataToSend)
            snackbarData.text = 'Historia clínica actualizada correctamente';
            commit('HistoryUpdatedSuccessfully', response.data);
            dispatch('getUltimateSnackbarState', snackbarData)
            return router.push('/pacientes');
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            commit('putUnLoadingEspecialities');
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async getHistoryById({commit}, id) {
        try {
            const response = await getHistoryById(id)
            return commit('historyObtainedSuccessfully', response.data)
        } catch (err) {
            return commit('especialityObtainedFailed', err.response.data.msg)
        }
    },
    async deleteHistoryById({commit, dispatch}, history_Id){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await deleteHistoryById(history_Id)
            snackbarData.text = 'Historia clínica eliminada correctamente';
            commit('deleteHistoryInStore', response.data._id)
            return dispatch('getUltimateSnackbarState', snackbarData)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async clearEspecialities({commit}){
        return commit('clearEspecialities')
    },
    async updateOnlyOneItemFromHistoryById({dispatch, commit},dataToSend){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await updateOnlyOneItemFromHistory(dataToSend.historyId, dataToSend)
            snackbarData.text = 'Historia clínica actualizada correctamente';
            commit('OneHistoryUpdatedSuccessfully', response.data);
            dispatch('getUltimateSnackbarState', snackbarData)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            commit('putUnLoadingEspecialities');
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async deleteOnlyOneItemFromHistoryById({dispatch, commit},dataToSend){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await deleteOnlyOneItemFromHistory(dataToSend.historyId, dataToSend.itemId, dataToSend.type)
            snackbarData.text = 'Historia clínica actualizada correctamente';
            commit('OneHistoryUpdatedSuccessfully', response.data);
            dispatch('getUltimateSnackbarState', snackbarData)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            commit('putUnLoadingEspecialities');
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async createOnlyOneItemFromHistoryById({dispatch, commit},dataToSend){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await createOnlyOneItemFromHistory(dataToSend.historyId, dataToSend)
            snackbarData.text = 'Historia clínica actualizada correctamente';
            commit('OneHistoryUpdatedSuccessfully', response.data);
            dispatch('getUltimateSnackbarState', snackbarData)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            commit('putUnLoadingEspecialities');
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    }
}

const mutations = {
    historyCreatedSuccessfully:(state, newHistory) => (state.historiesByPatientId.unshift(newHistory)),
    historiesObtainedSuccessfully:(state, histories) => (state.historiesByPatientId = histories),
    histotiesObtainedFailed:(state, error) => (state.historiesByPatientId = error),
    historyObtainedFailed:(state, error) => (state.historiesByPatientId = error),
    historyObtainedSuccessfully: (state, history) => (state.historyToEdit = history),
    updateNon_communicable_diseases (state, non_communicable_diseases) {state.historyToEdit.non_communicable_diseases = non_communicable_diseases},
    updateSexually_transmitted_diseases (state, sexually_transmitted_diseases) {state.historyToEdit.sexually_transmitted_diseases = sexually_transmitted_diseases},
    updateDegenerative_diseases (state, degenerative_diseases) {state.historyToEdit.degenerative_diseases = degenerative_diseases},
    updateOthers (state, others) {state.historyToEdit.others = others},
    updateBlood_type (state, blood_type) {state.historyToEdit.blood_type = blood_type},
    updateAdictions (state, adictions) {state.historyToEdit.adictions = adictions},
    updateAllergies (state, allergies) {state.historyToEdit.allergies = allergies},
    updateAntibiotics (state, antibiotics) {state.historyToEdit.antibiotics = antibiotics},
    updateHas_been_hospitalized (state, has_been_hospitalized) {state.historyToEdit.has_been_hospitalized = has_been_hospitalized},
    updateRespiratory (state, respiratory) {state.historyToEdit.respiratory = respiratory},
    updateCardiovascular (state, cardiovascular) {state.historyToEdit.cardiovascular = cardiovascular},
    updateGenitourinary (state, genitourinary) {state.historyToEdit.genitourinary = genitourinary},
    updateEndocrine (state, endocrine) {state.historyToEdit.endocrine = endocrine},
    updateNervous (state, nervous) {state.historyToEdit.nervous = nervous},
    updateMuscular (state, muscular) {state.historyToEdit.muscular = muscular},
    updateConclusions (state, conclusions) {state.historyToEdit.conclusions = conclusions},
    updateTemperature (state, temperature) {state.historyToEdit.temperature = temperature},
    updateSymptom (state, symptom) {state.historyToEdit.symptom = symptom},
    updateHereditary (state, hereditary) {state.historyToEdit.hereditary = hereditary},
    updateDisabilities (state, disabilities) {state.historyToEdit.disabilities = disabilities},
    updateBreathingFrequency (state, frequency) {state.historyToEdit.frequency = frequency},
    updatePulse (state, pulse) {state.historyToEdit.pulse = pulse},
    updateBloodPresure (state, presure) {state.historyToEdit.presure = presure},
    deleteHistoryInStore: (state, id) => (state.historiesByPatientId = state.historiesByPatientId.filter((history) => history._id !== id), state.charginEspecialities = false),
    putHistoryToEdit (state, data)  {state.historyToEdit = data},
    clearHistoryToEdit: (state) => {state.historyToEdit = {}},
    HistoryUpdatedSuccessfully: (state, historyUpdated) =>{
        const index = state.historiesByPatientId.findIndex(history => history._id === historyUpdated._id);
    
        if (index !== -1) {
          state.historiesByPatientId.splice(index, 1, historyUpdated);
        }
    },
    OneHistoryUpdatedSuccessfully:(state, editedHistory) => (state.historyToEdit = editedHistory),
}

export default {
    state,
    getters,
    actions,
    mutations
}