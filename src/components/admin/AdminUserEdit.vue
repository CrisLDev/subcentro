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
                  :counter="20"
                  :error-messages="userNameUErrors" 
                  @input="$v.userNameU.$touch()" 
                  @blur="$v.userNameU.$touch()"
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
                  :counter="50"
                  :error-messages="fullNameUErrors" 
                  @input="$v.fullNameU.$touch()" 
                  @blur="$v.fullNameU.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="emailU"
                  label="Email*"
                  required
                  :counter="50"
                    :error-messages="emailUErrors" 
                    @input="$v.emailU.$touch()" 
                    @blur="$v.emailU.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                v-model="telephoneNumberU"
                  label="Numero telefonico*"
                  :counter="10"
                    :error-messages="telephoneNumberUErrors" 
                    @input="$v.telephoneNumberU.$touch()" 
                    @blur="$v.telephoneNumberU.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="roleForDialog"
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
                  :counter="20"
                    :error-messages="passwordUErrors" 
                    @input="$v.passwordU.$touch()" 
                    @blur="$v.passwordU.$touch()"
                ></v-text-field>
              </v-col>
              <v-col sm="6" cols="12">
                <v-text-field
                v-model="password2U"
                  label="Confirmar contrasena*"
                  type="password2"
                    :counter="20"
                    :error-messages="password2UErrors" 
                    @input="$v.password2U.$touch()" 
                    @blur="$v.password2U.$touch()"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                v-model="adressU"
                  label="Direccion*"
                  :counter="40"
                  :error-messages="adressUErrors" 
                  @input="$v.adressU.$touch()" 
                  @blur="$v.adressU.$touch()"
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
              <v-col
                cols="12"
              >
                <v-text-field
                v-model="dniU"
                  label="Cédula*"
                  :counter="10"
                  :error-messages="dniUErrors" 
                  @input="$v.dniU.$touch()" 
                  @blur="$v.dniU.$touch()"
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
import {mapActions, mapGetters} from 'vuex';
import { mdiCalendar } from '@mdi/js';
import { validationMixin } from 'vuelidate';
import { required, maxLength, email} from 'vuelidate/lib/validators';
import Loading from '../Loading';
  export default {
    data: () => ({
      mdiCalendar: mdiCalendar,
      dialog: false,
      menu: false,
      passwordU: '',
      password2U: '',
      roleForDialog: ''
    }),
    components:{Loading},
    mixins: [validationMixin],
  validations:{
      userNameU: {required, maxLength: maxLength(10)},
      fullNameU: {maxLength: maxLength(50)},
      telephoneNumberU: {maxLength: maxLength(10)},
      passwordU: {maxLength: maxLength(10)},
      password2U: {maxLength: maxLength(10)},
      emailU: { required, email, maxLength: maxLength(50) },
      adressU: {maxLength: maxLength(40)},
      dniU: {maxLength: maxLength(10)},
  },
    computed:{
      userNameUErrors (){
          const errors = []
            if(!this.$v.userNameU.$dirty) return errors
            !this.$v.userNameU.maxLength && errors.push('El nombre no debe tener mas de 10 caracteres')
            !this.$v.userNameU.required && errors.push('El nombre es requerido.')
            return errors
      },
      fullNameUErrors (){
          const errors = []
            if(!this.$v.fullNameU.$dirty) return errors
            !this.$v.fullNameU.maxLength && errors.push('El nombre no debe tener mas de 50 caracteres')
            return errors
      },
      telephoneNumberUErrors (){
          const errors = []
            if(!this.$v.telephoneNumberU.$dirty) return errors
            !this.$v.telephoneNumberU.maxLength && errors.push('El numero de telefono no debe tener mas de 10 numeros')
            return errors
      },
      emailUErrors (){
          const errors = []
            if(!this.$v.emailU.$dirty) return errors
            !this.$v.emailU.maxLength && errors.push('El email no debe tener mas de 50 caracteres')
            !this.$v.emailU.required && errors.push('El email es requerido.')
            !this.$v.emailU.email && errors.push('Ingrese un email valido')
            return errors
      },
      passwordUErrors (){
          const errors = []
          if(!this.$v.passwordU.$dirty) return errors
            !this.$v.passwordU.maxLength && errors.push('La contrasena no debe tener mas de 20 caracteres')
            return errors
      },
      password2UErrors (){
          const errors = []
            if(!this.$v.password2U.$dirty) return errors
            !this.$v.password2U.maxLength && errors.push('La contrasena de confirmacion no debe tener mas de 20 caracteres')
            return errors
      },
      adressUErrors (){
          const errors = []
            if(!this.$v.adressU.$dirty) return errors
            !this.$v.adressU.maxLength && errors.push('La direccion no debe tener mas de 50 caracteres')
            return errors
      },
      dniUErrors (){
          const errors = []
            if(!this.$v.dniU.$dirty) return errors
            !this.$v.dniU.maxLength && errors.push('El numero de cédula no debe tener mas de 10 numeros')
            return errors
      },
      ...mapGetters(["charginAuth"]),
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
      },
      dniU: {
        get () {
          return this.$store.state.auth.userToEdit.telephoneNumber
        },
        set (value) {
          this.$store.commit('userToEditUpdateDni', value)
        }
      }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      },
      roleU(){
        this.roleForDialog = this.roleU;
      }
    },
    methods:{
        ...mapActions(["getUltimateSnackbarState", "updateUserInfo"]),
        loadUserToEdit() {
            this.$store.commit('loadUserToEdit', this.user_id)
        },
        save (date) {
            this.$refs.menu.save(date)
        },
        async submit (){
          await this.$v.$touch();
          if(this.userNameUErrors.length >= 1 || this.fullNameUErrors.length >= 1 || this.emailUErrors.length >= 1 || this.telephoneNumberUErrors.length >= 1 || this.passwordUErrors.length >= 1 || this.password2UErrors.length >= 1 || this.adressUErrors.length >= 1 || this.dniUErrors.length >= 1){
                const snackbarData = {
                    timeout: 2000,
                    text: 'Revisa los datos.',
                    snackbar: true
                }
                return this.getUltimateSnackbarState(snackbarData);
          }
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
                role: this.roleForDialog,
                dni: this.dniU,
                telephoneNumber: this.telephoneNumberU,
                user_id: this.user_id
            }
            this.$store.commit('userToEditUpdateRole', this.roleForDialog)
            this.updateUserInfo(dataToSend)
        }
    },
    props:{
        user_id: String
    }
  }
</script>