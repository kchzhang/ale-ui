import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/index.css';
import AleUI from '../packages';

const app = createApp(App);
app.use(AleUI);
app.use(router).mount('#app');