<script setup>
import { ref, defineProps, onMounted, computed, reactive, watch } from "vue";

const props = defineProps({
  eventList: {
    type: Array,
    require: true,
  },
});

let showAll = ref(false);
let limit = ref(9);
const filteredEvent = computed(() => {
  let showEvent = props.eventList.slice(0, limit.value);
  return showEvent;
});

// const limitedEventList = computed(()=>{
//   if(showAll.value){
//     return eventList;
//   }else{
//     return eventList.slice(0,limit.value)
//   }
// })

const showMoreCard = computed(()=>{
  return eventList.length > limit.value;
})
</script>

<template>
  <div class="grid grid-cols-3 gap-[40px] mx-[80px] my-[40px]">
    <div v-if="eventList" v-for="eventObj in filteredEvent" :key="eventObj">
      <v-card class="mx-auto" max-width="400">
        <v-img
          class="align-end text-white"
          height="200"
          :src="eventObj.posterImg"
          cover
        >
        </v-img>
        <div class="grid grid-cols-2 grid-rows-2">
          <v-card-title class="text-main">{{ eventObj.title }}</v-card-title>
          <v-card-text>
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>
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
    <div class="col-span-3 grid justify-items-center">
      <button
        class="rounded-[15px] text-main text-[18px] text-main font-bold bg-[#ECE9FA] px-[24px] py-[16px] w-[120px]"
        @click="showMoreCard()"
        >
        More
      </button>
    </div>
  </div>
</template>

<style scoped>
.v-card-title {
  font-size: 30px;
}
</style>
