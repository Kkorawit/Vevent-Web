<script setup>
import { ref, defineProps, onMounted, computed, reactive, watch } from "vue";
import moment from "moment";
import router from "@/plugins/router";

const props = defineProps({
  eventList: {
    type: Array,
    require: true,
  }
});

let showAll = ref(false);
let limit = ref(8);
const filteredEvent = computed(() => {
  let showEvent = props.eventList.slice(0, limit.value);
  
  return showEvent;
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

// const limitedEventList = computed(()=>{
//   if(showAll.value){
//     return eventList;
//   }else{
//     return eventList.slice(0,limit.value)
//   }
// })

// const showMoreCard = computed(() => {
//   return eventList.length > limit.value;
// });

const showDetail = (id) => {
  console.log(id);
  router.push({name:"eventDetailParticipant",params:{id:id}})
}

</script>
<template>
  <div class="grid grid-cols-4 gap-[40px] place-content-center mx-[80px] my-[40px]">
    <div v-if="eventList" v-for="eventObj in filteredEvent" :key="eventObj">
      <v-card @click="showDetail(eventObj.id)" class="w-full mx-auto cursor-pointer hover:scale-105 " style="border-radius: 16px;" max-width="400">
        <v-img
          class="align-end text-white"
          height="200"
          :src="eventObj.posterImg"
          cover
        >
        </v-img>
        <!-- <div class="grid grid-flow-col">
          <v-card-title>
            <div class="grid justify-items-center">
              <div class="text-[16px] text-primaryColor grid place-self-center">
                {{ monthChars[eventObj.startDate.split("-")[1] - 1] }}
              </div>
              <div class="text-[16px] text-primaryColor">
                {{ eventObj.startDate.split("-")[1] }}
              </div>
            </div>
          </v-card-title>
          <v-card-text>
            <div>{{ eventObj.title }}</div>
          </v-card-text>
        </div> -->
        <div class=" py-[16px]">
          <v-card-title>
            <div class="text-[18px] w-full truncate font-semibold  ">{{ eventObj.title }}</div>
          </v-card-title>
          <v-card-subtitle>
            <div class="flex justify-start mb-[8px]">
              <img src="@/assets/Date.png" width="18" height="12" alt="date" class="mr-[8px]" >
              <span>{{ eventObj.startDate }}</span>
            </div>
          </v-card-subtitle>
          <v-card-subtitle>
            <div class="flex justify-start">
              <img src="@/assets/Category.png" width="18" height="12" alt="date" class="mr-[8px]" >
              <span>{{ eventObj.category }}</span>
            </div>
          </v-card-subtitle>
        </div>

        <!-- <v-card-actions>
      <v-btn color="orange">
        Share
      </v-btn>

      <v-btn color="orange">
        Explore
      </v-btn>
    </v-card-actions> -->
      </v-card>
    </div>
    <!-- <div v-if="showMoreCard && !showAll">
        <v-btn @click="showAll = true">See More</v-btn>
      </div>
      <div v-if="showAll && !showMoreCard">
        <v-btn @click="showAll = false">Show Less</v-btn>
      </div> -->
    <div
      class="col-span-4 grid justify-items-center"
      v-if="filteredEvent.length != 0"
    >
      <button
        class="rounded-[15px] text-main text-[18px] text-primaryColor font-bold bg-[#ECE9FA] px-[24px] py-[16px] w-[120px] h-[59px]"
        @click="limit+=8"
      >
        More
      </button>
      <!-- <div class="items-end">
        {{ limit }}
      </div> -->
    </div>
  </div>
  <!-- <div v-if="props.format == 2" class="grid grid-cols-2 place-content-center gap-[40px] px-[120px]">
    <div v-if="eventList" v-for="eventObj in filteredEvent.slice(6)" :key="eventObj">
      <v-card @click="showDetail(eventObj.id)" class="mx-auto cursor-pointer hover:scale-105 " style="border-radius: 16px;"max-width="400">
        <v-img
          class="align-end text-white"
          height="200"
          :src="eventObj.posterImg"
          cover
        >
        </v-img>
        <div class=" py-[16px]">
          <v-card-title>
            <div class="text-[18px] w-full truncate font-semibold  ">{{ eventObj.title }}</div>
          </v-card-title>
          <v-card-subtitle>
            <div class="flex justify-start mb-[8px]">
              <img src="@/assets/Date.png" width="18" height="12" alt="date" class="mr-[8px]" >
              <span>{{ eventObj.startDate }}</span>
            </div>
          </v-card-subtitle>
          <v-card-subtitle>
            <div class="flex justify-start">
              <img src="@/assets/Category.png" width="18" height="12" alt="date" class="mr-[8px]" >
              <span>{{ eventObj.category }}</span>
            </div>
          </v-card-subtitle>
        </div>
      </v-card>
    </div>
  </div> -->

</template>

<style scoped>
.v-card-title {
  font-size: 30px;
}
</style>
