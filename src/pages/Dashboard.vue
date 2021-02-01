<template>
    <v-container>
      <DasboardActions />
    </v-container>
</template>

<script>
import DasboardActions from '../components/dashboard/dashboardActions';
export default {
  components:{
    DasboardActions
  },
    data: function () {
      return {
        numero: 0
      }
},
    methods: {
        sumar5: function () {
            return this.numero = this.numero + 5;
        }
    },
  mounted () {
      document.addEventListener('keydown', logKey);
    function logKey(e) {
      if (`${e.code}` == "ArrowRight") {
          this.sumar5();
      }
    }
  }
}
</script>