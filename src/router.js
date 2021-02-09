import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import E404 from './pages/404.vue';
import Register from './pages/Register.vue';
import Dashboard from './pages/Dashboard.vue';
import {isLogged} from './utils/auth';
import DatesForm from './pages/DatesForm.vue';

Vue.use(VueRouter);

const router = new VueRouter({
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
            component: Login,
            meta: {
                isLogged: true
            }
        },
        {
            path: "/register",
            name: 'register',
            component: Register,
            meta: {
                isLogged: true
            }
        },
        {
            path: "/dashboard",
            name: 'dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/dates",
            name: 'dates',
            component: DatesForm,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: "/*",
            name: '404',
            component: E404
        },
    ]
});

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !isLogged())
    next({name: 'login'})
    else next();

    if(to.meta.isLogged && isLogged())
    next({name: 'dashboard'})
    else next()
});

export default router;