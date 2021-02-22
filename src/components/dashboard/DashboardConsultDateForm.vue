<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
                  <v-card class="pt-3 pb-3" v-bind="attrs" v-on="on">
                    <v-icon x-large color="primary">{{ accountDetail }}</v-icon>
                    <p class="font-weight-bold mb-0" style="color:#6c63ff">
                      Consultar una cita.
                    </p>
                    <p class="font-weight-bold mb-0 text--primary">
                      ¡Click Aquí!
                    </p>
                  </v-card>
                  
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Consultar cita</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
              >
                <v-text-field
                v-model="code"
                  label="Codigo para consultar*"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
          <v-container v-if="dateCode.date">
            <p>DATOS CONSULTADOS</p>
            {{dateCode.date}}
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="closeD"
          >
            Cerrar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="submit"
          >
            Consultar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
import {mdiAccountDetails} from '@mdi/js';
import {mapGetters,mapActions} from 'vuex';
  export default {
    data: () => ({
      dialog: false,
      accountDetail: mdiAccountDetails,
      code: ''
    }),
    methods: {
      ...mapActions(["consultDateByCode", "getUltimateSnackbarState"]),
      submit(){
        if(this.code == ''){
            const snackbarData = {
                timeout: 2000,
                text: 'El campo no puede estar vacio.',
                snackbar: true
            }
            return this.getUltimateSnackbarState(snackbarData);
        }
        this.consultDateByCode(this.code);
      },
      closeD(){
        this.dialog = false;
        this.$store.commit('clearDateConsultedByCodeSuccessfyully')
      }
    },
    computed:{
      ...mapGetters(["dateCode"])
    },
  }
</script>