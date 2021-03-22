<template>
  <v-card
    class="mx-auto my-12"
    max-width="100%"
  >

    <v-row no-gutters justify="center">
        <v-col md="4" sm="4" cols="12">
            <v-img style="z-index: 1;" height="250" src="https://cdn.vuetifyjs.com/images/cards/cooking.png"></v-img>
            <v-btn class="imgButton" color="primary" block><v-icon class="mr-2">{{mdiCameraOutline}}</v-icon> Subir Foto</v-btn>
        </v-col>
        <v-col md="8" sm="8" cols="12">
            <v-card-title class="text-uppercase pt-2 pb-0">
              <span class="mr-2">Usuario:</span>{{this.$store.getters.userLoged.userName}}
            </v-card-title>
            <v-card-text>
                <div class="subtitle-2">
                    <span>Nombre completo:</span> {{this.$store.getters.userLoged.fullName ? this.$store.getters.userLoged.fullName : 'N/A'}}<br>
                    <span>Numero telefonico:</span> {{this.$store.getters.userLoged.telephoneNumber ? this.$store.getters.userLoged.telephoneNumber : 'N/A'}}<br>
                    <span>E-mail:</span> {{this.$store.getters.userLoged.email}}<br>
                    <span>Fecha de nacimiento:</span> {{this.$store.getters.userLoged.age ? this.$store.getters.userLoged.age : 'N/A'}}<br>
                    <span>Direccion:</span> {{this.$store.getters.userLoged.adress ? this.$store.getters.userLoged.adress : 'N/A'}}<br>
                </div>
                <div>{{this.$store.getters.userLoged.fullName}}</div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
    <v-card-actions class="pt-10">
      <DashboardEditUserInfoForm />
    </v-card-actions>
    </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mdiCameraOutline } from '@mdi/js';
import DashboardEditUserInfoForm from '../dashboard/DashboardEditUserInfoForm';
  export default {
    components: {
      DashboardEditUserInfoForm
    },
    data: () => ({
      mdiCameraOutline: mdiCameraOutline
    })
  }
</script>

<style scoped>
.imgButton{
  border-top-left-radius: 0!important;
  border-top-right-radius: 0!important;
}
</style>