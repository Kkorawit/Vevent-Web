<script setup>
import DateTimeFormat from "@/extend/DateTimeFormat.vue";
import { onBeforeMount, onMounted, ref, watchEffect } from "vue";
import router from "@/plugins/router";
import { rules } from "@/extend/utils.ts";
import Navbar from "@/components/Navbar.vue";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { getEventDetailById } from "@/gql/gqlGet.js";
import Map from "@/components/common/Map.vue";
import { nearbyMarkers } from "@/extend/mapStore";
import { editEventById } from "~/restful/Eventapi.js";
defineEmits(["leave", "close"]);

//get event id from router
const id = ref(0);
const route = useRoute();

//get event detail
const eventDetail = ref({
  title: "",
  description: "",
  amountReceived: "",
  category: "",
  subCategory: "",
  startDate: "",
  endDate: "",
  registerStartDate: "",
  registerEndDate: "",
  validationType: "",
  validationRules: "",
  posterImg: "",
  locationName: "",
  locationLatitude: "",
  locationLongitude: "",
});
const newEvent = ref({
  newTitle: "",
  newDescription: "",
  newDmountReceived: "",
  newCategory: "",
  newSubCategory: "",
  newStartDate: "",
  newEndDate: "",
  newRegisterStartDate: "",
  newRegisterEndDate: "",
  newValidationType: "",
  newValidationRules: "",
  newPosterImg: "",
  newLocationName: "",
  newLocationLatitude: "",
  newLocationLongitude: "",
});
//new event detail
const threeDayAfter = computed(()=>{
  const today = new Date();
      today.setDate(today.getDate() + 3);
      return today.toISOString().split('T')[0];
})
//map details
const isOnline = ref(true);
const location = ref({
  locationName: isOnline.value ? "Online" : eventDetail.value.locationName,
  locationLatitude: null,
  locationLongitude: null,
});

onMounted(async () => {
  id.value = route.params.id;
  console.log(id.value);
  let response = await getEventDetailById(id.value);
  console.log(response);
  eventDetail.value = response;
  //   eventDetail.value = {
  //   title: response.title,
  //   description: response.description,
  //   amountReceived: response.amountReceived,
  //   category: response.category,
  //   subCategory: response.subCategory,
  //   startDate: response.startDate,
  //   endDate: response.endDate,
  //   registerStartDate: response.registerStartDate,
  //   registerEndDate: response.registerEndDate,
  //   validationType: response.validationType,
  //   validationRules: response.validationRules,
  //   posterImg: response.posterImg,
  //   locationName: response.locationName,
  //   locationLatitude: response.locationLatitude,
  //   locationLongitude: response.locationLongitude,
  // };

  console.log(eventDetail.value);
  response.locationLatitude && response.locationLongitude
    ? (isOnline.value = false)
    : (isOnline.value = true);
  newPoster.value = eventDetail.value.posterImg;
  newTitle.value = eventDetail.value.title;
  newDescription.value = eventDetail.value.description;
  newCategory.value = eventDetail.value.category;
  newSubCategory.value = eventDetail.value.subCategory;
  newAmountReceived.value = eventDetail.value.amountReceived;
  newValidationType.value = eventDetail.value.validationType;
  newValidationRules.value = eventDetail.value.validationRules;
  newRegisEndDate.value = eventDetail.value.registerEndDate;
  newRegisStartDate.value = eventDetail.value.registerStartDate;
  newStartDate.value = eventDetail.value.startDate;
  newEndate.value = eventDetail.value.endDate;
  location.value.locationName = eventDetail.value.locationName;
  location.value.locationLatitude = eventDetail.value.locationLatitude;
  location.value.locationLongitude = eventDetail.value.locationLongitude;
});

