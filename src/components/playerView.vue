<template>
    <div>
      <h2>Reproductor de Música</h2>
      <select v-model="cancion" @change="loadSong">
        <option disabled value="">Selecciona una canción</option>
        <option v-for="song in songs" :key="song.id" :value="song.url">
          {{ song.title }}
        </option>
      </select>
  
      <!--<audio id="audioPlayer" controls v-if="selectedSong">
        <source :src="selectedSong" type="audio/mp3" />
        Tu navegador no soporta la etiqueta de audio.
      </audio>-->
      <label>{{ selectedSong }} variable seleted song</label>
      <label>{{ loadSong }} Mutacion</label>
      <label>{{cancion }} cancion</label>
    </div>
  </template>
  
<script>
  import { getFirestore, collection, getDocs } from 'firebase/firestore'; // Firestore
  
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      songs: [], // Lista de canciones
      cancion: "", // Canción seleccionada localmente
    };
  },
  mounted() {
    this.fetchSongs(); // Carga las canciones al montar el componente
  },
  methods: {
    ...mapMutations(['setSelectedSong']), // Mapear la mutación al método local
    
    loadSong() {
      this.setSelectedSong(this.cancion); // Actualiza el estado global con Vuex
    },
    async fetchSongs() {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "songs"));
      this.songs = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
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
  