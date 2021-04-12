<template>
    <div>
      <v-snackbar
          v-model="snackbarUpdated.snackbar"
          :timeout="snackbarUpdated.timeout"
        >
            {{ snackbarUpdated.text }}

          <template v-slot:action="{ attrs }">
              <v-btn
                  color="blue"
                  text
                  v-bind="attrs"
                  @click="snackbarUpdated.snackbar = false"
              >
                  Cerrar
              </v-btn>
          </template>
      </v-snackbar>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
name: 'SnackBar',
data: function () {
      return {
        timeout2: 2000,
        snackbar2: false,
        text2: '',
      }
},
methods:{
  ...mapActions(["getUltimateSnackbarState"])
},
computed:{
  ...mapGetters(["snackbarUpdated"])
},
created(){
  const data = {timeout2: 2000,
        snackbar2: false,
        text2: ''}
  this.getUltimateSnackbarState(data);
}
}
</script>