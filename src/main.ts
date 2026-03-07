import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import '../packages/index.css';
import './styles/index.css';

createApp(App).use(router).mount('#app');
