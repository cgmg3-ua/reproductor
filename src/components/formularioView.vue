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
  import { ref } from 'firebase/storage'; // Referencias a Storage
  import { getFirestore, collection, addDoc } from 'firebase/firestore'; // Firestore
  import { storage } from "../firebase"; // Cpara guardar las pistas de audio
  import { getDownloadURL, uploadBytes } from 'firebase/storage';
  import { jwtDecode } from 'jwt-decode';
  export default {
    data() {
      return {
        songFile: null,
        songTitle: "",
        uploadStatus: "",
        userEmail: "", // Aquí almacenaremos el correo del usuario
      };
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
        const token = localStorage.getItem('authToken');
  
        // Si el token existe, decodificarlo
        if (token) {
          try {
            // Decodificar el token para obtener el payload
            const decodedToken = jwtDecode(token);

            // Extraer el correo del payload decodificado
            this.userEmail = decodedToken.email;
          } catch (error) {
            console.error('Error al decodificar el token:', error);
            alert("ERROR DECODIFICAR TOKEN");
          }
        }
        else {
          alert("No estás autenticado.");
          return;
        }
        // 1. Subir archivo a GCS
        const storageRef = ref(storage, `songs/${this.songFile.name}`);
        try {
          // Subir el archivo a Cloud Storage
          await uploadBytes(storageRef, this.songFile);
  
          // Obtener la URL de descarga
          const downloadURL = await getDownloadURL(storageRef);
  
          // 2. Guardar metadatos en Firestore
          const db = getFirestore();
          await addDoc(collection(db, "songs"), {
            title: this.songTitle,
            url: downloadURL,
            usuario: this.userEmail,
          });
  
          // 3. Notificar al usuario que se completó la subida
          this.uploadStatus = "Canción subida exitosamente.";
        } catch (error) {
          console.error("Error subiendo la canción:", error);
          this.uploadStatus = "Hubo un error al subir la canción.";
        }
      },
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
  