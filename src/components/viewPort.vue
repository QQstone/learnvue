<template>
  <div id="container" ref="container">
    <p>
      <a v-on:click="handleClick">
        <img v-bind:src="url" :class="[flag ? 'imgSize1' : 'imgSize2']" />
      </a>
    </p>
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
import * as dat from 'dat.gui'
import texturePath from '@/assets/images/threelogo.png'

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
      const geometry = new THREE.BoxGeometry(50, 50, 50);
      const texture = new THREE.TextureLoader().load(texturePath, ()=>{
        console.log('load sccuess')
      },()=>{
        console.log('loading')
      }, err=>{
        console.log(err)
      })
      console.log(texture)
      let material = new THREE.MeshBasicMaterial({/*color: '#aaa', wireframe:true,*/ map:texture})
      // Mesh
      const mesh = new THREE.Mesh(geometry, material)
      mesh.rotateY(45)

      mesh.position.set(0, 0, -10);
      this.scene.add(mesh)

      // 参考
      const planeGeometry = new THREE.PlaneGeometry(100, 100, 25, 25)
      const plane = new THREE.Mesh(
        planeGeometry,
        new THREE.MeshBasicMaterial({color: '#aaa'})
      )
      plane.position.set(0,0, -200)
      this.scene.add(plane)


      // 创建相机对象Camera
      
      this.camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height, 0.1, 1000);
      this.scene.add(this.camera);

      this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
      this.renderer.render(this.scene, this.camera);

      
      const controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.camera.position.set( 0, 200, 500 );
      controls.update();
      const animate = ()=>{
        controls.update();
        requestAnimationFrame(animate)
        this.renderer.render(this.scene, this.camera);
      }
      animate()

      this.gui = new dat.GUI()
      const parameters = {
        color:0xaaaaaa,
        wireframe: false,
        x:2,
        isTextured:false
      }

      this.gui.addColor(parameters, 'color')
      .onChange(val=>{
        material.color.set(val)
      });
      this.gui.add(parameters,'wireframe').onChange(flag=>{
        material.wireframe = flag
      })
      this.gui.add(parameters, 'isTextured').onChange(flag=>{
        if(flag){
          mesh.material.map = texture;
        }else{
          mesh.material.map = null;
          //mesh.material.color.set('#aaa');
        }
        mesh.material.needsUpdate = true;
      })
      this.gui.add(parameters, 'x')
      .min(-3).max(3).step(0.1)
      .onChange(val=>{
        mesh.position.setX(val)
      })
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