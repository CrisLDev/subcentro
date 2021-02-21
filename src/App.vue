<template>
   <v-app>
      <v-app-bar app class="primary">
        <Navbar/>
      </v-app-bar>
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
      <v-footer class="primary">
        <!--
            <v-bottom-navigation v-model="value">
              <v-btn value="recent">
                <span>Recent</span>

                <v-icon>mdi-history</v-icon>
              </v-btn>

              <v-btn value="favorites">
                <span>Favorites</span>

                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn value="nearby">
                <span>Nearby</span>

                <v-icon>mdi-map-marker</v-icon>
              </v-btn>
            </v-bottom-navigation>-->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 190" id="wave"><path fill="#6c63ff" fill-opacity="1" d="M0,64L40,74.7C80,85,160,107,240,106.7C320,107,400,85,480,80C560,75,640,85,720,101.3C800,117,880,139,960,149.3C1040,160,1120,160,1200,133.3C1280,107,1360,53,1400,26.7L1440,0L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
      </v-footer>
      <SnackBar />
    </v-app>
</template>

<script>
import Navbar from './components/Navbar.vue';
import SnackBar from './components/SnackBar.vue';
import {mapActions} from 'vuex';

export default {
  components: {
    Navbar,
    SnackBar
  },
  data: () => ({ value: 'recent' }),
  methods:{
  ...mapActions(["reloginUser", "logoutUser"])
},
  created(){
    this.reloginUser();
    if(!localStorage.getItem('token')){
      this.logoutUser()
    }
}
}
</script>

<style scoped>
#wave{
  position: absolute;
  bottom: 0;
  z-index: 1;
  margin-left: -16px;
}

</style>