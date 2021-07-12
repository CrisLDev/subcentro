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
      incomplete: ''
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
        this.total = this.datesForDoctorLoged.length;
        this.complete = this.datesForDoctorLoged.filter((item) => item.complete === 'si').length;
        this.incomplete = this.datesForDoctorLoged.filter((item) => item.complete === 'no').length;
      }
    },
    methods: {
      ...mapActions([
      "consultDateByDoctorId"
    ]),
    getDates(){
      console.log(this.doctor_id)
      this.consultDateByDoctorId(this.doctor_id);
    }
    },
  }
</script>