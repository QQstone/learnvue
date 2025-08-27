<template>
<div id="panel">
    <button @click="toggleShowText()">Text</button>
</div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'

export default{
    name:"ControlPanel",
    props:{},
    data(){
        return {}
    },
    computed:{
        ...mapState(['isShowText'])
    },
    methods:{
        ...mapMutations(['setIsShowText']),
        toggleShowText(){
            this.setIsShowText(!this.isShowText)
        }
    }
}
</script>
<style>
#panel{
    width: 200px;
    height: 450px;
    padding: 20px;
    background: #ccc;
    text-align: center;
    position: absolute;
    left: 20px;
    top:100px;
}
</style>