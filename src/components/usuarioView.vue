<template>
  <div class="login-container" v-if="!isAuthenticated">
    <h1>Iniciar Sesión</h1>

    <!-- Mensaje de error -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

    <form @submit.prevent="handleLogin" :class="{ shake: isShaking }">
      <div class="form-group">
        <label for="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Introduce tu correo"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Introduce tu contraseña"
          required
        />
      </div>

      <button type="submit" :class="{ shake: isShaking }">Iniciar Sesión</button>
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
      password: '',
      isShaking: false, // Controlador de la animación de sacudida
      errorMessage: '' // Mensaje de error
    };
  },
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods: {
    async handleLogin() {
      try {
        await this.userStore.login(this.email, this.password);
        console.log("Inicio de sesión exitoso");
        this.$router.push("/musica");
      } catch (error) {
        console.error("Error al iniciar sesión:", error);

        // Mostrar mensaje de error
        this.errorMessage = "Inicio de sesión incorrecto. Verifica tus credenciales.";

        // Activar animación de sacudida
        this.isShaking = true;

        // Limpiar animación y mensaje de error después de un tiempo
        setTimeout(() => {
          this.isShaking = false;
        }, 500); // Duración de la animación
      }
    }
  }
};
</script>
<style scoped>
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  20%, 60% {
    transform: translateX(-10px);
  }
  40%, 80% {
    transform: translateX(10px);
  }
}

.shake {
  animation: shake 0.5s ease-in-out;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
