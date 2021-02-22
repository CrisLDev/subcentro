<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <div class="text-center">
          <v-overlay :absolute="absolute" :z-index="zIndex" :value="overlay">
            <v-progress-circular
              :size="50"
              style="color: white"
              :width="7"
              indeterminate
            ></v-progress-circular>
          </v-overlay>
        </div>
                  <v-card class="pt-3 pb-3" v-bind="attrs" v-on="on">
                    <v-icon x-large color="primary">{{ accountClock }}</v-icon>
                    <p class="font-weight-bold mb-0" style="color:#6c63ff">
                      Agendar una cita.
                    </p>
                    <p class="font-weight-bold mb-0 text--primary">
                      ¡Click Aquí!
                    </p>
                  </v-card>
                  
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Crear cita</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-row>
                <v-col sm="6" cols="12">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dateForSearch"
                        label="Dia a consultar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="dateForSearch"
                      :min="new Date().toISOString().substr(0, 10)"
                      @change="save"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                >
                  <v-select
                  v-model="hour"
                    :items="[dayConsulted.nueve < 5 ? '09:00' : '09:00 No disponible', 
                    dayConsulted.once < 5 ? '11:00' : '11:00 No disponible', 
                    dayConsulted.unaTarde < 5 ? '13:00' : '13:00 No disponible',
                    dayConsulted.tresTarde < 5 ? '15:00' : '15:00 No disponible']"
                    label="Hora*"
                    :disabled="dayConsulted.disabled"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
            </v-form>
          <small>Escoja una fecha valida, por favor, no sea IMBÉCIL.</small><br>
          <small>Recuerda guardar el codigo que se presenta al final.</small>
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
            color="blue darken-1"
            text
            @click="submit"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mdiAccountClock} from '@mdi/js';
import {mapGetters,mapActions} from 'vuex';
  export default {
    data: () => ({
      dialog: false,
      accountClock: mdiAccountClock,
      date: null,
      menu: false,
      dateForSearch: '',
      overlay: false,
      absolute: true,
      hour: '',
      zIndex: 9999,
    }),
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      dateForSearch () {
            const dataToSend = {
              dateForSearch: this.dateForSearch
            }
            this.consultDate(dataToSend);
      }
    },
    methods: {
      ...mapActions(["consultDate", "createNewDate", "clearDate", "getUltimateSnackbarState"]),
      save (date) {
        this.$refs.menu.save(date)
      },
      async submit () {
        const dataToSend = {
            dateForSearch: this.dateForSearch,
            hour: this.hour,
            patient_id: this.$store.getters.userLoged._id,
            consulting_room: ''
        }
        if(this.$store.getters.dayConsulted.c1 <= 4){
          dataToSend.consulting_room = 'C1'
        }else if(this.$store.getters.dayConsulted.c2 <= 4){
          dataToSend.consulting_room = 'C2'
        }else if(this.$store.getters.dayConsulted.c3 <= 4){
          dataToSend.consulting_room = 'C3'
        }else if(this.$store.getters.dayConsulted.c4 <= 4){
          dataToSend.consulting_room = 'C4'
        }else if(this.$store.getters.dayConsulted.c5 <= 4){
          dataToSend.consulting_room = 'C5'
        }else {
          const snackbarData = {
                timeout: 2000,
                text: 'Todas las salas ocupadas.',
                snackbar: true
          }
          return this.getUltimateSnackbarState(snackbarData);
        }
        this.createNewDate(dataToSend)
        /*
        if(this.createNewDate(dataToSend)){
          await this.clear();
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          today = yyyy + '-' + mm + '-' + dd;
          this.dateForSearch = today;
          this.dialog = false
        }
        */
      },
      clear () {
        this.hour = '';
      },
    },
    computed:{
  ...mapGetters(["dayConsulted"])
},
  }
</script>