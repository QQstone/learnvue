<template>
<div id="container" >
  <!-- <span>{{ title }}</span>
  <span v-once>{{ title }} 没变吧</span>
  <span v-if="flag">now shown</span>
  <p>
    <a v-on:click="handleClick">
      <img v-bind:src="url" />
    </a>
  </p>
  <p>

  </p> -->
</div>
</template>
<script>
import * as THREE from 'three'
export default {
    name:'viewPort',
    props:{
        //target
    },
    data(){
      return{
        title:"titleXXX",
        flag:true,
        items:["item1","item2","item3"],
        url: "assets/images/threelogo.png"
      }
    },
    // 
    created(){

    },
    mounted(){
      this.initScene()
    },
    methods:{
      initScene(){
        // 创建3D场景对象Scene
        const scene = new THREE.Scene();

      },
      handleClick() {
        alert("clicked!")
      }
    }
}
</script>

<style scoped>
#container {
  margin: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
}
</style>