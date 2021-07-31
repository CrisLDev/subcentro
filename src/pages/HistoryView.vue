<template>
    <v-container fluid class="lighten-5 mb-16 mt-6">
        <v-row>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                                <strong>Última actualización</strong>
                            </div>
                            <p>{{moment(historyToEdit.updatedAt).format('DD/MM/YYYY hh:mm:ss')}}</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                                <strong>Síntomas</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.symptom" :key="index">
                                <span>{{item.data}} - {{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.symptom.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Temperatura</strong>
                            </div>
                            <p>
                                {{historyToEdit.temperature}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Pulso</strong>
                            </div>
                            <p>
                                {{historyToEdit.pulse}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Presión sanguinea</strong>
                            </div>
                            <p>
                                {{historyToEdit.presure}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Frecuencia cardiaca</strong>
                            </div>
                            <p>
                                {{historyToEdit.frequency}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                                <strong>Enfermedades hereditarias</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.hereditary" :key="index">
                                <span>{{item.data}} - {{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.hereditary.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                                <strong>Discapacidades</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.disabilities" :key="index">
                                <span>{{item.data}} - {{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.disabilities.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                                <strong>Enfermedades no Transmisibles</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.non_communicable_diseases" :key="index">
                                <span>{{item.data}} - {{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.non_communicable_diseases.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Enfermedades Transmisibles</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.sexually_transmitted_diseases" :key="index">
                                <span>{{item.data}} - {{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.sexually_transmitted_diseases.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Enfermedades Degenerativas</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.degenerative_diseases" :key="index">
                                <span>{{item.data}} - {{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.degenerative_diseases.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Adicciones</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.adictions" :key="index">
                                <span>{{item.data}} - {{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.adictions.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Alergias</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.allergies" :key="index">
                                <span>{{item.data}} - {{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.allergies.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Antibióticos</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.antibiotics" :key="index">
                                <span>{{item.data}} - {{moment(item.date).utc().format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.antibiotics.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Ha sido Hospitalizado</strong>
                            </div>
                            {{historyToEdit.has_been_hospitalized}}
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Enfermedades Respiratorias</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.respiratory" :key="index">
                                <span>{{item.data}} - {{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.respiratory.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Enfermedades Cardiovasculares</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.cardiovascular" :key="index">
                                <span>{{item.data}} - {{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.cardiovascular.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Enfermedades Genitourinarias</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.genitourinary" :key="index">
                                <span>{{item.data}} - {{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.genitourinary.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Enfermedades Endocrinas</strong>>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.endocrine" :key="index">
                                <span>{{item.data}} - {{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.endocrine.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Enfermedades Nerviosas</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.nervous" :key="index">
                                <span>{{item.data}} - {{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.nervous.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Enfermedades Musculares</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.muscular" :key="index">
                                <span>{{item.data}} - {{moment(item.date).format('DD/MM/YYYY hh:mm:ss')}}</span>
                            </p>
                            <p v-if="historyToEdit.muscular.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Tipo de Sangre</strong>
                            </div>
                            <p>
                                {{historyToEdit.blood_type}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Conclusiones</strong>
                            </div>
                            <p>
                                {{historyToEdit.conclusions}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
  export default {
    computed:{...mapGetters(["historyToEdit"])},
    methods: {
        ...mapActions(["getHistoryById"]),
    },
    created (){
        const id = this.$route.params.id;
        this.getHistoryById(id);
    }
  }
</script>