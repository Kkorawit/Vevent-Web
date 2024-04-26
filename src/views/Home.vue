<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { googleLogout, GoogleLogin, decodeCredential } from "vue3-google-login";
import EventListOrganization from "@/components/Event/EventListOrganization.vue";
import EventListParticipants from "@/components/Event/EventListParticipants.vue";
import Navbar from "@/components/Navbar.vue";
import {getAllEvents} from "@/gql/gqlGet.js";


const role = ref(localStorage.getItem("role") || "Participants");
const allEvents = ref(); 

onMounted(async () => {
  let response = await getAllEvents();
  console.log(response);
  allEvents.value = response;
  console.log(import.meta.env);
  console.log(import.meta.env.VITE_API_ENV);
  console.log(import.meta.env.VITE_GL_ENV);
  console.log(import.meta.env.APP_GL_ENV);
});
</script>

<template>
  <Navbar></Navbar>
  <div v-if="role == 'Participants'">
    <EventListParticipants
      v-if="allEvents"
      :allEvents="allEvents"
    ></EventListParticipants>
  </div>
  <!-- organization -->
  <div v-if="role == 'Organization'">
    <!-- content event list -->
    <div class="event-list">
      <EventListOrganization></EventListOrganization>
    </div>
  </div>
</template>

<style scoped></style>
