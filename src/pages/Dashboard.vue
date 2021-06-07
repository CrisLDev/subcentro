<template>
    <v-container class="lighten-5 mb-16">
        <v-row no-gutters align="center" justify="center">
            <v-col cols="12">
              <v-alert border="bottom" colored-border color="primary" elevation="2">
                <v-icon medium >{{mdiInformation}}</v-icon> Información de usuario
              </v-alert>
              <DasboardUserInfo />
            </v-col>
            <v-col cols="12" v-if="this.$store.getters.userLoged.role == 'user'">
              <v-alert border="bottom" colored-border color="primary" elevation="2">
                <v-icon medium>{{mdiNewBox}}</v-icon> Agendar / consultar cita
              </v-alert>
              <DashboardAction />
            </v-col>
              <div class="text-uppercase font-weight-bold" v-if="this.$store.getters.userLoged.role == 'doctor' && (!this.$store.state.auth.user.fullName || !this.$store.state.auth.user.adress ||!this.$store.state.auth.user.age || !this.$store.state.auth.user.telephoneNumber || !this.$store.state.auth.user.dni)">Debes completar toda tu información para las funciones de tu rol.</div>
        </v-row>
    </v-container>
</template>

<script>
import DashboardAction from '../components/dashboard/DashboardAction.vue';
import DasboardUserInfo from '../components/dashboard/DashboardUserInfo.vue';
import { mdiInformation } from '@mdi/js';
import { mdiNewBox } from '@mdi/js';
import router from '../router';
export default {
  components:{
    DashboardAction,
    DasboardUserInfo
  },
    data: function () {
      return {
        mdiInformation: mdiInformation,
        mdiNewBox: mdiNewBox
      }
},
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || 'Agendar';
            }
        }
    },
    mounted () {
      const token = localStorage.getItem('token');
      if(!token){
        console.log('no hay token')
        return router.push('/login')
      }
    }
}
</script>