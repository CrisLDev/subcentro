<template>
  <div>
    <v-container class="lighten-5">
      <RegisterForm/>
    </v-container>
  </div>
</template>

<script>
import RegisterForm from '../components/userActions/RegisterForm.vue';

export default {
  components: {
    RegisterForm
  }
}
</script>