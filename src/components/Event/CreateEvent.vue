<script setup>
// import { from, gql, useApolloClient } from "@apollo/client";
import DateTimeFormat from "@/components/DateTimeFormat.vue";
import VueDatePicker from "@vuepic/vue-datepicker";

import { ref } from "vue";

const newTitle = ref(""); //from user
// const newEventDescription = ref(''); //from user
const newAmountReceived = ref(10); //from user
const newCategory = ref(""); //from user
const newSubCategory = ref(""); //from user
const newStartDate = ref(); //from user
const newEndDate = ref(); //from user
// const newRegisterStartDate = ref(); //from user
const newRegisterEndDate = ref(); //from user
const newValidationType = ref(""); //from user
const newValidationRules = ref(5); //from user  (use with GPS and GPS+qrcode only)
const newPoster = ref(""); //from user
const newCreateBy = ref("");
const newCreateDate = ref();
const newUpdateBy = ref("");
const newUpdateDate = ref();
const newLocationName = ref(""); //from user  (use with GPS and GPS+qrcode only)
const newLocationLatitude = ref(""); //(use with GPS and GPS+qrcode only)
const newLocationLongitude = ref(""); //(use with GPS and GPS+qrcode only)
const newDescription = ref(""); //from user
const newValidate_times = ref(); //from user  (use with qrcode and GPS+qrcode only)
const newEventStatus = ref(); //

// check input length have to more than min (not null)
const checklengthTitle = ref(false);
const checklengthDescription = ref(false);
const checklengthCategory = ref(false);
const checkAmountReceived = ref(false);
const checkSubCategory = ref(false);
const checkValidateType = ref(false);
const checkValidateRule = ref(false);

// ยังทำไม่ได้
const checkRegisStartDate = ref(true);
const checkRegisEndDate = ref(true);
const checkStartDate = ref(true);
const checkEndDate = ref(true);
const checkMep = ref(true);

class CreateEvent {
  constructor(id, title, eventDescription, amountReceived, category) {}
}

// show messager in forrm
const mesAlertTitle = ref("");
const mesAlertDescription = ref("");
const mesAlertCategory = ref("");
const mesAlertAmountRe = ref("");
const mesAlertSubCategory = ref("");
const mesAlertValidateType = ref("");
const mesAlertValidateRRule = ref("");

