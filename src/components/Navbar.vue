<template>
    <v-container class="d-flex">
        <router-link to="/" class="text-decoration-none" style="color: white;"><v-icon medium color="white">{{ charity }}</v-icon> INICIO</router-link>
        <v-spacer></v-spacer>
        <router-link to="/login" class="text-decoration-none" style="color: white;" v-if="!this.$store.getters.userLoged.token"><v-icon medium color="white">{{ accountArrowRight }}</v-icon> USUARIO</router-link>
        <v-menu offset-y v-if="userLoged.token" bottom
      origin="center center"
      transition="scale-transition">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          style="color: white"
          v-bind="attrs"
          v-on="on"
        >
        <v-avatar class="mr-2" size="35">
          <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
        </v-avatar>
          {{userLoged.userName}}
        </v-btn>
      </template>
      <v-list>
        <v-list-item style="cursor: pointer" v-if="userLoged.role == 'user'">
          <v-list-item-title><router-link to="/dashboard" class="text-decoration-none" style="color: black">Agendar</router-link></v-list-item-title>
        </v-list-item>
        <v-list-item style="cursor: pointer" v-if="userLoged.role == 'admin'">
          <v-list-item-title><router-link to="/admin" class="text-decoration-none" style="color: black">Administracion</router-link></v-list-item-title>
        </v-list-item>
        <v-list-item style="cursor: pointer" v-if="userLoged.role == 'doctor'">
          <v-list-item-title><router-link to="/citas" class="text-decoration-none" style="color: black">Citas</router-link></v-list-item-title>
          </v-list-item>
           <v-list-item style="cursor: pointer" v-if="userLoged.role == 'doctor' || userLoged.role == 'admin'">
          <v-list-item-title><router-link to="/dashboard" class="text-decoration-none" style="color: black">Perfil</router-link></v-list-item-title>
        </v-list-item>
        <v-list-item style="cursor: pointer">
          <v-list-item-title @click="logout()">Salir</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-container>
</template>

<script>
import { mdiCharity, mdiAccountArrowRight } from '@mdi/js';
import {logout} from '../utils/auth';
import {mapGetters,mapActions} from 'vuex';
export default {
  name: 'navbar',
  components: {
  },
  data: () => ({
      charity: mdiCharity,
      accountArrowRight: mdiAccountArrowRight,
  }),
  methods: {
      ...mapActions(["logoutUser"]),
      logout(){
          this.logoutUser();
          return logout()
      }
  },
  computed:{
  ...mapGetters(["userLoged"])
},
}
</script>