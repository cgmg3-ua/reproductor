<template>
  
  <header>
    <nav>
      <router-link to="/">home</router-link>
      <router-link to="/usuario">usuario</router-link>
      <router-link to="/musica">musica</router-link>
      <router-link to="/radio">radio</router-link>
    </nav>
  </header>
  <RouterView></RouterView>
</template>

<script>


export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
