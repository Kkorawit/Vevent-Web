<script>
import { RouterView } from "vue-router";
</script>
<template>
  <div
    class="bar grid grid-cols-3 gap-x-10 col-span-3 h-[100px] drop-shadow-xl"
  >
    <!-- bar logo -->
    <div class="logo grid cols-start-1 content-center ml-10">
      <img src="@/assets/LOGO-web.png" class="w-[148px] h-[37px]" alt="logo" />
    </div>
    <!-- bar menu -->
    <div class="menu cols-start-2 flex justify-center">
      <div class="flex flex-row items-center">
        <button
          class="box-content h-[43px] w-[120px] rounded-[16px] bg-white focus:bg-purple-900"
        >
          Home
        </button>
        <button
          class="box-content h-[43px] w-[120px] rounded-[16px] bg-white focus:bg-purple-900 mr-10"
        >
          About us
        </button>
      </div>
    </div>
    <!-- bar profile -->
    <div class="profile-user col-start-3 flex justify-end mr-10">
      <div class="flex flex-row items-center">
        <button
          class="box-content h-[43px] w-[240px] border border-1 border-solid border-gray-200 rounded-[16px] bg-white focus:bg-purple-900"
          @click=""
        >
          Sign in with Google
        </button>
        <!-- <GoogleLogin :callback="logIn" /> -->
      </div>
    </div>
  </div>
</template>

<style scoped>
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
