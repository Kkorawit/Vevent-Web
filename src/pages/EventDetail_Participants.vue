<script setup>
import Navbar from "@/components/Navbar.vue";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import moment from "moment-timezone";
import { getEventDetailById } from "@/gql/gqlGet.js";
import { useRoute } from "vue-router";
import { bookEventById } from "~/restful/Eventapi";
import Map from "../components/common/Map.vue";

const email = ref(localStorage.getItem("email"));

const eid = ref();
//get event detail
const eventDetail = ref();

// for loop left form
const detailLeft = ref();

const route = useRoute();

onBeforeMount(async () => {
  eid.value = route.params.id;

  let response = await getEventDetailById(eid.value);
  console.log(response);
  eventDetail.value = response;

  detailLeft.value = [
    {
      titile: "วันที่จัดกิจกรรม",
      detail: moment(eventDetail.value.startDate).format("MM/DD/YYYY HH:mm"),
    },
    {
      titile: "วันที่รับสมัครวันสุดท้าย",
      detail: moment(eventDetail.value.registerEndDate).format(
        "MM/DD/YYYY HH:mm"
      ),
    },
    { titile: "จำนวนที่เปิดรับ", detail: eventDetail.value.amountReceived },
    { titile: "ค่าใช้จ่าย", detail: "ไม่มีค่าใช้จ่าย" },
    { titile: "จัดโดย", detail: eventDetail.value.createBy },
  ];
});
</script>

