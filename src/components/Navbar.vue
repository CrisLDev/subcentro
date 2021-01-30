<template>
    <v-container class="d-flex">
        <router-link to="/" class="text-decoration-none" style="color: white;"><v-icon medium color="white">{{ charity }}</v-icon> INICIO</router-link>
        <v-spacer></v-spacer>
        <router-link to="/login" class="text-decoration-none" style="color: white;" v-if="!this.$store.getters.userLoged.token"><v-icon medium color="white">{{ accountArrowRight }}</v-icon> USUARIO</router-link>
        <router-link to="/login" class="text-decoration-none" style="color: white;" v-if="this.$store.getters.userLoged.token" @click="logout()"><v-icon medium color="white">{{ accountArrowRight }}</v-icon> {{this.$store.getters.userLoged.userName}}</router-link>
    </v-container>
</template>

<script>
import { mdiCharity, mdiAccountArrowRight } from '@mdi/js';
import {logout} from '../utils/auth';
export default {
  name: 'navbar',
  components: {
  },
  data: () => ({
      charity: mdiCharity,
      accountArrowRight: mdiAccountArrowRight,
  }),
  methods: {
      logout(){
          return logout()
      }
  }
}
</script>