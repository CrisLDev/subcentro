<template>
    <v-snackbar
          v-model="snackbar"
          :timeout="timeout"
        >
          {{ text }}

        <template v-slot:action="{ attrs }">
            <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="snackbar = false"
            >
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
name: 'SnackBar',
data: function () {
   return {
     timeout2: '',
      snackbar2: '',
      text2: ''
   }
},
  props: {
      timeout: {
            type: Number,
            default () {
            return ''
            }
      },
      snackbar: {
            type: Boolean,
            default () {
            return ''
            }
      },
      text: {
            type: String,
            default () {
            return ''
            }
      }
  },
  beforeMount () {
    this.timeout2 = this.timeout;
    this.snackbar2 = this.snackbar;
    this.text2 = this.text;
    }
}
</script>