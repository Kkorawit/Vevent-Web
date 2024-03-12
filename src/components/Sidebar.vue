<script>
import { RouterView } from "vue-router";
</script>
<template>
  <div class="sidebar">
    <div class="logo">
        <img src="../assets//LOGO-web.png" alt="logo" width="128">
    </div>
    <div class="menu-item">
      <RouterView>
        <router-link :to="{ name: 'dashboard' }">Dashboard</router-link>
        <router-link :to="{ name: 'events' }">Events</router-link>
        <router-link :to="{ name: 'participants' }">Manage Users</router-link>
      </RouterView>
    </div>
  </div>
</template>

<style>
.logo {
    margin-top: 40px;
    margin-bottom: 40px;
}
.sidebar {
      width: 280px; /* Adjust width as needed */
      height: 100vh; /* Full viewport height */
      background-color: #f1f1f1; /* Light gray background */
      position: fixed; /* Fixed position to stay on the screen */
      top: 0; /* Align to the top of the viewport */
      left: 0; /* Align to the left of the viewport */
      display: flex; /* Allow for vertical stacking of content */
      flex-direction: column; /* Stack content vertically */
      align-items: center; /* Center content horizontally */
      box-shadow: inset;
    }

    /* Style the sidebar links */
    .sidebar a {
      text-decoration: none; /* Remove default underline */
      color: black; /* Text color */
      padding: 10px; /* Padding for spacing */
      display: block; /* Make each link occupy full width */
    }

    /* Style the content area */
    .content {
      margin-left: 200px; /* Match the sidebar width */
      padding: 20px;
    }
</style>
