<template>
  <div id="app">
   <v-app>
      <Navbar/>
      <router-view />
    </v-app>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  }
}
</script>