const checkInput = (type, input) => {
  console.log(input);
  console.log(type);
  // const char = input.trim();
  // console.log(char.length)
  if (type == "title") {
    checklengthTitle.value = false;
    mesAlertTitle.value = "";
    if (input.trim().length == 0) {
      checklengthTitle.value = false;
      mesAlertTitle.value = "กรุณาใส่ข้อมูลให้ครบถ้วน";
    } else if (input.trim().length >= 1 && input.trim().length < 10) {
      checklengthTitle.value = false;
      mesAlertTitle.value = "กรุณาใส่ข้อมูลอย่าางน้อย 10 อักษร";
    } else {
      checklengthTitle.value = true;
      mesAlertTitle.value = "";
    }
  } else if (type == "desciption") {
    console.log("func des");
    checklengthDescription.value = false;
    mesAlertDescription.value = "";
    if (input.trim().length == 0) {
      checklengthDescription.value = false;
      mesAlertDescription.value = "กรุณาใส่ข้อมูลให้ครบถ้วน";
    } else if (input.trim().length >= 1 && input.trim().length < 20) {
      checklengthDescription.value = false;
      mesAlertDescription.value = "กรุณาใส่ข้อมูลอย่าางน้อย 20 อักษร";
    } else if (input.trim().length >= 20) {
      checklengthDescription.value = true;
      mesAlertDescription.value = "";
    }
  } else if (type == "category") {
    checklengthCategory.value = false;
    mesAlertCategory.value = "";
    console.log(input);
    if (input.trim().length == 0) {
      checklengthCategory.value = false;
      mesAlertCategory.value = "กรุณาใส่ข้อมูลให้ครบถ้วน";
    } else if (input.trim().length >= 1) {
      checklengthCategory.value = true;
      mesAlertCategory.value = "";
    }
  } else if (type == "amountReceied") {
    checkAmountReceived.value = false;
    mesAlertAmountRe.value = "";
    if (input > 0 && input < 10) {
      console.log("input less than");
      checkAmountReceived.value = false;
      mesAlertAmountRe.value = "กรุณาใส่ข้อมูลให้ถูกต้อง";
      console.log(mesAlertAmountRe.value);
    } else if (input >= 10 && input < 100) {
      console.log("input upper than");
      checkAmountReceived.value = true;
      mesAlertAmountRe.value = "";
    } else if (input > 100) {
      checkAmountReceived.value = true;
      mesAlertAmountRe.value = "กรุณาใส่ข้อมูลให้ถูกต้อง";
    }
  } else if (type == "subCategory") {
    checkSubCategory.value = false;
    mesAlertSubCategory.value = "";
    console.log(input.length);
    if (input.trim().length == 0) {
      checkSubCategory.value = false;
      mesAlertSubCategory.value = "กรุณาใส่ข้อมูลให้ครบถ้วน";
    } else if (input.trim().length >= 1) {
      checkSubCategory.value = true;
      mesAlertSubCategory.value = "";
    }
  } else if (type == "validateType") {
    checkValidateType.value = false;
    mesAlertValidateType.value = "";
    if (newValidationType.value == "" || newValidationType.value == null) {
      checkValidateType.value = false;
      mesAlertValidateType.value = "กรุณาใส่ข้อมูลให้ครบถ้วน";
    } else {
      checkValidateType.value = true;
      mesAlertValidateType.value = "";
    }
  } else if (type == "validateRule") {
    checkValidateRule.value = false;
    mesAlertValidateRRule.value = "";
    if (input < 1) {
      console.log("input less than");
      checkValidateRule.value = false;
      mesAlertValidateRRule.value = "กรุณาใส่ข้อมูลให้ถูกต้อง";
      console.log(mesAlertAmountRe.value);
    } else if (input >= 1 && input < 10) {
      console.log("input upper than");
      checkValidateRule.value = true;
      mesAlertValidateRRule.value = "";
    } else if (input > 10) {
      checkValidateRule.value = true;
      mesAlertValidateRRule.value = "กรุณาใส่ข้อมูลให้ถูกต้อง";
    }
  }
  // else if(type == 'regisStartDate') {
  //   const dateTimeNow = new()

  // }
};

// const posterStatus = ref("");
// const isDraging = ref(false);

// const removePoster = () => {
//   posterStatus.value = "delete";
// };

// const selectFile = () => {
//   // this.$refs.fileInput.click();

// }
// const fileChooser = document.getElementById('file-chooser');
// const fileInput = document.getElementById('file-input');

// function selectFile() {
//   const fileInput = document.getElementById("file-input");
//   if (fileInput) {
//     fileInput.click();
//     newPoster.value = file.target.file[0];
//   } else {
//     console.error('File input element with ID "file-input" not found.');
//   }
// }

// const inputFile = (file) => {
//   file.click();
//   console.log(file);
//   newPoster.value = file.target.file[0];
// };

// get Location
// function getLocationOnClick() {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const latitude = position.coords.latitude;
//       const longitude = position.coords.longitude;
//       console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

//       // Update your UI or store lat/long (e.g., using Vue data properties)
//       // ...
//     },
//     (error) => {
//       console.error("Error getting location:", error.message);
//       // Handle errors gracefully (e.g., display an error message to the user)
//     }
//   );
// }

// // Button click event listener
// const getLocation = () => {
//   const button = document.getElementById("getLocationButton");
//   button.addEventListener("click", getLocationOnClick);
// };

// const showUserLocationOnTheMap = (la , long) => {

