const state = {
    snackbar: {}
}

const getters = {
    snackbarUpdated: (state) => {return state.snackbar}
}

const actions = {
    async getUltimateSnackbarState ({commit}, snackbarDate) {
        commit('UpdatedSnackbar', snackbarDate)
    }
}

const mutations = {
    UpdatedSnackbar: (state, updateSnackbar) => (state.snackbar = updateSnackbar)
}

export default {
    state,
    getters,
    actions,
    mutations
}