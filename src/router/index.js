import { createRouter, createWebHistory } from 'vue-router'
import AddCity from '../views/AddCity.vue'

const routes = [
    {
        path: '/',
        name: 'AddCity',
        component: AddCity
    },
    {
        path: '/weather/:city',
        name: 'Weather',
        component: () => import('../views/Weather.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
