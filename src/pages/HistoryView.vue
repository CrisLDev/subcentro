<template>
    <v-container fluid class="lighten-5 mb-16 mt-6">
        <v-row>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Enfermedades no Transmisibles</strong>
                            <p v-for="(item, index) in historyToEdit.non_communicable_diseases" :key="index">
                                {{item}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Enfermedades Transmisibles</strong>
                            <p v-for="(item, index) in historyToEdit.sexually_transmitted_diseases" :key="index">
                                {{item}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Enfermedades Degenerativas</strong>
                            <p v-for="(item, index) in historyToEdit.degenerative_diseases" :key="index">
                                {{item}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Adicciones</strong>
                            <p v-for="(item, index) in historyToEdit.adictions" :key="index">
                                {{item}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Alergias</strong>
                            <p v-for="(item, index) in historyToEdit.allergies" :key="index">
                                {{item}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Antibióticos</strong>
                            <p v-for="(item, index) in historyToEdit.antibiotics" :key="index">
                                {{item}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Ha sido Hospitalizado</strong>
                            <p v-for="(item, index) in historyToEdit.has_been_hospitalized" :key="index">
                                {{item}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Enfermedades Respiratorias</strong>
                            <p v-for="(item, index) in historyToEdit.respiratory" :key="index">
                                {{item}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Enfermedades Cardiovasculares</strong>
                            <p v-for="(item, index) in historyToEdit.cardiovascular" :key="index">
                                {{item}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Enfermedades Genitourinarias</strong>
                            <p v-for="(item, index) in historyToEdit.genitourinary" :key="index">
                                {{item}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Enfermedades Endocrinas</strong>
                            <p v-for="(item, index) in historyToEdit.endocrine" :key="index">
                                {{item}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Enfermedades Nerviosas</strong>
                            <p v-for="(item, index) in historyToEdit.nervous" :key="index">
                                {{item}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Enfermedades Musculares</strong>
                            <p v-for="(item, index) in historyToEdit.muscular" :key="index">
                                {{item}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Tipo de Sangre</strong>
                            <p>
                                {{historyToEdit.blood_type}}
                            </p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <strong>Conclusiones</strong>
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
    data: () => ({
    }),
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