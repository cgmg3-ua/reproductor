import { defineStore } from 'pinia';
import { collection, getDocs,where,query } from 'firebase/firestore';
import { db } from '../firebase'; // Asegúrate de que la ruta sea correcta


export const useCanciones = defineStore('url',{
  
    state: () => ({
        //url: null,
        listacanciones: [],
        cancion: null,
        cantante: null,
    }),
    getters: {
        getListaCanciones: (state) => state.canciones,
        getCancion: (state) => state.cancion,
        getCantante: (state) => state.cantante,
        getUrl: (state) => state.url,
    },

    actions: {
  async obtenerTodasLasCanciones() {
    try {
      // Referencia a la colección "songs" en Firestore
      const songsCollectionRef = collection(db, 'songs');

      // Obtener todas las canciones de la colección
      const querySnapshot = await getDocs(songsCollectionRef);
      
      // Guardar todos los datos de las canciones en el array
      const cancionesArray = [];
      querySnapshot.forEach((doc) => {
        const cancionData = doc.data();
        cancionesArray.push(cancionData);
      });

      // Devolver el array con todos los datos de las canciones
      this.listacanciones=cancionesArray;
      return cancionesArray;
    } catch (error) {
      console.error('Error obteniendo las canciones:', error);
      throw error; // Lanza el error para que pueda ser manejado por el llamador
    }
  },



  async obtenerArtista(urlparametro) {
        try{
            const url=urlparametro;
            const songsCollectionRef = collection(db, "songs");
            const q = query(songsCollectionRef, where("url", "==", url));
            const querySnapshot = await getDocs(q);
            if(querySnapshot.empty){
                console.log("No hay canciones con ese nombre");
                return;
            }
            else{
                querySnapshot.forEach((doc) => {
                    const cancionData = doc.data();
                    this.cantante=cancionData.usuario;
                    return cancionData.usuario;
                });
            }
        }
        catch(error){
            console.error('Error obteniendo el artista:', error);
            throw error;
        }
    }, 

    



},	
});