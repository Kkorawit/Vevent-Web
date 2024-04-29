<script setup>
import { ref } from "vue";
import { updateDisplayName } from "~/restful/Accountapi.js";

const profileImg = ref(localStorage.getItem("profileImg"));
const email = ref(localStorage.getItem("email"));
const displayName = ref(localStorage.getItem("displayName"));

const somethingWrong = ref(false); // pop something wrong
const successfull = ref(false); //popup success
const cssInput = ref(""); //เมื่อแก้ name จะเเสดง ช่อง input
const isReadonly = ref(true);
const toggleReadonly = async () => {
  cssInput.value = "solo";
  if (
    !isReadonly.value &&
    displayName.value != localStorage.getItem("displayName")
  ) {
    console.log("before axios");
    let response = await updateDisplayName(displayName.value);
    console.log(response);
    if (response.status == 200) {
      successfull.value = true;
      setTimeout(() => {
    successfull.value = false;
  }, 2000);
      cssInput.value = " ";
    } else {
      cssInput.value = " ";
      somethingWrong.value = true; //if can't edit display name
      displayName.value = localStorage.getItem("displayName"); // แก้ไม่ได้ก็เอาชื่อเดิมกลับมา
    }
  }
  console.log(isReadonly.value);
  isReadonly.value = !isReadonly.value;
};
</script>

<template>
  <div class="grid grid-rows-2 w-full h-full">
    <div
      class="rows-start-1 bg-gradient-to-b from-[#4520CC] to-[#6A4DD6] relative"
    >
      <!-- profile img-->
      <div class="absolute top-[75px] right-[150px]">
        <img
          class="w-[200px] h-[200px] rounded-[8px] bg-white drop-shadow-md"
          :src="profileImg"
          alt=""
        />
      </div>
    </div>

    <!-- profile details -->
    <div class="w-full bg-white pt-[72px] pb-[56px]">
      <v-text-field
        class="profile w-[280px] ml-[130px] -mb-[16px] centered-input"
        :append-icon="isReadonly ? 'mdi-account-edit-outline' : 'mdi-check'"
        :variant="cssInput"
        v-model="displayName"
        :readonly="isReadonly"
        single-line
        @click:append="toggleReadonly"
      >
      </v-text-field>
      <div class="flex justify-center">
        <img src="@/assets/email.svg" width="20" height="16" alt="mail" /><span
          class="ml-[8px] text-gray-600"
          >{{ email }}</span
        >
      </div>
    </div>
  </div>

  <!-- pop up success have icon -->
  <v-dialog v-model="successfull" class="w-[400px]" style="border-radius: 24px">
    <template>
      <v-card class="text-center">
        <div class="w-full flex justify-center py-[24px]">
          <img
            src="@/assets/alert_success.png"
            alt="icon"
            class="w-[56px] h-[56px]"
          />
        </div>
        <v-card-title class="-my-[16px]" style="font-weight: 600"
          >Success!</v-card-title
        >
        <v-card-text style="padding-top: 16px; padding-bottom: 24px">
          Your display name has been updated.
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>

  <!-- pop up something wrong -->
  <v-dialog
    v-model="somethingWrong"
    class="w-[400px]"
    style="border-radius: 24px"
  >
    <template v-slot:default="{ isActive }">
      <v-card class="text-center">
        <div class="w-full flex justify-center py-[24px]">
          <img
            src="@/assets/alert_wrong.png"
            alt="icon"
            class="w-[56px] h-[56px]"
          />
        </div>
        <v-card-title class="-my-[16px]" style="font-weight: 600"
          >Opps</v-card-title
        >
        <v-card-text style="padding-top: 16px; padding-bottom: 24px">
          Something went wrong. Please, Try again.
        </v-card-text>
        <v-card-actions
          style="
            padding-bottom: 24px;
            padding-top: 0;
            padding-left: 24px;
            padding-right: 24px;
          "
        >
          <v-spacer></v-spacer>
          <div class="w-full flex justify-stretch gap-[24px]">
            <v-btn
              class="flex-grow-1"
              style="
                background-color: #efb008;
                color: white;
                border-radius: 8px;
                height: 40px;
              "
              text="Try again"
              @click="(isActive.value = false)"
            >
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped>
.centered-input >>> input {
  text-align: center;
}

.v-dialog > .v-overlay__content > .v-card,
.v-dialog > .v-overlay__content > .v-sheet,
.v-dialog > .v-overlay__content > form > .v-card,
.v-dialog > .v-overlay__content > form > .v-sheet {
  --v-scrollbar-offset: 0px;
  border-radius: 16px;
}
</style>
