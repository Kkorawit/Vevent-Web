<script setup>
import getAllEvent from "../repositories/EventRepo";
import { onMounted, ref, computed } from "vue";
import { googleLogout, GoogleLogin, decodeCredential } from "vue3-google-login";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import EventListOrganization from "@/components/Event/EventListOrganization.vue"


//all events
const allEvents = ref([]);
//event status filter
const districtStatus = ref([]);
const selectedStatus = ref([]);
//event category
const districtCategory = ref([]);
const selectedCategory = ref([]);
//search event
const eventTitle = ref('');
const searchEvent = ref('');
//user information
const user = ref();
const role = ref("organization");

//event filterd
const filterEvent = computed(() => {
  return allEvents.value.filter((event) => {
    return (
      selectedCategory.value === 0 ||
      selectedCategory.value.includes(event.category) ||
      selectedStatus.value === 0 ||
      selectedStatus.value.includes(event.eventStatus) ||
      event.title.includes(searchEvent.value)
    );
  });
});

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


onMounted(async () => {
  let response = await getAllEvent();
  allEvents.value = response.findAllEventCreatedByUEmail;
  console.log();
  console.log(allEvents.value);
  // let dist = allEvents.value.map((event) => event.eventStatus);
  districtStatus.value = Array.from(
    new Set(allEvents.value.map((event) => event.eventStatus))
  );
  districtCategory.value = Array.from(
    new Set(allEvents.value.map((event) => event.category))
  );
  eventTitle.value = Array.from(
    new Set(allEvents.value.map((event) => event.title))
  );
  console.log(districtCategory.value);
  console.log(districtStatus.value);
  console.log(eventTitle.value);
  
});

const logIn = (response) => {
  console.log(response);
  user.value = decodeCredential(response.credential);
  console.log(user.value);
};

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};

const logOut = () => {
  googleLogout();
};

</script>

<template>
  <div
    class="bar grid grid-cols-3 gap-x-10 col-span-3 bg-white h-[100px] drop-shadow-xl"
  >
    <!-- bar logo -->
    <div class="logo grid cols-start-1 content-center ml-10">
      <img src="@/assets/LOGO-web.png" class="w-[148px] h-[37px]" alt="logo" />
    </div>
    <!-- bar menu -->
    <div class="menu cols-start-2 flex justify-center">
      <div class="flex flex-row items-center">
        <button
          class="box-content h-[43px] w-[120px] rounded-[16px] bg-white focus:bg-purple-900"
        >
          Home
        </button>
        <button
          class="box-content h-[43px] w-[120px] rounded-[16px] bg-white focus:bg-purple-900 mr-10"
        >
          About us
        </button>
      </div>
    </div>
    <!-- bar profile -->
    <div class="profile-user col-start-3 flex justify-end mr-10">
      <div class="flex flex-row items-center">
        <button
          class="box-content h-[43px] w-[240px] border border-1 border-solid border-gray-200 rounded-[16px] bg-white focus:bg-purple-900"
          @click="logIn"
        >
          Sign in with Google
        </button>
        <GoogleLogin :callback="logIn" />
      </div>
    </div>
  </div>
  <div
    class="content-slid grid grid-cols-12 gap-x-10 col-span-12 bg-[#4520CC] h-[540px] drop-shadow-xl"
  >
    <div
      class="col-start-1 col-span-3 flex flex-col justify-start items-start pt-[100px] pl-[80px] space-y-4"
    >
      <div class="text-white text-topic">
        Upcoming<br /><a class="underline underline-offset-[10px]">Eve</a>nts
      </div>
      <!-- <hr width=""/> -->
      <div class="text-white text-[16px]">
        กิจกรรมที่กำลังจะเกิดขึ้น<br />และเราไม่อยากให้คุณพลาด!!
      </div>
    </div>
    <div class="col-start-4 col-span-9 py-20">
      <swiper
        :slides-per-view="2.2"
        :space-between="-400"
        :pagination="{
          clickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 1,
        }"
        navigation
        :loop="true"
        :autoplay="{ delay: 5000 }"
        class="my-swiper"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
        :modules="[Pagination, Navigation, Autoplay]"
      >
        <swiper-slide v-for="event in allEvents" :key="event.id" class="pb-12">
          <img
            :src="event.posterImg"
            alt="poster"
            class="w-[420px] h-[380px] rounded-[16px]"
          />
        </swiper-slide>
      </swiper>
      <!-- <Carousel :items-to-show="2.3" 
       :touch-drag="true" 
       :wrap-around="true" 
       snap-align="start">
       
        <Slide v-for="event in events" :key="event" slide-width="30">
          <img :src="event.posterImg" alt="poster_img" 
          class="w-[480px] h-[380px] rounded-[16px]">
        </Slide>
        <template #addons>
          <Navigation/>
        </template>
       </Carousel> -->
    </div>
  </div>
  <!-- Menu bar/ filter&search -->
  < class="event-list grid grid-cols-12 mx-10 gap-x-10 col-span-12">
    <div class="col-span-12 grid grid-cols-12">
      <div
        class="col-start-1 col-end-3 pt-[58px] pl-[80px] flex justify-center text-main text-topic"
      >
        All Events
      </div>
      <div
        class="pt-[60px] col-start-3 col-span-12 flex space-x-12 justify-end pr-[80px]"
        v-if="allEvents != []"
      >
        <div class="w-[200px]">
          <v-autocomplete
            clearable
            chips
            multiple
            variant="outlined"
            label="Event Status"
            :items="districtStatus"
            v-model="selectedStatus"
          ></v-autocomplete>
        </div>
        <div class="w-[200px]">
          <v-autocomplete
            clearable
            chips
            multiple
            variant="outlined"
            label="Category"
            :items="districtCategory"
            v-model="selectedCategory"
          ></v-autocomplete>
          {{ filterEvent.title  }}
          {{ filterEvent.category }}
        </div>
        <div class="w-[400px]">
          <v-text-field
          label="Search Event"
          variant="outlined"
          menu-icon=""
          append-inner-icon="mdi-magnify"
          v-model="searchEvent"
          >
          </v-text-field>
          <!-- <v-autocomplete
            search
            variant="outlined"
            label="Search Event"
            :items="eventTitle"
            v-model="searchEvent"
            menu-icon=""
            append-inner-icon="mdi-magnify"
          ></v-autocomplete> -->
          
        </div>
      </div>
      {{filterEvent}}
    </div>
  


