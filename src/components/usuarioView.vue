<template>
    <div class="login-container" v-if="!isAuthenticated">
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
  import { auth } from '../firebase';
  import{ signInWithEmailAndPassword,} from 'firebase/auth'
  
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

          const userCredential=await signInWithEmailAndPassword(auth,this.email,this.password)
          

          const user = userCredential.user;


          const token = await user.getIdToken();
          console.log("Token generado:", token);

          // Guardar el token en localStorage (opcional)
          localStorage.setItem("authToken", token);
          

          
          
          console.log("Inicio de sesión registrado en Firestore.");
          this.$router.push("/player");
        } catch (error) {
          console.error("Error al registrar el inicio de sesión:", error);
          alert("Error al inicar sesion ",error)
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Mantén los estilos existentes */
  </style>
  