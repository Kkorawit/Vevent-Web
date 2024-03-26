<script setup>
import { from, gql, useApolloClient } from "@apollo/client";
import DateTimeFormat from "../components/DateTimeFormat.vue";
import { ref } from "vue";
// import { load } from '@google/maps';


// const props = defineProps({
//   info: {
//     type: Object,
//     request: true,
//   },
// });

// const { resolveClient } = useApolloClient();
// const client = resolveClient();
// const allValidateType = ref();

// const getAllCategory = async () => {
//   allValidateType.value = ref();
//   console.log(id);
//   const { data, error } = await client.query({
//     query: gql`
      
//     `,
//   });
//   if (error) {
//     console.error("GraphQL error:", error);
//   }
//   allValidateType.value = data;
//   console.log(allValidateType.value);
// };

const newTitle = ref(''); //from user
// const newEventDescription = ref(''); //from user
const newAmountReceived = ref(); //from user
const newCategory = ref(''); //from user
const newSubCategory = ref(''); //from user
const newStartDate = ref(); //from user
const newEndDate = ref(); //from user
const newRegisterStartDate = ref(); //from user
const newRegisterEndDate = ref(); //from user
const newValidationType = ref(''); //from user
const newValidationRules = ref(''); //from user  (use with GPS and GPS+qrcode only)
const newPoster = ref(''); //from user
const newCreateBy = ref('');
const newCreateDate = ref();
const newUpdateBy = ref('');
const newUpdateDate = ref();
const newLocationName = ref(''); //from user  (use with GPS and GPS+qrcode only)
const newLocationLatitude = ref('');      //(use with GPS and GPS+qrcode only)
const newLocationLongitude = ref('');     //(use with GPS and GPS+qrcode only)
const newDescription = ref('');  //from user
const newValidate_times = ref(); //from user  (use with qrcode and GPS+qrcode only)
const newEventStatus = ref(); //



// check input length have to more than min (not null)
const checklengthTitle = ref(false);
const checklengthDescription = ref(false);
const checklengthCategory = ref(false);
const checkAmountReceived = ref(false);
const checkSubCategory  = ref(false);

// ยังทำไม่ได้
const checkRegisStartDate = ref(true);
const checkRegisEndDate = ref(true);
const checkStartDate = ref(true);
const checkEndDate = ref(true);
const checkMep = ref(true);

class CreateEvent {
  constructor(id, title , eventDescription, amountReceived, category,){

  }
}

// show messager in forrm
const mesAlertTitle = ref("");
const mesAlertDescription = ref("");
const mesAlertCategory = ref("");
const mesAlertAmountRe = ref("");
const mesAlertSubCategory  = ref("");

const countWord = (type, input) => {
  console.log(input);
  console.log(input);
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
    if (input == 0 || input < 10) {
      checkAmountReceived.value = false;
      mesAlertAmountRe.value = "กรุณาใส่ข้อมูลให้ครบถ้วน";
    } else if (input >= 10) {
      checkAmountReceived.value = true;
      mesAlertAmountRe.value = "";
    }
  }else if (type == "subCategory") {
    checkSubCategory.value = false;
    mesAlertSubCategory.value = "";
    console.log(input.length)
    if (input.trim().length == 0) {
      checkSubCategory.value = false;
      mesAlertSubCategory.value = "กรุณาใส่ข้อมูลให้ครบถ้วน";
    } else if (input.trim().length >= 1) {
      checkSubCategory.value = true;
      mesAlertSubCategory.value = "";
    }
  }
};

const posterStatus = ref("");
const isDraging = ref(false);

const removePoster = () => {
  posterStatus.value = "delete";
};

// const selectFile = () => {
//   // this.$refs.fileInput.click();

// }
// const fileChooser = document.getElementById('file-chooser');
// const fileInput = document.getElementById('file-input');

function selectFile() {
  const fileInput = document.getElementById("file-input");
  if (fileInput) {
    fileInput.click();
    newPoster.value = file.target.file[0];
  } else {
    console.error('File input element with ID "file-input" not found.');
  }
}

const inputFile = (file) => {
  file.click();
  console.log(file);
  newPoster.value = file.target.file[0];
};

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

