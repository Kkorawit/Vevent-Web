<script setup>
import { RouterView } from "vue-router";
import { ref, reactive, watch } from "vue";
import { googleLogout, GoogleLogin, decodeCredential } from "vue3-google-login";
import { auth, setToken, getUserInfo, clearStorage } from "~/restful/Auth.js";
import accDialog from "@/components/Account/acc-dialog.vue";
import { useRouter } from "vue-router";


const props = defineProps({
  menu: {
    type: String
  }
})


let router = useRouter();
const currentRoute = ref(router.currentRoute);
// const role = ref("Guest");
// const userInfo = ref({
//     email:localStorage.getItem("email"),
//     displayName:localStorage.getItem("displayName"),
//     role:localStorage.getItem("role"),
//     profileImg:localStorage.getItem("profileImg"),
// })
const user = ref({});
const email = ref(localStorage.getItem("email"));
// const email = ref("timothy.d02@example.com");  //Demo
const profileImg = ref(localStorage.getItem("profileImg"));
const displayName = ref(localStorage.getItem("displayName"));
const role = ref(localStorage.getItem("role") || "Guest");

async function callback(response) {
  console.log("Login", response);
  user.value = decodeCredential(response.credential);
  console.log(user.value);
  let doAuth = await auth(
    user.value.email,
    role.value,
    user.value.name,
    user.value.picture
  );
  console.log(doAuth);
  if (doAuth == "Signup") {
    console.log("log signup navbar");
    router.push({
      name: "signup",
      params: {
        email: user.value.email,
        username: user.value.name,
        profileImg: user.value.picture,
      },
    });
  } else {
    window.location.reload();
    router.push({name:'home'})
  }
}

const toggleDropdown = () => {
  let dropdown = document.querySelector("#dropDownButton #dropdown");
  dropdown.classList.toggle("hidden");
};
// watch(localStorage.getItem("role"), (newValue, oldValue) => {
//   if (newValue !== oldValue) {
//     role.value = newValue;
//   }
// }, { immediate: true });
// const logIn = (response) => {
//   console.log("login response:"+response);
//   user.value = decodeCredential(response.credential);
//   console.log(user.value);
// };

const logout = () => {
  googleLogout();
  clearStorage();
  window.location.reload();
};

const menu = (page) => {
  if(page == 'home'){
    router.push({name:'home'});
  }else if(page == 'myEvents') {
    router.push({name:'myEvents', params:{email: email.value}});
  }
}


</script>

<template>
  <div
    :class="[
      'bar grid grid-cols-3 gap-x-10 col-span-3 w-screen h-[100px] bg-white drop-shadow-xl z-[100] ',
      currentRoute.name == 'signup' ? 'absolute top-0' : 'sticky top-0',
    ]"
  >
    <!-- bar logo -->
    <button @click="menu('home')">
      <div class="logo grid cols-start-1  ml-10 grid content-center">
        <img src="@/assets/LOGO-web.png" class="w-[148px] h-[37px]" alt="logo" />
      </div>
    </button>
    <!-- bar menu -->
    <div
      class="menu cols-start-2 flex justify-center"
      v-if="role == 'Participants' || role == 'Guest' && email"
    >
      <div class="flex flex-row items-center">
        <button @click="menu('home')"
          :class="props.menu == null ? 'box-content h-[43px] w-[120px] rounded-[16px] bg-primaryColor text-white focus:bg-purple-900':'box-content h-[43px] w-[120px] rounded-[16px] bg-white focus:bg-purple-900 '"
        >
          Home
        </button>
        <button @click="menu('myEvents')"
        :class="props.menu != null ? 'box-content h-[43px] w-[120px] rounded-[16px] bg-primaryColor text-white focus:bg-purple-900':'box-content h-[43px] w-[120px] rounded-[16px] bg-white focus:bg-purple-900'"
        >
          My Event
        </button>
      </div>
    </div>
    <!-- bar profile -->
    <div
      class="profile-user col-start-3 flex justify-end mr-10"
      v-if="role == 'Guest' || role == null"
    >
      <div class="flex flex-row items-center">
        <GoogleLogin
          :callback="callback"
          client-id="403895376917-4c0smnvq340orrujns9s26emtsaq8s1c.apps.googleusercontent.com"
        />
      </div>
    </div>
    <div
      class="profile-user col-start-3 flex justify-end items-center mr-10"
      v-if="role == 'Participants' || role == 'Organization'"
    >
      <div class="relative" id="dropDownButton">
        <!-- drop down -->
        <div
          @click="toggleDropdown()"
          class="flex justify-evenly w-[266px] h-[50px]"
        >
          <img
            class="w-[50px] h-[50px] rounded-[8px]"
            :src="profileImg"
            alt=""
          />
          <div class="grid justify-items-start">
            <div class="text-[18px] font-semibold">{{ displayName }}</div>
            <div class="text-[14px] text-gray-500">{{ role }}</div>
          </div>
          <img
            class="w-[24px] h-[24px] rotate-90 mt-2"
            src="@/assets/arrow-icon.svg"
            alt=""
          />
        </div>
        <!-- list -->
        <div
          id="dropdown"
          class="hidden rounded border-1 border-gray-300 bg-white absolute top-[60px] w-[250px] shadow-md"
        >
          <v-dialog class="w-2/5">
            <template v-slot:activator="{ props: activatorProps }">
              <div
                v-bind="activatorProps"
                variant="text"
                class="cursor-pointer hover:bg-primaryLight p-4"
              >
                Profile
              </div>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card title="" class="w-[500px] h-[486px] relative">
                <div class="cursor-pointer absolute z-[99] top-[10px] right-[10px]">
                  <img
                    class="w-[46px] h-[46px] rounded-[15px]"
                    src="@/assets/cross2-icon.svg"
                    alt=""
                  />
                </div>
                <v-card-text class="-mt-4"><accDialog /> </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text="Close" @click="isActive.value = false"> </v-btn>
                  <v-btn text="Confirm" @click="isActive.value = false">
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          <!-- <div @click="" class="cursor-pointer hover:bg-primaryLight p-4">Profile</div> -->
          <div
            @click="logout()"
            class="cursor-pointer hover:bg-primaryLight p-4"
          >
            Sign Out
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .logo {
  margin-top: 40px;
  margin-bottom: 40px;
} */
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
.v-dialog > .v-overlay__content > .v-card > .v-card-item + .v-card-text,
.v-dialog > .v-overlay__content > form > .v-card > .v-card-item + .v-card-text {
  padding-top: 0px;
}
.v-dialog > .v-overlay__content > .v-card > .v-card-text,
.v-dialog > .v-overlay__content > form > .v-card > .v-card-text {
  font-size: inherit;
  letter-spacing: 0.03125em;
  line-height: inherit;
  padding: 0px;
}
.v-card-text {
  flex: 1 1 auto;
  font-size: 0.875rem;
  font-weight: 400;
  letter-spacing: 0.0178571429em;
  padding: 0px;
  text-transform: none;
}
.v-card-item {
  align-items: center;
  display: grid;
  flex: none;
  grid-template-areas: "prepend content append";
  grid-template-columns: max-content auto max-content;
  padding: 0px;
}
.v-dialog > .v-overlay__content > .v-card > .v-card-item,
.v-dialog > .v-overlay__content > form > .v-card > .v-card-item {
  padding: 0px 24px 0;
}
</style>
