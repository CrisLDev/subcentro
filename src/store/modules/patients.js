import { getAllPatients, getPatientById } from '../../services/PatientService';

const state = {
    patients: {},
    patientSelected: {}
}

const getters = {
    patientsInBd: (state) => {
        return state.patients
    },
    patientSelected: (state) => {
        return state.patientSelected
    }
}

const actions = {
    async getPatientsFromBD({commit}) {
        try {
            const response = await getAllPatients()
            return commit('patientsObtainedSuccessfully', response.data)
        } catch (err) {
            return commit('usersObtainedFailed', err.response.data.msg)
        }
    },
    async putPatientInPage({commit}, patient){
        try {
            if(patient.userName === ''){
                const response = await getPatientById(patient._id);
                console.log('entramos')
                return commit('putPatientInPage', response.data)
            }
            return commit('putPatientInPage', patient)
        } catch (err) {
            return commit('usersObtainedFailed', err.response.data.msg)
        }
    }
}

const mutations = {
    patientsObtainedSuccessfully:(state, patients) => (state.patients = patients),
    putPatientInPage:(state, patient) => (state.patientSelected = patient)
}

export default {
    state,
    getters,
    actions,
    mutations
}