import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/aura-dark-purple/theme.css'
import 'primeicons/primeicons.css'

import App from './App.vue'
import DashComponent from "./component.vue";

import dashboard from './pages/sections/dashboard.vue'
import HotToUse from './pages/sections/how_to_use.vue'
import pageNotFound from './pages/pageNotFound.vue'
import TagCode from './pages/sections/TagCode.vue';
import login from './login/login.vue'
import admin from './pages/sections/admin.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component:DashComponent, 
            children :[
                { path: '/', component:dashboard  },
                { path: '/inquiry', component:HotToUse },
                { path: '/best-sellers', component:TagCode },
            ]  
        },
        { path: "/:catchAll(.*)", component:pageNotFound }
    ]
});


const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.mount('#app');
