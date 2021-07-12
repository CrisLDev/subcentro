<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on" block>
          Crear Usuario
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
                <v-radio-group
                  class="mb-0 mt-0 pt-0 pb-0"
                  v-model="radioGroup"
                  @change="showOrNotInput"
                >
                  <v-radio
                    label="Crear paciente"
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
                  v-model="userNameN"
                  label="Nombre del usuario*"
                  required
                  :counter="20"
                  :error-messages="userNameNErrors"
                  @input="$v.userNameN.$touch()"
                  @blur="$v.userNameN.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="fullNameN"
                  label="Nombre completo*"
                  required
                  :counter="50"
                  :error-messages="fullNameNErrors"
                  @input="$v.fullNameN.$touch()"
                  @blur="$v.fullNameN.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="emailN"
                  label="Email*"
                  required
                  :counter="50"
                  :error-messages="emailNErrors"
                  @input="$v.emailN.$touch()"
                  @blur="$v.emailN.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="telephoneNumberN"
                  label="Numero telefonico*"
                  required
                  :counter="10"
                  :error-messages="telephoneNumberNErrors"
                  @input="$v.telephoneNumberN.$touch()"
                  @blur="$v.telephoneNumberN.$touch()"
                ></v-text-field>
              </v-col>
              <v-col sm="6" cols="12">
                <v-text-field
                  v-model="passwordN"
                  label="Contrasena*"
                  type="password"
                  required
                  :counter="20"
                  :error-messages="passwordNErrors"
                  @input="$v.passwordN.$touch()"
                  @blur="$v.passwordN.$touch()"
                ></v-text-field>
              </v-col>
              <v-col sm="6" cols="12">
                <v-text-field
                  v-model="password2N"
                  label="Confirmar contrasena*"
                  type="password2"
                  required
                  :counter="20"
                  :error-messages="password2NErrors"
                  @input="$v.password2N.$touch()"
                  @blur="$v.password2N.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="adressN"
                  label="Direccion*"
                  required
                  :counter="40"
                  :error-messages="adressNErrors"
                  @input="$v.adressN.$touch()"
                  @blur="$v.adressN.$touch()"
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
                      v-model="dateN"
                      label="Birthday date"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      required
                      :error-messages="dateNErrors"
                      @input="$v.dateN.$touch()"
                      @blur="$v.dateN.$touch()"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="dateN"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="dniN"
                  label="Cédula*"
                  :counter="10"
                  :error-messages="dniNErrors"
                  @input="$v.dniN.$touch()"
                  @blur="$v.dniN.$touch()"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>* Indica campos requeridos. </small>
          <small
            >Solo rellenamos los datos que has rellenado previamente.</small
          >
          <div v-if="charginAuth" class="mb-4">
            <Loading />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Cerrar
          </v-btn>
          <v-btn color="blue darken-1" text @click="submit">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mdiCalendar } from "@mdi/js";
