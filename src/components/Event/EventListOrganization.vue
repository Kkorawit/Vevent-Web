<script setup>
import { ref } from "vue";
import DateTimeFormat from "@/components/DateTimeFormat.vue";

const props = defineProps({
  info: {
    type: Array,
    request: true,
  },
});
console.log(props.info);
console.log(props.info.title);

const title = ref("All Event"); //follow select filter
</script>
<template>
  <!-- <div class="grid grid-cols-10 gap-x-10 mx-10 "> -->
  <div class="w-[1080px]">
    <!-- content -->
    <!-- <div class="bg-red-400  p-10 col-span-8 col-start-2  "> -->
    <div class="bg-gray-100 p-10">
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
          <button
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
              <span class="number text-[32px] mt-2">20</span>
              <span class="text-[14px]">All Events</span>
            </div>
          </button>
          <!-- card: pending -->
          <button
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
              <span class="number text-[32px] mt-2">20</span>
              <span class="text-[14px]">Pending</span>
            </div>
          </button>
          <!-- card: in process -->
          <button
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
              <span class="number text-[32px] mt-2">20</span>
              <span class="text-[14px]">In Process</span>
            </div>
          </button>
          <!-- card: success -->
          <button
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
              <span class="number text-[32px] mt-2">20</span>
              <span class="text-[14px]">Success</span>
            </div>
          </button>
          <!-- card: false -->
          <button
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
              <span class="number text-[32px] mt-2">20</span>
              <span class="text-[14px]">False</span>
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
          <div class="button-search">
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
          </div>
        </div>
        <!-- card -->
        <div class="event-list">
          <button
            v-for="(event, index) in props.info"
            :key="index"
            class="event-card w-full h-[96px] bg-white rounded-[16px] grid grid-cols-10 mb-[16px] p-[24px] "
          >
            <!-- event name -->
            <div class="grid col-span-4 col-start-1 place-items-start">
              <span class="text-[14px]">Event Name</span>
              <span class="text-[18px] w-[340px] truncate text-ellipsis">{{
                event.title
              }}</span>
            </div>
            <!-- start date -->
            <div class="grid col-span-2 col-start-5 place-items-start">
              <span class="text-[14px]">Start Date</span>
              <DateTimeFormat :eventStartTime="event.startDate" :format="3" />
            </div>
            <!-- End date -->
            <div class="grid col-span-2 col-start-7 place-items-start">
              <span class="text-[14px]">End Date</span>
              <DateTimeFormat :eventStartTime="event.startDate" :format="3" />
            </div>

             <!-- event status -->
             <div class="grid col-span-1 col-start-9 place-items-center">
                <div class="eventStatus-button"> {{ event.eventStatus }}
                </div>
            </div>

            <button class="bin  col-start-10 pr-[24px] ">
                <img
                src="@/assets/Recycle Bin.png"
                class="w-[24px] h-[24px] mr-[16px]"
                alt="recycle button"
              />

            </button>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