// }
// showUserLocationOnTheMap( la, long) {
//   let map = new google.map.Map(document.getElementById("map"), {
//     zoom: 15,
//     center: new google.maps.LatLng(la , long) ,
//     mapTypeId:google.maps.mapTypeId.RoadMap
//   })

// }
const map = ref(null); // Ref to hold the map instance
const mapCenter = ref({ lat: 0, lng: 0 }); // Initial center coordinates
const newLatitude = ref(0);
const newLongitude = ref(0);

// const createMap = async () => {
//   await load();
//       map.value = new google.maps.Map(document.getElementById('map-container'), {
//         zoom: 15,
//         center: mapCenter.value,
//         mapTypeId: google.maps.mapTypeId.ROADMAP,
//       });
//     };

//     const updateMapCenter = async  () => {
//       mapCenter.value = { lat: newLatitude.value, lng: newLongitude.value };
//       if (map.value) {
//         map.value.setCenter(mapCenter.value);
//       } else {
//         await createMap(); // Create the map if it doesn't exist yet
//       }
//     };

// Function to show user location on the map
// const showUserLocationOnTheMap =  async (latitude, longitude) => {
//   await load()
//   mapCenter.value = { lat: latitude, lng: longitude };
//   if (!map.value) {
//     // Create the map only if it hasn't been created yet
//     // map.value = new google.maps.Map(document.getElementById("map-container"), {
//     map.value = new google.maps.Map(document.getElementById("map-container"), {
//       zoom: 15,
//       center: mapCenter.value,
//       mapTypeId: google.maps.mapTypeId.ROADMAP, // Corrected map type
//     });
//   } else {
//     // If map exists, update its center
//     map.value.setCenter(mapCenter.value);
//   }
// }
// const selectLocation = async () => {
//   try {
//     // Get user location (replace with your actual geolocation code)
//     const location = await navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const lat = position.coords.latitude;
//         const long = position.coords.longitude;
//         showUserLocationOnTheMap(lat, long);
//       }
//     );

//     // Handle errors (optional)
//   } catch (error) {
//     console.error("Error getting user location:", error);
//     // Handle location access denied or unavailable (e.g., display an error message)
//   }
// };

// onMounted(async () => {
//   try {
//     // Get user location (replace with your actual geolocation code)
//     const location = await navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const lat = position.coords.latitude;
//         const long = position.coords.longitude;
//         showUserLocationOnTheMap(lat, long);
//       }
//     );

//     // Handle errors (optional)
//   } catch (error) {
//     console.error("Error getting user location:", error);
//     // Handle location access denied or unavailable (e.g., display an error message)
//   }
// });

// return {
//   showUserLocationOnTheMap,
// };

// const decrementButton = document.getElementById('decrement-button');
// decrementButton.addEventListener('click', (event) => {
//   if (event.detail === 2) {
//     quantityInput.value = ''; // Clear the input value
//   }
// })

// const decrementButton = () => {
//   if(newAmountReceived.value > 0){
//     newAmountReceived.value --;
//   }
// }

// const incrementButton = () => {
//   if(newAmountReceived.value < 100){
//     newAmountReceived.value ++;
//   }
// }

const adjustAmount = (filed, s) => {
  if (filed == "amountReceied") {
    if (newAmountReceived.value >= 10 && newAmountReceived.value <= 100) {
      if (s == "decrementButton") {
        if (newAmountReceived.value > 10) {
          newAmountReceived.value--;
        }
      }
      if (s == "incrementButton") {
        if (newAmountReceived.value < 100) {
          newAmountReceived.value++;
        }
      }
    }
    if (newAmountReceived.value < 10) {
      newAmountReceived.value = 10;
      checkInput("amountReceied", newAmountReceived.value);
    }
    if (newAmountReceived.value > 100) {
      newAmountReceived.value = 100;
      checkInput("amountReceied", newAmountReceived.value);
    }
  }
  if (filed == "stepCounter") {
    if (newValidationRules.value >= 1 && newValidationRules.value <= 10) {
      if (s == "decrementButton") {
        if (newValidationRules.value > 1) {
          newValidationRules.value--;
        }
      }
      if (s == "incrementButton") {
        if (newValidationRules.value < 10) {
          newValidationRules.value++;
        }
      }
    }
    if (newValidationRules.value < 1) {
      newValidationRules.value = 1;
      checkInput("validateRule", newValidationRules.value);
    }
    if (newValidationRules.value > 10) {
      newValidationRules.value = 10;
      checkInput("validaateRule", newValidationRules.value);
    }
  }
};

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

