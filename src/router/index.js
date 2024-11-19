import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/homeView.vue';
import UsuarioView from '../components/usuarioView.vue';
import RegisterView from '../components/registroView.vue';
import ForgotPasswordView from '../components/forgotPasswordView.vue';
import formularioView from '../components/formularioView.vue';
import playerView from '../components/playerView.vue';
import musicaView from '../components/musicaView.vue';
import radioView from '@/components/radioView.vue';
import perfilView from '../components/perfilView.vue';
import { auth } from '../firebase';


const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path:'/formulario',
    name:'formularioView',
    component:formularioView
  },
  {
    path:'/player',
    name:'playerView',
    component:playerView
  },
  {
    path:'/perfil',
    name:'perfilView',
    component: perfilView
  },
  {
    path: '/usuario',
    name: 'UsuarioView',
    component: UsuarioView,
    beforeEnter: (to, from, next) => {
      // Si el usuario ya está autenticado, redirigir a la página de inicio (o cualquier otra)
      const user = auth.currentUser;
      if (user) {
        next('/home'); // Redirige al home si ya está autenticado
      } else {
        next(); // Permite el acceso si no está autenticado
      }
    },
  },
  {
    path: '/register',
    name: 'RegisterView',
    component: RegisterView
  },
  {
    path: '/forgot-password',
    name: 'ForgotPasswordView',
    component: ForgotPasswordView
  },
  {
    path: '/radio',
    name: 'radioView',
    component: radioView
  },
  {
    path: '/musica',
    name: 'musicaView',
    component: musicaView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
