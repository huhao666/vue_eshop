import Vue from 'vue'
import App from './App.vue'
import iView from 'iview';
import VueRouter from 'vue-router';
import {routes} from './routes';  //'./routes/index.js'文件夹后面可省略
import store from './store';      //引入vuex文件
import axios from 'axios'
import VueAxios from 'vue-axios'


import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueAxios, axios)

//The routing configuration
const router = new VueRouter({
  routes: routes,
  mode:'hash'
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