const newTitle = ref("");
const newDescription = ref("");
const newCategory = ref("");
const newSubCategory = ref("");
const newAmountReceived = ref("");
const newPoster = ref("");
const newValidationType = ref("");
const newValidationRules = ref("");
const newRegisStartDate = ref("");
const newRegisEndDate = ref("");
const newStartDate = ref("");
const newEndate = ref("");
const onlineValidate = [
  { name: "Qr Code", value: "QR_CODE" },
  { name: "Step Counter", value: "STEP_COUNTER" },
];
const onsiteValidate = [
  { name: "GPS", value: "CURRENT_GPS" },
  { name: "Qr Code & GPS", value: "QR_CODE,CURRENT_GPS" },
  { name: "Step Counter", value: "STEP_COUNTER" },
];

watchEffect(() => {
  // Assign Value


  newEvent.value = {
    id: id.value,
    newTitle: newTitle.value,
    newDescription: newDescription.value,
    newAmountReceived: newAmountReceived.value,
    newCategory: newCategory.value,
    newSubCategory: newSubCategory.value,
    newStartDate: newStartDate.value,
    newEndDate: newEndate.value,
    newRegisterStartDate: newRegisStartDate.value,
    newRegisterEndDate: newRegisEndDate.value,
    newValidationType: newValidationType.value,
    newValidationRules: newValidationRules.value,
    newPosterImg: newPoster.value,
    newLocationName: location.value.locationName,
    newLocationLatitude: nearbyMarkers.value[0]?.latitude,
    newLocationLongitude: nearbyMarkers.value[0]?.longitude,
  };
});

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

const updateEventDetail = async () => {
  console.log(location.value);
  console.log(nearbyMarkers.value);
  console.log("update event func");
  console.log(newEvent.value);
  let response = await editEventById(newEvent.value)
  if(response.status==201){
    // alert(response.data);
    successfull.value = true; //popup success
    setTimeout(() => {
      successfull.value = false;
    }, 2000);
    nearbyMarkers.value=[]
    router.push({ name: "eventDetail", params: {id:id.value} });
  }else{
    somethingWrong.value = true //open popup something wrong
  }
  // code update event detail
};

const changePage = (p) => {
  console.log(p);
  if (p == "home") {
    router.push({ name: "home" });
  } else if (p == "eventDetail") {
    router.push({ name: "eventDetail", params: { id: id.value } });
  }
};

const typeSwitch = (type) => {
  isOnline.value = type;

  isOnline.value? (location.value.locationName='Online', 
            location.value.locationLatitude=null,
            location.value.locationLongitude=null)
          : (location.value.locationName=eventDetail.value.locationName,
            location.value.locationLatitude=nearbyMarkers.value[0].latitude,
          location.value.locationLongitude=nearbyMarkers.value[0].longitude)
};

const updateValue = (rules, action) => {
  console.log(newValidationRules.value);
  console.log(newAmountReceived.value);
  console.log("Updating");
  if (rules == "validationRules") {
    switch (action) {
      case "minus":
        newValidationRules.value > 0
          ? newValidationRules.value--
          : alert("Can't fill least than 0");
        break;
      case "plus":
        newValidationRules.value++;
        break;
    }
  } else if (rules == "amountReceived") {
    switch (action) {
      case "minus":
        newAmountReceived.value > 0
          ? newAmountReceived.value--
          : alert("Can't fill least than 0");
        break;
      case "plus":
        newAmountReceived.value++;
        break;
    }
  }
};

const handleLocationName = (newName) => {
  location.value.locationName = newName;
};

