<script setup>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
import getAllEvent from "../repositories/EventRepo";
import { onMounted, ref } from "vue";

const events = ref([]);

onMounted(async () => {
  let allEvents = await getAllEvent();
  events.value = allEvents.findAllEventCreatedByUEmail;
  console.log(events.value.findAllEventCreatedByUEmail);
  console.log(events.value[0]);
});
</script>

<template>
  <div
    class="grid grid-cols-10 gap-x-10 mx-10 grid-rows-12 grid-flow-col w-screen"
  >
    <!-- Header -->
    <div class="header bg-red-200 flex flex-row items-center h-[100px] col-span-10 grid grid-cols-3">
      <!-- left navbar -->
      <div class="left-bar col-start-1">
        <img
          class="col-start-1 h-[37px] w-[148px]"
          src="@/assets/LOGO-web.png"
        />
      </div>
      <!-- center navbar -->
      <div class="center-tab col-start-2 flex justify-center">
        <ul class="flex gap-12 text-xl">
          <li>home</li>
          <li>about-us</li>
        </ul>
      </div>
      <!-- right navbar -->
      <div class="right-bar col-start-3 flex justify-end">
        <button>SignIn</button>
        <button>SignUp</button>
      </div>
    </div>
    <!-- Slider -->
    <div
      class="bg-purple-500 row-start-2 row-end-5 text-white h-[540px] relative"
    >
      <div class="grid grid-cols-12 grid-rows-12 grid-flow-col w-screen">
        <div class="col-start-1 col-span-4 row-span-5 flex justify-center">
          <div
            class="grid justify-items-left flex items-center gap-2 absolute top-[80px]"
          >
            <div class="text-[48px]">Upcoming</div>
            <div class="text-[48px]">Events</div>
            <hr width="30px" />
            <div>กิจกรรมที่กำลังจะเกิดขึ้น</div>
            <div>และเราไม่อยากให้คุณพลาด</div>
          </div>
        </div>
        <!-- <div class="col-start-1 col-span-6 row-span-6 p-12">
          <div>TEXT2</div>
        </div> -->
        <div class="col-start-6 row-span-12 col-span-7">
          <carousel
            :items-to-show="2.5"
            :wrap-around="true"
            :touch-drag="true"
            snap-align="start"
            class="absolute top-[80px]"
          >
            <slide v-for="event in events" :key="event">
              <img
                class="w-[420px] h-[380px] rounded-[16px]"
                :src="event.posterImg"
              />
            </slide>
            <template #addons>
              <Navigation />
              <!-- <Pagination /> -->
            </template>
          </carousel>
        </div>
      </div>
    </div>
    <!-- Content -->
    <div class="bg-blue-200 row-span-8">body</div>
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
