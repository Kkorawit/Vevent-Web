import { createRouter,createWebHistory } from "vue-router";
import { components } from "vuetify/dist/vuetify-labs.js";

const routes = [
    {path:'/',name:'home',component:()=>import(/* webpackChunkName: "home" */ '@/views/Home.vue')},
    {path:'/myEvents/:email',name:'myEvents',component:()=>import(/* webpackChunkName: "my events" */ '@/pages/MyEvents.vue')},
    {path:'/profile',name:'dashboard',component:()=>import( /* webpackChunkName: "Dashboard" */'@/views/Dashboard.vue')},
    {path:'/events',name:'events',component:()=>import(/* webpackChunkName: "Event" */'@/views/Events.vue')},
    {path:'/participants',name:'participants',component:()=>import(/* webpackChunkName: "Participants" */'@/views/Participants.vue')},
    {path:'/create',name:'create',component:()=>import(/* webpackChunkName: "Create" */'@/pages/CreateEvent.vue')},
    {path:'/editEvent/:id',name:'editEvent',component:()=>import(/* webpackChunkName: "Edit" */'@/pages/EditEvent.vue')},
    {path:'/eventDetail/:id',name:'eventDetail',component:()=>import(/* webpackChunkName: "Edit" */'@/pages/EventDetail_card.vue')},
    {path:'/eventDetailParticipant:id',name:'eventDetailParticipant',component:()=>import('@/pages/EventDetail_Participants.vue')},
    {path:'/organization',name:'organize',component:()=>import(/* webpackChunkName: "Organize" */'@/components/Event/EventListOrganization.vue')},
    {path:'/participants',name:'participants',component:()=>import(/* webpackChunkName: "Participants" */'@/components/Event/EventListParticipants.vue')},
    {path:'/signup/:email/:username/:profileImg',name:'signup',component:()=>import(/* webpackChuckName: "Signup" */'@/pages/Signup.vue')},
]


const router =createRouter({
    routes,
    history:createWebHistory(),
})

export default router

