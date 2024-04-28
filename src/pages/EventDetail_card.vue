<script setup>
import router from "@/plugins/router";
import { getEventDetailById } from "@/gql/gqlGet.js";
import { onMounted, ref, watch } from "vue";
import { rules } from "@/extend/utils.ts";
import Navbar from "@/components/Navbar.vue";
import Participants from "@/pages/Participants.vue";
import { useRoute } from "vue-router";


//get event id from router
const id = ref();
const route = useRoute();
const RegisDate = ref();
//get event detail
const eventDetail = ref([]);

// participants
onMounted(async () => {
  id.value = route.params.id;
  console.log(id.value);
  let response = await getEventDetailById(id.value);
  console.log(response);
  eventDetail.value = response;
  console.log(eventDetail.value.title);
  window.reload();
});



const state = ref("eventDetail");

const changePage = (page) => {
  console.log(page);
  if (page == "home") {
    router.push({ name: "home" });
  } else if (page == "eventDetail") {
    state.value = page;
  } else if (page == "participants") {
    state.value = page;
    console.log(page);
  } else if (page == "editEvent") {
    router.push({ name: "editEvent", params: { id: id.value } });
  }
};


</script>
<template>
  <Navbar></Navbar>
  <div class="grid grid-cols-12 justify-items-center">
    <div
      class="col-span-8 col-start-3 w-[1080px] bg-white shadow-xl rounded-b-[16px]"
    >
      <div class="p-[40px] space-y-[40px]">
        <!-- header -->
        <div>
          <span class="text-[14px]">
            <button
              @click="changePage('home')"
              class="hover:text-primaryColor hover:underline hover:underline-offset-4"
            >
              Event
            </button>
            > <span v-if="state == 'eventDetail'">Event Detail</span>
            <span v-if="state != 'eventDetail'">Particiapnts</span></span
          >
          <div class="text-[32px]">{{ eventDetail.title }}</div>
        </div>
        <hr />
        <!-- menu bar -->
        <div>
          <ul class="flex justify-center">
            <li
              @click="changePage('eventDetail')"
              class="w-[110px] text-gray-300 hover:text-primaryColor text-center"
            >
              <button
                :class="
                  state == 'eventDetail'
                    ? 'underline underline-offset-8 text-medium text-primaryColor '
                    : ' '
                "
              >
                Event Detail
              </button>
            </li>
            <li class="text-gray-400">|</li>
            <li
              @click="changePage('participants')"
              class="w-[110px] text-gray-300 hover:text-primaryColor text-center"
            >
              <button
                :class="
                  state == 'participants'
                    ? 'underline underline-offset-8 text-medium text-primaryColor'
                    : ' '
                "
              >
                Participants
              </button>
            </li>
          </ul>
        </div>
        <!-- form -->
        <v-form
          v-if="state == 'eventDetail'"
          fast-fail
          @submit.prevent
          class="mt-0"
        >
          <div class="flex justify-between items-center py-[40px]">
            <div class="text-[24px] font-bold">รายละเอียดกิจกรรม</div>
            <div>
              <v-btn
                @click="changePage('editEvent')"
                class="custom-rounded-btn"
                color="#4520CC"
                type="submit"
                style="height: 56px; width: 56px"
              >
                <img
                  src="@/assets/Edit.png"
                  class="w-[32px] h-[32px]"
                  alt="edit"
                />
              </v-btn>
            </div>
          </div>
          <!-- fill -->
          <div class="grid grid-cols-2 justify-items-stretch">
            <!-- left form -->
            <div class="justify-self-start space-y-[24px]">
              <!-- หัวข้อกิจกรรม -->
              <div>
                <v-text-field
                  class="cursor-point custom-outline-border w-[620px]"
                  variant="outlined"
                  :label="`หัวข้อกิจกรรม`"
                  v-model="eventDetail.title"
                  :rules="rules.require"
                  :width="`20px`"
                  readonly
                ></v-text-field>
              </div>
              <!-- รายละเอียด -->
              <div>
                <v-textarea
                  variant="outlined"
                  class="w-[ุ620px] h-[166px]"
                  label="รายละเอียดกิจกรรม"
                  v-model="eventDetail.description"
                  :rules="rules.require"
                  readonly
                  cursor-none
                ></v-textarea>
              </div>
              <!-- วันที่เปิด - ปิด รับสมัคร -->
              <div class="flex justify-center mt-[8px] space-x-2 pb-[8px]">
                <div>
                  <label>วันที่เปิดรับสมัคร </label>
                  <div class="w-[300px] mt-[8px]">
                    <VueDatePicker
                      placeholder="วันเปิดรับสมัคร"
                      dark="true"
                      :timezone="'UTC'"
                      v-model="eventDetail.registerStartDate"
                      readonly
                      cursor-none
                    ></VueDatePicker>
                  </div>
                </div>
                <div class="pt-[50px]">-</div>
                <div>
                  <label>วันที่ปิดรับสมัคร </label>
                  <div class="w-[300px] mt-[8px]">
                    <VueDatePicker
                      placeholder="วันปิดรับสมัคร"
                      dark="true"
                      :timezone="'UTC'"
                      v-model="eventDetail.registerEndDate"
                      readonly
                      cursor-none
                    ></VueDatePicker>
                  </div>
                </div>
              </div>
              <!-- วันที่เปิด - ปิด กิจกรรม -->
              <div class="flex justify-center mt-[8px] space-x-2 pb-[8px]">
                <div>
                  <label>วันเริ่มกิจกรรม </label>
                  <div class="w-[300px] mt-[8px]">
                    <VueDatePicker
                      placeholder="วันเริ่มกิจกรรม"
                      dark="true"
                      v-model="eventDetail.startDate"
                      :timezone="'UTC'"
                      readonly
                      cursor-none
                    ></VueDatePicker>
                  </div>
                </div>
                <div class="pt-[50px]">-</div>
                <div>
                  <label>วันจบกิจกรรม </label>
                  <div class="w-[300px] mt-[8px]">
                    <VueDatePicker
                      placeholder="วันปิดรับสมัคร"
                      dark="true"
                      :timezone="'UTC'"
                      v-model="eventDetail.endDate"
                      readonly
                      cursor-none
                    ></VueDatePicker>
                  </div>
                </div>
              </div>
              <!-- Drag & Drop Images -->
              <div class="detail-section">
                <label for="description">รูปภาพกิจกรรม </label>
                <div
                  class="container-poster"
                  v-if="eventDetail.posterImg != ''"
                >
                  <div class="image">
                    <img :src="eventDetail.posterImg" alt="choose image" />
                  </div>
                </div>
                <div v-else class="card bg-primaryLight">
                  <div
                    class="drag-area"
                    @dragover.prevent="onDragover"
                    @dragleave.prevent="onDragleave"
                    @drop.prevent="onDrop"
                  >
                    <span
                      v-if="isDraging != true"
                      class="grid justify-items-center"
                    >
                      <img
                        src="@/assets/gallery.png"
                        class="w-[96x] h-[96px] mb-4"
                        alt="image"
                      />
                      <div class="flex text-primaryColor">
                        Drag & drop image here or
                        <span
                          class="select text-primaryColor"
                          role="button"
                          @click="selectFile"
                          ><b><u>choose </u> </b></span
                        >
                      </div>
                    </span>
                    <div v-else class="select">Drop image here</div>
                    <input
                      id="fileInput"
                      name="file"
                      type="file"
                      class="file"
                      ref="fileInput"
                      style="display: none"
                      @change="onFileSelect"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- right form -->
            <div class="justify-self-end space-y-[48px]">
              <!-- หมวดหมู่ -->
              <div>
                <v-text-field
                  variant="outlined"
                  class="w-[334px] h-[56px]"
                  :label="`หมวดหมู่`"
                  :width="`20px`"
                  v-model="eventDetail.category"
                  readonly
                  cursor-none
                ></v-text-field>
              </div>
              <!-- หมวดหมู่ย่อย -->
              <div>
                <v-text-field
                  variant="outlined"
                  color="#4520CC"
                  class="w-[334px] h-[56px]"
                  :label="`หมวดหมู่ย่อย`"
                  :prepend-inner-icon="`mdi-magnify`"
                  :width="`20px`"
                  v-model="eventDetail.subCategory"
                  readonly
                  cursor-none
                ></v-text-field>
              </div>
              <!-- จำนวนผู้เข้าร่วม -->
              <div>
                <v-text-field
                  variant="outlined"
                  type="number"
                  class="w-[334px] h-[56px] bg-[primaryLight]"
                  label="จำนวนผู้เข้าร่วม"
                  append-inner
                  hide-spin-buttons
                  v-model="eventDetail.amountReceived"
                  readonly
                  cursor-none
                >
                </v-text-field>
              </div>
              <!-- locationName -->
              <div
              >
                <v-text-field
                  class="pt-6"
                  variant="outlined"
                  label="สถานที่จัดกิจกรรม"
                  v-model="eventDetail.locationName"
                  :rules="rules.require"
                  readonly
                  cursor-none
                  hide-selected
                >
                </v-text-field>
              </div>
              <!-- validate type -->
              <div>
                <v-text-field
                  class="w-[334px] h-[56px] rounded-[6px]"
                  variant="outlined"
                  label="ตรวจสอบการเข้าร่วมโดย"
                  v-model="eventDetail.validationType"
                  readonly
                  cursor-none
                  hide-selected
                >
                </v-text-field>
              </div>
            </div>
          </div>
        </v-form>
        <Participants
        :eid="id"
          v-if="state == 'participants'"
        ></Participants>
      </div>
    </div>
  </div>
