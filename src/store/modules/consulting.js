import {deleteRoomById, createConsulting, getConsulting, getConsultingById, updateRoomById, consultRooms} from '../../services/ConsultingService';

const state = {
    consulting_rooms: {},
    newRoom: {},
    roomToEdit: {},
    roomsByEspeciality: {}
}

const getters = {
    consulting_roomsInBd: (state) => {
        return state.consulting_rooms
    },
    consultingToEdit: (state) => {
        return state.roomToEdit
    },
    roomsByEspeciality: (state) => {
        return state.roomsByEspeciality
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
    async consultRoom({commit, dispatch}, dataForSend){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await consultRooms(dataForSend)
            console.log(response.data)
            return commit('roomsObtained', response.data)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
        }
    },
    async deleteRoom({commit, dispatch}, roomId){
        const snackbarData = {
            timeout: 2000,
            text: '',
            snackbar: true
        }
        try {
            const response = await deleteRoomById(roomId)
            snackbarData.text = 'Consultorio eliminado correctamente';
            commit('deleteRoomInStore', response.data._id)
            return dispatch('getUltimateSnackbarState', snackbarData)
        } catch (err) {
            if(err)snackbarData.text = err.response.data.msg;
            return dispatch('getUltimateSnackbarState', snackbarData)
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
    roomsObtained: (state, rooms) => (state.roomsByEspeciality = rooms),
    consultingToEditObtainedSuccessfully: (state, room) => (state.roomToEdit = room) ,
    consultingObtainedSuccessfully:(state, consulting_rooms) => (state.consulting_rooms = consulting_rooms),
    consultingObtainedFailed:(state, error) => (state.consulting_rooms = error),
    updateRoomName (state, name) {state.roomToEdit.name = name},
    updateEspeciality (state, especiality) {state.roomToEdit.especiality = especiality},
    updateRoomCode (state, code) {state.roomToEdit.code = code},
    deleteRoomInStore: (state, id) => state.consulting_rooms = state.consulting_rooms.filter((room) => room._id !== id)
}

export default {
    state,
    getters,
    actions,
    mutations
}