<template>
  <Navbar></Navbar>
  <div class="grid grid-cols-12 justify-items-center">
    <div
      class="col-span-8 col-start-3 w-[1080px] bg-white pb-[80px] shadow-xl rounded-b-[16px]"
    >
      <!-- image poster -->
      <img
        class="object-cover object-center w-full h-[450px]"
        :src="eventDetail.posterImg"
        alt="poster"
      />
      <!-- header -->
      <div class="grid place-content-center p-[56px]">
        <div
          class="text-[14px] text-center mb-[16px] font-semibold text-primaryColor"
        >
          {{ eventDetail.category }} <span>/</span>
          {{ eventDetail.subCategory }}
        </div>
        <div class="text-[48px] w-[840px] text-center text-wrap">
          {{ eventDetail.title }}
        </div>
      </div>
      <!-- detail -->
      <div class="flex justify-center">
        <div class="grid grid-cols-2 justify-items-stretch w-[840px]">
          <div
            class="grid col-span-2 text-[24px] text-center text-primaryColor font-semibold mb-[24px]"
          >
            รายละเอียดกิจกรรม
          </div>
          <!-- left -->
          <div class="justify-self-start space-y-[24px]">
            <v-list lines="three">
              <v-list-item v-for="(item, index) in detailLeft" :key="index">
                <v-list-item-title>{{ item.titile }}</v-list-item-title>
                <v-list-item-subtitle>{{ item.detail }}</v-list-item-subtitle>
              </v-list-item>
              <!-- location because have map -->
              <div>
                <v-list-item>
                  <v-list-item-title>สถานที่จัดกิจกรรม</v-list-item-title>
                  <v-list-item-subtitle>{{
                    eventDetail.locationName
                  }}</v-list-item-subtitle>
                </v-list-item>
                <!-- map -->
                <Map :latitude="eventDetail.locationLatitude" :longitude="eventDetail.locationLongitude" :state="'details'"></Map>
              </div>
            </v-list>
          </div>
          <!-- right -->
          <div class="justify-self-start space-y-[24px]">
            <v-list lines="three">
              <v-list-item>
                <v-list-item-title>คำอธิบาย</v-list-item-title>
                <v-list-item-subtitle>{{
                  eventDetail.description
                }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
            <hr />
            <div class="flex justify-start">
              <!-- booking Event -->
              <v-dialog>
                <template v-slot:activator="{ props: activatorProps }">
                  <v-btn
                    class="text-[16px] text-white rounded-[8px] mr-[8px]"
                    v-bind="activatorProps"
                    style="
                      background-color: #4520cc;
                      width: 240px;
                      height: 48px;
                      border-radius: 8px;
                    "
                  >
                    Book Now!
                  </v-btn>
                </template>
                <!-- pop up booking -->
                <template v-slot:default="{ isActive }">
                  <v-card class="text-center">
                    <div class="w-full flex justify-center pt-[40px] pb-[24px]">
                      <img
                        src="@/assets/bookingImg.png"
                        width="413"
                        height="340"
                        alt="icon"
                      />
                    </div>
                    <v-card-text class="-my-[8px]"
                      >You're registersed for</v-card-text
                    >
                    <v-card-title
                      style="
                        font-size: 24px;
                        padding-left: 80px;
                        padding-right: 80px;
                      "
                      class="text-wrap"
                      >{{ eventDetail.title }}</v-card-title
                    >
                    <v-card-text
                      style="
                        padding-bottom: 40px;
                        padding-top: 0px;
                        padding-left: 80px;
                        padding-right: 80px;
                      "
                    >
                      Email: <span class="text-primaryColor">{{ email }}</span>
                    </v-card-text>
                    <v-card-actions
                      style="
                        padding-bottom: 24px;
                        padding-top: 0;
                        padding-left: 80px;
                        padding-right: 80px;
                      "
                    >
                      <v-spacer></v-spacer>
                      <div class="w-full flex justify-stretch gap-[24px]">
                        <v-btn
                          class="flex-grow-1"
                          style="
                            background-color: #ececec;
                            color: #515151;
                            border-radius: 8px;
                            height: 48px;
                          "
                          text="Cancel"
                          @click="isActive.value = false"
                        >
                        </v-btn>
                        <v-btn
                          class="flex-grow-1"
                          style="
                            background-color: #4520cc;
                            color: white;
                            border-radius: 8px;
                            height: 48px;
                          "
                          text="Confirm"
                          @click="
                            (isActive.value = false),
                              bookEventById(eventDetail.id)
                          "
                        >
                        </v-btn>
                      </div>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
              
              <!-- old button -->
              <!-- <button
              @click="bookEventById(eventDetail.id)"
                class="bg-primaryColor font-semibold text-[16px] text-white w-[240px] h-[48px] rounded-[8px] mr-[8px]"
              >
                Book Now!!
              </button> -->
              <!-- share button -->
              <button
                class="bg-primaryLight text-bold text-[16px] text-white px-[16px] h-[48px] rounded-[8px]"
              >
                <img
                  src="@/assets/Share.png"
                  width="18"
                  height="18"
                  alt="share"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- กิจกรรมอื่นๆ -->
  <!-- <div class="grid grid-cols-12 justify-items-center mt-[16px]">
    <div
      class="col-span-8 col-start-3 w-[1080px] bg-white py-[40px] shadow-xl rounded-[16px]"
    >
      <div class="text-[24px] text-center text-primaryColor font-semibold pb-[40px]">
        กิจกรรมอื่นๆ
      </div>
      <EventCard :eventList="allEvents" :format="2"></EventCard>
    </div>
  </div> -->
</template>
<style>
.v-list-item--density-default.v-list-item--three-line {
  min-height: 88px;
  padding: 0px;
}

.v-dialog > .v-overlay__content {
  width: auto !important;
}

/* gap buton right */
.v-card-actions .v-btn ~ .v-btn:not(.v-btn-toggle .v-btn) {
  margin-inline-start: 0;
}

.v-dialog > .v-overlay__content > .v-card,
.v-dialog > .v-overlay__content > .v-sheet,
.v-dialog > .v-overlay__content > form > .v-card,
.v-dialog > .v-overlay__content > form > .v-sheet {
  --v-scrollbar-offset: 0px;
  border-radius: 16px;
  width: 760px;
}

.v-list-item-title {
  font-size: 18px;
  font-weight: 400;
  margin-bottom: 8px;
  color: #4520cc;
}

.v-list-item--three-line .v-list-item-subtitle {
  font-size: 16px;
  height: 100%;
  line-height: 1.4em;
  -webkit-line-clamp: 50;
}
</style>
