import { createRouter,createWebHistory } from "vue-router";

const routes = [
    {path:'/',name:'dashboard',component:()=>import('@/views/Dashboard.vue')},
    {path:'/events',name:'events',component:()=>import('@/views/Events.vue')},
    {path:'/participants',name:'participants',component:()=>import('@/views/Participants.vue')},
]


const router =createRouter({
    routes,
    history:createWebHistory(),
})

export default router

