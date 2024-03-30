<script setup>
import { ref, onMounted, computed } from "vue";
import DateTimeFormat from "@/components/DateTimeFormat.vue";


const props = defineProps({
  info: {
    type: Array,
    request: true,
  },
});





const title = ref("All Event"); //follow select filter
const eventStatus = ref('');
const eventStatusCSS = ref('');

// const eventStatusButton = computed(() => {
//   eventList.value.map((event) => {
//     eventStatus.value = '';
//   eventStatusCSS.value = '';
  


//   })
//   console.log('start fun')
  
// });

// const countEvent = ref(filtered.value.length);
const countAll = ref();
const countUP = ref();
const countON = ref();
const countCO = ref();
const countCA = ref();

const countEvents = () => {
  countAll.value = filtered.value.length;  // Count of all events
  countUP.value = filtered.value.filter((event) => event.eventStatus === "UP").length;
  countON.value = filtered.value.filter((event) => event.eventStatus === "ON").length;
  countCO.value = filtered.value.filter((event) => event.eventStatus === "CO").length;
  countCA.value = filtered.value.filter((event) => event.eventStatus === "CA").length;
};

onMounted(() => {
  countEvents()
})


const allEvents = ref(props.info);
const searchEvent = ref('');

const filtered = ref(props.info);
const eventList = computed(() => {
  console.log(filtered.value);
  return filtered.value.filter((event) => {
    console.log(event);
  
        return searchEvent.value ? event.title.includes(searchEvent.value) : true; 
  })
})



const filterEvent = (status) => {
  console.log(status);
  filtered.value = allEvents.value.filter((event)=> {
    
    if(status == ''){
      return event;
    }else {
      return event.eventStatus == status;
    }
    
  })
}





