import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importa el router
import store from './store'; // Importa el store

const app = createApp(App); // Crea la instancia de la aplicación

app.use(router); // Registra el router
app.use(store); // Registra el store
app.mount('#app'); // Monta la aplicación
