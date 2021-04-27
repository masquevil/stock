import { createApp } from 'vue';
import router from '@/router';
import App from './entry.vue';

createApp(App).use(router).mount('#app');
