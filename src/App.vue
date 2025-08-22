<template>
  <div id="app">
    <viewPort />
  </div>
</template>
<script>
import viewPort from './components/viewPort.vue';

// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    viewPort
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
