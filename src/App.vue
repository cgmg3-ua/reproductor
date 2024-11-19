<template>
  
  <header style="margin-top: 0;">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/musica">Música</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/radio">Radio</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"  v-if="isAuthenticated" to="/perfil">Perfil</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"  v-if="isAuthenticated  && isArtist"  to="/formulario">Artista zone</router-link>
        </li>
      </ul>  
      <ul class="navbar-nav ml-auto">
       
        <li class="nav-item">
          <router-link class="nav-link" v-if="!isAuthenticated" to="/usuario">Iniciar Sesión</router-link>
        </li>
        
      </ul>
      <button class="btn btn-outline-danger my-2 my-sm-0" v-if="isAuthenticated" @click="logout">Cerrar Sesión</button>
    </div>
  </nav>
</header>

  <RouterView></RouterView>
<footer class="footer">
  <audio id="audioPlayer" controls v-if="selectedSong">
        <source :src="selectedSong" type="audio/mp3" />
        Tu navegador no soporta la etiqueta de audio.
      </audio>
</footer>
</template>

<script>
  import { jwtDecode } from 'jwt-decode';
  import { onAuthStateChanged, signOut} from "firebase/auth";
  import { auth } from "./firebase.js"; 
export default {
  
  name: "App",
  data() {
    return {
      isAuthenticated: false, // Variable para controlar la autenticación
      isArtist: false,
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
    const token = localStorage.getItem('authToken');
    if (token){
      try{
      const decodedToken = jwtDecode(token);
      this.isArtist=decodedToken.artista;
      }
      catch (error) {
        console.error('Error al decodificar el token:', error);
        alert("ERROR DECODIFICAR TOKEN");
      }
    }   
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
  
}
</style>
