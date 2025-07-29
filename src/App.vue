<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="First touch to vue"/> -->
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
  color: #b1b4b7;
  margin: 0;
  width: 100%;
  height: 100vh
}
</style>
