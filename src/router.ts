import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
    { path: '/', component: import('@/modules/home/views/index.vue') },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})