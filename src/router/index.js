import Vue from 'vue'
import VueRouter from 'vue-router'

const Weather = () => import('../view/Weather')

Vue.use(VueRouter)

const routes = [
    { 
        path: '/', 
        redirect: '/weather' 
    },
    { 
        path: '/weather',
        component: Weather
    }
]
 const router = new VueRouter({
     routes
 })

 export default router