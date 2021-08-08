    <template>
    <v-form>
        <v-container id="loginC">
            <v-row justify="center">
                <v-img
                lazy-src="../../assets/images/register.svg"
                max-height="60%"
                max-width="60%"
                src="../../assets/images/register.svg"
                ></v-img>
                <v-col cols="12">
                    <v-text-field 
                    v-model="userName" 
                    solo 
                    label="Nombre de ususario" 
                    clearable 
                    :counter="20"
                    :error-messages="userNameErrors" 
                    required 
                    @input="$v.userName.$touch()" 
                    @blur="$v.userName.$touch()"></v-text-field>
                    <v-text-field 
                    v-model="email" 
                    solo 
                    label="E-mail" 
                    clearable 
                    :counter="50"
                    :error-messages="emailErrors" 
                    required 
                    @input="$v.email.$touch()" 
                    @blur="$v.email.$touch()"></v-text-field>
                    <v-text-field 
                    v-model="password" 
                    type="password" 
                    solo 
                    label="Contraseña"
                    clearable 
                    :counter="20"
                    :error-messages="passwordErrors" 
                    required 
                    @input="$v.password.$touch()" 
                    @blur="$v.password.$touch()"></v-text-field>
                    <v-text-field 
                    v-model="password2" 
                    type="password" 
                    solo 
                    label="Repite tu Contraseña" 
                    clearable 
                    :counter="20"
                    :error-messages="password2Errors" 
                    required 
                    @input="$v.password2.$touch()" 
                    @blur="$v.password2.$touch()"></v-text-field>
                </v-col>
                <v-col v-if="charginAuth" cols="12">
                    <div>
                        <Loading/>
                    </div>
                </v-col>
                <v-col cols="6" style="z-index: 999">
                        <v-btn block color="primary" elevation="2" @click="submit">Enviar</v-btn>
                </v-col>
                <v-col cols="6" style="z-index: 999">
                        <v-btn block color="error" elevation="2" @click="clear">Limpiar</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import { mdiAccountArrowRight, mdiKeyVariant} from '@mdi/js';
import { validationMixin } from 'vuelidate';
import { required, maxLength, email} from 'vuelidate/lib/validators';
import {mapActions, mapGetters} from 'vuex';
import Loading from '../Loading';
export default {
  name: 'Register',
  components: {
      Loading
  },
  mixins: [validationMixin],
  validations:{
      userName: {required, maxLength: maxLength(10)},
      password: {required, maxLength: maxLength(10)},
      password2: {required, maxLength: maxLength(10)},
      email: { required, email, maxLength: maxLength(50) },
  },
  data: () => ({
      accountArrowRight: mdiAccountArrowRight,
      keyVariant: mdiKeyVariant,
      userName: '',
      email: '',
      password:'',
      password2: '',
  }),
  computed:{
      ...mapGetters(["charginAuth"]),
      userNameErrors (){
          const errors = []
            if(!this.$v.userName.$dirty) return errors
            !this.$v.userName.maxLength && errors.push('El nombre no debe tener mas de 10 caracteres')
            !this.$v.userName.required && errors.push('El nombre es requerido.')
            return errors
      },
      emailErrors (){
          const errors = []
            if(!this.$v.email.$dirty) return errors
            !this.$v.email.maxLength && errors.push('El email no debe tener mas de 50 caracteres')
            !this.$v.email.required && errors.push('El email es requerido.')
            !this.$v.email.email && errors.push('Ingrese un email valido')
            return errors
      },
      passwordErrors (){
          const errors = []
            if(!this.$v.password.$dirty) return errors
            !this.$v.password.maxLength && errors.push('La contrasena no debe tener mas de 20 caracteres')
            !this.$v.password.required && errors.push('La contrasena es requerida.')
            return errors
      },
      password2Errors (){
          const errors = []
            if(!this.$v.password2.$dirty) return errors
            !this.$v.password2.maxLength && errors.push('La contrasena de confirmacion no debe tener mas de 20 caracteres')
            !this.$v.password2.required && errors.push('La contrasena es requerida.')
            return errors
      }
  },
  methods: {
      ...mapActions(["registerUser", "getUltimateSnackbarState"]),
      async submit() {
          await this.$v.$touch();
          if(this.userNameErrors.length >= 1 || this.emailErrors.length >= 1 || this.passwordErrors.length >= 1 || this.password2Errors.length >= 1){
                const snackbarData = {
                    timeout: 2000,
                    text: 'Revisa los datos.',
                    snackbar: true
                }
                return this.getUltimateSnackbarState(snackbarData);
          }
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
              email: this.email,
              password: this.password,
              role: 'user'
        }
        this.registerUser(dataToSend);
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
  },
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