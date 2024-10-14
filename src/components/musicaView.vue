<template>
    <div>
      <h1>Busqueda </h1>
      <form @submit.prevent="buscar">
      <input type="search" v-model="busqueda">
      <button type="submit">buscar</button>
      </form>
      
    </div>
    <h2>{{mensaje}}</h2>
    <div>
      <h2>Canciones</h2>
        {{ canciones }}
    </div>
  </template>
  
  <script>
  import { collection, getDocs } from 'firebase/firestore';
  import { db } from '../firebase';  // Asegúrate de importar tu configuración de Firebase
  
  export default {
    data() {
      return {
        canciones: [],  // Aquí almacenaremos los títulos de las canciones obtenidas
        busqueda: "",
        mensaje: ""
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
            
            cancionesArray.push( cancionData.title );
          } 
          this.canciones = cancionesArray;
        } catch (error) {
          console.error('Error obteniendo las canciones:', error);
        }
        
      },
      buscar(){
        let numero=false;
        for(let i=0;this.canciones.length>i;i++){
          if(this.canciones[i]==this.busqueda){
            numero=i;
            break;
          }
          
        
        }
        if(numero==false)
          this.mensaje="No existe esa cancion";
        
        else
          this.mensaje="Existe la canicon " + this.canciones[numero];

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
  