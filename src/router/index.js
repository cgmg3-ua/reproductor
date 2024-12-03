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
import misCancionesView from '../components/miscancionesView.vue';
import editarcancionView from '../components/editarcancionView.vue';
import { auth } from '../firebase';
import { onAuthStateChanged } from "firebase/auth";



const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path:'/formulario',
    name:'formularioView',
    component:formularioView,
    beforeEnter: (to, from, next) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('Usuario autenticado:', user.email);
          next(); // Usuario autenticado
        } else {
          console.log('Usuario no autenticado');
          //alert('Debes iniciar sesión para acceder a esta página.');
          next('/usuario'); // Redirigir
        }
      });
    },
  },
  {
    path:'/player',
    name:'playerView',
    component:playerView
  },
  {
    path:'/perfil',
    name:'perfilView',
    component: perfilView,
    beforeEnter: (to, from, next) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('Usuario autenticado:', user.email);
          next(); // Usuario autenticado
        } else {
          console.log('Usuario no autenticado');
          //alert('Debes iniciar sesión para acceder a esta página.');
          next('/usuario'); // Redirigir
        }
      });
    },
  },
  
    {
      path: '/miscanciones',
      name: 'misCancionesView', // (corrige 'namne' a 'name')
      component: misCancionesView,
      beforeEnter: (to, from, next) => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log('Usuario autenticado:', user.email);
            next(); // Usuario autenticado
          } else {
            console.log('Usuario no autenticado');
            //alert('Debes iniciar sesión para acceder a esta página.');
            next('/usuario'); // Redirigir
          }
        });
      },
      
    },
  
  {
    path: '/usuario',
    name: 'UsuarioView',
    component: UsuarioView,
   
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
  },
  {
    path: '/editarcancion',
    name: 'editarcancionView',
    component: editarcancionView,
    beforeEnter: (to, from, next) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log('Usuario autenticado:', user.email);
          next(); // Usuario autenticado
        } else {
          console.log('Usuario no autenticado');
          //alert('Debes iniciar sesión para acceder a esta página.');
          next('/usuario'); // Redirigir
        }
      });
    },
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
