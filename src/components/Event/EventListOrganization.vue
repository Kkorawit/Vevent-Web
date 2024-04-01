<script setup>
import { ref, onMounted, computed } from "vue";
import DateTimeFormat from "@/components/DateTimeFormat.vue";
import { deleteEventById } from '~/restful/Eventapi.js'
import { getAllEventCreatedByUEmail } from "@/gql/gqlGet.js";
import EventDetailCard from "@/components/Event/EventDetail_card.vue";
import CreateEvent from "@/components/Event/CreateEvent.vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  info: {
    type: Array,
    request: true,
  },
});

const filterStatus = ref('allEvents');
const eventTitle = ref(Array.from(new Set(props.info?.map((event) => event.title))))

const countAll = ref();
const countUP = ref();
const countON = ref();
const countCO = ref();
const countCA = ref();

const countEvents = () => {
  countAll.value = filtered.value.length; // Count of all events
  countUP.value = filtered.value.filter(
    (event) => event.eventStatus === "UP"
  ).length;
  countON.value = filtered.value.filter(
    (event) => event.eventStatus === "ON"
  ).length;
  countCO.value = filtered.value.filter(
    (event) => event.eventStatus === "CO"
  ).length;
  countCA.value = filtered.value.filter(
    (event) => event.eventStatus === "CA"
  ).length;
};

onMounted(() => {
  countEvents();
});

const allEvents = ref(props.info);
const searchEvent = ref("");


const filtered = ref(props.info);
const eventList = computed(() => {
  console.log(filtered.value);

  return filtered.value.filter((event) => {
    console.log(event.title);
    
    return searchEvent.value ? event.title.includes(searchEvent.value) : true;
  });
});

const filterEvent = (status) => {
  filterStatus.value = "";
  console.log(status);
  filtered.value = allEvents.value.filter((event) => {
    if (status == "") {
      filterStatus.value = "allEvent";
      return event;
    } else {
      filterStatus.value = "";
      return event.eventStatus == status;
    }
  });
  eventTitle.value = filtered.value
};

