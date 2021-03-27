<template>
    <v-form>
        <v-container id="loginC">
            <v-row justify="center">
                <v-img
                lazy-src="../../assets/images/login.svg"
                max-height="60%"
                max-width="60%"
                src="../../assets/images/login.svg"
                ></v-img>
                <v-col cols="12">
                    <v-text-field v-model="userName" solo label="Username" autofocus autocomplete="userName" required clearable></v-text-field>
                    <v-text-field type="password" v-model="password" solo label="Password" autocomplete="password" required clearable></v-text-field>
                    <!--
                    <div v-if="charginAuth" class="mb-4">
                        <Loading/>
                    </div>-->
                    <v-btn block color="primary" elevation="2" @click="submit">Enviar</v-btn>
                    <v-divider class="mt-6 mb-6 grey"></v-divider>
                    <router-link to="/register" class="text-decoration-none" style="color: white;">
                        <v-btn block color="secondary" elevation="2">Registrarse</v-btn>
                    </router-link>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import { mdiAccountArrowRight, mdiKeyVariant} from '@mdi/js';
import {mapActions, mapGetters} from 'vuex';
export default {
  name: 'home',
  components: {
  },
  data: () => ({
      accountArrowRight: mdiAccountArrowRight,
      keyVariant: mdiKeyVariant,
      userName: '',
      password: ''
  }),
  computed:{
      ...mapGetters(["charginAuth"])
},
  methods:{
      ...mapActions(["loginUser"]),
      async submit() {
        const dataToSend = {
            userName: this.userName,
            password: this.password
        }
        this.loginUser(dataToSend);
      }
  }
}
</script>

<style scoped>
#loginC{
    width: 30%;
}

@media(max-width: 1000.98px){
    #loginC{
        width: 50%;
    }
}

@media(max-width: 599.98px){
    #loginC{
        width: 100%;
    }
}
</style>