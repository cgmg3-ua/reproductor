<template>
  <div class="all">
    <h1>Busqueda</h1>
    <form @submit.prevent="buscar">
      <input type="search" v-model="busqueda" />
      <button type="submit">buscar</button>
    </form>

    <h2>{{ mensaje }}</h2>

    <div>
      <h2>Canciones</h2>
      <!-- Lista de canciones -->
      <ul>
        <li v-for="(cancion, index) in canciones" :key="index">
          <!-- Nombre de la canción -->
          <span @click="mostrarInformacion(index)">
            {{ cancion.title }}
          </span>
          <Transition name="fade">
            <span v-if="desplegableVisible !== index" @click="loadSong(index)">
              <i class="bi bi-play-fill fs-2"></i> <!-- fs-2 para ícono grande -->
            </span>
          </Transition>
          <Transition name="nested">
            <div v-if="desplegableVisible === index" class="inner" style="margin-left: 20px;">
               <!-- <p><strong>Título:</strong> {{ cancion.title }}</p>  -->       
              <p v-if="cancion.usuario"><strong>Artista:</strong> {{ cancion.usuario }}</p>
            </div>
          </Transition>

          <!-- Desplegable con información -->
          
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useCanciones } from "../store/canciones";
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      canciones: [], // Lista de canciones con información completa
      desplegableVisible: null, // Índice del desplegable actualmente visible
      mensaje: "", // Mensaje de error o éxito
      busqueda: "", // Texto de búsqueda
    };
  },
  methods: {
    // Método para cargar las canciones
    async cargarCanciones() {
      try {
        const useCancionesData = useCanciones();
        const todasLasCanciones = await useCancionesData.obtenerTodasLasCanciones();
        this.canciones = todasLasCanciones;
      } catch (error) {
        console.error("Error al obtener las canciones:", error);
        this.mensaje = "Hubo un error al obtener las canciones. Inténtalo de nuevo.";
      }
    },

    // Método para alternar el desplegable
    mostrarInformacion(index) {
      this.desplegableVisible = this.desplegableVisible === index ? null : index;
    },
    ...mapMutations(['setSelectedSong']), // Mapear la mutación al método local
    loadSong(index) {
      
      let cancionvuex = this.canciones[index];
      this.setSelectedSong(cancionvuex.url); // Actualiza el estado global con Vuex
    },
    // Método para manejar la búsqueda (aquí puedes agregar lógica para filtrar canciones)
    buscar() {
      if (this.busqueda) {
        this.mensaje = `Buscando canciones relacionadas con "${this.busqueda}"`;
      } else {
        this.mensaje = "No se ha ingresado ninguna búsqueda.";
      }
    },
  },
  mounted() {
    // Cargar las canciones al montar el componente
    this.cargarCanciones();
  },
};
</script>

<style scoped>
all {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
.inner {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto; /* Opcional para centrar horizontalmente si el ancho es fijo */
  width: 300px; /* Ajusta al ancho necesario */
  height: 100px; /* Ajusta al alto necesario */
  border: 1px solid #ff0084;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}
/* Contenedor del listado */
ul {
  list-style-type: none; /* Quita los puntos de las listas */
  padding: 0;
  margin: 0;
  background-color: #f4f4f4; /* Fondo del contenedor */
  border-radius: 8px; /* Bordes redondeados */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra sutil */
  max-width: 400px; /* Ancho máximo */
  margin: 20px auto; /* Centrar el listado */
  
}

/* Elementos individuales de la lista */
ul li {
  padding: 10px 20px; /* Espaciado interno */
  display: flex; /* Flexbox para alinear contenido */
  justify-content: space-between; /* Espaciado entre elementos */
  align-items: center; /* Alinear verticalmente */
  border-bottom: 1px solid #ddd; /* Línea separadora */
  background-color: #fff; /* Fondo blanco para elementos */
  transition: background-color 0.3s ease; /* Efecto al pasar el mouse */
}

/* Último elemento sin borde */
ul li:last-child {
  border-bottom: none;
}

/* Estilo para el nombre de la canción */
ul li span:first-child {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease; /* Efecto al pasar el mouse */
}

/* Cambiar color al pasar el mouse */
ul li:hover {
   color: #4b6cb7;
}

/* Estilo para el botón de reproducción */
ul li span:last-child {
  font-size: 14px;
  color: #0077ff; /* Rojo para el botón */
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

/* Cambiar color al pasar el mouse */
ul li span:last-child:hover {
  color: #ff0099;
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}

.inner {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  width: 300px;
  height: 100px;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
}

/* Transición para el ícono de play */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

</style>
