import Vue from 'vue'
import router from './router';
import App from './App.vue';
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VCalendar from 'v-calendar';
import Schedule from 'vue-schedule';

// Esta es una nota
// Estuve 2 malditos dias averiguando porque no ejecutaba ek dipatch y el problema fue que habia importado el store como Store y era store que hdp el que hizo vuex xS
import store from './store';

Vue.config.productionTip = false;

Vue.use(Schedule)

// Use v-calendar & v-date-picker components
Vue.use(VCalendar, {
  componentPrefix: 'vc'
});

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app")