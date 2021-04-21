import {createSchedule, getSchedulesByUserId, deleteSchedule} from '../../services/ScheduleService';

const state = {
    schedules: {},
    charginSchedule: false,
}

const getters = {
    schedulesInBd: (state) => {
        return state.schedules
    },
    charginSchedule: (state) => {
        return state.charginSchedule
    },
}

const actions = {
    async getSchedulesFromDbByUserId({dispatch, commit}, doctor_id) {
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            commit('putLoadingSchedule')
            const response = await getSchedulesByUserId(doctor_id)
            if(response.data.length > 0){
                snackbarData.text = 'Horarios consultados correctamente';
                dispatch('getUltimateSnackbarState', snackbarData);
            }else{
                snackbarData.text = 'No hay horarios para mostrar';
                dispatch('getUltimateSnackbarState', snackbarData);
            }
            return commit('schedulesObtainedSuccessfully', response.data)
        } catch (err) {
            commit('putUnloadingSchedule')
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
    schedulesObtainedSuccessfully:(state, schedules) => (state.schedules = schedules, state.charginSchedule = false),
    schedulesObtainedFailed:(state, error) => (state.schedulesa = error),
    deleteScheduleInStore: (state, id) => state.schedules = state.schedules.filter((schedule) => schedule._id !== id),
    clearSchedules: (state) => {state.schedules = {}},
    putLoadingSchedule: (state) => (state.charginSchedule = true),
    putUnloadingSchedule: (state) => (state.charginSchedule = false),
}

export default {
    state,
    getters,
    actions,
    mutations
}