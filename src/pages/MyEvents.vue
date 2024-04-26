<script setup>
//import section
///vue
import {
  onMounted,
  ref,
  computed,
  defineProps,
  watch,
  reactive,
  onBeforeMount,
} from "vue";
///service

///components
import EventCard from "@/components/Event/EventCard.vue";
///swiper
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css/bundle";
import { useRoute } from "vue-router";
import { getAllEventRegisEventByUEmail } from "@/gql/gqlGet.js";
import Navbar from "@/components/Navbar.vue";
// const emits = defineEmits(['filter-event'])

const allEventRegis = ref([]);

const districtStatus = ref();
const districtCategory = ref();
const eventTitle = ref();

const statusShow = ref([]);

onMounted(async () => {
  allEventRegis.value = [];
  const router = useRoute();
  const uEmail = router.params.email;
  console.log(uEmail);
  let response = await getAllEventRegisEventByUEmail(uEmail);
  console.log(response);
  allEventRegis.value = response;

  districtStatus.value = Array.from(new Set(allEventRegis.value.map((userEvent) => userEvent.status)))
  districtCategory.value = Array.from(new Set(allEventRegis.value.map((userEvent) => userEvent.event.category)))
  eventTitle.value = Array.from(new Set(allEventRegis.value.map((userEvent) => userEvent.event.title)))
  districtStatus.value.map((status) => {
    switch(status){
      case "P": statusShow.value.push({name: "Pending", value: status}); break
      case "IP": statusShow.value.push({name: "In Progress", value: status}); break
      case "S": statusShow.value.push({name: "Success", value: status}); break
      case "F": statusShow.value.push({name: "Fail", value: status}); break
    }
  })
});

//variable/function
///all events
// const allEventRegis = ref(props.allEventRegis);
// console.log(props.allEventRegis);
// console.log(allEventRegis.value);

///event status filter

const selectedStatus = ref(null);
///event category

const selectedCategory = ref(null);
///search event

const searchEvent = ref("");

const filterEvent = computed(() => {

      return allEventRegis.value.filter((userEvent) => {
          const statusMatch = selectedStatus.value
          ? (
          selectedStatus.value.includes(userEvent.status))
          : true;
          const categoryMatch = selectedCategory.value
          ? (
          selectedCategory.value.includes(userEvent.event.category))
          : true;
          const titleMatch =
        searchEvent.value
        ? (userEvent.event.title.includes(searchEvent.value))
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
  <Navbar :menu="'myEvent'"></Navbar>
  <div
    class="content-slid grid grid-cols-12 gap-x-10 place-content-center col-span-12 bg-gradient-to-b from-[#4520CC] to-[#6A4DD6] h-[300px] drop-shadow-xl">
    <div class="col-start-1 col-span-3 flex flex-col justify-start items-start  pl-[80px] space-y-4">
      <div class="text-white text-topic text-[48px]">
        My<br /><a class="underline underline-offset-[18px]">Eve</a>nts
      </div>

      <div class="text-white text-[16px]">
        กิจกรรมที่เคยเข้าร่วมทั้งหมดของฉัน
      </div>
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
      v-if="allEventRegis != []"
    >
      <div class="w-[200px]">
        <v-autocomplete
          clearable
          variant="outlined"
          label="Progression"
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

  <EventCard :eventList="filterEvent" :fomat="'myEvent'"></EventCard>
</template>

<style>
.v-field {
  border-radius: 15px;
}
</style>
