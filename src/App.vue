<template>
  
  <header>
    <nav>
      <router-link to="/">home</router-link>
      <router-link  v-if="!isAuthenticated" to="/usuario">usuario</router-link>
      <router-link to="/musica">musica</router-link>
      <router-link to="/radio">radio</router-link>
      <!-- Mostrar el botón de cerrar sesión solo si está autenticado -->
      <button v-if="isAuthenticated" @click="logout">Cerrar Sesión</button>
    </nav>
  </header>
  <RouterView></RouterView>
</template>

<script>
  import { onAuthStateChanged, signOut} from "firebase/auth";
  import { auth } from "./firebase.js"; 
export default {
  
  name: "App",
  data() {
    return {
      isAuthenticated: false, // Variable para controlar la autenticación
    };
  },
  methods: {
    // Método para cerrar sesión
    async logout() {
      try {
        await signOut(auth); // Cerrar sesión con Firebase
        this.isAuthenticated = false; // Actualizar estado local
        this.$router.push('/'); // Redirigir a la página principal
        localStorage.removeItem("authToken");
        alert("Has cerrado sesión correctamente.");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert("Hubo un problema al cerrar sesión: " + error.message);
      }
    },
  },
  mounted() {
    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isAuthenticated = true; // Usuario autenticado
      } else {
        this.isAuthenticated = false; // Usuario no autenticado
      }
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
