<template>
  <div>
    <h1>Bienvenido!</h1>
    <p v-if="decodedToken">Correo del usuario: {{ decodedToken.email }}</p>
    <p v-else>No estás autenticado.</p>
  </div>
</template>

<script>
import { useUserStore } from '../store/store';

export default {
  name: 'PerfilView',
  computed: {
    userStore() {
      return useUserStore();
    },
    decodedToken() {
      return this.userStore.decodedToken; // Accede al token decodificado desde Pinia
    },
  },
  mounted() {
    this.userStore.loadTokenFromStorage(); // Carga el token desde localStorage al cargar el componente
  },
};
</script>

<style scoped>
/* Aquí puedes agregar estilos si es necesario */
</style>
