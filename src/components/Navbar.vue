<template>
    <v-container class="d-flex">
        <router-link to="/" class="text-decoration-none" style="color: white;"><v-icon medium color="white">{{ charity }}</v-icon> INICIO</router-link>
        <v-spacer></v-spacer>
        <router-link to="/login" class="text-decoration-none" style="color: white;"><v-icon medium color="white">{{ accountArrowRight }}</v-icon> USUARIO</router-link>
    </v-container>
</template>

<script>
import { mdiCharity, mdiAccountArrowRight } from '@mdi/js';
export default {
  name: 'navbar',
  components: {
  },
  data: () => ({
      charity: mdiCharity,
      accountArrowRight: mdiAccountArrowRight,
  }),
}
</script>