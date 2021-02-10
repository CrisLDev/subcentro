<template>
    <v-container>
        <v-row no-gutters align="center" justify="center">
            <v-col cols="12" class="mt-10 mb-16">
              <v-row align="center" justify="center">
                <v-col lg="4" md="4" sm="4" cols="6" align="center">
                  <DashboardCreateDateForm/>
                </v-col>
                <v-col lg="4" md="4" sm="4" cols="6" align="center">
                  <DashboardConsultDateForm/>
                </v-col>
              </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import DashboardCreateDateForm from '../dashboard/DashboardCreateDateForm';
import DashboardConsultDateForm from '../dashboard/DashboardConsultDateForm';

export default {
    components: {
      DashboardCreateDateForm,
      DashboardConsultDateForm
    }
}
</script>