<template>
  <div class="radio-player">
    <h1>Radio Player</h1>

    <!-- Dropdown para seleccionar una estación -->
    <select v-model="selectedStation" >
      <option v-for="station in stations" :key="station.stationuuid" :value="station.url_resolved">
        {{ station.name }}
      </option>
    </select>

    <!-- Reproductor de audio -->
    <div v-if="selectedStation">
      <h3>Now playing: {{ selectedStation }}</h3>
      <audio id="audio" :src="selectedStation" controls autoplay>
        Your browser does not support the audio element.
      </audio>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      stations: [],         // Lista de estaciones de radio
      selectedStation: null, // URL de la estación seleccionada
    };
  },
  
  methods: {
    // Función para obtener estaciones desde la API
    fetchStations() {
      axios
        .get('https://de1.api.radio-browser.info/json/stations/bycountry/Spain') 
        .then((response) => {
          this.stations = response.data;
        })
        .catch((error) => {
          console.error('Error fetching stations', error);
        });
    },
   
  },
  mounted(){
    this.fetchStations();
  },
};
</script>

<style scoped>

</style>
