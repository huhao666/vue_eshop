import Vue from 'vue';
import Vuex  from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    /*
    1.我们需要有一个login的状态，以辨别用户是否已经登录
    2.mutations只做数据修改
    3.不管有没有异步，在写mutations的同时，再写一份actions
    4.前端页面调用的时候，只调用用actions，不调用mutations

    前面页面既不直接调this.$store.state,也不直接去触发mutations，
    那么前面的页面只剩下2个工作内容，一0个getters，一个actions
    */
	state:{
		isLogin : false
	},
	getters:{
		isLogin : state =>{
			return state.isLogin ;
		}
	},
	mutations:{
		toLogin(state,payload){
            state.isLogin  = payload;
        },
        loginOut(state){
            state.isLogin  = false;
        }
	},
	actions:{
        checkLogin:({commit},payload)=>{
            commit('checkLogin',payload);
        }
	}
})
export default store;