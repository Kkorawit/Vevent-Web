<script setup>
import { RouterView } from "vue-router";
import { ref,reactive } from 'vue'
import { googleLogout, GoogleLogin, decodeCredential } from "vue3-google-login";
import { auth } from '~/restful/Auth.js'
import { useRouter } from 'vue-router'


let router = useRouter()
const currentRoute = ref(router.currentRoute);
const role = ref("Guest")
const user = ref({})

async function callback(response) {
  console.log("Login",response);
  user.value = decodeCredential(response.credential)

  let doAuth = await auth(user.value.email,role.value,user.value.name,user.value.picture)
  if(doAuth=='Signup'){
    console.log("log signup navbar");
    router.push({name:'signup',
    params:{
      email:user.value.email,
      username:user.value.name,
      profileImg:user.value.picture,
    }})
  }
  console.log(user.value);
  console.log(user.value.email);
  console.log(doAuth);
  if(role.value){
    localStorage.setItem("access_token",doAuth.access_token)
    localStorage.setItem("refresh_token",doAuth.refresh_token)
    
    console.log("have role");
  }
}

// const logIn = (response) => {
//   console.log("login response:"+response);
//   user.value = decodeCredential(response.credential);
//   console.log(user.value);
// };


const logOut = () => {
  googleLogout();
};


</script>
<template>
  <div
    :class="['bar grid grid-cols-3 gap-x-10 col-span-3 w-screen h-[100px] bg-white drop-shadow-xl z-[100] ',currentRoute.name=='signup'? 'absolute top-0' : 'sticky top-0'  ]"

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
    <div class="profile-user col-start-3 flex justify-end mr-10" v-if="role=='Guest'">
      <div class="flex flex-row items-center">
        <GoogleLogin :callback="callback" client-id="403895376917-4c0smnvq340orrujns9s26emtsaq8s1c.apps.googleusercontent.com"/>
      </div>
      <div class="profile-user col-start-3 flex justify-end mr-10" v-if="role">

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
