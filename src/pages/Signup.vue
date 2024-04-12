<script setup>
import { onMounted, ref } from "vue";
import Navbar from "../components/Navbar.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import photo1 from "@/assets/signup_preview_1.png";
import photo2 from "@/assets/signup_preview_2.png";
import photo3 from "@/assets/signup_preview_3.png";
import "swiper/css/bundle";
import { rules } from "@/extend/utils.ts";
import CustomBtn from "../components/common/CustomBtn.vue";
import kuy from "@/assets/kuy.png";

const posters = ref([
  {
    photo: photo1,
    title: "Start Your Event With Us",
    des: "It's sure to change your event experience forever!",
    alt: "Preview 1",
  },
  {
    photo: photo2,
    title: "Increase management efficiency",
    des: "Check the total number of participants Check the list Conveniently and quickly through a single app.",
    alt: "Preview 2",
  },
  {
    photo: photo3,
    title: "Safe and reliable",
    des: "High security system Personal Information is safe",
    alt: "Preview 3",
  },
]);

const valid = ref(true);

// const posters = [
//   { id:1, src: '@/assets/signup_preview_1.png', alt: 'Image 1 description' },
//   { id:2, src: '@/assets/signup_preview_2.png', alt: 'Image 2 description' },
//   { id:3, src: '@/assets/signup_preview_3.png', alt: 'Image 3 description' },
// ];
</script>

<template>
  <Navbar></Navbar>
  <div class="w-full grid grid-cols-2">
    <!-- Poster -->
    <div class="slide-info bg-gradient-to-b from-[#4520CC] to-[#6A4DD6] mt-[100px]">
      <!-- <img class="h-full w-auto" src="@/assets/Recycle-Bin-red.png" alt=""> -->
      <div>
        <swiper
          :slides-per-view="1"
          :space-between="400"
          :pagination="{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 1,
          }"
          navigation
          :autoplay="{ delay: 5000 }"
          class="my-swiper"
          :modules="[Pagination, Navigation, Autoplay]"
        >
          <swiper-slide v-for="poster in posters" :key="poster.id" class="pb-[16px]">
            <div class="grid justify-items-center">
              <img :src="poster.photo" alt="" class="" />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- Form -->
    <div
      class="signup-form grid justify-items-center content-start px-[70px] py-[40px] h-screen overflow-auto pt-[140px]"
    >
      <!-- Form Header -->
      <div class="grid justify-items-center gap-[16px] pb-[50px]">
        <img class="w-[59.2px] h-[40px]" src="@/assets/LOGO-web2.png" alt="" />
        <div class="text-[24px] text-primaryColor">Sign up Your Account</div>
      </div>
      <!-- Form Body -->
      <div>
        <v-form
          v-model="valid"
          fast-fail
          @submit.prevent
          class="space-y-[50px]"
        >
          <div class="w-full">
            <v-text-field
              class="w-[540px] h-[56px]"
              variant="outlined"
              label="User Name"
              :rules="rules.require"
            >
            </v-text-field>
          </div>
          <div class="w-full">
            <v-text-field
              class="w-[540px] h-[56px]"
              variant="outlined"
              label="Email"
              :rules="rules.require"
            >
            </v-text-field>
          </div>
          <div class="w-full">
            <v-text-field
              class="w-[540px] h-[56px]"
              variant="outlined"
              label="Display name"
              :rules="rules.require"
            >
            </v-text-field>
          </div>


          <!-- Role Section -->
          <div class="role-section grid justify-items-center">
            <div class="grid justify-items-center">
              <div class="font-medium text-[20px]">Choose your Role</div>
              <div class="text-[14px]">
                to Continue please your Role on the Project
              </div>
            </div>
            <!-- Role Choosen -->
            <div class="grid grid-cols-2 gap-16">
              <div class="">
                <CustomBtn :img="kuy" :img-text="'Participants'"></CustomBtn>
                <!-- <img src="@/assets/kuy.png"/> -->
                <!-- <v-img
                  src="@/assets/participants_role.png"></v-img> -->
                <!-- <img style="border:1px solid black;border-radius: 15px;" src="//www.html.am/images/image-codes/milford_sound_t.jpg" width="225" height="151" alt="Photo of Milford Sound in New Zealand" /> -->
                <!-- <div>
                    <img src="@/assets/key.png" alt="">
                  </div> -->
              </div>
              <div class="">as</div>
            </div>
          </div>
          <v-btn :disabled="!valid" type="submit"></v-btn>
        </v-form>
      </div>
    </div>
  </div>
</template>

<style>
.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background-color: #b5a6eb;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background-color: white;
}
/* .image-role{
  border:2px solid black;
  border-radius: 15px;
} */

.image-role:hover {
  border: 2px solid;
  border-color: #b5a6eb;
}
</style>
