<script setup>
//import section
///vue
import { onMounted, ref, computed, defineProps, reactive, watchEffect } from "vue";
///service

///components
import EventCard from "@/components/Event/EventCard.vue";
///swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
// const emits = defineEmits(['filter-event'])
const props = defineProps({
  allEvents: {
    type: Object,
    require: true,
  },
});

const allEvents = reactive(props.allEvents)
const districtStatus = ref(Array.from(new Set(allEvents.map((event) => event.eventStatus))));

const statusShow = ref([])
watchEffect(() => {
  districtStatus.value.map((status) => {
    switch(status){
      case "CO": statusShow.value.push({name: "Closed", value: status}); break
      case "UP": statusShow.value.push({name: "Upcoming", value: status}); break
      case "ON": statusShow.value.push({name: "Ongoing", value: status}); break
    }
  })

})
// watch(() => allEvents, (newValue) => {
//   console.log('allEvents updated:', newValue);
// });
//variable/function
///all events
// const allEvents = ref(props.allEvents);
// console.log(props.allEvents);
// console.log(allEvents.value);
///event status filter

const selectedStatus = ref(null);
///event category
const districtCategory = ref(Array.from(new Set(allEvents.map((event) => event.category))));
const selectedCategory = ref(null);
///search event
const eventTitle = ref(Array.from(new Set(allEvents.map((event) => event.title))));
const searchEvent = ref("");


const filterEvent = computed(() => {

      return allEvents.filter((event) => {
          const statusMatch = selectedStatus.value
          ? (
          selectedStatus.value.includes(event.eventStatus))
          : true;
          const categoryMatch = selectedCategory.value
          ? (
          selectedCategory.value.includes(event.category))
          : true;
          const titleMatch =
        searchEvent.value
        ? (event.title.includes(searchEvent.value))
        : true;

        
          return statusMatch&&categoryMatch&&titleMatch
        });                 
});


// const onSwiper = (swiper) => {
//   console.log(swiper);
// };
// const onSlideChange = () => {
//   console.log("slide change");
// };
</script>

<template>
  <div
    class="content-slid grid grid-cols-12 gap-x-10 col-span-12 bg-gradient-to-b from-[#4520CC] to-[#6A4DD6] h-[540px] drop-shadow-xl"
  >
    <div
      class="col-start-1 col-span-3 flex flex-col justify-start items-start pt-[64px] pl-[80px] space-y-4"
    >
      <div class="text-white text-topic text-[48px]">
        Upcoming<br /><a class="underline underline-offset-[18px]">Eve</a>nts
      </div>

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
        :autoplay="{ delay: 5000 }"
        class="my-swiper"
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
    </div>
  </div>
  <!-- Menu bar/ filter&search -->
  <div class="grid grid-cols-12 gap-x-10 col-span-12">
    <div
      class="col-start-1 col-end-4 pt-[56px] pl-[80px] flex justify-start text-main text-topic text-[40px] font-bold text-primaryColor"
    >
      All Events
    </div>
    <div
      class="pt-[60px] col-start-4 col-span-12 flex space-x-12 justify-end pr-[80px]"
      v-if="allEvents != []"
    >
      <div class="w-[200px]">
        <v-autocomplete
          clearable
          variant="outlined"
          label="Event Status"
          :items="statusShow"
          item-title="name"
          item-value="value"
          v-model="selectedStatus"
        ></v-autocomplete>
      </div>
      <div class="w-[200px]">
        <v-autocomplete
          variant="outlined"
          label="Category"
          clearable
          :items="districtCategory"
          v-model="selectedCategory"
        ></v-autocomplete>
      </div>
      <div class="w-[400px]">
        <v-autocomplete
          search
          clearable
          label="Search Event"
          variant="outlined"
          menu-icon=""
          append-inner-icon="mdi-magnify"
          :items="eventTitle"
          v-model="searchEvent"
        >
        </v-autocomplete>
      </div>
    </div>
  </div>
    <EventCard :eventList="filterEvent" :fomat="'H'"></EventCard>
</template>

<style>
.v-field {
  border-radius: 8px;
}

.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background-color: #B5A6EB;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background-color: white;
}
</style>
