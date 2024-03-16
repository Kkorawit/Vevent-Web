<script setup>
import Sidebar from "../components/Sidebar.vue";
import { onBeforeMount } from "vue";
import { ref } from "vue";
import gql from "graphql-tag";
import { useApolloClient } from "@vue/apollo-composable";
import eventDetailCard from "../components/EventDetail_card.vue"

// const eventID = ref("");
const props = defineProps({
  eventId:{
    type: String,
    request: true
  }
})

const eventID = ref("1");

const GET_EVENT_DETAIL = gql`
  query FindAllRegisEventsByUEmail {
    findEventDetailsByEventId(id: ${eventID.value}) {
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
`;

const { resolveClient } = useApolloClient();
const client = resolveClient();
const result = ref();

onBeforeMount(async () => {
  console.log(props.eventId);
  const { data, error } = await client.query({
    query: GET_EVENT_DETAIL,
  });
  if (error) {
    console.error("GraphQL error:", error);
  }
  result.value = data;
  console.log(result.value);
});

</script>

<template>
<div class="content">
    <div class="side-bar">
      <Sidebar></Sidebar>
    </div>
    <div>
      <div class="header">
        <div>Events > Event Details</div>
        <h2>สร้างโพสต์กิจกรรม</h2>
        <hr />
      </div>
      <div>
        <eventDetailCard :eventDetail="result"></eventDetailCard>
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

</style>
