<script setup>
import { onMounted, ref, computed } from "vue";
import { googleLogout, GoogleLogin, decodeCredential } from "vue3-google-login";
import EventListOrganization from "@/components/Event/EventListOrganization.vue";
import EventListParticipants from "@/components/Event/EventListParticipants.vue";
import Navbar from "@/components/Navbar.vue";


//user information
const user = ref();
const role = ref("Participants");


// function searchingEvent(text){
//     return allEvents.value.filter((event)=>{
//       return event.title.includes(text);
//     })
// }
// const filterEvent = computed(()=> {
//   allEvents.value.forEach((objEvent) => {

//     if (selectedStatus.value.includes(objEvent.eventStatus) && selectedCategory.value.includes(objEvent.category)) {
//       return events.value.push(objEvent);
//     }
//     return events.value.sort((a, b) => {
//       return parseInt(a.id) - parseInt(b.id);
//     });
//   });
// });

// onMounted(async () => {
//   let response = await getAllEvent();
//   allEvents.value = response.findAllEventCreatedByUEmail;
//   console.log();
//   console.log(allEvents.value);
//   // let dist = allEvents.value.map((event) => event.eventStatus);
//   districtStatus.value = Array.from(
//     new Set(allEvents.value.map((event) => event.eventStatus))
//   );
//   districtCategory.value = Array.from(
//     new Set(allEvents.value.map((event) => event.category))
//   );
//   eventTitle.value = Array.from(
//     new Set(allEvents.value.map((event) => event.title))
//   );
//   console.log(districtCategory.value);
//   console.log(districtStatus.value);
//   console.log(eventTitle.value);
// });

const logIn = (response) => {
  console.log(response);
  user.value = decodeCredential(response.credential);
  console.log(user.value);
};



const logOut = () => {
  googleLogout();
};
</script>

<template>
  <Navbar></Navbar>
  <div v-if="role == 'Participants'">
    <EventListParticipants></EventListParticipants>
    
  </div>
  <!-- organization -->
  <div v-if="role == 'Organization'">
    <!-- content event list -->
    <div v-if="events != ''" class="event-list">
      <EventListOrganization :info="events"></EventListOrganization>
    </div>
  </div>
</template>
<!-- google information -->
<!-- <div v-if="user!=null">
  {{ user.name }}
  {{ user.email}}
  {{ user.picture}}
  <img :src="user.picture" />
</div>  -->
<style>
/* .swiper-pagination {
  --swiper-pagination-color: var(--swiper-theme-color);
  --swiper-pagination-left: auto;
  --swiper-pagination-right: 8px;
  --swiper-pagination-bottom: 8px;
  --swiper-pagination-top: auto;
  --swiper-pagination-fraction-color: inherit;
  --swiper-pagination-progressbar-bg-color: red;
  --swiper-pagination-progressbar-size: 4px;
  --swiper-pagination-bullet-size: 30px;
  --swiper-pagination-bullet-width: 30px;
  --swiper-pagination-bullet-height: 30px;
  --swiper-pagination-bullet-inactive-color: #000;
  --swiper-pagination-bullet-inactive-opacity: 0.2;
  --swiper-pagination-bullet-opacity: 1;
  --swiper-pagination-bullet-horizontal-gap: 4px;
  --swiper-pagination-bullet-vertical-gap: 6px;
} */
/* .swiper-pagination{
  left: auto;
  right: 8px;
  bottom: auto;
  top: 15px;
} */
/* .swiper-pagination-bullets{
  left: auto;
  right: 8px;
  bottom: auto;
  top: 15px;
} */
.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background-color: white;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background-color: #8f79e0;
}
/* .container {
  background-color: aquamarine;
  display: grid;
  min-width: 100%;
  min-height: 100%;
  margin-top: 20px;
}

.header {
  height: 6vw;
  background-color: white;
  display: flex;
justify-content: space-around;
}

.hleft-bar {
  width: 20%;
  height: 100%;
  justify-content: center;
  justify-content: center;


  .web-logolbar {
    position: inherit;
    width: 40%;
    height: 40%;
  }
}
.hcenter {
  width: 50%;
  height: 80%;
  background-color: brown;
  align-items: center;
}

.hright-bar {
  width: 30%;
  height: 80%;
  background-color: rgb(17, 10, 1);
  align-items: right;
}

.slide-show {
}

.body { }*/

/* .carousel__pagination {
  display: flex;
  justify-content: center;
  list-style: circle;
  line-height: 0;
  margin: 10px 0 0;
  padding: 0;
}

.carousel__pagination-button {
  display: block;
  border: 0;
  margin: 0;
  cursor: pointer;
  padding: var(--vc-pgn-margin);
  background: transparent;
}

.carousel__pagination-button::after {
  display: block;
  content: "";
  width: var(--vc-pgn-width);
  height: var(--vc-pgn-height);
  border-radius: var(--vc-pgn-border-radius);
  background-color: var(--vc-pgn-background-color);
}

.carousel__pagination-button--active::after {
  background-color: var(--vc-pgn-active-color);
}

@media (hover: hover) {
  .carousel__pagination-button:hover::after {
    background-color: var(--vc-pgn-active-color);
  }
} */
</style>
