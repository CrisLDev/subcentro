import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import E404 from './pages/404.vue';
import Register from './pages/Register.vue';
import Dashboard from './pages/Dashboard.vue';
import {isLogged,isAdmin,isDoctor} from './utils/auth';
import Admin from './pages/Admin.vue';
import Dates from './pages/Dates.vue';
import Patients from './pages/Patients.vue';
import PatientsPage from './pages/Patientspage.vue';
import History from './pages/History.vue';
import HistoryView from './pages/HistoryView.vue';

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
            path: "/admin",
            name: 'admin',
            component: Admin,
            meta: {
                requiresAuth: true,
                isAdmin: true
            }
        },
        {
            path: "/citas",
            name: 'dates',
            component: Dates,
            meta: {
                requiresAuth: true,
                isDoctor: true
            }
        },
        {
            path: "/pacientes",
            name: 'pacientes',
            component: Patients,
            meta: {
                requiresAuth: true,
                isDoctor: true
            }
        },
        {
            path: "/historial/:patient_id",
            name: 'historial',
            component: History,
            meta: {
                requiresAuth: true,
                isDoctor: true
            }
        },
        {
            path: "/historial/editar/:id",
            name: 'historialEditar',
            component: History,
            meta: {
                requiresAuth: true,
                isDoctor: true
            }
        },
        {
            path: "/historial/ver/:id",
            name: 'historialVer',
            component: HistoryView,
            meta: {
                requiresAuth: true,
                isDoctor: true
            }
        },
        {
            path: "/pacientes/:id",
            name: 'Pagina pacientes',
            component: PatientsPage,
            meta: {
                requiresAuth: true,
                isDoctor: true
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

    if(to.meta.isAdmin && !isAdmin())
    next({name: 'dashboard'})
    else next()

    if(to.meta.isDoctor && !isDoctor())
    next({name: 'dashboard'})
    else next()
});

export default router;