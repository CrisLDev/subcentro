<template>
    <v-container fluid class="lighten-5 mb-16 mt-6">
        <v-row>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                            <strong>Temperatura</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.temperature" :key="index">
                                <span>{{item.data}}</span>
                            </p>
                            <p v-if="historyToEdit.temperature.length <= 0">N/A</p>
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
                            <strong>Peso</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.weight" :key="index">
                                <span>{{item.data}}</span>
                            </p>
                            <p v-if="historyToEdit.weight.length <= 0">N/A</p>
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
                            <p class="d-flex" v-for="(item, index) in historyToEdit.pulse" :key="index">
                                <span>{{item.data}}</span>
                            </p>
                            <p v-if="historyToEdit.pulse.length <= 0">N/A</p>
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
                            <strong>Presión Sanguinea</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.presure" :key="index">
                                <span>{{item.data}}</span>
                            </p>
                            <p v-if="historyToEdit.presure.length <= 0">N/A</p>
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
                            <strong>Frecuencia Respiratoria</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.breathe" :key="index">
                                <span>{{item.data}}</span>
                            </p>
                            <p v-if="historyToEdit.breathe.length <= 0">N/A</p>
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
                            <strong>Sintomas</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.symptom" :key="index">
                                <span>{{item.data}}</span>
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
                            <strong>Observaciones</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.observations" :key="index">
                                <span>{{item.data}}</span>
                            </p>
                            <p v-if="historyToEdit.observations.length <= 0">N/A</p>
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
                            <strong>Diagnóstico</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.diagnostic" :key="index">
                                <span>{{item.data}}</span>
                            </p>
                            <p v-if="historyToEdit.diagnostic.length <= 0">N/A</p>
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