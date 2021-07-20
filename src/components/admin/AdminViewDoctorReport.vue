<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          outlined
            rounded
            text
            v-bind="attrs"
            v-on="on"
            @click="getDates"
        >
          Reporte
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Reporte de citas por médico</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <div>
                  <p class="font-weight-bold">Citas totales</p>
                  <p>{{total}}</p>
                </div>
                <div>
                  <p class="font-weight-bold">Citas completadas</p>
                  <p>{{complete}}</p>
                </div>
                <div>
                  <p class="font-weight-bold">Citas no completadas</p>
                  <p>{{incomplete}}</p>
                </div>
                <div>
                  <p class="font-weight-bold">Última cita</p>
                  <p>{{last ? last.patient_id.userName : ''}} - {{last ? moment(last.date).utc().format('DD/MM/YYYY hh:mm:ss') : ''}}</p>
                </div>
                <div>
                  <p class="font-weight-bold">Próxima cita</p>
                  <p>{{theFND ? theFND.patient_id.userName : ''}} - {{theFND ? (theFND.date + ' ' + theFND.hour ) : ''}}</p>
                </div>
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
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    data: () => ({
      dialog: false,
      total: '',
      complete: '',
      incomplete: '',
      last: '',
      theFND: '',
      dateForCheck: ''
    }),
    props: {
      doctor_id: String
    },
    computed: {
      ...mapGetters([
      "datesForDoctorLoged",
    ]),
    },
    watch: {
      datesForDoctorLoged() {
        let date = new Date()
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear();
        if(month < 10 && day < 10){
          this.dateForCheck = `${year}-0${month}-0${day}`;
        }else if(month < 10){
          this.dateForCheck = `${year}-0${month}-${day}`;
        }else if(day < 10){
          this.dateForCheck = `${year}-${month}-0${day}`;
        }else{
          this.dateForCheck = `${year}-${month}-${day}`;
        }
        this.total = this.datesForDoctorLoged.length;
        this.complete = this.datesForDoctorLoged.filter((item) => item.complete === 'si').length;
        this.incomplete = this.datesForDoctorLoged.filter((item) => item.complete === 'no').length;
        this.last = this.datesForDoctorLoged[0];
        this.theFND = this.datesForDoctorLoged.find((item) => item.date > this.dateForCheck);
      }
    },
    methods: {
      ...mapActions([
      "consultDateByDoctorId"
    ]),
    getDates(){
      this.consultDateByDoctorId(this.doctor_id);
    }
    },
  }
</script>