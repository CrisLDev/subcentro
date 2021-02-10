import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import snackbar from './modules/snackbar';
import date from './modules/date';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        snackbar,
        date
    }
})