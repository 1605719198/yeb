import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'

Vue.use(Router)
// 解决报错
const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace
// push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
Router.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true
  }
]

const router = new Router({
  routes
})

export default router
