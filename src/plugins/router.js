import { createRouter,createWebHistory } from "vue-router";

const routes = [
    {path:'/',name:'home',component:()=>import(/* webpackChunkName: "home" */ '@/views/Home.vue')},
    {path:'/profile',name:'dashboard',component:()=>import( /* webpackChunkName: "Dashboard" */'@/views/Dashboard.vue')},
    {path:'/events',name:'events',component:()=>import(/* webpackChunkName: "Event" */'@/views/Events.vue')},
    {path:'/participants',name:'participants',component:()=>import(/* webpackChunkName: "Participants" */'@/views/Participants.vue')},
    {path:'/create',name:'create',component:()=>import(/* webpackChunkName: "Create" */'@/components/Event/CreateEvent.vue')},
    {path:'/edit',name:'edit',component:()=>import(/* webpackChunkName: "Edit" */'@/components/Event/EditEvent.vue')},
    {path:'/organization',name:'organize',component:()=>import(/* webpackChunkName: "Organize" */'@/components/Event/EventListOrganization.vue')},
    {path:'/participants',name:'participants',component:()=>import(/* webpackChunkName: "Participants" */'@/components/Event/EventListParticipants.vue')},
    // {path:'/organize',name:'organize',component:()=>import(/* webpackChunkName: "Create" */'@/components/Event/EventListOrganization.vue')},
    // {path:'/eventDetail',name:'eventDetail',component:()=>import(/* webpackChunkName: "home" */'@/components/EventDetail.vue')},
]


const router =createRouter({
    routes,
    history:createWebHistory(),
})

export default router