const eventDetaildata = ref({});
// const eventId = ref();
const state = ref("eventList");
const changeState = async (s, id) => {
  console.log("change state");
  console.log(id);
  console.log(s);
  state.value = "";
  if (s == "eventDetail") {
    let result = await getEventById(id);
    console.log(result);
    eventDetaildata.value = result;
    console.log(eventDetaildata.value);
    state.value = s;
  } else if (s == "editEvent") {
    state.value = s;
  } else if (s == "createEvent") {
    state.value = s;
  } else {
    state.value = "eventList";
  }
};
</script>
<template>
  <div v-if="state == 'eventList'" class="grid justify-items-center">
    <!-- content -->
    <div class="bg-gray-100 p-10 w-[1080px]">
      <!-- header -->
      <div class="header flex justify-between mb-[40px]">
        <!-- header left -->
        <div class="header-left">
          <label class="text-sm">Event</label>
          <h2 class="text-[32px]">My Events</h2>
        </div>
        <!-- button create -->
        <div class="button-create-newEvent">
          <VueDatePicker v-model="date" class=""></VueDatePicker>
          <button
            @click="changeState('createEvent', null)"
            class="h-[64px] px-[16px] bg-primaryColor rounded-[16px] text-white flex items-center"
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
            @click="filterEvent('')"
            :class="
              filterStatus == ''
                ? 'filter-card-allEvent w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border border-2 border-solid border-white '
                : 'filter-card-allEvent w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border border-2 border-solid border-primaryColor'
            "
          >
            <div
              class="icon w-[54px] h-[54px] rounded-[8px] grid place-content-center bg-purple100"
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
          <button
            @click="filterEvent('UP')"
            class="filter-card w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border border-2 border-solid focus:border-2 focus:border-solid focus:border-gray-400"
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
          <button
            @click="filterEvent('ON')"
            class="filter-card w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border border-2 border-solid border-white focus:border focus:border-2 focus:border-solid focus:border-yellow-400"
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
          <button
            @click="filterEvent('CO')"
            class="filter-card w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border border-2 border-solid border-white focus:border focus:border-2 focus:border-solid focus:border-green-600"
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
          <button
            @click="filterEvent('CA')"
            class="filter-card w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border border-2 border-solid border-white focus:border focus:border-2 focus:border-solid focus:border-red-500"
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
              <span class="number text-[32px] mt-2">{{ countCA }}</span>
              <span class="text-[14px]">Cancelled</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Event List -->
      <div v-if="eventList" class="event-list">
        <!-- header -->
        <div class="header grid grid-flow-col mb-[16px]">
          <div class="title text-[20px] justify-self-start">
            All Event
            <!-- {{ title }} -->
          </div>
          <div class="button-search justify-self-end w-[400px]">
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
        <!-- card -->
        <div v-if="eventList">
          <button
            v-for="(event, index) in eventList"
            :key="index"
            class="event-card w-full h-[96px] bg-white rounded-[16px] grid items-center grid-cols-10 mb-[16px] p-[24px]"
          >
            <!-- event name -->
            <div class="grid col-span-4 col-start-1 place-items-start">
              <span class="text-[14px]">Event Name</span>
              <span
                class="text-[18px] w-[340px] truncate text-ellipsis text-left"
                >{{ event.title }}</span
              >
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
            <div
              class="grid col-span-1 col-start-9 place-items-center ml-[13px]"
            >
              <div
                v-if="event.eventStatus == 'ON'"
                class="eventStatus-button box-content h-[40px] w-[100px] rounded-[16px] bg-yellow-100 text-[14px] text-yellow font-medium grid place-content-center"
              >
                Ongoing
              </div>
              <div
                v-if="event.eventStatus == 'UP'"
                class="eventStatus-button box-content h-[40px] w-[100px] rounded-[16px] bg-gray-100 text-[14px] text-gray font-medium grid place-content-center"
              >
                Upcoming
              </div>
              <div
                v-if="event.eventStatus == 'CA'"
                class="eventStatus-button box-content h-[40px] w-[100px] rounded-[16px] bg-red-100 text-[14px] text-red font-medium grid place-content-center"
              >
                Cancelled
              </div>
              <div
                v-if="event.eventStatus == 'CO'"
                class="eventStatus-button box-content h-[40px] w-[100px] rounded-[16px] bg-green-100 text-[14px] text-green font-medium grid place-content-center"
              >
                Completed
              </div>
            </div>
            <div class="bin col-start-10 grid justify-items-end">

            
            <v-dialog>
              <template v-slot:activator="{props:activatorProps }">
                <v-btn
                class="text-gray-500 hover:text-red-500"
                v-bind="activatorProps"
                icon
                >
                <v-icon >mdi-trash-can</v-icon>

                </v-btn>
              </template>
              <template v-slot:default="{ isActive }">
                <v-card title="Dialog">
                  <v-card-text>
                    asdasdasdasdasd
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    
                    <v-btn
                    text="Close"
                    @click="isActive.value = false">

                    </v-btn>
                    <v-btn
                    text="Confirm"
                    @click="(isActive.value = false,deleteEventById(event.id))">

                    </v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </div>
            <!-- <button class="bin col-start-10 grid justify-items-end">
              <img
                src="@/assets/Recycle Bin.png"
                class="w-[24px] h-[24px]"
                alt="recycle button"
              />
            </button> -->
          </button>
        </div>
        <div v-if="filtered.length==0" class=" flex justify-center">
          <img class="w-[177.8px] h-[155px]" src="@/assets/noEvent-icon.png" />

        </div>
      </div>
    </div>
  </div>
  <!-- event detail -->
  <div v-if="state == 'eventDetail'">
    <EventDetailCard :info="eventDetaildata" :state="state"></EventDetailCard>
  </div>
  <!-- create event -->
  <div v-if="state == 'createEvent'">
    <CreateEvent></CreateEvent>
  </div>
</template>

<style scoped>
.dp__input {
  background-color: red !important;
}
</style>
