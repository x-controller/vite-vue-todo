import {defineAsyncComponent} from 'vue'
import {createWebHistory, createRouter} from "vue-router";
import About from "../views/About.vue";
import Login from "../views/Login.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: defineAsyncComponent(() => import('../views/Home')),
    },
    {
        path: "/about",
        name: "about",
        component: About,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: 'register',
        component: defineAsyncComponent(() => import('../views/Register'))
    }
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