import { mapActions, mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import Loading from "../Loading";
export default {
  data: () => ({
    mdiCalendar: mdiCalendar,
    dialog: false,
    menu: false,
    userNameN: "",
    fullNameN: "",
    telephoneNumberN: "",
    passwordN: "",
    password2N: "",
    emailN: "",
    adressN: "",
    dniN: "",
    dateN: "",
    radioGroup: 1,
  }),
  components: {
    Loading,
  },
  mixins: [validationMixin],
  validations: {
    userNameN: { required, maxLength: maxLength(10) },
    fullNameN: { required, maxLength: maxLength(50) },
    telephoneNumberN: { required, maxLength: maxLength(10) },
    passwordN: { required, maxLength: maxLength(10) },
    password2N: { required, maxLength: maxLength(10) },
    emailN: { required, email, maxLength: maxLength(50) },
    adressN: { required, maxLength: maxLength(40) },
    dateN: { required },
    dniN: { required, maxLength: maxLength(10) },
  },
  computed: {
    userNameNErrors() {
      const errors = [];
      if (!this.$v.userNameN.$dirty) return errors;
      !this.$v.userNameN.maxLength &&
        errors.push("El nombre no debe tener mas de 10 caracteres");
      !this.$v.userNameN.required && errors.push("El nombre es requerido.");
      return errors;
    },
    fullNameNErrors() {
      const errors = [];
      if (!this.$v.fullNameN.$dirty) return errors;
      !this.$v.fullNameN.maxLength &&
        errors.push("El nombre no debe tener mas de 50 caracteres");
      !this.$v.fullNameN.required &&
        errors.push("El nombre completo es requerido.");
      return errors;
    },
    telephoneNumberNErrors() {
      const errors = [];
      if (!this.$v.telephoneNumberN.$dirty) return errors;
      !this.$v.telephoneNumberN.maxLength &&
        errors.push("El numero de telefono no debe tener mas de 10 numeros");
      !this.$v.telephoneNumberN.required &&
        errors.push("El número de telefono es requerido.");
      return errors;
    },
    emailNErrors() {
      const errors = [];
      if (!this.$v.emailN.$dirty) return errors;
      !this.$v.emailN.maxLength &&
        errors.push("El email no debe tener mas de 50 caracteres");
      !this.$v.emailN.required && errors.push("El email es requerido.");
      !this.$v.emailN.email && errors.push("Ingrese un email valido");
      return errors;
    },
    passwordNErrors() {
      const errors = [];
      if (!this.$v.passwordN.$dirty) return errors;
      !this.$v.passwordN.maxLength &&
        errors.push("La contrasena no debe tener mas de 20 caracteres");
      !this.$v.passwordN.required && errors.push("La contraseña es requerida.");
      return errors;
    },
    password2NErrors() {
      const errors = [];
      if (!this.$v.password2N.$dirty) return errors;
      !this.$v.password2N.maxLength &&
        errors.push(
          "La contrasena de confirmacion no debe tener mas de 20 caracteres"
        );
      !this.$v.password2N.required && errors.push("Confirme su contraseña.");
      return errors;
    },
    adressNErrors() {
      const errors = [];
      if (!this.$v.adressN.$dirty) return errors;
      !this.$v.adressN.maxLength &&
        errors.push("La direccion no debe tener mas de 50 caracteres");
      !this.$v.adressN.required && errors.push("La dirección es requerida.");
      return errors;
    },
    dniNErrors() {
      const errors = [];
      if (!this.$v.dniN.$dirty) return errors;
      !this.$v.dniN.maxLength &&
        errors.push("El numero de cédula no debe tener mas de 10 numeros");
      !this.$v.dniN.required &&
        errors.push("El número de cédula es requerido.");
      return errors;
    },
    dateNErrors() {
      const errors = [];
      if (!this.$v.dateN.$dirty) return errors;
      !this.$v.dateN.required &&
        errors.push("La fecha de nacimiento es requerida.");
      return errors;
    },
    ...mapGetters(["charginAuth"]),
  },
  methods: {
    ...mapActions(["getUltimateSnackbarState", "registerUser"]),
    async submit() {
      await this.$v.$touch();
      if (
        this.userNameNErrors.length >= 1 ||
        this.fullNameNErrors.length >= 1 ||
        this.emailNErrors.length >= 1 ||
        this.telephoneNumberNErrors.length >= 1 ||
        this.passwordNErrors.length >= 1 ||
        this.password2NErrors.length >= 1 ||
        this.adressNErrors.length >= 1 ||
        this.dniNErrors.length >= 1 ||
        this.dateNErrors.length >= 1
      ) {
        const snackbarData = {
          timeout: 2000,
          text: "Revisa los datos.",
          snackbar: true,
        };
        return this.getUltimateSnackbarState(snackbarData);
      }
      if (this.passwordU !== this.password2U) {
        const snackbarData = {
          timeout: 2000,
          text: "Las contrasenas no coinciden.",
          snackbar: true,
        };
        return this.getUltimateSnackbarState(snackbarData);
      }
      const dataToSend = {
        userName: this.userNameN,
        fullName: this.fullNameN,
        email: this.emailN,
        password: this.passwordN,
        password2: this.password2N,
        adress: this.adressN,
        age: this.dateN,
        dni: this.dniN,
        telephoneNumber: this.telephoneNumberN,
      };
      if (this.radioGroup == 1) {
        dataToSend.role = "user";
      }
      if (this.radioGroup == 2) {
        dataToSend.role = "doctor";
      }
      this.registerUser(dataToSend);
    },
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
};
</script>
