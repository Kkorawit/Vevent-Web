<script setup>
import DateTimeFormat from "@/extend/DateTimeFormat.vue";
import { onBeforeMount, onMounted, ref } from "vue";
import router from "@/plugins/router";
import { rules } from "@/extend/utils.ts";
import Navbar from "@/components/Navbar.vue";
import { useRoute } from 'vue-router';
import { getEventDetailById } from "@/gql/gqlGet.js";

const props = defineProps({
  id: {
    type: String
    // required:true
  },
});

//get event id from router
const id= ref("");
const route = useRoute()

//get event detail
// const eventDetail = ref([]);
// onMounted(async () => {
//   id.value = route.params.id;
//   console.log(id.value);
//   let response = await getEventDetailById(id.value);
//   console.log(response);
//   eventDetail.value = response;
//   console.log(eventDetail.value.title);
  
// });

// demo เพราะ function ข้างบนมัน get eventDetail ค่ามาได้ แต่เอามาโชวน์ไม่ได้
const eventDetail = ref({
  id: "1",
  title: "อาสาเติมสี แต้มฝันให้น้อง ณ โรงเรียนวัดบางในน้อย นครปฐม",
  description:
    "We Volunteer Spirit Thailand ขอเชิญน้องๆร่วมโครงการจิตอาสาเติมสี แต้มฝันให้น้อง ณ โรงเรียนวัดบางในน้อย อ.บางเลน จ.นครปฐม กิจกรรมสร้างสรรค์ดีๆ สำหรับน้องๆ ระดับชั้นมัธยมที่สนใจร่วมกิจกรรมเพื่อเก็บชั่วโมงอาสาและสะสมในแฟ้มประวัติผลงาน (Portfolio)",
  amountReceived: "100",
  category: "Volunteers",
  subCategory: "Social Services",
  startDate: "2023-11-11T09:30:00Z",
  endDate: "2023-11-11T16:30:00Z",
  registerStartDate: "2023-10-10T00:00:00Z",
  registerEndDate: "2023-11-10T23:59:00Z",
  validationType: "CURRENT_GPS",
  validationRules: 10,
  posterImg:
    "https://firebasestorage.googleapis.com/v0/b/vevent-capstone.appspot.com/o/NK-2%2FPoster_image%2Fevent01.png?alt=media&token=6222c4f1-bc33-4246-91e7-59cdda885784",
  createBy: "Organization.032301@gmail.com",
  createDate: "2023-10-09T16:48:00Z",
  updateBy: "Organization.032301@gmail.com",
  updateDate: "2023-10-09T16:48:00Z",
  locationName: "โรงเรียนวัดบางในน้อย อ.บางเลน จ.นครปฐม",
  locationLatitude: 14.1423399808249,
  locationLongitude: 100.116024883473,
  validate_times: null,
  eventStatus: "CO",
});


const newTitle = ref(eventDetail.value.title);
const newDescription = ref(eventDetail.value.description);
const newCategory = ref(eventDetail.value.category);
const newAmountReceived = ref(eventDetail.value.amountReceived);
const newPoster = ref(eventDetail.value.posterImg);
const newValidationType = ref(eventDetail.value.validationType);
const newSubCategory = ref(eventDetail.value.subCategory);
const newRegisStartDate = ref(eventDetail.value.registerStartDate)
const newRegisEndtDate = ref(eventDetail.value.registerEndDate)
const newStartDate = ref(eventDetail.value.startDate)
const newEndate = ref(eventDetail.value.endDate)


//poster image input
const posterStatus = ref("");
const images = ref([]);
const isDraging = ref(false);

const selectFile = () => {
  const fileInput = document.getElementById("fileInput");
  if (fileInput) {
    fileInput.click();
  } else {
    // Handle the case where the element is not found
    console.error("File input element not found!");
  }
};

const onFileSelect = (event) => {
  const files = event.target.files;
  if (files.length != 0) {
    console.log("file != 0");
    for (let i = 0; i < files.length; i++) {
      console.log("loop file");
      const file = files[i];
      const isImage = files[i].type.split("/")[0];
      if (isImage == "image") {
        //check type
        console.log("check type");

        const imageUrl = URL.createObjectURL(file);
        images.value.push({ name: file.name, url: imageUrl });
        newPoster.value = imageUrl;
        console.log(newPoster.value);
        posterStatus.value = "addImg";
      } else if (isImage != "image") {
        console.error("Only image files are allowed!");
      }
      console.log(images.value);
    }
  }
};

const deleteImage = () => {
  newPoster.value = "";
  posterStatus.value = "delete";
};

const onDragover = (event) => {
  event.preventDefault();
  isDraging.value = true;
  event.dataTransfer.dropEffect = "copy";
};

const onDragleave = (event) => {
  event.preventDefault();
  isDraging.value = false;
};

const onDrop = (event) => {
  event.preventDefault();
  isDraging.value = false;
  const files = event.dataTransfer.files;
  for (let i = 0; i < files.length; i++) {
    console.log("loop file");
    const file = files[i];
    const isImage = files[i].type.split("/")[0];
    if (isImage == "image") {
      //check type
      console.log("check type");
      if (images.value.some((e) => e.name === file.name)) {
        // Skip adding duplicate files
        console.warn("A file with the same name already exists:", file.name);
      } else {
        const imageUrl = URL.createObjectURL(file);
        images.value.push({ name: file.name, url: imageUrl });
        newPoster.value = imageUrl;
        console.log(newPoster.value);
        posterStatus.value = "addImg";
      }
    } else if (isImage != "image") {
      console.error("Only image files are allowed!");
    }
    console.log(images.value);
  }
};


