<template>
    <v-container fluid class="lighten-5 mb-16">
        <v-row justify="center" class="mb-16">
            <v-col cols="12" md="3" sm="12" class="mt-6" v-for="patient in patientsInBd" :key="patient._id">
                <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">
                            {{patient.age ? patient.age : 'N/A'}}
                        </div>
                        <v-list-item-title class="headline mb-1">
                            {{patient.userName ? patient.userName : 'N/A'}}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{patient.fullName ? patient.fullName : 'N/A'}}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-avatar size="56">
              <img
                alt="user"
                src="https://cdni.iconscout.com/illustration/premium/thumb/doctor-giving-advice-to-patient-2527798-2117453.png"
              >
            </v-avatar>
                    </v-list-item>

                    <v-card-actions>
                    <v-btn
                        outlined
                        rounded
                        text
                        @click="goToPatientPage(patient._id)"
                    >
                        Ver más
                    </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name: "PatientsList",
    computed: {...mapGetters(["patientsInBd"])},
    methods:{
        ...mapActions(["putPatientInPage"]),
        goToPatientPage(id){
            const patient = this.patientsInBd.filter((patient) => patient._id === id)[0];
            this.putPatientInPage(patient);
            this.$router.push('/pacientes/'+id);
        }
    }
}
</script>
