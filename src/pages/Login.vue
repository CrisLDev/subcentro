<template>
  <div>
    <v-container class="lighten-5">
      <LoginForm/>
    </v-container>
  </div>
</template>

<script>
import LoginForm from '../components/userActions/LoginForm.vue';

export default {
  components: {
    LoginForm
  },
    watch: {
        $route: {
            immediate: true,
            handler(to) {
                document.title = to.meta.title || 'Login';
            }
        },
    }
}
</script>