<template>
    <v-container>
        <v-row no-gutters align="center" justify="center">
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
              </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { mdiAccountClock, mdiAccountDetails} from '@mdi/js';

export default {
    name: 'dashboardActions',
    data: () => ({
        accountClock: mdiAccountClock,
        accountDetail: mdiAccountDetails,
    })
}
</script>