import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/homeView.vue';
import UsuarioView from '../components/usuarioView.vue';
import RegisterView from '../components/registroView.vue';
import ForgotPasswordView from '../components/forgotPasswordView.vue';
import formularioView from '../components/formularioView.vue';
import playerView from '../components/playerView.vue';
import musicaView from '../components/musicaView.vue';
import radioView from '@/components/radioView.vue';


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
    path: '/usuario',
    name: 'UsuarioView',
    component: UsuarioView
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
