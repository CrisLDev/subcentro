<template>
    <v-container class="lighten-5 mb-16">
        <v-row justify="space-between">
            <v-col cols="12" md="5" sm="12" class="mt-6">
                <v-card elevation="2" style="z-index: 5">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4" v-if="patientSelected.role === 'user'">
                        Paciente
                        </div>
                        <div class="overline mb-1">
                            <strong>Nombre de usuario</strong>
                            <p>{{patientSelected.userName ? patientSelected.userName : 'N/A'}}</p>
                            <strong>Nombre completo</strong>
                            <p>{{patientSelected.fullName ? patientSelected.fullName : 'N/A'}}</p>
                            <strong>Dirección</strong>
                            <p>{{patientSelected.adress ? patientSelected.adress : 'N/A'}}</p>
                            <strong>Edad</strong>
                            <p>{{patientSelected.age ? patientSelected.age : 'N/A'}}</p>
                            <strong>Número de teléfono</strong>
                            <p>{{patientSelected.telephoneNumber ? patientSelected.telephoneNumber : 'N/A'}}</p>
                            <strong>Número de cédula</strong>
                            <p>{{patientSelected.dni ? patientSelected.dni : 'N/A'}}</p>
                        </div>
                    </v-list-item-content>

                    <v-list-item-avatar
                        tile
                        size="80"
                    >
                    <img
                alt="user"
                src="https://cdni.iconscout.com/illustration/premium/thumb/doctor-giving-advice-to-patient-2527798-2117453.png"
              >
                    </v-list-item-avatar>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="5" sm="12" class="mt-6">
                <v-card elevation="2">
                    <v-btn block color="primary" @click="goToNewHistory(patientSelected._id)">
                        Crear Historia Clínica
                    </v-btn>
                    <v-list-item v-for="history in historiesInBd" :key="history._id">
                    <v-list-item-content>
                        <v-list-item-title class="d-flex align-center">
                            <span>Historia clinica {{moment(history.createdAt).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            <div class="ml-auto">
                                <v-btn icon @click="goToViewHistory(history._id, history)">
                                    <v-icon>{{mdiEye}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="goToEditHistory(history._id, history)">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteHistory(history._id)">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
                            </div>
                        </v-list-item-title>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import { mdiPencil } from '@mdi/js';
import { mdiTrashCan } from '@mdi/js';
import { mdiEye } from '@mdi/js';

export default {
    name: "PatientsPage",
    data: () => ({
        mdiPencil: mdiPencil,
        mdiTrashCan: mdiTrashCan,
        mdiEye: mdiEye
    }),
    methods: {
        ...mapActions(["putPatientInPage", "getHistoriesFromBDByPatientId", "deleteHistoryById"]),
        goToNewHistory(id){
            this.$store.commit('putHistoryToEdit', {})
            this.$router.push('/historial/'+id);
        },
        goToEditHistory(id, data){
            this.$store.commit('putHistoryToEdit', data)
            this.$router.push('/historial/editar/'+id);
        },
        deleteHistory(id){
            this.deleteHistoryById(id);
        },
        goToViewHistory(id, data){
            this.$store.commit('putHistoryToEdit', data)
            this.$router.push('/historial/ver/'+id);
        }
    },
    computed: {...mapGetters(["patientSelected", "historiesInBd"])},
    mounted (){
            const patient = {
                _id: this.$route.params.id,
                userName: ''
            }
            this.putPatientInPage(patient);
            this.getHistoriesFromBDByPatientId(patient._id);
    }
}
</script>