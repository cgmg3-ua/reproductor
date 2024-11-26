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
          <router-link class="nav-link" to="/radio">Radio </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"  v-if="isAuthenticated" to="/perfil">Perfil</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link"  v-if=" isArtist "  to="/formulario">Artista zone</router-link>
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
    <label>{{ getSelectedSong }}</label>
    <audio ref="audioPlayer" controls v-if="getSelectedSong">
      <source :src="getSelectedSong" type="audio/mp3" />
      Tu navegador no soporta la etiqueta de audio.
    </audio>
</footer>
</template>

<script>

  import { onAuthStateChanged} from "firebase/auth";
  import { collection, query, where, getDocs } from "firebase/firestore";
  import { db } from "./firebase.js";
  import { auth } from "./firebase.js"; 
  import { mapGetters } from 'vuex';
  import { useUserStore } from './store/store';
 
  
export default {
  
  name: "App",
  data() {
    return {
      isAuthenticated: false, // Variable para controlar la autenticación
      isArtist: false, // Variable para controlar si el usuario es artista
      //selectedSong:"", // Variable para almacenar la canción seleccionada
      nombre: "",
    };
  },
  computed: {
    ...mapGetters(['getSelectedSong']), // Mapear el getter al componente
    userStore() {
      return useUserStore();
    },
    decodedToken() {
      return this.userStore.decodedToken; // Accede al token decodificado desde Pinia
    },
   
  
  },
  watch: {
    // Escucha cambios en getSelectedSong
    getSelectedSong(newValue) {
      if (newValue && this.$refs.audioPlayer) {
        const audioPlayer = this.$refs.audioPlayer;
        audioPlayer.load(); // Recargar el reproductor
        audioPlayer.play(); // Reproducir automáticamente
      }
    },
    isAuthenticated(newValue) {
      if (newValue) {
        this.esArtista(); // Llama a esArtista cuando el usuario se autentique
      }
    },
  },
  methods: {
    // Método para cerrar sesión
    async logout() {
      try {
        const userStore = useUserStore(); // Instancia useUserStore
        await userStore.logout();
        this.isAuthenticated = false;
        this.isArtist= false;
        this.$router.push('/'); // Redirigir a la página principal
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert("Error al cerrar sesión: " + error.message);
      }
    },

    async esArtista(){
      
      try {
        const email=auth.currentUser.email;
        const usuariosRef = collection(db, "usuarios");
        const q = query(usuariosRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
      
        if (!querySnapshot.empty) {
          const usuario = querySnapshot.docs[0].data();
          this.nombre= usuario.email;
          this.isArtist= usuario.artista; // Devuelve true o false
        } else {
          this.isArtist= false; // No encontrado
        }
      } catch (error) {
        alert("Error al verificar si es artista: " + error.message);
        console.error("Error al verificar si es artista:", error);
        this.isArtist= false;
        }
    },



    
    loadSong() {
        const audioPlayer = document.getElementById("audioPlayer");
        audioPlayer.load();
        audioPlayer.play();
      },
     
   
  },
  
  mounted() {
    // Escuchar cambios en el estado de autenticación
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        this.isAuthenticated = true; // Usuario autenticado
        //await this.esArtista();
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
  
}

.app-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

footer {
  background-color: #282828;
  color: white;
  padding: 1px;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* Añade esto a tu archivo de estilos global o en el bloque <style> de App.vue */
.spotify-footer {
  background-color: #282828;
  color: white;
 
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.spotify-player {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;
}

.spotify-player audio {
  width: 100%;
}

.spotify-player audio::-webkit-media-controls-panel {
  background-color: #282828;
  color: white;
}

.spotify-player audio::-webkit-media-controls-play-button,
.spotify-player audio::-webkit-media-controls-current-time-display,
.spotify-player audio::-webkit-media-controls-time-remaining-display,
.spotify-player audio::-webkit-media-controls-timeline,
.spotify-player audio::-webkit-media-controls-volume-slider,
.spotify-player audio::-webkit-media-controls-mute-button,
.spotify-player audio::-webkit-media-controls-fullscreen-button {
  filter: invert(100%);
}
</style>
