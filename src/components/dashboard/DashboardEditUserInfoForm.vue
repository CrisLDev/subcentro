<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Editar Información
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Informacion de usuario</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="userName"
                  label="Nombre de usuario*"
                  required
                  :counter="20"
                  :error-messages="userNameErrors"
                  @input="$v.userName.$touch()"
                  @blur="$v.userName.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="fullName"
                  label="Nombre completo*"
                  required
                  :counter="50"
                  :error-messages="fullNameErrors"
                  @input="$v.fullName.$touch()"
                  @blur="$v.fullName.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="email"
                  label="Email*"
                  required
                  :counter="50"
                  :error-messages="emailErrors"
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="telephoneNumber"
                  label="Número telefónico*"
                  required
                  :counter="10"
                  :error-messages="telephoneNumberErrors"
                  @input="$v.telephoneNumber.$touch()"
                  @blur="$v.telephoneNumber.$touch()"
                ></v-text-field>
              </v-col>
              <v-col sm="6" cols="12">
                <v-text-field
                  v-model="password"
                  label="Contrasena*"
                  type="password"
                  :counter="20"
                  :error-messages="passwordErrors"
                  @input="$v.password.$touch()"
                  @blur="$v.password.$touch()"
                ></v-text-field>
              </v-col>
              <v-col sm="6" cols="12">
                <v-text-field
                  v-model="password2"
                  label="Confirmar contrasena*"
                  type="password"
                  :counter="20"
                  :error-messages="password2Errors"
                  @input="$v.password2.$touch()"
                  @blur="$v.password2.$touch()"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="adress"
                  label="Dirección*"
                  required
                  :counter="40"
                  :error-messages="adressErrors"
                  @input="$v.adress.$touch()"
                  @blur="$v.adress.$touch()"
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
                      label="Fecha de nacimiento"
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
              <v-col cols="12">
                <v-text-field
                  v-model="dni"
                  label="Cédula*"
                  :counter="10"
                  :error-messages="dniErrors"
                  @input="$v.dni.$touch()"
                  @blur="$v.dni.$touch()"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>* Indica campos requeridos. </small>
          <small
            >Solo autocompletamos los datos que has rellenado previamente.</small
          >
          <div v-if="charginAuth" class="mb-4">
            <Loading />
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="saved"
            color="blue darken-1"
            text
            @click="(dialog = false), (saved = false)"
          >
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
import { mapGetters, mapActions } from "vuex";
import { validationMixin } from "vuelidate";
import { required, maxLength, email } from "vuelidate/lib/validators";
import Loading from "../Loading";
export default {
  components: { Loading },
  data: () => ({
    mdiCalendar: mdiCalendar,
    dialog: false,
    menu: false,
    password: "",
    password2: "",
    saved: false,
  }),
  mixins: [validationMixin],
  validations: {
    userName: { required, maxLength: maxLength(10) },
    fullName: { maxLength: maxLength(50) },
    telephoneNumber: { maxLength: maxLength(10) },
    password: { maxLength: maxLength(10) },
    password2: { maxLength: maxLength(10) },
    email: { required, email, maxLength: maxLength(50) },
    adress: { required, maxLength: maxLength(40) },
    dni: { required, maxLength: maxLength(10) },
  },
  computed: {
    userNameErrors() {
      const errors = [];
      if (!this.$v.userName.$dirty) return errors;
      !this.$v.userName.maxLength &&
        errors.push("El nombre no debe tener mas de 10 caracteres");
      !this.$v.userName.required && errors.push("El nombre es requerido.");
      return errors;
    },
    fullNameErrors() {
      const errors = [];
      if (!this.$v.fullName.$dirty) return errors;
      !this.$v.fullName.maxLength &&
        errors.push("El nombre no debe tener mas de 50 caracteres");
      return errors;
    },
    telephoneNumberErrors() {
      const errors = [];
      if (!this.$v.telephoneNumber.$dirty) return errors;
      !this.$v.telephoneNumber.maxLength &&
        errors.push("El numero de telefono no debe tener mas de 10 numeros");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.maxLength &&
        errors.push("El email no debe tener mas de 50 caracteres");
      !this.$v.email.required && errors.push("El email es requerido.");
      !this.$v.email.email && errors.push("Ingrese un email valido");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.maxLength &&
        errors.push("La contrasena no debe tener mas de 20 caracteres");
      return errors;
    },
    password2Errors() {
      const errors = [];
      if (!this.$v.password2.$dirty) return errors;
      !this.$v.password2.maxLength &&
        errors.push(
          "La contrasena de confirmacion no debe tener mas de 20 caracteres"
        );
      return errors;
    },
    adressErrors() {
      const errors = [];
      if (!this.$v.adress.$dirty) return errors;
      !this.$v.adress.maxLength &&
        errors.push("La direccion no debe tener mas de 50 caracteres");
      return errors;
    },
    dniErrors() {
      const errors = [];
      if (!this.$v.dni.$dirty) return errors;
      !this.$v.dni.maxLength &&
        errors.push("El numero de cédula no debe tener mas de 10 numeros");
      return errors;
    },
    userName: {
      get() {
        return this.$store.state.auth.user.userName;
      },
      set(value) {
        this.$store.commit("updateUsername", value);
      },
    },
    fullName: {
      get() {
        return this.$store.state.auth.user.fullName;
      },
      set(value) {
        this.$store.commit("updateFullname", value);
      },
    },
    email: {
      get() {
        return this.$store.state.auth.user.email;
      },
      set(value) {
        this.$store.commit("updateEmail", value);
      },
    },
    adress: {
      get() {
        return this.$store.state.auth.user.adress;
      },
      set(value) {
        this.$store.commit("updateAdress", value);
      },
    },
    date: {
      get() {
        return this.$store.state.auth.user.age;
      },
      set(value) {
        this.$store.commit("updateDate", value);
      },
    },
    telephoneNumber: {
      get() {
        return this.$store.state.auth.user.telephoneNumber;
      },
      set(value) {
        this.$store.commit("updateTelephoneNumber", value);
      },
    },
    dni: {
      get() {
        return this.$store.state.auth.user.dni;
      },
      set(value) {
        this.$store.commit("updateDni", value);
      },
    },
    ...mapGetters(["charginAuth"]),
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    ...mapActions(["updateUserInfo", "getUltimateSnackbarState"]),
    save(date) {
      this.$refs.menu.save(date);
    },
    async submit() {
      await this.$v.$touch();
      if (
        this.userNameErrors.length >= 1 ||
        this.fullNameErrors.length >= 1 ||
        this.emailErrors.length >= 1 ||
        this.telephoneNumberErrors.length >= 1 ||
        this.passwordErrors.length >= 1 ||
        this.password2Errors.length >= 1 ||
        this.adressErrors.length >= 1 ||
        this.dniErrors.length >= 1
      ) {
        const snackbarData = {
          timeout: 2000,
          text: "Revisa los datos.",
          snackbar: true,
        };
        return this.getUltimateSnackbarState(snackbarData);
      }
      if (this.password !== this.password2) {
        const snackbarData = {
          timeout: 2000,
          text: "Las contrasenas no coinciden.",
          snackbar: true,
        };
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
        dni: this.dni,
        role: this.$store.getters.userLoged.role,
        telephoneNumber: this.telephoneNumber,
        user_id: this.$store.getters.userLoged._id,
      };
      this.updateUserInfo(dataToSend);
      this.saved = true;
    },
  },
};
</script>
