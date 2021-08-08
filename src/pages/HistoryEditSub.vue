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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('temperature', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.temperature" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'temperature', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'temperature')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('weight', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.weight" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'weight', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'antibiotics')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('pulse', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.pulse" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'pulse', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'pulse')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('presure', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.presure" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'presure', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id,  'presure')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('breathe', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.breathe" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'breathe', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'breathe')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('symptom', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.symptom" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'symptom', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'symptom')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('observations', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.observations" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'observations', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'observations')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('diagnostic', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.diagnostic" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'diagnostic', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'diagnostic')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
                            </p>
                            <p v-if="historyToEdit.diagnostic.length <= 0">N/A</p>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
        </v-row>
        <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Agregar enfermedad</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                v-model="newDisease"
                  label="Enfermedad*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
          <v-btn
          v-if="editOrNew === 'edit'"
            color="blue darken-1"
            text
            @click="sendToEdit"
          >
            Editar
          </v-btn>
          <v-btn
          v-if="editOrNew === 'new'"
            color="blue darken-1"
            text
            @click="sendToCreate"
          >
            Crear
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
    </v-container>
</template>

<script>
import { mdiPencil } from '@mdi/js';
import { mdiTrashCan } from '@mdi/js';
import {mapGetters, mapActions} from 'vuex';
  export default {
    data: () => ({
        mdiPencil: mdiPencil,
        mdiTrashCan: mdiTrashCan,
        dialog: false,
        type: '',
        itemId: '',
        newDisease: '',
        editOrNew: ''
    }),
    computed:{...mapGetters(["historyToEdit"])},
    methods: {
        ...mapActions(["getHistoryById", "updateOnlyOneItemFromHistoryById", "deleteOnlyOneItemFromHistoryById", "createOnlyOneItemFromHistoryById"]),
         goToEditItem(id, data, type){
             this.dialog= true;
             this.newDisease = data.data;
             this.itemId = id,
             this.type = type
        },
        sendToEdit(){
                const dataToSend = {
                itemId: this.itemId,
                data: this.newDisease,
                type: this.type,
                historyId: this.historyToEdit._id
            }
            this.updateOnlyOneItemFromHistoryById(dataToSend);
            this.dialog=false;
            this.newDisease = '';
        },
        sendToNew(type){
            this.dialog=true;
            this.type = type
        },
        sendToCreate(){
            const dataToSend = {
                    data: this.newDisease,
                    type: this.type,
                    historyId: this.historyToEdit._id
                }
                this.createOnlyOneItemFromHistoryById(dataToSend);
                this.dialog=false;
                this.newDisease = '';
        },
        deleteItem(id, type){
            const dataToSend = {
                itemId: id,
                historyId: this.historyToEdit._id,
                type: type
            }
            this.deleteOnlyOneItemFromHistoryById(dataToSend);
        },
        goToEditHistory(id){
            this.$store.commit('putHistoryToEdit', this.historyToEdit)
            this.$router.push('/historial/editar/'+id);
        },
    },
    created (){
        const id = this.$route.params.id;
        this.getHistoryById(id);
    }
  }
</script>