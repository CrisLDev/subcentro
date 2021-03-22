import {consultDate, createDate, getDates, consultDateByCodeService} from '../../services/DateService';

const state = {
    dates: {},
    dayConsulted: {
        disabledh: true,
        disablede: true,
        disabledc: true,
        nueve: 0,
        once: 0, 
        unaTarde: 0,
        tresTarde: 0,
        roomsNumber: 0
    },
    charginDate: false,
    dateByCode: {}
}

const getters = {
    datesInBd: (state) => {
        return state.dates
    },
    dayConsulted: (state) => {
        return state.dayConsulted
    },
    dateCode: (state) => {
        return state.dateByCode
    },
    charginDate: (state) => {
        return state.charginDate
    }
}

const actions = {
    async getDatesFromBD({commit}) {
        try {
            const response = await getDates()
            return commit('datesObtainedSuccessfully', response.data)
        } catch (err) {
            return commit('datesObtainedFailed', err.response.data.msg)
        }
    },
    async consultDate({commit}, dataToSend) {
        try {
            const response = await consultDate(dataToSend)
            console.log(response.data)
            return await commit('dateConsultedSuccessfyully', response.data)
        } catch (err) {
            await consultDate(dataToSend)
            return commit('dateConsulteGoneEmpty')
        }
    },
    async clearDate({commit}) {
        return await commit('dateInputIsEmpty')
    },
    async createNewDate({dispatch}, dataToSend) {
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await createDate(dataToSend)
            snackbarData.text = 'Cita agendada correctamente, por favor guarda este codigo, '+response.data.code;
            dispatch('getUltimateSnackbarState', snackbarData);
            const dataForReSend = {
                dateForSearch: response.data.date,
                especiality: response.data.especiality,
                code: response.data.consulting_room
            }
            return dispatch('consultDate', dataForReSend)
            //return commit('dateCreatedSuccessfyully', response.data)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async consultDateByCode({commit, dispatch}, code) {
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            await commit('putLoading');
            const response = await consultDateByCodeService(code)
            return await commit('dateConsultedByCodeSuccessfyully', response.data);
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async activateEspecialityInput({commit}){
        return await commit('activateEspecialityInputa')
    },
    async activateRoomsInputa({commit}){
        return await commit('activateRoomsInputa')
    }
}

const mutations = {
    datesObtainedSuccessfully:(state, dates) => (state.dates = dates),
    dateConsultedSuccessfyully:(state, dayConsulted) => (state.dayConsulted = {
        disabledh: false,
        disablede: false,
        disabledc: false,
        nueve: dayConsulted.book.filter(hour => hour.hour === "09:00").length,
        once: dayConsulted.book.filter(hour => hour.hour === "11:00").length,
        unaTarde: dayConsulted.book.filter(hour => hour.hour === "13:00").length,
        tresTarde: dayConsulted.book.filter(hour => hour.hour === "15:00").length,
        roomsNumber: dayConsulted.rooms.length
    }),
    dateConsulteGoneEmpty:(state) => (state.dayConsulted = {
        disabledh: false,
        disablede: false,
        disabledc: false,
        nueve: 0,
        once: 0,
        unaTarde: 0,
        tresTarde: 0,
        consultorios: 0,
        roomsNumber: 0
    }),
    activateEspecialityInputa:(state) => (state.dayConsulted = {
        disabledh: true,
        disablede: false,
        disabledc: true,
        roomsNumber: 0,
        nueve: 0,
        once: 0,
        unaTarde: 0,
        tresTarde: 0,
        consultorios: 0}),
    activateRoomsInputa:(state) => (state.dayConsulted = {
        disabledh: true,
        disablede: false,
        disabledc: false,
        roomsNumber: 0,
        nueve: 0,
        once: 0,
        unaTarde: 0,
        tresTarde: 0,
        consultorios: 0}),
    dateInputIsEmpty:(state) => (state.dayConsulted = {
        disabledh: false,
        disablede: false,
        disabledc: false,
        roomsNumber: 0,
        nueve: 0,
        once: 0,
        unaTarde: 0,
        tresTarde: 0,
        consultorios: 0
    }),
    //dateCreatedSuccessfyully:(state, newDate) => state.dates.unshift(newDate),
    datesObtainedFailed:(state, error) => (state.user = error),
    clearDateConsultedByCodeSuccessfyully (state) {state.dateByCode = {}},
    dateConsultedByCodeSuccessfyully: (state, date) => (state.dateByCode = date, state.charginDate = false),
    putLoading: (state) => (state.charginDate = true),
}

export default {
    state,
    getters,
    actions,
    mutations
}