const createMap = async () => {
  await load();
      map.value = new google.maps.Map(document.getElementById('map-container'), {
        zoom: 15,
        center: mapCenter.value,
        mapTypeId: google.maps.mapTypeId.ROADMAP,
      });
    };

    const updateMapCenter = async  () => {
      mapCenter.value = { lat: newLatitude.value, lng: newLongitude.value };
      if (map.value) {
        map.value.setCenter(mapCenter.value);
      } else {
        await createMap(); // Create the map if it doesn't exist yet
      }
    };

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

</script>
<template>
  <div>
    <div class="header">
      <div>Events > Create Event</div>
      <h2>สร้างโพสกิจกรรม</h2>
      <hr />
      <br />
    </div>
    <div class="container">
      <div class="header-component">
        <h2>Edit Event Detail</h2>
        <label>รายละเอียดกิจกรรม</label>
      </div>
      <div class="confirm-button">
        <button @click="changeState('editEvent')">
          <div>ยืนยันการแก้ไข</div>
        </button>
      </div>
      <div class="main">
        <div class="detail-section">
          <label for="title"
            >หัวข้อกิจกรรม
            <span
              >*
              <span v-if="mesAlertTitle != ''">{{ mesAlertTitle }}</span></span
            ></label
          >
          <input
            @change="countWord('title', newTitle)"
            type="text"
            id="title"
            v-model="newTitle"
            minlength="10"
            maxlength="80"
            placeholder="กรุณาเพิ่มข้อมูลไม่น้อยกว่า 10 ตัวอักษร"
          />
        </div>
        <div class="detail-section">
          <label for="description"
            >รายละเอียดกิจกรรม
            <span
              >*<span v-if="mesAlertDescription != ''">{{
                mesAlertDescription
              }}</span></span
            ></label
          >
          <textarea
            @change="countWord('desciption', newDescription)"
            id="description"
            cols="3"
            rows="10"
            v-model="newDescription"
            style="width: 100%"
            minlength="20"
            maxlength="500"
            placeholder="กรุณาเพิ่มข้อมูลไม่น้อยกว่า 20 ตัวอักษร"
          ></textarea>
        </div>
        <div class="two-column">
          <div class="detail-section">
            <label for="registerStartDate"
              >วันเปิดลงทะเบียน <span>*</span></label
            >
            <!-- <DateTimeFormat
              :eventStartTime="newRegisterStartDate"
              :format="1"
            /> -->

          <input type="datetime-local" v-model="newRegisterStartDate">
          </div>
          <div class="detail-section">
            <label for="registerEndDate">วันปิดลงทะเบียน <span>*</span></label>
            <!-- <DateTimeFormat
              :eventStartTime="newRegisterEndDate"
              :format="1"
            /> -->
            <input type="datetime-local" v-model="newRegisterEndDate">
          </div>
          <div class="detail-section">
            <label for="startDate">วันที่จัดกิจกรรม <span>*</span></label>
            <!-- <DateTimeFormat
              :eventStartTime="newStartDate"
              :format="1"
            /> -->
            <input type="datetime-local" v-model="newStartDate">
          </div>
          <div class="detail-section">
            <label for="endDate">วันที่จบกิจกรรม <span>*</span></label>

            <!-- <DateTimeFormat :eventStartTime="newEndDate" :format="1" /> -->
            <input type="datetime-local" v-model="newEndDate">
          </div>
        </div>
        <div class="detail-section">
          <label for="description">รูปภาพกิจกรรม <span>*</span></label>
          <from>
            <input type="file" class="file-input" name="file" ref="fileInput" hidden>
            <div class="icon">
              <img src="" alt="">
              <p>Browse file tpo Upload</p>
            </div>
          </from>
          <section class="loading-area">
            <li class="row">
              <i aria-hidden="true"></i>
              <div class="content">
                <div class="detail">
                  <span class="">name</span>
                </div>

              </div>
            </li>


          </section>
          
          <div class="button-posterImg">
            <button @click="changePoster()">Upload new poster image</button>
            <button @click="removePoster()">Delete</button>
          </div>
        </div>
      </div>
      <div class="second">
        <div class="detail-section">
          <label for="category"
            >หมวดหมู่
            <span
              >*<span v-if="mesAlertCategory != ''">{{
                mesAlertCategory
              }}</span></span
            ></label
          >
          <input
            @change="countWord('category', newCategory)"
            type="text"
            id="category"
            v-model="newCategory"
            minlength="1"
            maxlength="40"
            placeholder="กรุณาเพิ่มข้อมูลไม่น้อยกว่า 1 ตัวอักษร"
          />
        </div>
        <div class="detail-section">
          <label for="subCategory">หมวดหมู่ย่อย<span
              >*<span v-if="mesAlertSubCategory != ''">{{
                mesAlertSubCategory
              }}</span></span
            ></label>
          <input @change="countWord('subCategory', newSubCategory)"
            type="text"
            id="subCategory"
            v-model="newSubCategory"
            minlength="1"
            maxlength="40"
            placeholder="กรุณาเพิ่มข้อมูลไม่น้อยกว่า 1 ตัวอักษร"
          />
        </div>
        <div class="detail-section">
          <label for="amountReceived"
            >จำนวนผู้เข้าร่วม
            <span
              >*<span v-if="mesAlertAmountRe != ''">{{
                mesAlertAmountRe
              }}</span></span
            ></label
          >
          <input
            @change="countWord('amountReceied', newAmountReceived)"
            type="number"
            id="amountReceived"
            v-model="newAmountReceived"
            value="10"
            min="10"
            max="100"
            placeholder="กรุณาระบุระหว่าง 10 - 100 คน"
          />
        </div>
        <div class="detail-section">
          <label for="validationType"
            >ตรวจสอบการเข้าร่วมกิจกรรม <span>*</span></label
          >
          <select
            id="validationType"
            name="validationType"
            v-model="newValidationType"
          >
          <!-- <option v-for="(validationType,index) in allValidateType" :key="index" :value="validationType">
          {{ validationType }}</option> -->
          </select>
        </div>
        <div
          v-if="
            newValidationType == 'CURRENT_GPS' ||
            newValidationType == 'CURRENT_GPS,QR_CODE'
          "
          class="detail-section"
        >
          <label for="description">สถานที่ <span>*</span></label>
          <input
            type="dropdown-content"
            id="description"
            disabled
            v-model="newLocationName"
          />
          <button id="getLocation" @click="updateMapCenter()">map</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.detail-section span {
  color: red;
}