const updateEventDetail = () =>{
  // code update event detail

}

const changePage = (p) => {
  console.log(p);
  if (p == "home") {
    router.push({ name: "home" });
  } else if (p == "eventDetail") {
    router.push({name: "eventDetail" , params:{id:id.value}});
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
            >
            <button
              @click="changePage('eventDetail')"
              class="hover:text-primaryColor hover:underline hover:underline-offset-4"
            >
              Event Deatail
            </button>
            > <span >Edit Event</span></span
          >
          <div class="text-[32px]">แก้ไขข้อมูลกิจกรรม</div>
        </div>
        <hr />
        <!-- form -->
        <v-form
          fast-fail
          @submit.prevent
          class="mt-0"
        >
          <div class="flex justify-between items-center py-[40px]">
            <div class="text-[24px] font-bold ">
              รายละเอียดกิจกรรม
            </div>
            <div>
              <v-btn @click="updateEventDetail"
                class="custom-rounded-btn"
                color="#4520CC"
                type="submit"
                style="height: 56px;"
              >
                Update
              </v-btn>
            </div>
          </div>
          <!-- fill -->
          <div class="grid grid-cols-2 justify-items-stretch">
            <!-- left form -->
            <div class="justify-self-start space-y-[24px]">
              <!-- หัวข้อกิจกรรม -->
              <div>
                <v-text-field clearable
                  class="custom-outline-border w-[620px]"
                  variant="outlined"
                  color="#4520CC"
                  bg-color="#ECE9FA"
                  :label="`หัวข้อกิจกรรม`"
                  v-model="newTitle"
                  :rules="rules.require"
                  :width="`20px`"
                ></v-text-field>
              </div>
              <!-- รายละเอียด -->
              <div>
                <v-textarea clearable
                bg-color="#ECE9FA"
                  variant="outlined"
                  color="#4520CC"
                  class="w-[ุ620px] h-[166px]"
                  label="รายละเอียดกิจกรรม"
                  v-model="newDescription"
                  :rules="rules.description"
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
                      v-model="newRegisStartDate"               
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
                      v-model="newRegisEndtDate"
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
                      placeholder="วันเปิดรับสมัคร"
                      dark="true"
                      v-model="newStartDate"
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
                      v-model="newEndate"
                    ></VueDatePicker>
                  </div>
                </div>
              </div>
              <!-- Drag & Drop Images -->
              <div class="detail-section">
                <label for="description">รูปภาพกิจกรรม <span>*</span></label>
                <div class="container-poster" v-if="newPoster != ''">
                  <div class="image">
                    <span
                      class="delete bg-red-200 opacity-80 text-red-900 w-[46px] h-[46px] rounded-[16px] grid place-content-center"
                      @click="deleteImage"
                      style="cursor: pointer"
                      >&times;</span
                    >
                    <img :src="newPoster" alt="choose image" />
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
                <v-text-field clearable 
                bg-color="#ECE9FA"
                  variant="outlined"
                  color="#4520CC"
                  class="w-[334px] h-[56px]"
                  :label="`หมวดหมู่`"
                  :width="`20px`"
                  :rules="rules.require"
                  v-model="newCategory"
                ></v-text-field>
              </div>
              <!-- หมวดหมู่ย่อย -->
              <div>
                <v-text-field clearable 
                bg-color="#ECE9FA"
                  variant="outlined"
                  color="#4520CC"
                  class="w-[334px] h-[56px]"
                  :label="`หมวดหมู่ย่อย`"
                  :prepend-inner-icon="`mdi-magnify`"
                  :width="`20px`"
                  :rules="rules.require"
                  v-model="newSubCategory"

                ></v-text-field>
              </div>
              <!-- จำนวนผู้เข้าร่วม -->
              <div>
                <v-text-field
                variant="outlined"
                  bg-color="#ECE9FA"
                  color="#4520CC"
                  type="number"
                  class="w-[334px] h-[56px] bg-[primaryLight]"
                  label="จำนวนผู้เข้าร่วม"
                  :rules="rules.require"
                  v-model="eventDetail.amountReceived"
                  append-inner
                  hide-spin-buttons
                >
                  <template #append-inner>
                    <v-icon class="text-primaryColor">mdi-minus</v-icon>
                    <v-icon class="text-primaryColor">mdi-plus</v-icon>
                  </template>
                </v-text-field>
              </div>
              <div class="pt-2 rounded-[8px]">
                <v-select
                  class="w-[334px] h-[56px] rounded-[6px]"
                  variant="outlined"
                  color="#4520CC"
                  label="ตรวจสอบการเข้าร่วมโดย"
                  :items="['QR Code', 'Step Counter', 'GPS', 'QR Code&GPS']"
                  bg-color="#ECE9FA"
                  :rules="rules.require"
                  v-model="newValidationType"
                >
                </v-select>
              </div>
              <!-- <div>
                <v-select
                  class="w-[334px] h-[56px] rounded-[6px]"
                  variant="outlined"
                  label="ตรวจสอบการเข้าร่วมโดย"
                  bg-color="#ECE9FA"
                >
                </v-select>
              </div> -->
            </div>
          </div>
        </v-form>
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
  --dp-background-color: #ece9fa;
  --dp-text-color: #1b1717;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #005cb2;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #ffffff;
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
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}
.dp__input {
    /* line-height: 50px; */
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
  border-radius: 8px;
  outline-color: #dad2f5; /*กรอบ image */
  outline-style: dashed;
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
