<template>
  <div>
    <h1>Busqueda</h1>
    <form @submit.prevent="buscar">
      <input type="search" v-model="state.busqueda" />
      <button type="submit">buscar</button>
    </form>

    <h2>{{ state.mensaje }}</h2>

    <div>
      <h2>Canciones</h2>
      <!-- Lista de canciones -->
      <ul>
        <li v-for="(cancion, index) in state.canciones" :key="index">
          <!-- Nombre de la canción -->
          <span @click="mostrarInformacion(index)" style="cursor: pointer; color: blue;">
            {{ cancion.title }}
          </span>
         

          <!-- Desplegable con información -->
          <div v-if="state.desplegableVisible === index" style="margin-left: 20px; border: 1px solid #ccc; padding: 10px; max-width: 300px;">
            <p><strong>Título:</strong> {{ cancion.title }}</p>         
            <p v-if="cancion.usuario"><strong>Artista:</strong> {{ cancion.usuario }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useCanciones } from "../store/canciones";

export default {
  setup() {
    // Crear el estado reactivo
    const state = reactive({
      canciones: [], // Lista de canciones con información completa
      desplegableVisible: null, // Índice del desplegable actualmente visible
      mensaje: "",
      busqueda: "",
    });

    // Método para cargar canciones
    const cargarCanciones = async () => {
      try {
        const useCancionesData = useCanciones();
        const todasLasCanciones = await useCancionesData.obtenerTodasLasCanciones();
        state.canciones = todasLasCanciones;
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
        state.mensaje = "Hubo un error al obtener las canciones. Inténtalo de nuevo.";
      }
    };

    // Método para alternar el desplegable
    const mostrarInformacion = (index) => {
      state.desplegableVisible = state.desplegableVisible === index ? null : index;
    };
    

    // Cargar las canciones al montar el componente
    onMounted(() => {
      cargarCanciones();
    });

    return {
      state,
      mostrarInformacion,
    };
  },
};
</script>

<style scoped>

</style>
