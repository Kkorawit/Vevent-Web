import { createRouter,createWebHistory } from "vue-router";

const routes = [
    {path:'/',name:'home',component:()=>import(/* webpackChunkName: "home" */ '@/views/Home.vue')},
    {path:'/myEvents',name:'myEvents',component:()=>import(/* webpackChunkName: "my events" */ '@/pages/MyEvents.vue')},
    {path:'/profile',name:'dashboard',component:()=>import( /* webpackChunkName: "Dashboard" */'@/views/Dashboard.vue')},
    {path:'/events',name:'events',component:()=>import(/* webpackChunkName: "Event" */'@/views/Events.vue')},
    {path:'/participants',name:'participants',component:()=>import(/* webpackChunkName: "Participants" */'@/views/Participants.vue')},
    {path:'/create',name:'create',component:()=>import(/* webpackChunkName: "Create" */'@/pages/CreateEvent.vue')},
    {path:'/editEvent/:id',name:'editEvent',component:()=>import(/* webpackChunkName: "Edit" */'@/pages/EditEvent.vue')},
    {path:'/eventDetail',name:'eventDetail',component:()=>import(/* webpackChunkName: "Edit" */'@/pages/EventDetail_card.vue')},
    {path:'/eventDetailParticipant:id',name:'eventDetailParticipant',component:()=>import('@/pages/EventDetail_Participants.vue')},
    {path:'/organization',name:'organize',component:()=>import(/* webpackChunkName: "Organize" */'@/components/Event/EventListOrganization.vue')},
    {path:'/participants',name:'participants',component:()=>import(/* webpackChunkName: "Participants" */'@/pages/Participants.vue')},
    // {path:'/organize',name:'organize',component:()=>import(/* webpackChunkName: "Create" */'@/components/Event/EventListOrganization.vue')},
    // {path:'/eventDetail',name:'eventDetail',component:()=>import(/* webpackChunkName: "home" */'@/components/EventDetail.vue')},
]


const router =createRouter({
    routes,
    history:createWebHistory(),
})

export default router

