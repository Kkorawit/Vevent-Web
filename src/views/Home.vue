<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import { getAllEventCreatedByUEmail }  from "../repositories/EventRepo";
import { onMounted, ref } from "vue";
import EventListOrganization from "@/components/Event/EventListOrganization.vue";


const events = ref([]);
const emailUser = ref("Organization.032301@gmail.com");

onMounted(async () => {
  let allEvents = await getAllEventCreatedByUEmail(emailUser.value);
  events.value = allEvents.findAllEventCreatedByUEmail;
  console.log(events.value.findAllEventCreatedByUEmail);
  console.log(events.value[0]);
});

const role = ref("organization");
</script>

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

<style scoped>
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

.carousel__pagination {
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
}
</style>
