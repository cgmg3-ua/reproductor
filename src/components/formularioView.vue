<template>
  <div>
    <h2>Subir una Canción</h2>
    <form @submit.prevent="uploadSong">
      <div>
        <label for="songFile">Archivo de canción:</label>
        <input type="file" id="songFile" @change="onFileChange" accept="audio/*" />
      </div>

      <div>
        <label for="songTitle">Título de la canción:</label>
        <input type="text" v-model="songTitle" placeholder="Título de la canción" required />
      </div>

      <!-- Botón con transición -->
      <transition name="slide-fade">
        <button v-if="canSubmit" type="submit">Subir Canción</button>
      </transition>
    </form>
    
    <!-- Mensaje de éxito con animación bounce -->
    <transition name="bounce">
      <p v-if="showSuccessMessage" style="text-align: center;">
        ¡Canción subida con éxito!
      </p>
    </transition>

   
  </div>
  <div>
      <a href="/miscanciones"><button>Mis Canciones</button></a>
    </div>

</template>

<script>
import { useCanciones } from "../store/canciones"; // Importa el store de Pinia
import { useUserStore } from "../store/store";

export default {
  data() {
    return {
      songFile: null,
      songTitle: "",
      uploadStatus: "",
      userEmail: "",
      showSuccessMessage: false, // Controla la aparición del mensaje de éxito
    };
  },
  computed: {
    userStore() {
      return useUserStore();
    },
    decodedToken() {
      return this.userStore.decodedToken;
    },
    canSubmit() {
      // Verifica si ambos campos están completos
      return this.songFile !== null && this.songTitle.trim() !== "";
    },
  },
  methods: {
    onFileChange(event) {
      this.songFile = event.target.files[0];
    },
    async uploadSong() {
      if (!this.songFile || !this.songTitle) {
        this.uploadStatus = "Por favor, selecciona un archivo y añade un título.";
        return;
      }
      try {
        const useCancionesData = useCanciones();
        await useCancionesData.guardarCancion(this.songFile, this.songTitle, this.userEmail);

       
        this.showSuccessMessage = true; // Muestra el mensaje de éxito

        // Oculta el mensaje después de 3 segundos
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);

        this.songFile = null;
        this.songTitle = "";
        document.getElementById("songFile").value = null;
      } catch (error) {
        console.error("Error subiendo la canción:", error);
        this.uploadStatus = "Hubo un error al subir la canción.";
      }
    },
  },
  mounted() {
    this.userStore.loadTokenFromStorage();
    this.userEmail = this.userStore.decodedToken.email;
  },
};
</script>

<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>