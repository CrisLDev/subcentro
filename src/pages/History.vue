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
                <label class="caption">Por favor, agregar una coma "," por cada item.</label>
                <v-textarea
                    label="Enfermedades no transmisibles"
                    v-model="non_communicable_diseases"
                    placeholder="Ingrese enfermedades"
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
                    label="Enfermedades transmisibles"
                    v-model="sexually_transmitted_diseases"
                    placeholder="Ingrese enfermedades"
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
                    label="Enfermedades degenerativas"
                    v-model="degenerative_diseases"
                    placeholder="Ingrese enfermedades"
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
                    label="Otras enfermedades"
                    v-model="others"
                    placeholder="Ingrese enfermedades"
                    rows="2"
                    outlined
                ></v-textarea>
                </v-col>
                <v-col
                cols="12"
                >
                <label class="caption">Ingrese su tipo de sangre.</label>
                <v-text-field
                    label="Tipo de sangre"
                    v-model="blood_type"
                    placeholder="Ingrese tipo"
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
                    label="Adicciones"
                    v-model="adictions"
                    placeholder="Ingrese adicciones"
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
                    label="Alergias"
                    v-model="allergies"
                    placeholder="Ingrese alergias"
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
                    label="Antibioticos"
                    v-model="antibiotics"
                    placeholder="Ingrese antibioticos"
                    rows="2"
                    outlined
                ></v-textarea>
                </v-col>
                <v-col
                cols="12"
                >
                <label class="caption">Puede contestar con un "Si" o "No".</label>
                <v-text-field
                    label="Ha sido hospitalizado"
                    v-model="has_been_hospitalized"
                    placeholder="Ingrese dato"
                    outlined
                ></v-text-field>
                </v-col>
                <v-col
                cols="12"
                v-if="this.$route.params.patient_id"
                >
                <label class="caption">Por favor, agregar una coma "," por cada item.</label>
                <v-textarea
                    label="Respiratorias"
                    v-model="respiratory"
                    placeholder="Ingrese enfermedades"
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
                    label="Cardiovasculares"
                    v-model="cardiovascular"
                    placeholder="Ingrese enfermedades"
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
                    label="Genitourinarias"
                    v-model="genitourinary"
                    placeholder="Ingrese enfermedades"
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
                    label="Endocrinas"
                    v-model="endocrine"
                    placeholder="Ingrese enfermedades"
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
                    label="Nerviosas"
                    v-model="nervous"
                    placeholder="Ingrese enfermedades"
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
                    label="Musculares"
                    v-model="muscular"
                    placeholder="Ingrese enfermedades"
                    rows="2"
                    outlined
                ></v-textarea>
                </v-col>
                <v-col
                cols="12"
                >
                <label class="caption">Ingrese un texto con las conclusiones de la ficha médica.</label>
                <v-textarea
                    label="Concluciones"
                    v-model="conclusions"
                    placeholder="Ingrese enfermedades"
                    rows="4"
                    outlined
                ></v-textarea>
                </v-col>
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
  export default {
    data: () => ({
    }),
    computed:{
        non_communicable_diseases: {
            get () {
                return this.$store.state.histories.historyToEdit.non_communicable_diseases
            },
            set (value) {
            this.$store.commit('updateNon_communicable_diseases', value)
            }
        },
        sexually_transmitted_diseases: {
            get () {
                return this.$store.state.histories.historyToEdit.sexually_transmitted_diseases
            },
            set (value) {
            this.$store.commit('updateSexually_transmitted_diseases', value)
            }
        },
        degenerative_diseases: {
            get () {
                return this.$store.state.histories.historyToEdit.degenerative_diseases
            },
            set (value) {
            this.$store.commit('updateDegenerative_diseases', value)
            }
        },
        others: {
            get () {
                return this.$store.state.histories.historyToEdit.others
            },
            set (value) {
            this.$store.commit('updateOthers', value)
            }
        },
        blood_type: {
            get () {
                return this.$store.state.histories.historyToEdit.blood_type
            },
            set (value) {
            this.$store.commit('updateBlood_type', value)
            }
        },
        adictions: {
            get () {
                return this.$store.state.histories.historyToEdit.adictions
            },
            set (value) {
            this.$store.commit('updateAdictions', value)
            }
        },
        allergies: {
            get () {
                return this.$store.state.histories.historyToEdit.allergies
            },
            set (value) {
            this.$store.commit('updateAllergies', value)
            }
        },
        antibiotics: {
            get () {
                return this.$store.state.histories.historyToEdit.antibiotics
            },
            set (value) {
            this.$store.commit('updateAntibiotics', value)
            }
        },
        has_been_hospitalized: {
            get () {
                return this.$store.state.histories.historyToEdit.has_been_hospitalized
            },
            set (value) {
            this.$store.commit('updateHas_been_hospitalized', value)
            }
        },
        respiratory: {
            get () {
                return this.$store.state.histories.historyToEdit.respiratory
            },
            set (value) {
            this.$store.commit('updateRespiratory', value)
            }
        },
        cardiovascular: {
            get () {
                return this.$store.state.histories.historyToEdit.cardiovascular
            },
            set (value) {
            this.$store.commit('updateCardiovascular', value)
            }
        },
        genitourinary: {
            get () {
                return this.$store.state.histories.historyToEdit.genitourinary
            },
            set (value) {
            this.$store.commit('updateGenitourinary', value)
            }
        },
        endocrine: {
            get () {
                return this.$store.state.histories.historyToEdit.endocrine
            },
            set (value) {
            this.$store.commit('updateEndocrine', value)
            }
        },
        nervous: {
            get () {
                return this.$store.state.histories.historyToEdit.nervous
            },
            set (value) {
            this.$store.commit('updateNervous', value)
            }
        },
        muscular: {
            get () {
                return this.$store.state.histories.historyToEdit.muscular
            },
            set (value) {
            this.$store.commit('updateMuscular', value)
            }
        },
        conclusions: {
            get () {
                return this.$store.state.histories.historyToEdit.conclusions
            },
            set (value) {
            this.$store.commit('updateConclusions', value)
            }
        },
    },
    methods: {
      ...mapActions(["createNewHistory", "updateHistoryById", "getHistoryById"]),
      async submit () {
        const id = this.$route.params.patient_id;
        
        if(id){
            const dataToSend = this.$store.state.histories.historyToEdit;
            dataToSend["patient_id"] = this.$route.params.patient_id;
            dataToSend["user_id"] = this.$store.getters.userLoged._id;
            console.log(dataToSend)
            this.createNewHistory(dataToSend);
        }else{
            const dataToSend = {
                _id: this.$store.state.histories.historyToEdit._id,
                non_communicable_diseases: this.non_communicable_diseases.toString(),
                sexually_transmitted_diseases: this.sexually_transmitted_diseases.toString(),
                degenerative_diseases: this.degenerative_diseases.toString(),
                others: this.others.toString(),
                blood_type: this.blood_type.toString(),
                adictions: this.adictions.toString(),
                allergies: this.allergies.toString(),
                antibiotics: this.antibiotics.toString(),
                has_been_hospitalized: this.has_been_hospitalized.toString(),
                respiratory: this.respiratory.toString(),
                cardiovascular: this.cardiovascular.toString(),
                genitourinary: this.genitourinary.toString(),
                endocrine: this.endocrine.toString(),
                nervous: this.nervous.toString(),
                muscular: this.muscular.toString(),
                conclusions: this.conclusions.toString(),
                patient_id: this.$store.state.histories.historyToEdit.patient_id,
                user_id: this.$store.getters.userLoged._id
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