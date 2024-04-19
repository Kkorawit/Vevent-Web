<script setup>
import gql from "graphql-tag";
import { onBeforeMount, onMounted } from "vue";
import { ref } from "vue";
import { useApolloClient } from "@vue/apollo-composable";
// import router from "../plugins/router";
import EventDetailCard from "@/pages/EventDetail_card.vue";
import CreateEvent from "@/pages/CreateEvent.vue";
import getAllEventCreatedByUEmail from '@/gql/gqlGet.js'

// const uEmail = "Organization.032301@gmail.com";

// const GET_EVENTS = gql`
//   query FindAllEventCreatedByUEmail {
//     findAllEventCreatedByUEmail(uEmail: "Organization.032301@gmail.com") {
//       id
//       title
//       startDate
//       eventStatus
//     }
//   }
// `;

const { resolveClient } = useApolloClient();
const client = resolveClient();
const result = ref();

// get all event
// const getAllEvent = async () => {
//   result.value = ref();
//   const { data, error } = await client.query({
//     query: GET_EVENTS,
//   });
//   if (error) {
//     console.error("GraphQL error:", error);
//   }
//   result.value = data;
//   state.value = "eventList";
//   console.log(result.value);
// };

// onBeforeMount(async () => {
//   await getAllEvent();
// });
onMounted(async () => {
  result.value = await getAllEventCreatedByUEmail('Organization.032301@gmail.com')
  state.value='eventList'
}) 



//get event detail by id
const getEventById = async (id) => {
  result.value = ref();
  console.log(id);
  const { data, error } = await client.query({
    query: gql`
      query FindAllRegisEventsByUEmail {
        findEventDetailsByEventId(id: ${id}) {
          id
          title
          eventDescription
          amountReceived
          category
          subCategory
          startDate
          endDate
          registerStartDate
          registerEndDate
          validationType
          validationRules
          posterImg
          createBy
          createDate
          updateBy
          updateDate
          locationName
          locationLatitude
          locationLongitude
          description
          validate_times
          eventStatus
        }
      }
    `,
  });
  if (error) {
    console.error("GraphQL error:", error);
  }
  result.value = data;
  console.log(result.value);
};

// func delete event
const deleteEvent = async (id) => {
  result.value = ref();
  console.log(id);
  const { data, error } = await client.query({
    query: gql``,
  });
  if (error) {
    console.error("GraphQL error:", error);
  }
  result.value = data;
  console.log(result.value);
};

const emits = defineEmits(["reload"]);

const state = ref("eventList");
const changeState = async (id, s) => {
  console.log("change state");
  console.log(id);
  console.log(s);
  state.value = "";
  if (s == "eventDetail") {
    await getEventById(id);
    state.value = s;
  } else if (s == "editEvent") {
    state.value == s;
  } else if (s == "createEvent") {
    state.value == s;
  } else if (s == "deleteEvent") {
    state.value == s;
  } else {
    state.value == "eventList";
    await getAllEvent();
  }
};
// function showDetails(id, state) {
//   console.log(state);
//   console.log(id);
//   if (state == "eventDetail") {
//     // state.value = 'eventDetail'
//     router.push({ name: "eventDetail", props: id });
//   }else{
//     state.value == 'event'
//   }
// }

const role = ref("organization");
// const role = ref('participant');

function checkRole(role) {
  if (role == "organization") {
    role.value = "organization";
  } else if (role == "participant") {
    role.value = "participant";
  }
}
</script>

<template>
  <!-- <div v-if="role == 'organization'">
    <h1>organization</h1>
  </div> -->
  <div class="content" v-if="role == 'organization'">
    <div class="side-bar">
      <Sidebar></Sidebar>
    </div>
    <div class="content-table" v-if="state != '' && state == 'eventList'">
      <div class="header">
        <div class="title">
          <div>
            <div>Events</div>
            <h2>All My Events</h2>
          </div>
          <div class="create-button">
            <button @click="changeState(null, 'createEvent')">
              <img
                src="../assets/Plus.png"
                alt="plus"
                style="width: 24px; height: 24px"
              />
              Create New Event
            </button>
          </div>
        </div>
        <hr />
      </div>
      <br />
      <div>
        <table>
          <div v-for="data in result">
            <thead>
              <tr>
                <th>No</th>
                <th>Event Name</th>
                <th>Date/Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="event in data"
                :key="event.id"
                @click="changeState(event.id, 'eventDetail')"
                class="event_list"
              >
                <td>{{ event.id }}</td>
                <td>{{ event.title }}</td>
                <td>{{ event.startDate }}</td>
                <td>{{ event.eventStatus }}</td>
                <td>
                  <div>
                    <button @click="changeState(event.id, 'deleteEvent')">
                      <img
                        src="../assets/Recycle-Bin-red.png"
                        alt="bin"
                        style="width: 24px; height: 24px; opacity: 60%"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </div>
        </table>
      </div>
    </div>
    <!-- Event detail page -->
    <div v-if="state != '' && state == 'eventDetail'">
      <div v-for="data in result">
        <EventDetailCard :info="data" :state="state" />
      </div>
    </div>
    <!-- Create evnet page -->
    <div>
    <!-- <div v-if="state != '' && state == 'createEvent'"> -->
      <div v-for="data in result">
        <CreateEvent :info="data"></CreateEvent>
      </div>
    </div>
  </div>
  <div v-if="role == 'participant'">
    <h1>participant</h1>
  </div>
</template>

<style scoped>
.content {
  margin-top: 40px;
  margin-left: 0;
}
.side_bar {
  grid-column-start: 1;
  grid-column-end: 2;
}
button {
  width: fit-content;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  outline: none;
}

.create-button button {
  background-color: #4520cc;
  color: white;
}

.title {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: space-between;
}

.header {
  text-align: start;
  line-height: 80%;
}

.header-component {
  text-align: start;
  line-height: 80%;
}

.event_list :hover {
  transform: scale(1.1);
}

</style>
