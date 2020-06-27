import Vue from 'vue'
import VueRouter from 'vue-router'

const Weather = () => import('../view/Weather')
const Test = () => import('../view/test')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/weather'
    },
    {
        path: '/weather',
        component: Weather
    },
  {
    path: '/test',
    component: Test
  }

]
 const router = new VueRouter({
   mode:'history',
   routes
 })

 export default router
