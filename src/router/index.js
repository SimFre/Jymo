
// @ == src folder
import { createRouter, createWebHistory } from 'vue-router'
import Dummy from "@/views/Dummy.vue";

const routes = [
    {
        path: '/',
        name: 'Start',
        component: Dummy,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
