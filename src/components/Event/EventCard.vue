<script setup>
import { ref, onMounted, computed, reactive, watch } from "vue";
import moment from "moment";
import router from "@/plugins/router";

const props = defineProps({
  eventList: {
    type: Array,
    require: true,
  },
  fomat: {
    type: String,
  },
});


const limitForHome = ref(8);
const limitForMyevents = ref(8);
const filteredEvent = computed(() => {
  if(props.fomat == null){
    let showEvent = props.eventList.slice(0, limitForHome.value);
    showEvent = showEvent.sort((a, b) => b.user_event_id - a.user_event_id);
    return showEvent;
  }else{
    let showEvent = props.eventList.slice(0, limitForMyevents.value);
    showEvent = showEvent.sort((a, b) => b.user_event_id - a.user_event_id);
    return showEvent;

  }
});

const monthChars = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const showDetail = (id,fomat) => {
  console.log(id);
  router.push({ name: "eventDetailParticipant", params: { id: id,state:fomat } });
};


const scrollToTop = () => {
  window.scroll({top:280,behavior:'smooth'});
}

</script>
<template>
  <div
    v-if="props.fomat == 'H'"
    class="grid grid-cols-4 gap-[40px] place-content-center mx-[80px] my-[40px]"
  >
    <div v-if="eventList" v-for="eventObj in filteredEvent" :key="eventObj">
      <v-card
        @click="showDetail(eventObj.id,'H')"
        class="w-full mx-auto cursor-pointer hover:scale-105"
        style="border-radius: 16px"
        max-width="400"
      >
        <v-img
          class="align-end text-white"
          height="200"
          :src="eventObj.posterImg"
          cover
        >
        </v-img>
        <div class="py-[16px]">
          <v-card-title>
            <div class="text-[18px] w-full truncate font-semibold">
              {{ eventObj.title }}
            </div>
          </v-card-title>
          <v-card-subtitle>
            <div class="flex justify-start mb-[8px]">
              <img
                src="@/assets/Date.png"
                width="18"
                height="12"
                alt="date"
                class="mr-[8px]"
              />
              <span>{{ eventObj.startDate }}</span>
            </div>
          </v-card-subtitle>
          <v-card-subtitle>
            <div class="flex justify-start">
              <img
                src="@/assets/Category.png"
                width="18"
                height="12"
                alt="date"
                class="mr-[8px]"
              />
              <span>{{ eventObj.category }}</span>
            </div>
          </v-card-subtitle>
        </div>
      </v-card>
    </div>
    <div
      class="col-span-4 grid justify-items-center"
      v-if="filteredEvent.length != 0 && props.eventList.length > limitForHome">
      <button
        class="rounded-[15px] text-main text-[18px] text-primaryColor font-bold bg-[#ECE9FA] px-[24px] py-[16px] w-[120px] h-[59px]"
        @click="limitForHome += 8"
      >
        More
      </button>
    </div>
  </div>

  <!-- for My events page -->
  <div
    v-if="props.fomat == 'M'"
    class="grid grid-cols-4 gap-[40px] place-content-center mx-[80px] my-[40px]"
  >
    <div v-if="eventList" v-for="eventObj in filteredEvent" :key="eventObj">
      <v-card
        @click="showDetail(eventObj.event.id,'M')"
        class="w-full mx-auto cursor-pointer hover:scale-105"
        style="border-radius: 16px"
        max-width="400"
      >
        <v-img
          class="align-end text-white"
          height="200"
          :src="eventObj.event.posterImg"
          cover
        >
          <!-- tag on img -->
          <div
            v-if="eventObj.event.eventStatus == 'CO'"
            class="flex justify-end mr-[16px] mb-[152px]"
          >
            <div
              class="w-[96px] h-[32px] bg-red-700 rounded-[8px] text-[12px] font-bold grid place-content-center"
            >
              Closed
            </div>
          </div>
        </v-img>
        <div class="py-[16px]">
          <v-card-title>
            <div class="text-[18px] w-full truncate font-semibold">
              {{ eventObj.event.title }}
            </div>
          </v-card-title>
          <v-card-subtitle>
            <div class="flex justify-start mb-[8px]">
              <img
                src="@/assets/Date.png"
                width="18"
                height="12"
                alt="date"
                class="mr-[8px]"
              />
              <span>{{ eventObj.event.startDate }}</span>
            </div>
          </v-card-subtitle>
          <v-card-subtitle>
            <div class="flex justify-start">
              <img
                src="@/assets/Category.png"
                width="18"
                height="12"
                alt="date"
                class="mr-[8px]"
              />
              <span>{{ eventObj.event.category }}</span>
            </div>
          </v-card-subtitle>
        </div>
      </v-card>
    </div>
    <div
      class="col-span-4 grid justify-items-center"
      v-if="filteredEvent.length != 0 && props.eventList.length > limitForMyevents"
    >
      <button
        class="rounded-[15px] text-main text-[18px] text-primaryColor font-bold bg-[#ECE9FA] px-[24px] py-[16px] w-[120px] h-[59px]"
        @click="(limitForMyevents += 8 , scrollToTop())"
      >
        More
      </button>
    </div>
    <div
      v-if="filteredEvent.length == 0"
      class="col-span-4 grid place-content-center h-[400px]">
      <img src="@/assets/logo-gray.png" width="140" alt="logo" />
      <p class="text-center mt-[8px] text-gray-300">No events</p>
    </div>
  </div>
</template>

<style scoped>
.v-card-title {
  font-size: 30px;
}
</style>
