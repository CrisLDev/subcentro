<template>
    <v-container>
        <v-row no-gutters align="center" justify="center">
            <v-col cols="12">
              <v-alert border="bottom" colored-border color="primary" elevation="2">
                <v-icon medium >{{mdiInformation}}</v-icon> Información de usuario
              </v-alert>
              <DasboardUserInfo />
            </v-col>
            <v-col cols="12">
              <v-alert border="bottom" colored-border color="primary" elevation="2">
                <v-icon medium>{{mdiNewBox}}</v-icon> Agendar / consultar cita
              </v-alert>
              <DasboardActions />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import DasboardActions from '../components/dashboard/DashboardActions';
import DasboardUserInfo from '../components/dashboard/DashboardUserInfo';
import { mdiInformation } from '@mdi/js';
import { mdiNewBox } from '@mdi/js';
export default {
  components:{
    DasboardActions,
    DasboardUserInfo
  },
    data: function () {
      return {
        numero: 0,
        mdiInformation: mdiInformation,
        mdiNewBox: mdiNewBox
      }
},
    methods: {
        sumar5: function () {
            return this.numero = this.numero + 5;
        }
    },
  mounted () {
      document.addEventListener('keydown', logKey);
    function logKey(e) {
      if (`${e.code}` == "ArrowRight") {
          this.sumar5();
      }
    }
  }
}
</script>