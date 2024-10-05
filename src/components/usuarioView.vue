<template>
    <div class="login-container">
      <h1>Iniciar Sesión</h1>
  
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" id="email" v-model="email" placeholder="Introduce tu correo" required />
        </div>
  
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input type="password" id="password" v-model="password" placeholder="Introduce tu contraseña" required />
        </div>
  
        <button type="submit">Iniciar Sesión</button>
      </form>
  
      <div class="links">
        <router-link to="/register">¿No tienes cuenta? Regístrate aquí </router-link>
        
      </div>
      <div class="links">
            <router-link to="/forgot-password"> He olvidado la contraseña</router-link>
      </div>
    </div>
  </template>
  
  <script>
  // Importamos Firestore desde la configuración de Firebase
  import { db } from '../firebase';
  import { collection, addDoc } from 'firebase/firestore';
  
  export default {

    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
        
      async login() {
        
        try {
          await addDoc(collection(db, "usuarios"), {
            email: this.email,
            password: this.password,
          });
          alert("Inicio de sesion correcto");
          console.log("Inicio de sesión registrado en Firestore.");
        } catch (error) {
          console.error("Error al registrar el inicio de sesión:", error);
          alert("Error al inicar sesion",error)
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Mantén los estilos existentes */
  </style>
  