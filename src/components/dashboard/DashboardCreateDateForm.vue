<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <div class="text-center" v-if="route != 'admin'">
        <v-overlay :absolute="absolute" :z-index="zIndex" :value="overlay">
          <v-progress-circular
            :size="50"
            style="color: white"
            :width="7"
            indeterminate
          ></v-progress-circular>
        </v-overlay>
      </div>
      <v-card
        class="pt-3 pb-3"
        v-bind="attrs"
        v-on="on"
        v-if="route != 'admin'"
      >
        <v-icon x-large color="primary">{{ accountClock }}</v-icon>
        <p class="font-weight-bold mb-0" style="color:#6c63ff">
          Agendar una cita.
        </p>
        <p class="font-weight-bold mb-0 text--primary">
          ¡Click Aquí!
        </p>
      </v-card>
      <v-btn
        outlined
        rounded
        text
        v-bind="attrs"
        v-on="on"
        v-if="route === 'admin'"
      >
        Nueva cita
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Crear cita</span>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12">
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
              <v-col cols="12">
                <v-select
                  v-model="especiality"
                  :items="items"
                  label="Especialidad*"
                  :disabled="dayConsulted.disablede"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="hour"
                  :items="[
                    dayConsulted.nueve < 4 * dayConsulted.roomsNumber
                      ? '09:00'
                      : '09:00 No disponible',
                    dayConsulted.once < 2 * dayConsulted.roomsNumber
                      ? '11:00'
                      : '11:00 No disponible',
                    dayConsulted.unaTarde < 4 * dayConsulted.roomsNumber
                      ? '13:00'
                      : '13:00 No disponible',
                    dayConsulted.tresTarde < 4 * dayConsulted.roomsNumber
                      ? '15:00'
                      : '15:00 No disponible',
                  ]"
                  label="Hora*"
                  :disabled="dayConsulted.disabledh"
                  required
                ></v-select>
                <v-select
                      v-model="doctorDate"
                      :items="doctorsItems"
                      item-text="name"
                      item-value="id"
                      label="Doctor*"
                      v-if="route === 'admin'"
                      :disabled="dayConsulted.disabledoctor"
                      required
                    ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <small>Escoja una fecha valida, por favor.</small><br />
        <small>Recuerda guardar el código que se presenta al final.</small>
        <div v-if="charginDate">
          <Loading />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Cerrar
        </v-btn>
        <v-btn color="blue darken-1" text @click="submit">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiAccountClock } from "@mdi/js";
import { mapGetters, mapActions } from "vuex";
import Loading from "../Loading";
export default {
  data: () => ({
    dialog: false,
    accountClock: mdiAccountClock,
    date: null,
    menu: false,
    dateForSearch: "",
    overlay: false,
    absolute: true,
    hour: "",
    especiality: "",
    zIndex: 9999,
    items: [],
    route: "",
    doctorDate: '',
    doctorsItems: [],
  }),
  components: { Loading },
  props: {
    id_modal: String,
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
    async especiality() {
      const parts = this.dateForSearch.split('-');
      const day = new Date(parts[0], parts[1], parts[2]);
      const dataToSend = {
        dateForSearch: this.dateForSearch,
        especiality: this.especiality,
        day: day.getDay(),
        admin: false
      };
      if ( this.route === 'admin' ) {
       dataToSend.admin = true;
      }
      this.consultDate(dataToSend);
      const itemsDoctors = [];
      await this.doctorsAvaliable.map((doctorD) => {
        itemsDoctors.push({
          name: !doctorD.fullName
            ? doctorD.userName + " -  N/A"
            : doctorD.userName + " - " + doctorD.fullName,
          id: doctorD._id,
          });
      });
      this.doctorsItems = itemsDoctors;
    },
    async dateForSearch() {
      await this.getEspecialitiesFromBD();
      const items = [];
      await Object.values(this.especialititesInBd).map((especiality) => {
        items.push(especiality.name);
      });
      this.items = items;
      this.especiality = null;
    },
    doctorsInBd() {
      const items2 = [];
      Object.values(this.doctorsInBd).map((doctor) => {
        items2.push({
          name: !doctor.fullName
            ? doctor.userName + " -  N/A"
            : doctor.userName + " - " + doctor.fullName,
          id: doctor._id,
        });
      });
      this.doctors = items2;
    }
  },
  methods: {
    ...mapActions([
      "consultDate",
      "createNewDate",
      "clearDate",
      "getUltimateSnackbarState",
      "getEspecialitiesFromBD",
      "consultRoom",
    ]),
    save(date) {
      this.$refs.menu.save(date);
    },
    async submit() {
      const dataToSend = {
        dateForSearch: this.dateForSearch,
        hour: this.hour,
        patient_id: this.$store.getters.userLoged._id,
        especiality: this.especiality,
        doctor_id: ''
      };
      if ( this.route === 'admin' ) {
       if( this.doctorDate === '' ) {
         const snackbarData = {
          timeout: 2000,
          text: "Agrega un doctor.",
          snackbar: true,
        };
        return this.getUltimateSnackbarState(snackbarData);
       }
       Object.assign(dataToSend, {doctor_id: this.doctorDate});
      if (this.id_modal != '') {
        dataToSend.patient_id = this.id_modal;
      }
      }
      this.createNewDate(dataToSend);
    },
    clear() {
      this.hour = "";
    },
  },
  computed: {
    ...mapGetters([
      "dayConsulted",
      "especialititesInBd",
      "roomsByEspeciality",
      "charginDate",
      "doctorsInBd",
      "doctorsAvaliable"
    ]),
  },
  created() {
    this.route = this.$route.name;
  }
};
</script>
