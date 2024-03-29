import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import snackbar from './modules/snackbar';
import date from './modules/date';
import consulting from './modules/consulting';
import especialities from './modules/especialities';
import schedules from './modules/schedules';
import histories from './modules/histories';
import patients from './modules/patients';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        snackbar,
        date,
        consulting,
        especialities,
        schedules,
        histories,
        patients
    }
})