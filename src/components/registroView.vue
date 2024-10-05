<template>
  <div class="register-container">
    <h1>Registro</h1>

    <form @submit.prevent="register">
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="email" placeholder="Introduce tu correo" required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" placeholder="Introduce tu contraseña" required />
      </div>
      <div>
        
        <label for="artista">artista</label>
        <input id="artista" v-model="artista" type="checkbox">
        <p>Checkbox está: {{ artista }}</p>
      </div>
      <button type="submit">Registrar</button>
    </form>
  </div>
</template>

<script>
// Importar Firestore
import { db,auth } from '../firebase'; // Asegúrate de que la ruta es correcta
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore'; // Importar métodos para agregar documentos

export default {
  data() {
    return {
      email: '',
      password: '',
      artista: 'false',
      mensaje: ''
    };
  },
  methods: {
  

    async register() {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        // Añadir el nuevo usuario a la colección "usuarios"
        const user = userCredential.user;
        this.mensaje = `Usuario registrado: ${user.email}`;
        await addDoc(collection(db, "usuarios"), {
          email: this.email,
          artista: this.artista
        });
        alert("Usuario registrado");
        console.log("Usuario registrado en Firestore.");
        
      } catch (error) {
        console.error("Error al registrar el usuario:", error);
        alert("Hubo un error al registrar. Inténtalo de nuevo.");
      }
    }
  }
};
</script>

<style scoped>
/* Estilos opcionales para el registro */
</style>
