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
import CustomRolesBtn from "@/components/common/CustomRolesBtn.vue";
import participantImg from "@/assets/participant.png";
import organizationImg from "@/assets/organization.png";
import CustomvBtnPrimary from "@/components/common/CustomvBtn.primary.vue";
import { useRoute,useRouter } from "vue-router";
import TermAndCondition from '@/components/common/TermAndCondition.vue'
import { auth } from '~/restful/Auth.js'

const route = useRoute();
const router = useRouter();

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
// user information
const userEmail = ref(route.params.email);
const username = ref(route.params.username);
const profileImg = ref(route.params.profileImg)
const role = ref('');
const displayName = ref('')

const updatedRole = (value) => {
  role.value = value;
};

// validate form
const valid = ref(true);
const isAgreePolicy = ref(false)

const confirmPolicy = (Boolean) => {
  isAgreePolicy.value = Boolean
}

const signup = async () => {
  let doAuth = await auth(userEmail.value,role.value,displayName.value,profileImg.value)
  console.log(doAuth);
  if(doAuth){
    alert('Your Can Sign In Now')
    router.push({name:'home'})
  }
}

</script>

<template>
  <Navbar></Navbar>
  <div class="w-full grid grid-cols-2">
    <!-- Poster -->
    <div
      class="slide-info bg-gradient-to-b from-[#4520CC] to-[#6A4DD6] mt-[100px]"
    >
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
          <swiper-slide
            v-for="poster in posters"
            :key="poster.id"
            class="pb-[16px]"
          >
            <div class="grid justify-items-center">
              <img :src="poster.photo" alt="" class="" />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <!-- Form -->
    <div
      class="signup-form grid justify-items-center px-[70px] py-[40px] h-screen overflow-auto pt-[140px]"
    >
      <!-- Form Header -->
      <div class="grid justify-items-center gap-[16px] pb-[50px]">
        <img class="w-[59.2px] h-[40px]" src="@/assets/LOGO-web2.png" alt="" />
        <div class="text-[24px] text-primaryColor">Sign up Your Account</div>
      </div>
      <!-- Form Body -->
      <div class="">
        <v-form
          v-model="valid"
          fast-fail
          @submit.prevent
          class="space-y-[30px]"
        >
          <div class="w-full grid justify-items-center">
            <v-text-field
              class="w-[540px] h-[56px] bg-primaryLight text-[18px] text-primaryColor pl-4 rounded-[8px]"
              variant="plain"
              :label="username"
              disabled
            >
            </v-text-field>
          </div>

          <div class="w-full grid justify-items-center">
            <v-text-field
              class="w-[540px] h-[56px] bg-primaryLight text-[18px] text-primaryColor pl-4 rounded-[8px]"
              variant="plain"
              :label="userEmail"
              readonly
            >
            </v-text-field>
          </div>
          <div class="w-full grid justify-items-center">
            <v-text-field
              class="w-[540px] h-[56px]"
              v-model="displayName"
              variant="outlined"
              label="Display name"
              placeholder="Somsri Jaidee..."
              :rules="rules.require"
              hint="คุณสามารถเปลี่ยนได้ในภายหลัง"
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
            <div class="grid grid-cols-2 gap-16 pt-[40px]">
              <div class="">
                <CustomRolesBtn
                  @click="updatedRole('Participants')"
                  v-model="role"
                  :img="participantImg"
                  :img-text="'Participants'"
                ></CustomRolesBtn>
              </div>
              <div class="">
                <CustomRolesBtn
                  @click="updatedRole('Organization')"
                  v-model="role"
                  :img="organizationImg"
                  :img-text="'Organization'"
                ></CustomRolesBtn>
              </div>
            </div>
            <div class="pt-8">
              <div
                v-if="role == 'Participants'"
                class="w-[540px] h-[135px] bg-primaryLight rounded-[16px]"
              >
                <div class="pt-4 space-y-2">
                  <div class="px-8 text-primaryColor text-[14px] font-medium">
                    Participants role
                  </div>
                  <ul
                    class="px-12 list-image-checkmark text-purple400 text-[14px] space-y-[4px]"
                  >
                    <li>
                      เรียกดูกิจกรรมทั้งหมดที่เปิดให้ลงทะเบียน
                      ค้นหากิจกรรมที่คุณสนใจ
                    </li>
                    <li>ลงทะเบียนร่วมกิจกรรมที่ใช่สำหรับคุณ</li>
                    <li>-</li>
                  </ul>
                </div>
              </div>
              <div
                v-else-if="role=='Organization'"
                class="w-[540px] h-[135px] bg-primaryLight rounded-[16px]"
              >
              
                <div class="pt-4 space-y-2">
                  <div class="px-8 text-primaryColor text-[14px] font-medium">
                    Organization role
                  </div>
                  <ul
                    class="px-12 list-image-checkmark text-purple400 text-[14px] space-y-[4px]"
                  >
                    <li>สร้างกิจกรรมในแบบของคุณ เชิญชวนทุกคนเข้าร่วม!</li>
                    <li>อัปเดทข้อมูลกิจกรรมของคุณให้สมบูรณ์แบบ</li>
                    <li>ตรวจสอบรายชื่อผู้ร่วม'กิจกรรม'ของคุณ</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <!-- term and condition -->
          <div class="flex justify-center">
            <div>
                <v-checkbox class="" v-model="isAgreePolicy"> </v-checkbox>
            </div>
            <div class="flex pt-5 space-x-1">
              <div class="text-[14px]">
                You have read and agree to the
              </div>
              <div>
                <v-dialog class="w-2/5">
                      <template v-slot:activator="{ props: activatorProps }">
                        <div v-bind="activatorProps" variant="text" class="cursor-pointer text-primaryColor text-[14px] font-medium">
                          Terms of Use and Privacy Policy.
                        </div>
                      </template>
                      <template v-slot:default="{ isActive }">
                        <v-card title="TERM AND CONDITION">
                          <v-card-text> <TermAndCondition/></v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn text="Close" @click="(isActive.value = false),confirmPolicy(false)">
                            </v-btn>
                            <v-btn
                            text="Confirm"
                            @click="
                            (isActive.value = false),
                            confirmPolicy(true)
                            "
                            >
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
              </div>
            </div>
            
          </div>
          <!-- Craete Button -->
          <div class="">
            <v-btn
            @click="signup()"
            :disabled="!(valid&&isAgreePolicy&&role)" 
            type="submit" 
            class="w-full h-[56px] text-white font-medium text-[18px]" color="#4520CC">
              Create Account
            </v-btn>
            <!-- <CustomvBtnPrimary
          
              :is-valid="valid"
              :isAllowPolicy="isAgreePolicy"
              :selectedRole="role"
              :label="'Create Account'"
              @click="signup()"
            ></CustomvBtnPrimary> -->
            <!-- <v-btn :disabled="!valid" type="submit" class="w-[540px] h-[56px] text-white font-medium text-[18px]" color="#4520CC">Create Account</v-btn> -->
          </div>
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

.v-field--disabled {
  opacity: 100%;
  font-weight: medium;
  pointer-events: none;
}

.v-text-field.v-input_outlined .v-input__slot {
  border: none !important;
}
</style>
