import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import E404 from './pages/404.vue';

Vue.use(VueRouter);

export default new VueRouter({
    mode:'history',
    routes: [
        {
            path: "/",
            name: 'home',
            component: Home
        },
        {
            path: "/login",
            name: 'login',
            component: Login
        },
        {
            path: "/*",
            name: '404',
            component: E404
        },
    ]
})