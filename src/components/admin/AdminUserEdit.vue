<template>
  <v-row>
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
          @click="loadUserToEdit"
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
                v-model="userNameU"
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
                v-model="fullNameU"
                  label="Nombre completo*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="emailU"
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="telephoneNumberU"
                  label="Numero telefonico*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="roleU"
                  label="Rol*"
                    :items="['admin', 'doctor','user']"
                    required
                  ></v-select>
              </v-col>
              <v-col sm="6" cols="12">
                <v-text-field
                v-model="passwordU"
                  label="Contrasena*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col sm="6" cols="12">
                <v-text-field
                v-model="password2U"
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
                v-model="adressU"
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
                      v-model="dateU"
                      label="Birthday date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="dateU"
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
import {mapActions} from 'vuex';
import { mdiCalendar } from '@mdi/js';
  export default {
    data: () => ({
      mdiCalendar: mdiCalendar,
      dialog: false,
      menu: false,
      passwordU: '',
      password2U: '',
    }),
    computed:{
        roleU: {
        get () {
          return this.$store.state.auth.userToEdit.role
        },
        set (value) {
          this.$store.commit('userToEditUpdateRole', value)
        }
      },
      userNameU: {
        get () {
          return this.$store.state.auth.userToEdit.userName
        },
        set (value) {
          this.$store.commit('userToEditUpdateUsername', value)
        }
      },
      fullNameU: {
        get () {
          return this.$store.state.auth.userToEdit.fullName
        },
        set (value) {
          this.$store.commit('userToEditUpdateFullname', value)
        }
      },
      emailU: {
        get () {
          return this.$store.state.auth.userToEdit.email
        },
        set (value) {
          this.$store.commit('userToEditUpdateEmail', value)
        }
      },
      adressU: {
        get () {
          return this.$store.state.auth.userToEdit.adress
        },
        set (value) {
          this.$store.commit('userToEditUpdateAdress', value)
        }
      },
      dateU: {
        get () {
          return this.$store.state.auth.userToEdit.age
        },
        set (value) {
          this.$store.commit('userToEditUpdateDate', value)
        }
      },
      telephoneNumberU: {
        get () {
          return this.$store.state.auth.userToEdit.telephoneNumber
        },
        set (value) {
          this.$store.commit('userToEditUpdateTelephoneNumber', value)
        }
      }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
    },
    methods:{
        ...mapActions(["getUltimateSnackbarState", "updateUserInfo"]),
        loadUserToEdit() {
            this.$store.commit('loadUserToEdit', this.user_id)
        },
        save (date) {
            this.$refs.menu.save(date)
        },
        submit (){
            if(this.passwordU !== this.password2U){
                const snackbarData = {
                    timeout: 2000,
                    text: 'Las contrasenas no coinciden.',
                    snackbar: true
                }
                return this.getUltimateSnackbarState(snackbarData);
            }
            const dataToSend = {
                userName: this.userNameU,
                fullName: this.fullNameU,
                email: this.emailU,
                password: this.passwordU,
                password2: this.password2U,
                adress: this.adressU,
                age: this.dateU,
                role: this.roleU,
                telephoneNumber: this.telephoneNumberU,
                user_id: this.user_id
            }
            this.updateUserInfo(dataToSend)
        }
    },
    props:{
        user_id: String
    }
  }
</script>