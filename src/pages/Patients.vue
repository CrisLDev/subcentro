<template>
    <v-container class="lighten-5 mb-16">
        <PatientsList v-if="patientsInBd.length > 0" />
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PatientsList from '../components/patients/PatientsList';

export default {
    name: "Patients",
    components: {
        PatientsList
    },
    computed: {...mapGetters(["patientsInBd"])},
    methods: {
        ...mapActions(["getPatientsFromBD", "reloginUser"])
    },
    mounted (){
        this.getPatientsFromBD();
        this.reloginUser();
    }
}
</script>