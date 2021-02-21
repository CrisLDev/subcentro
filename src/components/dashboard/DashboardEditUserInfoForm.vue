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
        >
          Editar Informacion
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Informacion de usuario</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                v-model="userName"
                  label="Nombre de usuario*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="6"
              >
                <v-text-field
                v-model="fullName"
                  label="Nombre completo*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                v-model="email"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col sm="6" cols="12">
                <v-text-field
                v-model="password"
                  label="Contrasena*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col sm="6" cols="12">
                <v-text-field
                v-model="password2"
                  label="Confirmar contrasena*"
                  type="password2"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                v-model="adress"
                  label="Direccion*"
                  required
                ></v-text-field>
              </v-col>
              <v-col sm="6" cols="12">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Birthday date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
          <small>* Indica campos requeridos. </small> <small>Solo rellenamos los datos que has rellenado previamente.</small>
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
import {mapActions} from 'vuex';
  export default {
    data: () => ({
      mdiCalendar: mdiCalendar,
      dialog: false,
      menu: false,
      password: '',
      password2: '',
    }),
    computed:{
      userName: {
        get () {
          return this.$store.state.auth.user.userName
        },
        set (value) {
          this.$store.commit('updateUsername', value)
        }
      },
      fullName: {
        get () {
          return this.$store.state.auth.user.fullName
        },
        set (value) {
          this.$store.commit('updateFullname', value)
        }
      },
      email: {
        get () {
          return this.$store.state.auth.user.email
        },
        set (value) {
          this.$store.commit('updateEmail', value)
        }
      },
      adress: {
        get () {
          return this.$store.state.auth.user.adress
        },
        set (value) {
          this.$store.commit('updateAdress', value)
        }
      },
      date: {
        get () {
          return this.$store.state.auth.user.age
        },
        set (value) {
          this.$store.commit('updateDate', value)
        }
      }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods: {
      ...mapActions(["updateUserInfo", "getUltimateSnackbarState"]),
      save (date) {
        this.$refs.menu.save(date)
      },
      async submit () {
        if(this.password !== this.password2){
            const snackbarData = {
                timeout: 2000,
                text: 'Las contrasenas no coinciden.',
                snackbar: true
            }
            return this.getUltimateSnackbarState(snackbarData);
        }
        const dataToSend = {
            userName: this.userName,
            fullName: this.fullName,
            email: this.email,
            password: this.password,
            password2: this.password2,
            adress: this.adress,
            age: this.date,
            user_id: this.$store.getters.userLoged._id,
        }
        this.updateUserInfo(dataToSend)
      },
    }
  }
</script>