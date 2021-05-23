<template>
    <v-container class="lighten-5 mb-16">
        <PatientsList/>
    </v-container>
</template>

<script>
import PatientsList from '../components/patients/PatientsList';
import {mapActions} from 'vuex';

export default {
    name: "Patients",
    components: {
        PatientsList
    },
    methods: {
        ...mapActions(["getPatientsFromBD"])
    },
    mounted (){
        this.getPatientsFromBD();
    }
}
</script>