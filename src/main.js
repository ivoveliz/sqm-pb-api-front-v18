import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login.vue';
import Devices from './components/Devices.vue';

const routes = [
{ path: '/', name: 'Login',component: Login },
{ path: '/devices', component: Devices },
{ path: '/:pathMatch(.*)', redirect: '/' },
];

const router = createRouter({
history: createWebHistory(),
routes,
});

createApp(App)
.use(router)
.mount('#app');