const newRegisterStartDate = ref(new Date());
// In case of a range picker, you'll receive [Date, Date]
const format = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `Selected date is ${day}/${month}/${year}`;
};





</script>
<template>
  <div class="grid justify-items-center">
    <div class="bg-white p-10 w-[1080px] drop-shadow-md">
      <!-- header -->
      <div class="flex justify-between">
        <div class="-left">
          <label class="text-sm">Event > Create Event</label>
          <h2 class="text-[32px]">สร้างโพสกิจกรรม</h2>
        </div>
        <!-- button create -->
        <div class="button-done grid place-content-end">
          <button
            @click="changeState('createEvent', null)"
            class="w-[120px] h-[56px] px-[16px] bg-primaryColor rounded-[16px] text-white text-[18px] font-medium"
          >
            Done
          </button>
        </div>
      </div>
      <hr class="my-[40px]" />
      <!-- content -->
      <div class="content">
        <div class="topic text-[24px] font-medium text-[#4520CC]">
          รายละเอียดกิจกรรม
        </div>
        <div class="form grid grid-cols-8 gap-x-10 mt-10">
          <!-- left -->
          <div class="from-left col-span-5 mb-[16px]">
            <!-- title -->
            <div class="mb-10">
              <label
                for="title"
                class="block mb-2 text-[16px] font-medium text-gray-900"
                >หัวข้อกิจกรรม
                <span class="text-red-400 text-[14px]"
                  >*
                  <span v-if="mesAlertTitle != ''">{{
                    mesAlertTitle
                  }}</span></span
                >
              </label>
              <textarea
                @change="checkInput('title', newTitle)"
                type="text"
                id="title"
                class="bg-primaryLight border border-purple100 text-gray-900 text-[18px] rounded-[8px] focus:ring-primaryColor focus:border-primaryColor block w-full px-[24px] py-[16px] overflow-hidden text-overflow-ellipsis"
                rows="2"
                maxlength="100"
                placeholder="กรุณาเพิ่มข้อมูล (สูงสุด 100 ตัวอักษร)"
                v-model="newTitle"
                required
              ></textarea>
            </div>
            <!-- detail -->
            <div class="mb-10">
              <label
                for="detail"
                class="block mb-2 text-[16px] font-medium text-gray-900"
                >รายละเอียดกิจกรรม
                <span class="text-red-400 text-[14px]"
                  >*
                  <span v-if="mesAlertDescription != ''">{{
                    mesAlertDescription
                  }}</span></span
                >
              </label>
              <textarea
                @change="checkInput('desciption', newDescription)"
                class="detail bg-primaryLight border border-purple100 text-gray-900 text-[18px] rounded-[8px] focus:ring-primaryColor focus:border-primaryColor block w-full p-[24px]"
                rows="6"
                maxlength="500"
                placeholder="กรุณาเพิ่มข้อมูล (สูงสุด 500 ตัวอักษร)"
                v-model="newDescription"
                required
              ></textarea>
            </div>
            <div class="sub-left grid grid-cols-2 grid-rows-2 gap-10 mb-10">
              <div class="regisDate col-start-1 row-start-1 h-full">
                <label 
                for="detail"
                class="block mb-2 text-[16px] font-medium text-gray-900"
                >วันเปิดรับลงทะเบียน
                <span class="text-red-400 text-[14px]"
                  >*
                  <span v-if="mesAlertDescription != ''">{{
                    mesAlertDescription
                  }}</span></span
                >
              </label>
                <VueDatePicker class="my-picker-class" onchange="checkInput('regisStartDate', newRegisterStartDate)" v-model="newRegisterStartDate" :preview-format="format" />
              </div>

              <div class="regisDate col-start-2 row-start-1">2</div>
              <div class="startDate col-start-1 row-start-2">3</div>
              <div class="endDate col-start-2 row-start-2">4</div>
            </div>
            <!-- poster image -->
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
          <!-- right -->
          <div class="from-left col-span-3">
            <!-- category -->
            <div class="mb-10">
              <label
                for="category"
                class="block mb-2 text-[16px] font-medium text-gray-900"
                >หมวดหมู่
                <span class="text-red-400 text-[14px]"
                  >*
                  <span v-if="mesAlertCategory != ''">{{
                    mesAlertCategory
                  }}</span></span
                >
              </label>
              <input
                @change="checkInput('category', newCategory)"
                type="text"
                id="category"
                class="bg-primaryLight border border-purple100 text-gray-900 text-[18px] rounded-[8px] focus:ring-primaryColor focus:border-primaryColor block w-full px-[24px] py-[16px] overflow-hidden text-overflow-ellipsis"
                min="1"
                maxlength="40"
                placeholder="กรุณาเพิ่มข้อมูล (สูงสุด 40 ตัวอักษร)"
                v-model="newCategory"
                required
              />
            </div>
            <!-- subCategory -->
            <div class="mb-10">
              <label
                for="subCategory"
                class="block mb-2 text-[16px] font-medium text-gray-900"
                >หมวดหมู่ย่อย
                <span class="text-red-400 text-[14px]"
                  >*
                  <span v-if="mesAlertSubCategory != ''">{{
                    mesAlertSubCategory
                  }}</span></span
                >
              </label>
              <input
                @click="checkInput('subCategory', newSubCategory)"
                type="text"
                id="subCategory"
                class="bg-primaryLight border border-purple100 text-gray-900 text-[18px] rounded-[8px] focus:ring-primaryColor focus:border-primaryColor block w-full px-[24px] py-[16px] overflow-hidden text-overflow-ellipsis"
                min="1"
                maxlength="40"
                placeholder="กรุณาเพิ่มข้อมูล (สูงสุด 40 ตัวอักษร)"
                v-model="newSubCategory"
                required
              />
            </div>
            <!-- amout -->
            <div class="mb-10">
              <label
                for="subCategory"
                class="block mb-2 text-[16px] font-medium text-gray-900"
                >จำนวนผู้เข้าร่วม
                <span class="text-red-400 text-[14px]"
                  >*
                  <span v-if="mesAlertAmountRe != ''">{{
                    mesAlertAmountRe
                  }}</span></span
                >
              </label>
              <div class="relative flex items-center w-full">
                <button
                  @click="adjustAmount('amountReceied', 'decrementButton')"
                  type="button"
                  id="decrement-button"
                  class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-[24px] h-[56px] focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <svg
                    class="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  @change="checkInput('amountReceied', newAmountReceived)"
                  type="number"
                  id="quantity-input"
                  class="bg-primaryLight border-x-0 border-purple100 h-[56px] text-center text-gray-900 text-[18px] focus:ring-primaryColor focus:border-primaryColor block w-full"
                  placeholder="100"
                  min="10"
                  max="100"
                  v-model="newAmountReceived"
                  required
                />
                <button
                  @click="adjustAmount('amountReceied', 'incrementButton')"
                  type="button"
                  id="increment-button"
                  class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg px-[24px] h-[56px] focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <svg
                    class="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <!-- validate type -->
            <div class="mb-10">
              <label
                for="subCategory"
                class="block mb-2 text-[16px] font-medium text-gray-900"
                >ตรวจสอบการเข้าร่วม
                <span class="text-red-400 text-[14px]"
                  >*
                  <span v-if="mesAlertValidateType != ''">{{
                    mesAlertValidateType
                  }}</span></span
                >
              </label>
              <select
                @change="checkInput('validateType', newValidationType)"
                id="countries"
                class="bg-primaryLight border border-purple100 text-gray-900 text-[18px] rounded-lg focus:ring-primaryColor focus:border-primaryColor block w-full px-[24px] h-[56px]"
                v-model="newValidationType"
              >
                <option selected value="">Choose validate type</option>
                <option value="QR_CODE">QR Code</option>
                <option value="CURREN_GPS">Curren GPS</option>
                <option value="CURRENT_GPS,QR_CODE">
                  Current GPS and QR Code
                </option>
                <option value="STEP_COUNTER">Step Counter</option>
              </select>
            </div>
            <!-- validate rule -->
            <div
              v-if="newValidationType != '' || newValidationType == 'CURRENT_GPS' || newValidationType == 'CURRENT_GPS,QR_CODE'"
              class="validate-rule"
            >
              <!-- location name -->
              <div v-if="newValidationType == 'CURREN_GPS'" class="mb-10">
                <label
                  for="subCategory"
                  class="block mb-2 text-[16px] font-medium text-gray-900"
                  >สถานที่
                  <span class="text-red-400 text-[14px]"
                    >*
                    <!-- <span v-if="mesAlertSubCategory != ''">{{
                      mesAlertSubCategory
                    }}</span> -->
                  </span>
                </label>
                <div class="relative">
                  <input
                    type="search"
                    id="map"
                    class="block bg-primaryLight border border-purple100 text-gray-900 text-[18px] rounded-lg focus:ring-primaryColor focus:border-primaryColor block w-full px-[24px] h-[56px]"
                    placeholder="Place name"
                    v-model="newLocationName"
                    required
                  />
                  <button
                    type="submit"
                    class="text-white absolute end-2.5 bottom-2.5 bg-primaryColor font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Map
                  </button>
                </div>
              </div>
              <!-- validateRule -->
              <div v-if="newValidationType == 'STEP_COUNTER'" class="mb-10">
                <label
                  for="validateRule"
                  class="block mb-2 text-[16px] font-medium text-gray-900"
                  >ระยะทาง (กิโลเมคร)
                  <span class="text-red-400 text-[14px]"
                    >*
                    <span v-if="mesAlertValidateRRule != ''">{{
                      mesAlertValidateRRule
                    }}</span></span
                  >
                </label>
                <div class="relative flex items-center w-full">
                  <button
                    @click="adjustAmount('stepCounter', 'decrementButton')"
                    type="button"
                    id="decrement-button"
                    class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg px-[24px] h-[56px] focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      class="w-3 h-3 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 2"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <input
                    @change="checkInput('validateRule', newValidationRules)"
                    type="number"
                    id="quantity-input"
                    class="bg-primaryLight border-x-0 border-purple100 h-[56px] text-center text-gray-900 text-[18px] focus:ring-primaryColor focus:border-primaryColor block w-full"
                    placeholder="100"
                    min="1"
                    max="10"
                    v-model="newValidationRules"
                    required
                  />
                  <button
                    @click="adjustAmount('stepCounter', 'incrementButton')"
                    type="button"
                    id="increment-button"
                    class="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg px-[24px] h-[56px] focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                  >
                    <svg
                      class="w-3 h-3 text-gray-900 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* .my-picker-class{
            border: none !important;
            border-bottom: 1px solid #F26F31 !important;
            background-color: #4520cc !important;
           } */

.vpjk-container {
  background-color: #3a7eb9; /* เปลี่ยนสีพื้นหลังของ datepicker */
  border: 1px solid #ccc; /* เพิ่มเส้นขอบ */
  height: 64px;
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