const successfull = ref(false); //popup success
const somethingWrong = ref(false); //show popup when fetch false
const updateDialogVisible = ref(false); //show popup confirm
const openUpdateDialog = () => {
  updateDialogVisible.value = true;
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
            > <span>Edit Event</span></span
          >
          <div class="text-[32px]">แก้ไขข้อมูลกิจกรรม</div>
        </div>
        <hr />
        <!-- form -->
        <v-form fast-fail @submit.prevent class="mt-0">
          <div class="flex justify-between items-center py-[40px]">
            <div class="text-[24px] font-bold">รายละเอียดกิจกรรม</div>
            <!-- button on form -->
            <div>
              <v-btn
                @click="openUpdateDialog()"
                class="custom-rounded-btn"
                color="#4520CC"
                type="submit"
                style="height: 56px; width: 120px"
              >
                Save
              </v-btn>

              <!-- pop up update -->
              <v-dialog
                v-model="updateDialogVisible"
                class="w-[400px]"
                style="border-radius: 24px"
              >
                <template v-slot:default="{ isActive }">
                  <v-card class="text-center">
                    <div class="w-full flex justify-center py-[24px]">
                      <!-- <img
                        src="@/assets/alert_delete.png"
                        alt="icon"
                        class="w-[56px] h-[56px]"
                      /> -->
                    </div>
                    <v-card-title class="-my-[16px]" style="font-weight: 600"
                      >Comfirmation</v-card-title
                    >
                    <v-card-text
                      style="padding-top: 16px; padding-bottom: 24px"
                    >
                      Are you sure you want to update the data?
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
                            background-color: #ececec;
                            color: #515151;
                            border-radius: 8px;
                            height: 40px;
                          "
                          text="Cancel"
                          @click="isActive.value = false"
                        >
                        </v-btn>
                        <v-btn
                          class="flex-grow-1"
                          style="
                            background-color: #2563eb;
                            color: white;
                            border-radius: 8px;
                            height: 40px;
                          "
                          text="Save"
                          @click="
                            (isActive.value = false,updateEventDetail())
                          "
                        >
                        </v-btn>
                      </div>
                    </v-card-actions>
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
                    <v-card-text
                      style="padding-top: 16px; padding-bottom: 24px"
                    >
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
                          @click="
                            (isActive.value = false)
                          "
                        >
                        </v-btn>
                      </div>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>

              <!-- pop up success  -->
              <v-dialog v-model="successfull" style="border-radius: 24px">
                <template>
                  <v-card class="text-center">
                    <div class="w-full flex justify-center py-[24px]">
                      <img
                        src="@/assets/bookingImg_suc.png"
                        width="413"
                        height="340"
                        alt="icon"
                      />
                    </div>
                    <v-card-title class="-my-[16px]" style="font-weight: 600"
                      >Booking Confirmed!</v-card-title
                    >
                    <v-card-text
                      style="padding-top: 16px; padding-bottom: 40px"
                    >
                      We look forward to seeing you!
                    </v-card-text>
                  </v-card>
                </template>
              </v-dialog>
            </div>

            <!-- <v-btn
                @click="updateEventDetail"
                class="custom-rounded-btn"
                color="#4520CC"
                type="submit"
                style="height: 56px"
              >
                Update
              </v-btn> -->
          </div>
          <!-- fill -->
          <div class="grid grid-cols-2 justify-items-stretch">
            <!-- left form -->
            <div class="justify-self-start space-y-[24px]">
              <!-- หัวข้อกิจกรรม -->
              <div>
                <v-text-field
                  clearable
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
                <v-textarea
                  clearable
                  bg-color="#ECE9FA"
                  variant="outlined"
                  color="#4520CC"
                  class="w-[ุ620px] h-[166px]"
                  label="รายละเอียดกิจกรรม"
                  v-model="newDescription"
                  :rules="rules.description"
                ></v-textarea>
              </div>
              <!-- {{ nearbyMarkers }} -->
              <!-- วันที่เปิด - ปิด รับสมัคร -->
              <div class="flex justify-center mt-[8px] space-x-2 pb-[8px]">
                <div>
                  <label>วันที่เปิดรับสมัคร </label>
                  <div class="w-[300px] mt-[8px]">
                    <VueDatePicker
                      placeholder="วันเปิดรับสมัคร"
                      :min-date="new Date()"
                      dark="true"
                      :timezone="'UTC'"
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
                      :min-date="new Date()"
                      :timezone="'UTC'"
                      v-model="newRegisEndDate"
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
                      :min-date="threeDayAfter"
                      :timezone="'UTC'"
                      v-model="newStartDate"
                    ></VueDatePicker>
                  </div>
                </div>
                <div class="pt-[50px]">-</div>
                <div>
                  <label>วันจบกิจกรรม </label>
                  <div class="w-[300px] mt-[8px]">
                    <VueDatePicker
                      placeholder="วันจบกิจกรรม"
                      dark="true"
                      :timezone="'UTC'"
                      :min-date="new Date()"
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
                <v-text-field
                  clearable
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
                <v-text-field
                  clearable
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
                  v-model="newAmountReceived"
                  append-inner
                  hide-spin-buttons
                >
                  <template #append-inner>
                    <v-icon
                      @click="updateValue('amountReceived', 'minus')"
                      class="text-primaryColor"
                      >mdi-minus</v-icon
                    >
                    <v-icon
                      @click="updateValue('amountReceived', 'plus')"
                      class="text-primaryColor"
                      >mdi-plus</v-icon
                    >
                  </template>
                </v-text-field>
              </div>
              <div>
                <!-- ประเภทกิจกรรม -->
                <div class="grid justify-items-center space-y-12 mb-[8px]">
                  <!-- switch -->
                  <div class="flex space-x-5">
                    <div>
                      <button
                        @click="typeSwitch(true)"
                        :class="[
                          'w-[159px] h-[56px] rounded-[8px]',
                          isOnline
                            ? 'bg-[#4520CC] text-white hover:bg-[#4520CC]'
                            : 'bg-primaryLight text-primaryColor hover:bg-purple100',
                        ]"
                      >
                        Online
                      </button>
                    </div>
                    <div>
                      <button
                        @click="typeSwitch(false)"
                        :class="[
                          'w-[159px] h-[56px] rounded-[8px]',
                          !isOnline
                            ? 'bg-[#4520CC] text-white hover:bg-[#4520CC]'
                            : 'bg-primaryLight text-primaryColor hover:bg-purple100',
                        ]"
                      >
                        Onsite
                      </button>
                    </div>
                  </div>
                  <!-- {{ location }} -->
                  <!-- Map || Meeting Link -->
                  <div class="">
                    <!-- Map -->
                    <div v-if="!isOnline">
                      <Map
                        @emitLocationName="handleLocationName"
                        :latitude="location.locationLatitude"
                        :longitude="location.locationLongitude"
                        :state="'edit'"
                      ></Map>
                      <v-text-field
                        class="pt-6"
                        variant="outlined"
                        label="สถานที่จัดกิจกรรม"
                        v-model="location.locationName"
                        bg-color="#ECE9FA"
                        :rules="rules.require"
                      >
                      </v-text-field>
                    </div>
                  </div>
                </div>

                <!-- ตรวจสอบโดย.... -->
                <div class="mb-4">
                  <v-select
                    label="ตรวจสอบการเข้าร่วมโดย"
                    variant="outlined"
                    bg-color="#ECE9FA"
                    v-model="newValidationType"
                    :items="isOnline ? onlineValidate : onsiteValidate"
                    item-title="name"
                    item-value="value"
                  >
                  </v-select>
                </div>
                <!-- rules -->
                <div>
                  <v-text-field
                    v-if="newValidationType != 'QR_CODE'"
                    v-model="newValidationRules"
                    variant="outlined"
                    bg-color="#ECE9FA"
                    type="number"
                    class="w-[334px] h-[56px] bg-[primaryLight]"
                    :label="
                      newValidationType == 'STEP_COUNTER'
                        ? 'จำนวนก้าว'
                        : 'ขอบเขตการตรวจสอบ (เมตร)'
                    "
                    append-inner
                    :rules="rules.require"
                    hide-spin-buttons
                  >
                    <template #append-inner>
                      <v-icon
                        @click="updateValue('validationRules', 'minus')"
                        class="text-primaryColor"
                        >mdi-minus</v-icon
                      >
                      <v-icon
                        @click="updateValue('validationRules', 'plus')"
                        class="text-primaryColor"
                        >mdi-plus</v-icon
                      >
                    </template>
                  </v-text-field>
                </div>
                <!-- location name -->
                <!-- <div class="pt-8">
                  <v-text-field
                    v-if="!isOnline"
                    variant="outlined"
                    label="สถานที่จัดกิจกรรม"
                    v-model="location.locationName"
                    bg-color="#ECE9FA"
                    :rules="rules.require"
                  >
                  </v-text-field>
                </div> -->
              </div>
            </div>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>
<style>
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
  width: 400px;
}
</style>
