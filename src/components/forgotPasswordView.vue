<template>
    <form @submit.prevent="recuperarContraseña">
      <h1>Recuperar Contraseña</h1>
      <input type="email" v-model="correo" placeholder="Introduce tu correo" required />
      <button type="submit">Recuperar</button>
    </form>
  </template>
  
  <script>
  import { auth } from '../firebase'; 
  import { sendPasswordResetEmail} from 'firebase/auth';
  export default {
    data(){
      return{
        correo:""
      };
    },
    methods:{
      async recuperarContraseña(){
        try{
          await sendPasswordResetEmail(auth, this.correo);
          alert("Correo enviado");
        }catch(error) {
          alert("error al enviar el correo",error);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  
  </style>
  