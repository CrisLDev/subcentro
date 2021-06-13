<template>
    <v-container fluid class="lighten-5 mb-16 mt-6">
        <v-row>
            <v-col cols="12" style="z-index: 3">
                <v-card elevation="2" height="100%">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-1">
                            <div class="d-flex">
                                <strong>Enfermedades no Transmisibles</strong>
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('non_communicable_diseases', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.non_communicable_diseases" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'non_communicable_diseases', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'non_communicable_diseases')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('sexually_transmitted_diseases', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.sexually_transmitted_diseases" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'sexually_transmitted_diseases', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'sexually_transmitted_diseases')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('degenerative_diseases', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.degenerative_diseases" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'degenerative_diseases', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'degenerative_diseases')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('adictions', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.adictions" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'adictions', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'adictions')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('allergies', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.allergies" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'allergies', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'allergies')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('antibiotics', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.antibiotics" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'antibiotics', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'antibiotics')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="goToEditHistory(historyToEdit._id)">Editar</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.has_been_hospitalized" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
                            </p>
                            <p v-if="historyToEdit.has_been_hospitalized.length <= 0">N/A</p>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('respiratory', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.respiratory" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'respiratory', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'respiratory')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('cardiovascular', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.cardiovascular" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'cardiovascular', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id,  'cardiovascular')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('genitourinary', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.genitourinary" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'genitourinary', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'genitourinary')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong>Enfermedades Endocrinas</strong>
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('endocrine', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.endocrine" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'endocrine', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'endocrine')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('nervous', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.nervous" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'nervous', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'nervous')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="sendToNew('muscular', editOrNew = 'new')">Nuevo</strong>
                            </div>
                            <p class="d-flex" v-for="(item, index) in historyToEdit.muscular" :key="index">
                                <span>{{item.data}}</span>
                                <v-btn icon class="ml-2" @click="goToEditItem(item._id, item, 'muscular', editOrNew = 'edit')">
                                    <v-icon>{{mdiPencil}}</v-icon>
                                </v-btn>
                                <v-btn icon class="ml-2" @click="deleteItem(item._id, 'muscular')">
                                    <v-icon>{{mdiTrashCan}}</v-icon>
                                </v-btn>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="goToEditHistory(historyToEdit._id)">Editar</strong>
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
                            <strong style="cursor: pointer" class="ml-auto" @click="goToEditHistory(historyToEdit._id)">Editar</strong>
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
        <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
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
        disease: '',
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