import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import VueSplide from '@splidejs/vue-splide'; // Vue slider
import '@splidejs/vue-splide/css'; // Css vue slider

createApp(App).mount('#app')
createApp(App).use( VueSplide );