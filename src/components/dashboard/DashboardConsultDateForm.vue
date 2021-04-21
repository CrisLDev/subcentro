<template>
    <div>
      <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
                  <v-card class="pt-3 pb-3" v-bind="attrs" v-on="on">
                    <v-icon x-large color="primary">{{ accountDetail }}</v-icon>
                    <p class="font-weight-bold mb-0" style="color:#6c63ff">
                      Consultar una cita.
                    </p>
                    <p class="font-weight-bold mb-0 text--primary">
                      ¡Click Aquí!
                    </p>
                  </v-card>
                  
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Consultar cita</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-container
    class="px-0"
    fluid
  >
    <v-radio-group class="mb-0 mt-0 pt-0 pb-0" v-model="radioGroup" @change="showOrNotInput">
      <v-radio
        label="Consultar por código"
        name="radioGroup"
        :value="1"
      ></v-radio>
      <v-radio
        label="Consultar todo"
        name="radioGroup"
        :value="2"
      ></v-radio>
    </v-radio-group>
  </v-container>
              <v-col
                cols="12"
                id="inputCode"
                class="d-block mb-0 mt-0 pt-0 pb-0"
              >
                <v-text-field
                v-model="code"
                  label="Codigo para consultar*"
                  class="mb-0 mt-0 pt-0 pb-0"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                id="inputCode"
                class="d-block mb-0 mt-0 pt-0 pb-0"
              >
                <v-btn block color="primary" id="btnDate" class="d-none mb-5" @click="showCalendarDialog">
                  Ver mis citas
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
          <small>*Campos indicados son requeridos</small>
          <div v-if="charginDate">
            <Loading/>
          </div>
          <v-container v-if="dateCode.date">
            <p>DATOS CONSULTADOS</p>
            <p>Fecha: {{dateCode.date}}</p>
            <p>Hora: {{dateCode.hour}}</p>
            <p>Consultorio: {{dateCode.consulting_room}}</p>
            <p>Especialidad: {{dateCode.especiality}}</p>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeD"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submit"
          >
            Consultar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div>
          <v-dialog
            v-model="dialog5"
            width="100%"
            class="d-block"
          >
            <v-card>
        <v-card-title>
          <span class="headline">Calendario de tus citas</span>
        </v-card-title>
        <v-card-text>
          <v-container>
                <Calendar/>
          </v-container>
          <small>* Indica campos requeridos. </small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog5 = false"
          >
            Cerrar
          </v-btn>
          <!--
          <v-btn
            color="blue darken-1"
            text
            @click="showMyDates"
          >
            Enviar
          </v-btn>-->
        </v-card-actions>
      </v-card>
          </v-dialog>
        </div>
    </div>
</template>

<script>
import Loading from '../Loading';
import {mdiAccountDetails} from '@mdi/js';
import {mapGetters,mapActions} from 'vuex';
import Calendar from './Calendar';
  export default {
    components:{
      Calendar,
      Loading
    },
    data: () => ({
      dialog5: false,
      dialog: false,
      accountDetail: mdiAccountDetails,
      code: '',
      radioGroup: 1,
    }),
    methods: {
      ...mapActions(["consultDateByCode", "getUltimateSnackbarState", "consultDateByUserLogedId"]),
      submit(){
        if(this.code == ''){
            const snackbarData = {
                timeout: 2000,
                text: 'El campo no puede estar vacio.',
                snackbar: true
            }
            return this.getUltimateSnackbarState(snackbarData);
        }
        this.consultDateByCode(this.code);
      },
      closeD(){
        this.dialog = false;
        this.$store.commit('clearDateConsultedByCodeSuccessfyully')
      },
      async showOrNotInput(){
        if(this.radioGroup == 1){
          document.getElementById("inputCode").classList.replace("d-none", "d-block")
          document.getElementById("btnDate").classList.replace("d-block", "d-none")
        }
        if(this.radioGroup == 2){
          document.getElementById("inputCode").classList.replace("d-block", "d-none")
          document.getElementById("btnDate").classList.replace("d-none", "d-block")
        }
      },
      async showCalendarDialog(){
        await this.showMyDates();
        this.dialog = false;
        this.dialog5 = true;
      },
      async showMyDates(){
        await this.consultDateByUserLogedId(this.$store.getters.userLoged._id);
      }
    },
    computed:{
      ...mapGetters(["dateCode", "charginDate"])
    }
  }
</script>