<script setup>
import { ref, onMounted, computed, VueElement } from "vue";
import DateTimeFormat from "@/extend/DateTimeFormat.vue";
import { deleteEventById } from "~/restful/Eventapi.js";
import { getAllEventCreatedByUEmail } from "@/gql/gqlGet.js";
import EventDetailCard from "@/pages/EventDetail_card.vue";
import CreateEvent from "@/pages/CreateEvent.vue";
import router from "@/plugins/router";
import moment from "moment-timezone";
// import VueDatePicker from "@vuepic/vue-datepicker";
// import '@vuepic/vue-datepicker/dist/main.css'

// const props = defineProps({
//   info: {
//     type: Array,
//     request: ,
//   },
// });

const eventTitle = ref();

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

onMounted(async () => {
  // let email  = localStorage.getItem("email")
  let response = await getAllEventCreatedByUEmail(
    localStorage.getItem("email")
  );
  console.log(response);
  allEvents.value = response;
  filtered.value = response;
  eventTitle.value = Array.from(
    new Set(allEvents.value.map((event) => event.title))
  );
  countEvents();
});

const successfull = ref(false);
const somethingWrong = ref(false);

const deleteEvent = async (id) => {
  console.log(id);
  let response = await deleteEventById(id);
  if (response.status == 200) {
    successfull.value = true;
    setTimeout( () => {
      successfull.value = false;
    }, 2000);
    setTimeout( () => {
      console.log("asdasdasd");
      router.push({ name: "home" });
    }, 3000);
  } else {
    somethingWrong.value = true;
  }
};

const allEvents = ref([]);
const searchEvent = ref("");

const filtered = ref([]);
const eventList = computed(() => {
  console.log(filtered.value);

  return filtered.value.filter((event) => {
    console.log(event.title);

    return searchEvent.value ? event.title.includes(searchEvent.value) : true;
  });
});

