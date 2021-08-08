<template>
    <v-container fluid class="lighten-5 mb-16 mt-6">
        <v-card elevation="2" style="z-index: 3">
            <v-row class="pl-5 pr-5 pt-5 pb-5">
                <v-col
                cols="12"
                v-if="this.$route.params.patient_id"
                class="text-center"
                >
                <h2 class="text-uppercase">Ficha médica</h2>
                </v-col>
                <v-col
                cols="12"
                v-if="this.$route.params.patient_id"
                >
                <span class="text-uppercase">Paciente: </span>
                <span class="text-uppercase">{{this.$store.state.patients.patientSelected.userName}} | </span>
                <span class="text-uppercase">{{this.$store.state.patients.patientSelected.fullName ? this.$store.state.patients.patientSelected.fullName : 'N/A'}}</span>
                </v-col>
                <v-col
                cols="12"
                v-if="this.$route.params.patient_id"
                >
                <label class="caption">Por favor, agregar una coma "," por cada item.</label>
                <v-text-field
                    label="Temperatura"
                    v-model="temperature"
                    placeholder="Ingrese temperatura"
                    rows="2"
                    outlined
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                v-if="this.$route.params.patient_id"
                >
                <label class="caption">Por favor, agregar una coma "," por cada item.</label>
                <v-text-field
                    label="Peso"
                    v-model="weight"
                    placeholder="Ingrese el peso"
                    rows="2"
                    outlined
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                v-if="this.$route.params.patient_id"
                >
                <label class="caption">Por favor, agregar una coma "," por cada item.</label>
                <v-text-field
                    label="Pulso"
                    v-model="pulse"
                    placeholder="Ingrese el pulso"
                    rows="2"
                    outlined
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                v-if="this.$route.params.patient_id"
                >
                <label class="caption">Por favor, agregar una coma "," por cada item.</label>
                <v-text-field
                    label="Presión arterial"
                    v-model="presure"
                    placeholder="Ingrese presión"
                    rows="2"
                    outlined
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                v-if="this.$route.params.patient_id"
                >
                <label class="caption">Por favor, agregar una coma "," por cada item.</label>
                <v-textarea
                    label="Frecuencia respiratoria"
                    v-model="breathe"
                    placeholder="Ingrese respiración"
                    rows="2"
                    outlined
                ></v-textarea>
                </v-col>
                <v-col
                cols="12"
                v-if="this.$route.params.patient_id"
                >
                <label class="caption">Por favor, agregar una coma "," por cada item.</label>
                <v-textarea
                    label="Síntomas"
                    v-model="symptom"
                    placeholder="Ingrese síntomas"
                    rows="2"
                    outlined
                ></v-textarea>
                </v-col>
                <v-col
                cols="12"
                v-if="this.$route.params.patient_id"
                >
                <label class="caption">Por favor, agregar una coma "," por cada item.</label>
                <v-textarea
                    label="Observaciones"
                    v-model="observations"
                    placeholder="Ingrese observaciones"
                    rows="2"
                    outlined
                ></v-textarea>
                </v-col>
                <v-col
                cols="12"
                v-if="this.$route.params.patient_id"
                >
                <label class="caption">Por favor, agregar una coma "," por cada item.</label>
                <v-textarea
                    label="Diagnóstico"
                    v-model="diagnostic"
                    placeholder="Ingrese diagnóstico"
                    rows="2"
                    outlined
                ></v-textarea>
                </v-col>
                <HistoryEditSub />
                <v-col
                cols="12"
                >
                <v-btn elevation="2" color="primary" block @click="submit">Enviar</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-container>

</template>

<script>
import {mapActions} from 'vuex';
import HistoryEditSub from './HistoryEditSub';
  export default {
    components: {
        HistoryEditSub
    },
    computed:{
        diagnostic: {
            get () {
                return this.$store.state.histories.historyToEdit.diagnostic
            },
            set (value) {
            this.$store.commit('updateDiagnostic', value)
            }
        },
        breathe: {
            get () {
                return this.$store.state.histories.historyToEdit.breathe
            },
            set (value) {
            this.$store.commit('updateBreathe', value)
            }
        },
        symptom: {
            get () {
                return this.$store.state.histories.historyToEdit.symptom
            },
            set (value) {
            this.$store.commit('updateSymptom', value)
            }
        },
        observations: {
            get () {
                return this.$store.state.histories.historyToEdit.observations
            },
            set (value) {
            this.$store.commit('updateObservations', value)
            }
        },
        temperature: {
            get () {
                return this.$store.state.histories.historyToEdit.temperature
            },
            set (value) {
            this.$store.commit('updateTemperature', value)
            }
        },
        weight: {
            get () {
                return this.$store.state.histories.historyToEdit.weight
            },
            set (value) {
            this.$store.commit('updateWeight', value)
            }
        },
        pulse: {
            get () {
                return this.$store.state.histories.historyToEdit.pulse
            },
            set (value) {
            this.$store.commit('updatePulse', value)
            }
        },
        presure: {
            get () {
                return this.$store.state.histories.historyToEdit.presure
            },
            set (value) {
            this.$store.commit('updateBloodPresure', value)
            }
        }
    },
    methods: {
      ...mapActions(["createNewHistory", "updateHistoryById", "getHistoryById"]),
      async submit () {
        const id = this.$route.params.patient_id;
        
        if(id){
            const dataToSend = this.$store.state.histories.historyToEdit;
            dataToSend["patient_id"] = this.$route.params.patient_id;
            dataToSend["user_id"] = this.$store.getters.userLoged._id;
            this.createNewHistory(dataToSend);
        }else{
            const dataToSend = {
                _id: this.$store.state.histories.historyToEdit._id,
                observations: this.observations.toString(),
                diagnostic: this.diagnostic.toString(),
                weight: this.weight.toString(),
                patient_id: this.$store.state.histories.historyToEdit.patient_id,
                user_id: this.$store.getters.userLoged._id,
                temperature: this.$store.histories.historyToEdit.temperature.toString(),
                breathe: this.$store.histories.historyToEdit.breathe.toString(),
                pulse: this.$store.histories.historyToEdit.pulse.toString(),
                presure: this.$store.histories.historyToEdit.presure.toString(),
                symptom: this.$store.histories.historyToEdit.symptom.toString(),
            };
            this.updateHistoryById(dataToSend);
        }
      },
    },
    created (){
        const id = this.$route.params.id;
        if(id){
            this.getHistoryById(id);
        }
    }
  }
</script>