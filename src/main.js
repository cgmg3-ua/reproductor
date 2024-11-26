import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa el router
import store from './store/vuex'; // Importa el store
import {createPinia} from 'pinia'; // Importa pinia

const app = createApp(App); // Crea la instancia de la aplicación
const pinia = createPinia(); // Crea la instancia de pinia
app.use(pinia); // Registra pinia
app.use(router); // Registra el router
app.use(store); // Registra el store
app.mount('#app'); // Monta la aplicación
