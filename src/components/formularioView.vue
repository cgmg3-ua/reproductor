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
  
        <button type="submit">Subir Canción</button>
      </form>
      <div>
        <a href="/miscanciones"><button >Mis Canciones</button></a>
      </div>
      <p v-if="uploadStatus">{{ uploadStatus }}</p>

      
    </div>

  </template>
  
  <script>
  
  import { useCanciones } from "../store/canciones"; // Importa el store de Pinia
  import {useUserStore} from "../store/store";
  export default {
    data() {
      return {
        songFile: null,
        songTitle: "",
        uploadStatus: "",
        userEmail: "", // Aquí almacenaremos el correo del usuario
      };
    },
    computed: {
    userStore() {
      return useUserStore();
    },
    decodedToken() {
      return this.userStore.decodedToken; // Accede al token decodificado desde Pinia
    },
  },
    methods: {
      onFileChange(event) {
        this.songFile = event.target.files[0]; // Almacenar el archivo seleccionado
      },
      async uploadSong() {
        if (!this.songFile || !this.songTitle) {
          this.uploadStatus = "Por favor, selecciona un archivo y añade un título.";
          return;
        }
        
  
        // Si el token existe, decodificarlo
      
        try {
          
          const useCancionesData = useCanciones();
          await useCancionesData.guardarCancion(this.songFile, this.songTitle, this.userEmail);
          this.uploadStatus = "Canción subida con éxito.";
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
      this.userStore.loadTokenFromStorage(); // Carga el token desde localStorage al cargar el componente
      this.userEmail = this.userStore.decodedToken.email; // Almacenar el correo del usuario
    },
  };
  </script>
  
  <style scoped>
  form {
    margin: 20px 0;
  }
  
  input {
    margin-bottom: 10px;
    display: block;
  }
  
  button {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
  }
  </style>
  