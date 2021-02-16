import {consultDate, createDate, getDates} from '../../services/DateService';

const state = {
    dates: {},
    dayConsulted: {
        disabled: true,
        nueve: 0,
        once: 0, 
        unaTarde: 0,
        tresTarde: 0,
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0,
        c5: 0
    }
}

const getters = {
    datesInBd: (state) => {
        return state.dates
    },
    dayConsulted: (state) => {
        return state.dayConsulted
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
            snackbarData.text = 'Cita agendada correctamente';
            dispatch('getUltimateSnackbarState', snackbarData);
            const dataForReSend = {
                dateForSearch: response.data.date
            }
            return dispatch('consultDate', dataForReSend)
            //return commit('dateCreatedSuccessfyully', response.data)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    }
}

const mutations = {
    datesObtainedSuccessfully:(state, dates) => (state.dates = dates),
    dateConsultedSuccessfyully:(state, dayConsulted) => (state.dayConsulted = {
        disabled: false,
        nueve: dayConsulted.filter(hour => hour.hour === "09:00").length,
        once: dayConsulted.filter(hour => hour.hour === "11:00").length,
        unaTarde: dayConsulted.filter(hour => hour.hour === "13:00").length,
        tresTarde: dayConsulted.filter(hour => hour.hour === "15:00").length,
        c1: dayConsulted.filter(room => room.consulting_room == "C1").length,
        c2: dayConsulted.filter(room => room.consulting_room == "C2").length,
        c3: dayConsulted.filter(room => room.consulting_room == "C3").length,
        c4: dayConsulted.filter(room => room.consulting_room == "C4").length,
        c5: dayConsulted.filter(room => room.consulting_room == "C5").length
    }),
    dateConsulteGoneEmpty:(state) => (state.dayConsulted = {
        disabled: false,
        nueve: 0,
        once: 0,
        unaTarde: 0,
        tresTarde: 0,
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0,
        c5: 0
    }),
    dateInputIsEmpty:(state) => (state.dayConsulted = {
        disabled: true,
        nueve: 0,
        once: 0,
        unaTarde: 0,
        tresTarde: 0,
        c1: 0,
        c2: 0,
        c3: 0,
        c4: 0,
        c5: 0
    }),
    //dateCreatedSuccessfyully:(state, newDate) => state.dates.unshift(newDate),
    datesObtainedFailed:(state, error) => (state.user = error)
}

export default {
    state,
    getters,
    actions,
    mutations
}