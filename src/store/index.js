import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        isShowText:false
    },
    gatters:{},
    mutations:{
        setIsShowText(state,payload){
            state.isShowText = payload
        }
    },
    actions:{}
})