</template>
<style scoped>
.custom-rounded-btn {
  border-radius: 16px;
}

.dp__theme_dark {
  --dp-input-padding: 16px; /*input high*/
  --dp-background-color: #ffffff; /*bg color*/
  --dp-text-color: #1b1717;
  /* --dp-hover-color: #484848;
  --dp-hover-text-color: #fff; */
  /* --dp-hover-icon-color: #959595; */
  --dp-primary-color: #425f7b;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #aaaeb7; /*border color*/
  --dp-menu-border-color: #ffffff;
  /* --dp-border-color-hover: #aaaeb7; */
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  /* --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff); */
}

.dp__input {
  /* line-height: 50px !important; */
  height: 100%;
}
.v-field {
  border-radius: 8px !important;
}

.poster-img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.button-posterImg {
  display: grid;
  grid-template-columns: auto auto;
  place-content: end space-between;
}

.button-posterImg button {
  width: max-content;
  padding-left: 8px;
  padding-right: 8px;
  height: 40px;
  border: 1.5px solid #d1d1d1; /*กรอบ image */
  background-color: #ffffff;
}

.card {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 16px;
}

.card,
.top {
  text-align: center;
}

.card p {
  font-weight: bold;
  color: #4520cc;
}

.card button {
  outline: 0;
  border: 0;
  color: #ffffff;
  border-radius: 4px;
  font-weight: 400;
  width: 100%;
  background-color: #4520cc;
  place-content: center;
}

.drag-area {
  height: 258.33px;
  border-radius: 8px;
  border: 2px dashed #dad2f5;
  color: #d1d1d1;
  /* justify-content: center;
  align-items: center; */
  display: grid;
  place-items: center;
  -webkit-user-select: none;
}

.select {
  color: #4520cc;
  margin-left: 8px;
  cursor: pointer;
  transition: 0.4s;
}

.select:hover {
  opacity: 0.6;
}

.container-poster {
  width: 100%;
  height: 258.33px;
  overflow: hidden;
  /* display: flex;
  justify-content: flex-start; */
  align-items: center;
  flex-wrap: wrap;
  /* max-height: 360px; */
  position: relative;
  /* border-radius: 8px;
  outline-color: #dad2f5; 
  outline-style: dashed; */
  border-radius: 8px;
  margin-top: 16px;
}

.image img {
  /* margin-top: -8px; */
  width: 100%;
  height: auto;
  /* max-height: 210px; */
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
}

.image span {
  position: absolute;
  top: 16px;
  right: 16px;
  font-size: 20px;
}

.image span:hover {
  transform: scale(1.2);
  transition: transform 0.3s ease-in-out;
}
</style>
