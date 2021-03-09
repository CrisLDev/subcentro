import {consultDate, createConsulting, getConsulting, getConsultingById, updateRoomById} from '../../services/ConsultingService';

const state = {
    consulting_rooms: {},
    newRoom: {},
    roomToEdit: {}
}

const getters = {
    consulting_roomsInBd: (state) => {
        return state.consulting_rooms
    },
    consultingToEdit: (state) => {
        return state.roomToEdit
    },
}

const actions = {
    async getConsultingFromBD({commit}) {
        try {
            const response = await getConsulting()
            return commit('consultingObtainedSuccessfully', response.data)
        } catch (err) {
            return commit('consultingObtainedFailed', err.response.data.msg)
        }
    },
    async getConsultingFromBDById({commit}, room_id) {
        try {
            const response = await getConsultingById(room_id)
            return commit('consultingToEditObtainedSuccessfully', response.data)
        } catch (err) {
            return commit('consultingObtainedFailed', err.response.data.msg)
        }
    },
    async updateRoom({dispatch},dataToSend){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            await updateRoomById(dataToSend.id ,dataToSend)
            snackbarData.text = 'Consultorio actualizado correctamente';
            return dispatch('getUltimateSnackbarState', snackbarData)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
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
    async createNewConsulting({dispatch, commit}, dataToSend) {
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await createConsulting(dataToSend)
            snackbarData.text = 'Consultorio agregado correctamente';
            dispatch('getUltimateSnackbarState', snackbarData);
            commit('consulting_roomCretaedSuccessfully', response.data)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
}

const mutations = {
    consulting_roomCretaedSuccessfully:(state, consulting_room) => state.consulting_rooms.unshift(consulting_room),
    consultingToEditObtainedSuccessfully: (state, room) => (state.roomToEdit = room) ,
    consultingObtainedSuccessfully:(state, consulting_rooms) => (state.consulting_rooms = consulting_rooms),
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
    consultingObtainedFailed:(state, error) => (state.consulting_rooms = error),
    clearDateConsultedByCodeSuccessfyully (state) {state.dateByCode = {}},
    dateConsultedByCodeSuccessfyully: (state, date) => (state.dateByCode = date),
    updateRoomName (state, name) {state.roomToEdit.name = name},
    updateEspeciality (state, especiality) {state.roomToEdit.especiality = especiality},
    updateRoomCode (state, code) {state.roomToEdit.code = code},
}

export default {
    state,
    getters,
    actions,
    mutations
}