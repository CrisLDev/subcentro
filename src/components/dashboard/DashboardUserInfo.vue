<template>
  <div>
    <v-card
    class="mx-auto my-12"
    max-width="100%"
  >

    <v-row no-gutters justify="center">
        <v-col md="4" sm="4" cols="12">
          <v-img style="max-height: 17em!important" v-if="!this.$store.getters.userLoged.imgUrl" src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-27.jpg"></v-img>
            <v-img v-if="this.$store.getters.userLoged.imgUrl" style="z-index: 1;" height="250" :src="`http://localhost:4123/public/upload/${this.$store.getters.userLoged.imgUrl}`"></v-img>
            <v-btn class="imgButton" color="primary" block @click="dialog = true"><v-icon class="mr-2">{{mdiCameraOutline}}</v-icon> Subir Foto</v-btn>
        </v-col>
        <v-col md="8" sm="8" cols="12">
            <v-card-title class="text-uppercase pt-2 pb-0">
              <span class="mr-2">Usuario:</span>{{this.$store.getters.userLoged.userName}}
            </v-card-title>
            <v-card-text>
                <div class="subtitle-2">
                    <span>Nombre completo:</span> {{this.$store.getters.userLoged.fullName ? this.$store.getters.userLoged.fullName : 'N/A'}}<br>
                    <span>Numero telefonico:</span> {{this.$store.getters.userLoged.telephoneNumber ? '0' + this.$store.getters.userLoged.telephoneNumber : 'N/A'}}<br>
                    <span>E-mail:</span> {{this.$store.getters.userLoged.email}}<br>
                    <span>Fecha de nacimiento:</span> {{this.$store.getters.userLoged.age ? this.$store.getters.userLoged.age : 'N/A'}}<br>
                    <span>Direccion:</span> {{this.$store.getters.userLoged.adress ? this.$store.getters.userLoged.adress : 'N/A'}}<br>
                    <span>Cédula:</span> {{this.$store.getters.userLoged.dni ? this.$store.getters.userLoged.dni : 'N/A'}}<br>
                </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
    <v-card-actions class="pt-10">
      <DashboardEditUserInfoForm />
    </v-card-actions>
    </v-col>
    </v-row>
  </v-card>
  <div class="text-center">
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <v-card>
        <v-card-title>
          <span class="headline">Contenido</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-file-input
                  show-size
                  label="Selecciona una foto"
                  v-model="photo"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-container>
          <small>* Indica campos requeridos. </small>
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
            @click="savePhoto"
          >
            Enviar
          </v-btn>
        </v-card-actions>
      </v-card>
          </v-dialog>
        </div>
  </div>
</template>

<script>
import { mdiCameraOutline } from '@mdi/js';
import DashboardEditUserInfoForm from '../dashboard/DashboardEditUserInfoForm';
import { mapActions,mapGetters} from 'vuex';
import Loading from '../Loading';
  export default {
    components: {
      DashboardEditUserInfoForm,
      Loading
    },
    data: () => ({
      mdiCameraOutline: mdiCameraOutline,
      dialog: false,
      photo: ''
    }),
    computed:{...mapGetters(["charginAuth"])},
    methods: {
      ...mapActions(["uploadPhoto"]),
      async savePhoto(){
        let formData = new FormData();
        formData.append("photo", this.photo)
        formData.append("idUser", this.$store.getters.userLoged._id)
        await this.uploadPhoto(formData);
      }
    }
  }
</script>

<style scoped>
.imgButton{
  border-top-left-radius: 0!important;
  border-top-right-radius: 0!important;
}
</style>