import {consultDate, createDate, getDates, consultDateByCodeService, getDatesForCodeRoom, consultDateByUserLogedId, consultDateByDoctorId, putDoctorId,updateDateToComplete} from '../../services/DateService';

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
    dateByCode: {},
    datesForUserLoged: {},
    datesForDoctorLoged: {}
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
    },
    datesForUserLoged: (state) => {
        return state.datesForUserLoged
    },
    datesForDoctorLoged: (state) => {
        return state.datesForDoctorLoged
    },
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
    async getDatesForCodeRoom({dispatch, commit}, code){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            await commit('putLoadingDate');
            const response = await getDatesForCodeRoom(code);
            if(response.data.length > 0){
                snackbarData.text = 'Citas consultados correctamente';
                dispatch('getUltimateSnackbarState', snackbarData);
            }else{
                snackbarData.text = 'No hay citas para mostrar';
                dispatch('getUltimateSnackbarState', snackbarData);
            }
            return commit('datesForCodeRoomObtainedSuccessfully', response.data)
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
    async createNewDate({commit, dispatch}, dataToSend) {
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            await commit('putLoadingDate');
            const response = await createDate(dataToSend)
            snackbarData.text = 'Cita agendada correctamente, por favor guarda este codigo, '+response.data.code;
            dispatch('getUltimateSnackbarState', snackbarData);
            const dataForReSend = {
                dateForSearch: response.data.date,
                especiality: response.data.especiality,
                code: response.data.consulting_room
            }
            commit('dateCreatedSuccessfyully')
            return dispatch('consultDate', dataForReSend)
            //return dispatch('clearEspecialities')
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            await commit('putUnloadingDate');
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
            await commit('putLoadingDate');
            const response = await consultDateByCodeService(code)
            return await commit('dateConsultedByCodeSuccessfyully', response.data);
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            await commit('putUnloadingDate');
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async activateEspecialityInput({commit}){
        return await commit('activateEspecialityInputa')
    },
    async activateRoomsInputa({commit}){
        return await commit('activateRoomsInputa')
    },
    async consultDateByUserLogedId({commit, dispatch}, userId){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            await commit('putLoadingDate');
            const response = await consultDateByUserLogedId(userId)
            return await commit('datesObtainedForUserLogedSuccessfully', response.data);
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async putDoctorId({commit, dispatch}, data){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await putDoctorId(data.id, data)
            snackbarData.text = 'Cita editada correctamente.';
            dispatch('getUltimateSnackbarState', snackbarData)
            console.log(response.data)
            await commit('doctorEstablished', response.data);
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async consultDateByDoctorId({commit, dispatch}, doctorId){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const data = {
                id: doctorId
            }
            const response = await consultDateByDoctorId(data)
            return await commit('datesObtainedForDoctorLogedSuccessfully', response.data);
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async updateCompleteDate({dispatch}, id){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const data = {
                id: id
            }
            const response = await updateDateToComplete(data)
            snackbarData.text = 'Cita editada correctamente.';
            dispatch('getUltimateSnackbarState', snackbarData)
            return await dispatch('taskMarkAsComplete', response.data);
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
}

const mutations = {
    datesObtainedSuccessfully:(state, dates) => (state.dates = dates),
    doctorEstablished: (state, dateUp) => {
        state.dates.splice(state.dates.findIndex((date) => date._id = dateUp._id), 1);
        state.dates.unshift(dateUp)
    },
    datesObtainedForUserLogedSuccessfully:(state, dates) => (state.datesForUserLoged = dates, state.charginDate = false),
    datesObtainedForDoctorLogedSuccessfully:(state, dates) => (state.datesForDoctorLoged = dates),
    datesForCodeRoomObtainedSuccessfully:(state, dates) => (state.dates = dates, state.charginDate = false),
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
    dateCreatedSuccessfyully:(state) => (state.charginDate = false),
    datesObtainedFailed:(state, error) => (state.user = error),
    clearDateConsultedByCodeSuccessfyully (state) {state.dateByCode = {}},
    dateConsultedByCodeSuccessfyully: (state, date) => (state.dateByCode = date, state.charginDate = false),
    putLoadingDate: (state) => (state.charginDate = true),
    putUnloadingDate: (state) => (state.charginDate = false),
}

export default {
    state,
    getters,
    actions,
    mutations
}