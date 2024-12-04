<template>
    <div class="landing-page">
      <!-- Sección de bienvenida -->
      <section class="hero">
        <h1 class="hero-title">Bienvenido a MusicApp</h1>
        <p class="hero-description">Descubre, reproduce y comparte tu música favorita.</p>
      </section>
  
      <!-- Sección de funcionalidades -->
      <section class="features">
        <div class="feature">
          <h2>Artist Zone</h2>
          <p>Crea y sube tus canciones de forma sencilla.</p>
        </div>
        <div class="feature">
          <h2>Radio en Vivo</h2>
          <p>Escucha estaciones de radio de todo el mundo, las 24 horas.</p>
        </div>
        <div class="feature">
          <h2>Crea Playlists</h2>
          <p>Personaliza tu experiencia creando playlists únicas.</p>
        </div>
      </section>
  
      <!-- Llamada a la acción -->
      <section class="cta">
        <h2>Únete a MusicApp</h2>
        <p>¡Comienza a disfrutar de la mejor experiencia musical ahora!</p>
        <button @click="gotoUsuario" class="cta-button">Comenzar</button>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: "LandingPage",
  
  methods:{
    gotoUsuario(){
      this.$router.push('/usuario');
    }
    }
    };
  </script>
  
  <style scoped>
  /* General */
  .landing-page {
    font-family: Arial, sans-serif;
    color: #fff;
    background-color: #333;
    text-align: center;
    padding: 20px 10px;
  }
  
  /* Hero Section */
  .hero {
    background-color: #111;
    padding: 50px 20px;
  }
  
  .hero-title {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  
  .hero-description {
    font-size: 1.2rem;
    color: #ccc;
  }
  
  /* Features Section */
  .features {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 30px 0;
    background-color: #222;
  }
  
  .feature {
    width: 30%;
    margin: 10px;
    padding: 20px;
    background-color: #444;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }
  
  .feature h2 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  
  .feature p {
    font-size: 1rem;
    color: #ddd;
  }
  
  /* Call-to-Action Section */
  .cta {
    padding: 40px 20px;
    background-color: #111;
  }
  
  .cta h2 {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  .cta p {
    font-size: 1.2rem;
    color: #ccc;
    margin-bottom: 20px;
  }
  
  .cta-button {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .cta-button:hover {
    background-color: #0056b3;
  }
  </style>
  