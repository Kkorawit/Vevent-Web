<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { googleLogout, GoogleLogin, decodeCredential } from "vue3-google-login";
import EventListOrganization from "@/components/Event/EventListOrganization.vue";
import EventListParticipants from "@/components/Event/EventListParticipants.vue";
import Navbar from "@/components/Navbar.vue";
import {
  getAllEventCreatedByUEmail,
  getAllEvents,
  getAllEventRegisEventByUEmail,
} from "@/gql/gqlGet.js";

const user = ref();

const role = ref(localStorage.getItem("role") || "Participants");

// const allEvent = ref(); //everyone on first page
const allEvent = ref(); //signin on organizeation role
// const allEventParticipants = ref(); //signin on participants role

const email = ref(localStorage.getItem("email"));

onMounted(async () => {
  console.log(email.value);
  if (email.value != null && role.value == "Organization") {
    let response = await getAllEventCreatedByUEmail(email.value); //organize role
      console.log(response);
      allEvent.value = response;
      console.log(import.meta.env);
      console.log(import.meta.env.VITE_API_ENV);
      console.log(import.meta.env.VITE_GL_ENV);
      console.log(import.meta.env.APP_GL_ENV);
  } else {
    console.log("dont'have email");
    let response = await getAllEvents();
    console.log(response);
    allEvent.value = response;
  }
});

// const logIn = (response) => {
//   console.log(response);
//   user.value = decodeCredential(response.credential);
//   console.log(user.value);
// };

// const logOut = () => {
//   googleLogout();
// };
</script>

<template>
  <Navbar></Navbar>
  <div v-if="role == 'Participants'">
    <EventListParticipants
      v-if="allEvent"
      :allEvents="allEvent"
    ></EventListParticipants>
    <!-- {{ eventList }} -->
    <!-- <EventCard></EventCard> -->
  </div>
  <!-- organization -->
  <div v-if="role == 'Organization'">
    <!-- content event list -->
    <div class="event-list">
      <EventListOrganization
        v-if="allEvent"
        :info="allEvent"
      ></EventListOrganization>
    </div>
  </div>
</template>

<style scoped></style>
