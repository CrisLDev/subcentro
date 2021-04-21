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
          block
        >
          Crear consultorio
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Contenido</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                v-model="name"
                  label="Nombre completo*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                v-model="code"
                  label="Codigo del conusltorio*"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                  cols="12"
                >
                  <v-select
                  v-model="especiality"
                    :items="items"
                    label="Especialidad*"
                    required
                  ></v-select>
                </v-col>
            </v-row>
          </v-container>
          <small>* Indica campos requeridos. </small>
          <div v-if="charginConsulting" class="mb-4">
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
import Loading from '../Loading';
  export default {
    components: {Loading},
    data: () => ({
      mdiCalendar: mdiCalendar,
      dialog: false,
      menu: false,
      name: '',
      code: '',
      especiality: '',
      items: []
    }),
    methods:{
        ...mapActions(["createNewConsulting"]),
        submit (){
            const dataToSend = {
                name: this.name,
                code: this.code,
                especiality: this.especiality
            }
            this.createNewConsulting(dataToSend)
        }
    },
    computed:{
      ...mapGetters(["especialititesInBd", "charginConsulting"])
    },
    watch: {
      especialititesInBd(){
        const items = []
        Object.values(this.especialititesInBd).map((especiality) => 
            {
                items.push(especiality.name)
            }
          );
        this.items = items
      }
    },
    created() {
        const items = []
        Object.values(this.especialititesInBd).map((especiality) => 
            {
                items.push(especiality.name)
            }
          );
        this.items = items
    },
  }
</script>