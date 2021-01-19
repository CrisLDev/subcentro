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
                    <v-text-field v-model="message2" solo label="Username" clearable></v-text-field>
                    <v-text-field v-model="message2" solo label="Password" clearable></v-text-field>
                    <v-btn block color="primary" elevation="2">Enviar</v-btn>
                    <v-divider class="mt-6 mb-6 grey"></v-divider>
                    <v-btn block color="secondary" elevation="2">Registrarse</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import { mdiAccountArrowRight, mdiKeyVariant} from '@mdi/js';
export default {
  name: 'home',
  components: {
  },
  data: () => ({
      accountArrowRight: mdiAccountArrowRight,
      keyVariant: mdiKeyVariant,
  }),
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