// import Vue from 'vue'
// import App from './App.vue'
// import router from './router'
// import store from './store'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import {postRequest} from "./utils/api";
// import {putRequest} from "./utils/api";
// import {getRequest} from "./utils/api";
// import {delRequest} from "./utils/api";
// import {initMenu} from "./utils/menus";
//
//
// Vue.use(ElementUI);
// Vue.config.productionTip = false
// //插件形式使用请求
// Vue.prototype.postRequest = postRequest;
// Vue.prototype.putRequest = putRequest;
// Vue.prototype.getRequest = getRequest;
// Vue.prototype.delRequest = delRequest;
//
// router.beforeEach((to, from, next)=>{
//   if(window.sessionStorage.getItem('token')) {
//     initMenu(router, store);
//     next();
//   }else{
//       next();
//   }
// })
//
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";


import {postRequest} from "./utils/api";
import {putRequest} from "./utils/api";
import {getRequest} from "./utils/api";
import {deleteRequest} from "./utils/api";
import {initMenu} from "./utils/menus";

//插件形式使用请求
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.deleteRequest = deleteRequest;

Vue.use(ElementUI,{size:'small'});
//关闭浏览器关于项目环境的提示
Vue.config.productionTip = false

Vue.prototype.$axios = axios

router.beforeEach((to,from,next)=>{
  if(window.sessionStorage.getItem('token')) { //获取用户信息，说明已经登录了
    initMenu(router, store);
    if(!window.sessionStorage.getItem('user')){
      return getRequest('/admin/info').then(resp=>{
        if(resp){
          window.sessionStorage.setItem('user',JSON.stringify(resp));
          next();
        }
      })
    }
    next();
  }else {
    if(to.path=='/'){
      next();
    }else {
      next('/?redirect='+to.path);
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
