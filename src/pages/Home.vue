<template>
    <v-container class="lighten-5" id="home">
        <v-row no-gutters align="center" justify="center">
            <v-col md="4" sm="5" cols="12">
              <v-img
                lazy-src="../assets/images/schedule.svg"
                max-height="100%"
                max-width="100%"
                src="../assets/images/schedule.svg"
              ></v-img>
            </v-col>
            <v-col md="8" sm="7" cols="12">
              <v-card max-width="100%" elevation="0">
                <v-card-text>
                  <div>Sistema para agendar citas</div>
                  <p class="display-1 text--primary">
                    Agenda tu cita cuando quieras.
                  </p>
                  <p>Subcentro San Juan</p>
                  <div class="text--primary">
                    Trabajamos continuamente para mejorar la manera en la que ofrecemos nuestros servicios, con esta herramienta puedes agendar tu cita de manera facil y segura.
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12" class="mt-10 mb-16">
              <v-row align="center" justify="center">
                <v-col lg="2" md="4" sm="4" cols="6" align="center">
                  <v-card class="pt-3 pb-3">
                    <v-icon x-large color="primary">{{ accountClock }}</v-icon>
                    <p class="font-weight-bold mb-0" style="color:#6c63ff">
                      Agendar una cita.
                    </p>
                    <p class="font-weight-bold mb-0 text--primary">
                      ¡Click Aquí!
                    </p>
                  </v-card>
                </v-col>
                <v-col lg="2" md="4" sm="4" cols="6" align="center">
                  <v-card class="pt-3 pb-3">
                    <v-icon x-large color="primary">{{ accountDetail }}</v-icon>
                    <p class="font-weight-bold mb-0" style="color:#6c63ff">
                      Consultar una cita.
                    </p>
                    <p class="font-weight-bold mb-0 text--primary">
                      ¡Click Aquí!
                    </p>
                  </v-card>
                </v-col>
                <v-col lg="2" md="4" sm="4" cols="6" align="center">
                  <v-card class="pt-3 pb-3">
                    <v-icon x-large color="primary">{{ accountGroup }}</v-icon>
                    <p class="font-weight-bold mb-0" style="color:#6c63ff">
                      Personal.
                    </p>
                    <p class="font-weight-bold mb-0 text--primary">
                      ¡Click Aquí!
                    </p>
                  </v-card>
                </v-col>
                <v-col lg="2" md="4" sm="4" cols="6" align="center">
                  <v-card class="pt-3 pb-3">
                    <v-icon x-large color="primary">{{ alertCircle }}</v-icon>
                    <p class="font-weight-bold mb-0" style="color:#6c63ff">
                      Más información.
                    </p>
                    <p class="font-weight-bold mb-0 text--primary">
                      ¡Click Aquí!
                    </p>
                  </v-card>
                </v-col>
                <v-col lg="2" md="4" sm="4" cols="6" align="center">
                  <v-card class="pt-3 pb-3">
                    <v-icon x-large color="primary">{{ allInclusive }}</v-icon>
                    <p class="font-weight-bold mb-0" style="color:#6c63ff">
                      Retroalimentación.
                    </p>
                    <p class="font-weight-bold mb-0 text--primary">
                      ¡Click Aquí!
                    </p>
                  </v-card>
                </v-col>
                <v-col lg="2" md="4" sm="4" cols="6" align="center">
                  <v-card class="pt-3 pb-3">
                    <v-icon x-large color="primary">{{ chatQuestion }}</v-icon>
                    <p class="font-weight-bold mb-0" style="color:#6c63ff">
                      Preguntanos.
                    </p>
                    <p class="font-weight-bold mb-0 text--primary">
                      ¡Click Aquí!
                    </p>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" class="mt-10 mb-16">
              <div v-if="info">{{info.length > 0 ? info : 'No hay nada'}}</div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mdiAccountClock, mdiAccountDetails, mdiAccountGroup, mdiAlertCircle, mdiAllInclusive, mdiChatQuestion} from '@mdi/js';
import {getDates} from '../services/DateService';
export default {
  name: 'home',
  components: {
  },
  data: () => ({
      accountClock: mdiAccountClock,
      accountDetail: mdiAccountDetails,
      accountGroup: mdiAccountGroup,
      alertCircle: mdiAlertCircle,
      allInclusive: mdiAllInclusive,
      chatQuestion: mdiChatQuestion,
      info: null
  }),
  async mounted() {
    const books = await getDates();
    console.log(books);
    this.info = books.data;
  },
}
</script>

<style scoped>
#home{
  z-index: 2!important;
}
</style>