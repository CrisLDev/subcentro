<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          block
        >
          Crear Usuario o Doctor
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Informacion de registro</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-radio-group class="mb-0 mt-0 pt-0 pb-0" v-model="radioGroup" @change="showOrNotInput">
                  <v-radio
                    label="Crear usuario"
                    name="radioGroup"
                    :value="1"
                  ></v-radio>
                  <v-radio
                    label="Crear doctor"
                    name="radioGroup"
                    :value="2"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                v-model="userName"
                  label="Nombre de usuario*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>* Indica campos requeridos. </small> <small>Solo rellenamos los datos que has rellenado previamente.</small>
          <div v-if="charginAuth" class="mb-4">
              <Loading/>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submit"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mdiCalendar } from '@mdi/js';
import {mapActions,mapGetters} from 'vuex';
import Loading from '../Loading';
  export default {
    data: () => ({
      mdiCalendar: mdiCalendar,
      dialog: false,
      userName: '',
      email: '',
      radioGroup: 1,
    }),
    components:{
      Loading
    },
    computed: {...mapGetters(["charginAuth"])},
    methods: {
      ...mapActions(["registerUser"]),
      async submit () {
        const dataToSend = {
            userName: this.userName,
            email: this.email,
            password: 'resub123'
        }
        if(this.radioGroup == 1){
          dataToSend.role = 'user'
        }
        if(this.radioGroup == 2){
          dataToSend.role = 'doctor'
        }
        this.registerUser(dataToSend);
      },
    }
  }
</script>