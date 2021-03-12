import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import colors from 'vuetify/lib/util/colors';
import es from 'vuetify/lib/locale/es';

Vue.use(Vuetify)

const blueWeird = '6c63ff';
const violetWeird = '8011DC';

const opts = {
    theme: {
        themes: {
            light: {
            primary: blueWeird,
            secondary: violetWeird, // #FFCDD2
            accent: colors.indigo.base, // #3F51B5
            },
        },
    },
    icons:{
        iconfont: 'mdiSvg'
    },
    lang: {
        locales: { es },
        current: 'es'
    }
}

export default new Vuetify(opts)