// const filterStatus = ref("allEvent");
// const filterEvent = (status) => {
//   filterStatus.value = "";
//   console.log(status);
//   filtered.value = allEvents.value.filter((event) => {
//     if (status == "") {
//       filterStatus.value = "allEvent";
//       return event;
//     } else {
//       filterStatus.value = "";
//       return event.eventStatus == status;
//     }
//   });
//   eventTitle.value = filtered.value
// };
const filterStatus = ref("allEvent"); //use for css select filter

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
  eventTitle.value = filtered.value;
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
    router.push({ name: "eventDetail", params: { id: id } });
  } else if (s == "editEvent") {
    state.value = s;
  } else if (s == "createEvent") {
    router.push({ name: "create" });
  } else {
    state.value = "eventList";
  }
};
</script>
<template>
  <div v-if="state == 'eventList'" class="grid justify-items-center">
    <!-- content -->
    <div class="bg-gray-50 p-10 w-[1080px] drop-shadow-md">
      <!-- header -->
      <div class="header flex justify-between mb-[40px]">
        <!-- header left -->
        <div class="header-left">
          <label class="text-sm">Event</label>
          <h2 class="text-[32px]">My Events</h2>
        </div>
        <!-- button create -->
        <div class="button-create-newEvent">
          <!-- <VueDatePicker v-model="date" class=""></VueDatePicker> -->
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
        <div class="filter-list flex justify-between w-[1000px] drop-shadow-sm">
          <!-- card: all event -->
          <button
            @click="filterEvent('')"
            :class="
              filterStatus == ''
                ? 'filter-card-allEvent w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between  border-2 border-solid '
                : 'filter-card-allEvent w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between  border-2 border-solid border-primaryColor'
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
            class="filter-card w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border-2 border-solid focus:border-gray-400"
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
            class="filter-card w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border-2 border-solid focus:border-yellow-400"
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
            class="filter-card w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border-2 border-solid focus:border-green-600"
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
            class="filter-card w-[168px] h-[163px] p-[16px] bg-white rounded-[16px] grid place-items-between border-2 border-solid focus:border-red-500"
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
      <div v-if="eventList" class="event-list drop-shadow-sm min-h-[410px]">
        <!-- header -->
        <div class="header grid grid-flow-col mb-[16px]">
          <div class="title text-[20px] justify-self-start">
            Event List
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
            @click="changeState('eventDetail', event.id)"
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
                class="eventStatus-button box-content h-[40px] w-[100px] rounded-[16px] bg-yellow-100 text-[14px] text-[#EFB008] font-medium grid place-content-center"
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
              <!-- delete Event -->
              <v-dialog class="w-[400px]" >
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn icon="mdi-trash-can hover:text-red-500" style="border-radius: 8px; box-shadow: none; " v-bind="activatorProps"  ></v-btn>
                </template>
                <!-- pop up delete -->
                <template v-slot:default="{ isActive }">
                  <v-card class="text-center">
                    <div class="w-full flex justify-center py-[24px]">
                      <img
                        src="@/assets/alert_delete.png"
                        alt="icon"
                        class="w-[56px] h-[56px]"
                      />
                    </div>
                    <v-card-title class="-my-[16px]" style="font-weight: 600"
                      >Delete Event?</v-card-title
                    >
                    <v-card-text
                      style="padding-top: 16px; padding-bottom: 24px"
                    >
                      Are you sure want to delete this event? this action cannot
                      be undone.
                    </v-card-text>
                    <v-card-actions
                      style="
                        padding-bottom: 24px;
                        padding-top: 0;
                        padding-left: 24px;
                        padding-right: 24px;
                      "
                    >
                      <v-spacer></v-spacer>
                      <div class="w-full flex justify-stretch gap-[24px]">
                        <v-btn
                          class="flex-grow-1"
                          style="
                            background-color: #ececec;
                            color: #515151;
                            border-radius: 8px;
                            height: 40px;
                          "
                          text="Cancel"
                          @click="isActive.value = false"
                        >
                        </v-btn>
                        <v-btn
                          class="flex-grow-1"
                          style="
                            background-color: red;
                            color: white;
                            border-radius: 8px;
                            height: 40px;
                          "
                          text="Delete"
                          @click="
                            (isActive.value = false), deleteEvent(event.id)
                          "
                        >
                        </v-btn>
                      </div>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>

              <!-- pop up success have icon -->
              <v-dialog
                v-model="successfull"
                class="w-[400px]"
                style="border-radius: 24px"
              >
                <template v-slot:default="{ isActive }">
                  <v-card class="text-center">
                    <div class="w-full flex justify-center py-[24px]">
                      <img
                        src="@/assets/alert_success.png"
                        alt="icon"
                        class="w-[56px] h-[56px]"
                      />
                    </div>
                    <v-card-title class="-my-[16px]" style="font-weight: 600"
                      >Event Created!!</v-card-title
                    >
                    <v-card-text
                      style="padding-top: 16px; padding-bottom: 24px"
                    >
                      Your event has been successfully created.
                    </v-card-text>
                  </v-card>
                </template>
              </v-dialog>

              <!-- pop up something wrong -->
              <v-dialog
                v-model="somethingWrong"
                class="w-[400px]"
                style="border-radius: 24px"
              >
                <template v-slot:default="{ isActive }">
                  <v-card class="text-center">
                    <div class="w-full flex justify-center py-[24px]">
                      <img
                        src="@/assets/alert_wrong.png"
                        alt="icon"
                        class="w-[56px] h-[56px]"
                      />
                    </div>
                    <v-card-title class="-my-[16px]" style="font-weight: 600"
                      >Opps</v-card-title
                    >
                    <v-card-text
                      style="padding-top: 16px; padding-bottom: 24px"
                    >
                      Something went wrong. Please, Try again.
                    </v-card-text>
                    <v-card-actions
                      style="
                        padding-bottom: 24px;
                        padding-top: 0;
                        padding-left: 24px;
                        padding-right: 24px;
                      "
                    >
                      <v-spacer></v-spacer>
                      <div class="w-full flex justify-stretch gap-[24px]">
                        <v-btn
                          class="flex-grow-1"
                          style="
                            background-color: #efb008;
                            color: white;
                            border-radius: 8px;
                            height: 40px;
                          "
                          text="Try again"
                          @click="
                            (isActive.value = false)
                          "
                        >
                        </v-btn>
                      </div>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </div>
          </button>
        </div>
        <div
          v-if="eventList.length == 0"
          class="grid place-content-center h-[320px]"
        >
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
  <!-- <div v-if="state == 'createEvent'">
    <CreateEvent></CreateEvent>
  </div> -->
</template>

<style scoped>
.dp__input {
  background-color: red !important;
}

/* gap buton right */
.v-card-actions .v-btn ~ .v-btn:not(.v-btn-toggle .v-btn) {
  margin-inline-start: 0;
}

.v-dialog > .v-overlay__content > .v-card,
.v-dialog > .v-overlay__content > .v-sheet,
.v-dialog > .v-overlay__content > form > .v-card,
.v-dialog > .v-overlay__content > form > .v-sheet {
  --v-scrollbar-offset: 0px;
  border-radius: 16px;
}


</style>
