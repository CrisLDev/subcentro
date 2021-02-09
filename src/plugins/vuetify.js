import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import colors from 'vuetify/lib/util/colors'

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
    }
}

export default new Vuetify(opts)