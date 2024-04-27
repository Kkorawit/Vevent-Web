<script setup>
import { ref } from "vue";
import { updateDisplayName } from '~/restful/Accountapi.js'

const profileImg = ref(localStorage.getItem("profileImg"));
const email = ref(localStorage.getItem("email"));
const displayName = ref(localStorage.getItem("displayName"));

const isReadonly = ref(true)
const toggleReadonly = () => {
  if(!isReadonly.value && displayName.value!=localStorage.getItem("displayName")){
    console.log("before axios");
    updateDisplayName(displayName.value)
  }
  console.log(isReadonly.value);
    isReadonly.value = !isReadonly.value
}

</script>

<template>
  <div class="grid grid-rows-2 w-full h-full">
    <div
      class="rows-start-1 bg-gradient-to-b from-[#4520CC] to-[#6A4DD6] relative"
    >
      <!-- close menu -->
      <!-- <div class="cursor-pointer absolute top-5 right-4">
        <img
          class="bg-white w-[46px] h-[46px] rounded-[15px]"
          src="@/assets/cross-icon.svg"
          alt=""
        />
      </div> -->
      <!-- profile img-->
      <div class="absolute top-[75px] right-[150px]">
        <img
          class="w-[200px] h-[200px] rounded-[8px] bg-white"
          :src="profileImg"
          alt=""
        />
      </div>
    </div>
    <div class="rows-start-2 bg-white pt-[80px]">
      <!-- profile details -->
      <div class="">
        <v-text-field
    class="w-[245px] pl-16"
    :append-inner-icon="isReadonly ? 'mdi-account-edit-outline': 'mdi-check'"
    variant="plain"
    v-model="displayName"
    :readonly="isReadonly"
    single-line
    @click:append-inner="toggleReadonly"
  >
  </v-text-field>
            <div>{{ email }}</div>
      </div>
      <!-- event own -->
      <div class="grid justify-items-center content-center"></div>
    </div>
  </div>
</template>

<style scoped>

</style>
