<template>
    <div>
      <h2>Títulos de las Canciones</h2>
        <li v-for="(cancion, index) in canciones" :key="index">
          {{ cancion.title }}
        </li>
    </div>
  </template>
  
  <script>
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '../firebase';  // Asegúrate de importar tu configuración de Firebase
  
  export default {
    data() {
      return {
        canciones: []  // Aquí almacenaremos los títulos de las canciones obtenidas
      };
    },
    methods: {
      async obtenerTodasLasCanciones() {
        try {
          // Referencia a la colección "songs" en Firestore
          const songsCollectionRef = collection(db, 'songs');
  
          // Obtener todas las canciones de la colección
          const querySnapshot = await getDocs(songsCollectionRef);
          
          // Guardar solo los títulos en el estado
          const cancionesArray = [];
          for(let i=0;querySnapshot.docs.length>i;i++){
          
            const cancionData = querySnapshot.docs[i].data();
            
            cancionesArray.push({ title: cancionData.title });
          } 
          this.canciones = cancionesArray;
        } catch (error) {
          console.error('Error obteniendo las canciones:', error);
        }
      }
    },
    mounted() {
      this.obtenerTodasLasCanciones();  // Llama a la función cuando el componente se monta
    }
  };
  </script>
  
  <style scoped>
  /* Añade tu estilo aquí si lo necesitas */
  </style>
  