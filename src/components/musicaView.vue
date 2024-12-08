<template>
  <div class="all">
    <form @submit.prevent="buscar">
      <input 
        type="search" 
        v-model="busqueda" 
        placeholder="Buscar" 
        class="input-busqueda" 
      />
    </form>

    <div class="listacanciones">
      <h2>Canciones</h2>
      <ul class="canciones">
        <li v-for="(cancion, index) in cancionesFiltradas" :key="index">
          <Transition name="fade">
            <span v-if="desplegableVisible !== index" @click="loadSong(index)" class="botonplay">
              <i class="bi bi-play-fill fs-2"></i>
            </span>
          </Transition>
          <span class="nombrecioncion" @click="mostrarInformacion(index)">
            {{ cancion.title }}
          </span>

          <Transition name="nested">
            <div v-if="desplegableVisible === index" class="inner" style="margin-left: 20px;">
              <p v-if="cancion.usuario" style="color:black"><strong>Artista:</strong> {{ cancion.usuario }}</p>
            </div>
          </Transition>
        </li>
      </ul>
    </div>
  </div>
  <div>
   <p>-</p>
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
  computed: {
    // Filtro que devuelve las canciones que coinciden con la búsqueda en el título
    cancionesFiltradas() {
      if (!this.busqueda) {
        return this.canciones; // Si no hay búsqueda, devuelve todas las canciones
      }
      return this.canciones.filter(cancion =>
        cancion.title.toLowerCase().includes(this.busqueda.toLowerCase()) // Filtra por título
      );
    },
  },
  methods: {
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

    mostrarInformacion(index) {
      this.desplegableVisible = this.desplegableVisible === index ? null : index;
    },
    ...mapMutations(['setSelectedSong']), // Mapear la mutación al método local
    loadSong(index) {
      let cancionvuex = this.canciones[index];
      this.setSelectedSong(cancionvuex.url); // Actualiza el estado global con Vuex
    },

    buscar() {
      if (this.busqueda) {
        this.mensaje = `Buscando canciones relacionadas con "${this.busqueda}"`;
      } else {
        this.mensaje = "No se ha ingresado ninguna búsqueda.";
      }
    },
  },
  mounted() {
    this.cargarCanciones();
  },
};
</script>

<style scoped>
/* Estilo para el input de búsqueda */
.input-busqueda {
  width: 50%;
  padding: 10px;
  border-radius: 20px; /* Bordes redondeados */
  border: 1px solid #ccc;
  margin-bottom: 20px; /* Separación con el contenido siguiente */
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}

.input-busqueda:focus {
  border-color: #0077ff; /* Cambio de color en el foco */
  outline: none; /* Eliminar el borde por defecto en el enfoque */
}

.input-busqueda::placeholder {
  color: #888; /* Color gris para el placeholder */
  font-style: italic;
}

/* Contenedor del listado de canciones */
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 20px auto;
}

/* Elementos individuales de la lista */
ul li {
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  transition: background-color 0.3s ease;
}

ul li:first-child {
  border-bottom: none;
}

/* Estilo para el nombre de la canción */
.nombrecioncion {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: color 0.3s ease;
}

ul li:hover {
  color: #4b6cb7;
}

/* Estilo para el botón de reproducción */
.botonplay {
  font-size: 14px;
  color: #0077ff;
  cursor: pointer;
  text-decoration: underline;
  transition: color 0.3s ease;
}

ul li span:last-child:hover {
  color: #ff0099;
}

.nested-enter-active,
.nested-leave-active {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from,
.nested-leave-to {
  transform: translateX(30px);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
.listacanciones {
  margin-bottom: 100px;
  
}
</style>