<template>
  <!-- organization -->
  <div v-if="role == 'organization'">
    <div
      class="bar grid grid-cols-3 gap-x-10 bg-white h-[100px] drop-shadow-xl"
    >
      <!-- bar logo -->
      <div class="logo grid cols-start-1 content-center ml-10">
        <img
          src="@/assets/LOGO-web.png"
          class="w-[148px] h-[37px]"
          alt="logo"
        />
      </div>
      <!-- bar menu -->
      <div class="menu cols-start-2 flex justify-center">
        <div class="flex flex-row items-center">
          <button
            class="box-content h-[43px] w-[120px] rounded-[16px] bg-white focus:bg-purple-900"
          >
            Dashboard
          </button>
          <button
            class="box-content h-[43px] w-[120px] rounded-[16px] bg-white focus:bg-purple-900 mr-10"
          >
            Event
          </button>
        </div>
      </div>
      <!-- bar profile -->
      <div class="profile-user col-start-3 flex justify-end mr-10">
        <div class="flex flex-row items-center">
          <button
            class="box-content h-[43px] w-[240px] border border-1 border-solid border-gray-200 rounded-[16px] bg-white focus:bg-purple-900"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>

    <!-- content event list -->
    <div v-if="events != '' " class="event-list">
      <EventListOrganization :info="events"></EventListOrganization>
    </div>
  </div>


  <!-- participant -->
  <div v-if="role == 'participant'">
    <div
      class="bar grid grid-cols-3 gap-x-10 bg-white h-[100px] drop-shadow-xl"
    >
      <!-- bar logo -->
      <div class="logo grid cols-start-1 content-center ml-10">
        <img
          src="@/assets/LOGO-web.png"
          class="w-[148px] h-[37px]"
          alt="logo"
        />
      </div>
      <!-- bar menu -->
      <div class="menu cols-start-2 flex justify-center">
        <div class="flex flex-row items-center">
          <button
            class="box-content h-[43px] w-[120px] rounded-[16px] bg-white focus:bg-purple-900"
          >
            Home
          </button>
          <button
            class="box-content h-[43px] w-[120px] rounded-[16px] bg-white focus:bg-purple-900 mr-10"
          >
            About us
          </button>
        </div>
      </div>
      <!-- bar profile -->
      <div class="profile-user col-start-3 flex justify-end mr-10">
        <div class="flex flex-row items-center">
          <button
            class="box-content h-[43px] w-[240px] border border-1 border-solid border-gray-200 rounded-[16px] bg-white focus:bg-purple-900"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
    <div class="content-slid"></div>
    <div class="event-list"></div>
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
