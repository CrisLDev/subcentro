<template>
  <v-container class="lighten-5 mb-16">
    <RegisterForm/>
  </v-container>
</template>

<script>
import RegisterForm from '../components/userActions/RegisterForm.vue';

export default {
  components: {
    RegisterForm
  },
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || 'Registro';
            }
        },
    }
}
</script>