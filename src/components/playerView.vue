<template>
    <div>
      <h2>Reproductor de Música</h2>
      <select v-model="selectedSong" @change="loadSong">
        <option disabled value="">Selecciona una canción</option>
        <option v-for="song in songs" :key="song.id" :value="song.url">
          {{ song.title }}
        </option>
      </select>
  
      <audio id="audioPlayer" controls v-if="selectedSong">
        <source :src="selectedSong" type="audio/mp3" />
        Tu navegador no soporta la etiqueta de audio.
      </audio>
    </div>
  </template>
  
  <script>
  import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firestore
  
  export default {
    data() {
      return {
        songs: [],
        selectedSong: "",
      };
    },
    mounted() {
      this.fetchSongs();
    },
    methods: {
      async fetchSongs() {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "songs"));
        this.songs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      },
      loadSong() {
        const audioPlayer = document.getElementById("audioPlayer");
        audioPlayer.load();
        audioPlayer.play();
      },
    },
  };
  </script>
  
  <style scoped>
  select {
    margin-bottom: 20px;
  }
  
  audio {
    width: 100%;
    margin-top: 10px;
  }
  </style>
  