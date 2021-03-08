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
                    label="Username" 
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
                    label="Password"
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
                    label="Repeat yout Password" 
                    clearable 
                    :counter="20"
                    :error-messages="password2Errors" 
                    required 
                    @input="$v.password2.$touch()" 
                    @blur="$v.password2.$touch()"></v-text-field>
                </v-col>
                <v-col cols="6">
                        <v-btn block color="primary" elevation="2" @click="submit">Enviar</v-btn>
                </v-col>
                <v-col cols="6">
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
import {mapActions} from 'vuex';
export default {
  name: 'home',
  components: {
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
      userNameErrors (){
          const errors = []
            if(!this.$v.userName.$dirty) return errors
            !this.$v.userName.maxLength && errors.push('Name must be at most 10 characters long')
            !this.$v.userName.required && errors.push('Name is required.')
            return errors
      },
      emailErrors (){
          const errors = []
            if(!this.$v.email.$dirty) return errors
            !this.$v.email.maxLength && errors.push('Email must be at most 50 characters long')
            !this.$v.email.required && errors.push('Email is required.')
            !this.$v.email.email && errors.push('Must be valid e-mail')
            return errors
      },
      passwordErrors (){
          const errors = []
            if(!this.$v.password.$dirty) return errors
            !this.$v.password.maxLength && errors.push('Password must be at most 20 characters long')
            !this.$v.password.required && errors.push('Password is required.')
            return errors
      },
      password2Errors (){
          const errors = []
            if(!this.$v.password2.$dirty) return errors
            !this.$v.password2.maxLength && errors.push('Confirmation password must be at most 20 characters long')
            !this.$v.password2.required && errors.push('Confirmation password is required.')
            return errors
      }
  },
  methods: {
      ...mapActions(["registerUser", "getUltimateSnackbarState"]),
      async submit() {
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