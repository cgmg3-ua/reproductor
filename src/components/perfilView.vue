<template>
    <div>
      <h1>Bienvenido!</h1>
      <!-- Mostrar el correo del usuario si el token es válido -->
      <p v-if="userEmail">Correo del usuario: {{ userEmail }}</p>
      <p v-else>No estás autenticado.</p>
    </div>
  </template>
  
  <script>
  // Importar la librería jwt-decode
  import { jwtDecode } from 'jwt-decode';

  
  export default {
    data() {
      return {
        userEmail: '', // Aquí almacenaremos el correo del usuario
      };
    },
    mounted() {
      // Obtener el token desde localStorage
      const token = localStorage.getItem('authToken');
  
      // Si el token existe, decodificarlo
      if (token) {
        try {
          // Decodificar el token para obtener el payload
          const decodedToken = jwtDecode(token);
  
          // Extraer el correo del payload decodificado
          this.userEmail = decodedToken.email;
        } catch (error) {
          console.error('Error al decodificar el token:', error);
          alert("ERROR DECODIFICAR TOKEN");
        }
      }
    },
  };
  </script>
  
  <style scoped>
  /* Aquí puedes agregar estilos si es necesario */
  </style>
  