</script>
<template>
  <!-- <div class="grid grid-cols-10 gap-x-10 mx-10 "> -->
  <div class="grid justify-items-center">
    <!-- content -->
    <!-- <div class="bg-red-400  p-10 col-span-8 col-start-2  "> -->
    <div class="bg-gray-100 p-10 w-[1080px] ">
      <!-- header -->
      <div class="header flex justify-between mb-[40px]">
        <!-- header left -->
        <div class="header-left">
          <label class="text-sm">Event</label>
          <h2 class="text-[32px]">My Events</h2>
        </div>
        <!-- button create -->
        <div class="button-create-newEvent">
          <button
            class="h-[64px] px-[16px] bg-purple-800 rounded-[16px] text-white flex items-center"
          >
            <img
              src="@/assets/Plus.png"
              class="w-[24px] h-[24px] mr-[16px]"
              alt="create button"
            />
            <span>Create New Event</span>
          </button>
        </div>
      </div>

      <!-- filter -->
      <div class="filter mb-[40px]">
        <div class="filter-list flex justify-between w-[1000px]">
          <!-- card: all event -->
          <button @click="filterEvent('')"
            class="filter-card w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border focus:border-2 focus:border-solid focus:border-purple-700"
          >
            <div
              class="icon w-[54px] h-[54px] rounded-[8px] grid place-content-center bg-purple-100"
            >
              <img
                src="@/assets/eventStatus/all event.png"
                class="w-[27px] h-[27px]"
                alt="icon"
              />
            </div>
            <div class="count grid place-items-start">
              <span class="number text-[32px] mt-2">{{ countAll }}</span>
              <span class="text-[14px]">All Events</span>
            </div>
          </button>
          <!-- card: Upcoming -->
          <button @click="filterEvent('UP')"
            class="filter-card w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border focus:border-2 focus:border-solid focus:border-gray-400"
          >
            <div
              class="icon w-[54px] h-[54px] rounded-[8px] grid place-content-center bg-gray-100"
            >
              <img
                src="@/assets/eventStatus/pending.png"
                class="w-[27px] h-[27px]"
                alt="icon"
              />
            </div>
            <div class="count grid place-items-start">
              <span class="number text-[32px] mt-2">{{ countUP }}</span>
              <span class="text-[14px]">Upcoming</span>
            </div>
          </button>
          <!-- card:Onging -->
          <button  @click="filterEvent('ON')"
            class="filter-card w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border focus:border-2 focus:border-solid focus:border-yellow-400"
          >
            <div
              class="icon w-[54px] h-[54px] rounded-[8px] grid place-content-center bg-yellow-100"
            >
              <img
                src="@/assets/eventStatus/in process.png"
                class="w-[27px] h-[27px]"
                alt="icon"
              />
            </div>
            <div class="count grid place-items-start">
              <span class="number text-[32px] mt-2">{{ countON }}</span>
              <span class="text-[14px]">Ongoing</span>
            </div>
          </button>
          <!-- card: completed -->
          <button @click="filterEvent('CO')"
            class="filter-card w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border focus:border-2 focus:border-solid focus:border-green-600"
          >
            <div
              class="icon w-[54px] h-[54px] rounded-[8px] grid place-content-center bg-green-100"
            >
              <img
                src="@/assets/eventStatus/success.png"
                class="w-[27px] h-[27px]"
                alt="icon"
              />
            </div>
            <div class="count grid place-items-start">
              <span class="number text-[32px] mt-2">{{ countCO }}</span>
              <span class="text-[14px]">Completed</span>
            </div>
          </button>
          <!-- card: canceled -->
          <button @click="filterEvent('CA')"
            class="filter-card w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border focus:border-2 focus:border-solid focus:border-red-500"
          >
            <div
              class="icon w-[54px] h-[54px] rounded-[8px] grid place-content-center bg-red-100"
            >
              <img
                src="@/assets/eventStatus/false.png"
                class="w-[27px] h-[27px]"
                alt="icon"
              />
            </div>
            <div class="count grid place-items-start">
              <span class="number text-[32px] mt-2">{{ countCA}}</span>
              <span class="text-[14px]">Cancelled</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Event List -->
      <div class="event-list">
        <!-- header -->
        <div class="header flex justify-between mb-[16px]">
          <div class="title text-[20px]">
            {{ title }}
          </div>
          <!-- <div class="button-search">
            <button
              class="h-[48px] w-[340px] px-[16px] bg-white rounded-[16px] text-gray-300 flex items-center justify-between"
            >
              <span>Search Event</span>
              <img
                src="@/assets/search.png"
                class="w-[24px] h-[24px] mr-[16px]"
                alt="create button"
              />
            </button>
          </div> -->
        </div>
        <!-- card -->
        <div v-if="eventList" class="event-list">
          <button
            v-for="(event, index) in eventList"
            :key="index"
            class="event-card w-full h-[96px] bg-white rounded-[16px] grid items-center  grid-cols-10 mb-[16px] p-[24px]  "
          >
            <!-- event name -->
            <div class="grid col-span-4 col-start-1 place-items-start">
              <span class="text-[14px]">Event Name</span>
              <span class="text-[18px] w-[340px] truncate text-ellipsis text-left  ">{{
                event.title
              }}</span>
            </div>
            <!-- start date -->
            <div class="grid col-span-2 col-start-5 place-items-start">
              <span class="text-[14px]">Start Date</span>
              <!-- <span class="text-[18px]">{{ event.startDate }}</span> -->
              <DateTimeFormat :eventStartTime="event.startDate" :format="3" />
            </div>
            <!-- End date -->
            <div class="grid col-span-2 col-start-7 place-items-start">
              <span class="text-[14px]">End Date</span>
              <!-- <span class="text-[18px]">{{ event.endDate }}</span> -->
              <DateTimeFormat :eventStartTime="event.endDate" :format="3" />
            </div>

             <!-- event status -->
             <div class="grid col-span-1 col-start-9 place-items-center ml-[13px]">
                <div v-if="event.eventStatus == 'ON'" class="eventStatus-button box-content h-[40px] w-[100px] rounded-[16px] bg-yellow-100 text-[14px] text-yellow font-medium grid place-content-center "> Ongoing</div>
                <div v-if="event.eventStatus == 'UP'" class="eventStatus-button box-content h-[40px] w-[100px] rounded-[16px] bg-gray-100 text-[14px] text-gray font-medium grid place-content-center">Upcoming</div>
                <div v-if="event.eventStatus == 'CA'" class="eventStatus-button box-content h-[40px] w-[100px] rounded-[16px] bg-red-100 text-[14px] text-red font-medium grid place-content-center ">Cancelled </div>
                <div v-if="event.eventStatus == 'CO'" class="eventStatus-button box-content h-[40px] w-[100px] rounded-[16px] bg-green-100 text-[14px] text-green font-medium grid place-content-center"> Completed</div>
            </div>

            <button class="bin  col-start-10 grid justify-items-end   ">
                <img
                src="@/assets/Recycle Bin.png"
                class="w-[24px] h-[24px] "
                alt="recycle button"
              />

            </button>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
