<template>
  <div id="container" ref="container">
    <!-- <span>{{ title }}</span>
    <span v-once>{{ title }} 没变吧</span>
    <span v-if="flag">now shown</span>
    <p>
      <a v-on:click="handleClick">
        <img v-bind:src="url" :class="[flag ? 'imgSize1' : 'imgSize2']" />
      </a>
    </p>
    <div v-for="item in items" :key="item">
      <span>{{ item }}</span>
    </div>
    <p>
      <button @click="handleAdd">Add</button>
    </p>
    <form :model="editForm" @submit.prevent="handleSubmit">
      <input v-model="editForm.name" placeholder="Name" />
      <input v-model="editForm.age" placeholder="Age" />
      <button type="submit">Submit</button>
    </form> -->
  </div>
</template>
<script>
import axios from 'axios';
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
export default {
  name: 'viewPort',
  props: {
    //target
  },
  data() {
    return {
      title: "titleXXX",
      flag: true,
      items: ["item1", "item2", "item3"],
      url: require('@/assets/images/threelogo.png'),
      editForm: {
        name: '',
        age: ''
      },
      renderer: null,
      canvas:null,
      camera: null, 
      scene: null,
      deboundedTimer:null
    }
  },
  // 
  created() {

  },
  mounted() {
    this.initScene()
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('dblclick', this.handleDblclick)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('dblclick', this.handleDblclick);
  
    if(this.deboundedTimer){
      clearTimeout(this.deboundedTimer)
    }
  },
  methods: {
    initScene() {
      this.canvas = document.createElement('canvas')
      const sizes = {
        width: this.$refs.container.clientWidth,
        height: this.$refs.container.clientHeight
      }
      this.canvas.width = sizes.width;
      this.canvas.height = sizes.height;
      this.$refs.container.appendChild(this.canvas);
      // 创建3D场景对象Scene
      this.scene = new THREE.Scene();
      // Geometry
      const geometry = new THREE.BoxGeometry(2, 3, 4);
      const material = new THREE.MeshBasicMaterial({color: '#aaa'/*, wireframe:true*/})
      // Mesh
      const mesh = new THREE.Mesh(geometry, material)
      mesh.rotateY(45)

      mesh.position.set(0, 0, -10);
      this.scene.add(mesh)


      // 创建相机对象Camera
      
      this.camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000);
      this.scene.add(this.camera);

      this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
      this.renderer.render(this.scene, this.camera);

      
      const controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.camera.position.set( 0, 20, 100 );
      controls.update();
      // const animate = ()=>{
      //   controls.update();
      //   requestAnimationFrame(animate)
      //   this.renderer.render(this.scene, this.camera);
      // }
      // animate()
    },

    handleResize(){
      if(!this.renderer) return;
      if(this.deboundedTimer) clearTimeout(this.deboundedTimer)
        this.deboundedTimer = setTimeout(()=>{
          console.log('here here')
          const sizes = {
            width: this.$refs.container.clientWidth,
            height: this.$refs.container.clientHeight
          }
          this.camera.aspect = sizes.width / sizes.height;
          this.camera.updateProjectionMatrix();
          this.renderer.setSize(sizes.width, sizes.height);
      },50)
    },

    handleDblclick(){
      if(!document.fullscreenElement){
        this.canvas.requestFullscreen()
      }else{
        document.exitFullscreen()
      }
    },
    handleClick() {
      this.flag = !this.flag;
    },
    handleAdd() {
      this.items.push("item" + (this.items.length + 1));
      console.log(this.items);
    },
    handleSubmit() {
      axios.post('/api/submit', this.editForm)
        .then(response => {
          console.log('Form submitted successfully:', response.data);
        })
        .catch(error => {
          console.error('Error submitting form:', error);
        });

      axios.request({
        url: '/api/submit',
        method: 'post',
        data: this.editForm
      }).then(response => {
        console.log('Form submitted successfully:', response.data);
      }).catch(error => {
        console.error('Error submitting form:', error);
      });
    }
  }
}
</script>

<style scoped>
#container {
  margin: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
}

.imgSize1 {
  width: 100px;
  height: 100px;
}

.imgSize2 {
  width: 50px;
  height: 50px;
}
</style>