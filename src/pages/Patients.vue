<template>
    <v-container class="lighten-5 mb-16">
        <PatientsList/>
    </v-container>
</template>

<script>
import PatientsList from '../components/patients/PatientsList';

export default {
    name: "Patients",
    components: {
        PatientsList
    },
}
</script>