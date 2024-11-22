// store.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    selectedSong: '', // Almacena la canción seleccionada
  },
  mutations: {
    setSelectedSong(state, song) {
      state.selectedSong = song; // Mutación para actualizar la canción
    },
  },
  getters: {
    getSelectedSong: (state) => state.selectedSong, // Getter para obtener la canción
  },
});

export default store;
