<template>
    <div>
        <h1>Editar Canciones</h1>
        <form @submit.prevent="handleEdit">
            <div class="form-group">
                <div><label for="title">Título</label></div>
                <input type="text" id="title" v-model="title" placeholder="Introduce el título" required />
                <Transition name="slide-fade">
                    <button v-if="title.trim()" type="submit">Editar</button>
                </Transition>
                
            </div>
        </form>
    </div>
</template>

<script>
    import { useCanciones } from "../store/canciones";
    export default{
        data(){
            return{
                title: "",
                id: ""
            };
        },
        methods:{
            async handleEdit(){
                try{
                    const useCancionesData = useCanciones();
                    await useCancionesData.editarCancion(this.id,this.title);
                    console.log("Canción editada con éxito");
                    this.$router.push("/miscanciones");
                }catch(error){
                    console.error("Error al editar la canción:", error);
                    alert("Error al editar la canción: " + error.message);
                    
                }
            }
        },
        mounted() {
            this.id=this.$route.query.id;
        }
    }
</script>


<style scoped>
/*
  Enter and leave animations can use different
  durations and timing functions.
*/
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>