<script setup>
import Sidebar from "../components/Sidebar.vue";
import gql from "graphql-tag";
import { onBeforeMount } from "vue";
import { ref } from "vue";
import { useApolloClient } from "@vue/apollo-composable";
import router from "../plugins/router";


// const uEmail = "Organization.032301@gmail.com";
const GET_EVENTS = gql`
  query FindAllEventCreatedByUEmail {
    findAllEventCreatedByUEmail(uEmail: "Organization.032301@gmail.com") {
      id
      title
      startDate
      eventStatus
    }
  }
`;

const { resolveClient } = useApolloClient();
const client = resolveClient();
const result = ref();
onBeforeMount(async () => {
  const { data, error } = await client.query({
    query: GET_EVENTS,
  });
  if (error) {
    console.error("GraphQL error:", error);
  }
  result.value = data;
  console.log(result.value);
  // console.log(countEvent.value);
  // console.log(role.value);
});


const state = ref('');
function   showDetails(id, state) {
  console.log(state);
  console.log(id);
    if(state == 'eventDetail'){
      // state.value = 'eventDetail'
    router.push({name:'eventDetail',props:id})
  }
}

const role = ref('organization');
// const role = ref('participant');

function checkRole(role) {
  if(role == "organization"){
    role.value = "organization";
  }else if(role =="participant"){
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
    <div>
      <div class="header">
        <div>Events</div>
        <h2>All My Events</h2>
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
              <tr v-for="event in data" :key="event.id" @click="showDetails(event.id,'eventDetail')" class="event_list" >
                <td>{{ event.id }}</td>
                <td>{{ event.title }}</td>
                <td>{{ event.startDate }}</td>
                <td>{{ event.eventStatus }}</td>
              </tr>
            </tbody>
          </div>
        </table>
      </div>
    </div>
  </div>
  <div v-if="role == 'participant'">
    <h1>participant</h1>
  </div>
</template>

<style>
.content {
  margin-top: 40px;
  margin-left: 0;
}
.side_bar {
  grid-column-start: 1;
  grid-column-end: 2;
}

.header {
  text-align: start;
  line-height: 80%;
}

.event_list :hover {
  transform: scale(1.1);
}
</style>
