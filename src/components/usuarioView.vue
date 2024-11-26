<template>
  <div class="login-container" v-if="!isAuthenticated">
    <h1>Iniciar Sesión</h1>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input type="email" id="email" v-model="email" placeholder="Introduce tu correo" required />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" placeholder="Introduce tu contraseña" required />
      </div>

      <button type="submit">Iniciar Sesión</button>
    </form>

    <div class="links">
      <router-link to="/register">¿No tienes cuenta? Regístrate aquí </router-link>
    </div>
    <div class="links">
      <router-link to="/forgot-password">He olvidado la contraseña</router-link>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '../store/store'; // Ajusta la ruta si es necesario

export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods: {
    async handleLogin() {
      try {
        await this.userStore.login(this.email, this.password); // Usamos el store para manejar el login
        console.log("Inicio de sesión exitoso");

        // Redirige al usuario después del login
        this.$router.push("/player");
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        alert("Error al iniciar sesión: " + error.message);
      }
    }
  }
};
</script>

<style scoped>
/* Mantén los estilos existentes */
</style>
