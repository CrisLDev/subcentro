import {createSchedule, getSchedules, deleteSchedule} from '../../services/ScheduleService';

const state = {
    schedules: {}
}

const getters = {
    schedulesInBd: (state) => {
        return state.schedules
    }
}

const actions = {
    async getSchedulesFromDb({commit}) {
        try {
            const response = await getSchedules()
            return commit('schedulesObtainedSuccessfully', response.data)
        } catch (err) {
            return commit('schedulesObtainedFailed', err.response.data.msg)
        }
    },
    async createNewSchedule({dispatch, commit}, dataToSend) {
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await createSchedule(dataToSend)
            snackbarData.text = 'Horario agregado correctamente';
            dispatch('getUltimateSnackbarState', snackbarData);
            commit('scheduleCreatedSuccessfully', response.data)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async deleteScheduleById({commit, dispatch}, scheduleId){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await deleteSchedule(scheduleId)
            snackbarData.text = 'Horario eliminado correctamente';
            commit('deleteScheduleInStore', response.data._id)
            dispatch('getSchedulesFromDb')
            return dispatch('getUltimateSnackbarState', snackbarData)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async clearSchedules({commit}){
        return commit('clearSchedules')
    }
}

const mutations = {
    scheduleCreatedSuccessfully:(state, newEschedule) => state.schedules.unshift(newEschedule),
    schedulesObtainedSuccessfully:(state, schedules) => (state.schedules = schedules),
    schedulesObtainedFailed:(state, error) => (state.schedulesa = error),
    deleteScheduleInStore: (state, id) => state.schedules = state.schedules.filter((schedule) => schedule._id !== id),
    clearSchedules: (state) => {state.schedules = {}}
}

export default {
    state,
    getters,
    actions,
    mutations
}