.confirm-button {
  display: grid;
  place-items: end;
}

.confirm-button button {
  height: 54px;
  width: fit-content;
  padding-left: 16px;
  padding-right: 16px;
  color: #ffffff;
  background-color: #4520cc;
}

.container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  border-radius: 15px;
  background-color: #ffffff;
  padding: 40px;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  width: 100%;
}

.main {
  display: grid;
  grid-template-rows: auto 5fr;
  grid-column-start: 1;
}

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 24px;
}

input,
select {
  width: 100%;
  height: 64px;
  background-color: #f2f2f2;
  margin: 8px 0;
  /* border-color: #D9D9D9; */
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;
  padding: 14px 20px;
}

textarea {
  width: 100%;
  height: 200px;
  background-color: #f2f2f2;
  margin: 8px 0;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;
  padding: 24px 24px;
  word-wrap: break-word;
  line-height: 1.5rem;
}

.second {
  display: block;
  grid-column: 2;
}

.event-detail {
  border: 1px solid #ddd;
  border-radius: 4px;
}

.detail-section {
  text-align: start;
  width: 100%;
  margin-bottom: 24px;
  /* background-color: blueviolet; */
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
  border: 1.5px solid #d1d1d1;
  background-color: #ffffff;
}

.card {
  width: 100%;
  padding: 0 0 0 0;
  border-radius: 8px;
  overflow: hidden;
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
}

.drag-area {
  height: 200px;
  border-radius: 8px;
  border: 2px dashed #d1d1d1;
  /* color: #d1d1d1; */
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
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  max-height: 200px;
  position: relative;
  margin-bottom: 8px;
}
</style>
