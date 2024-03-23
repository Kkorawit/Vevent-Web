<script setup>
import DateTimeFormat from "../components/DateTimeFormat.vue";
// import EditEvent from "./EditEvent.vue";
import { ref } from "vue";

const newTitle = ref('');
const newDescription = ref('');
const newCategory = ref('');
const newAmountReceived = ref('');
const newRegisterStartDate = ref();
const newRegisterEndtDate = ref();
const newStartDate = ref();
const newEndtDate = ref();
const newPoster = ref('');
const newValidationType = ref('');

// class insertEvent {
//   constructor()
// }





// const state = ref(props.state);
// const changeState = (s) => {
//   if (s == "editEvent") {
//     state.value = s;
//     console.log(state.value)
//   } else if (s == "eventList") {
//     state.value = s;
//   }
// };
</script>
<template>
  <div>
    <div class="header">
      <div>Events > Create Event</div>
      <h2>สร้างโพสกิจกรรม</h2>
      <hr />
    </div>
    <br />
    <div class="container">
      <div class="header-component">
        <h2>Event Detail</h2>
        <label> รายละเอียดกิจกรรม</label>
      </div>
      <div class="edit-button">
        <button @click="changeState('editEvent')">
          <img
            src="../assets/Edit.png"
            alt="edit"
            style="width: 32px; height: 32px"
          />
        </button>
      </div>
      <div class="main">
        <div class="detail-section">
          <label for="title">หัวข้อกิจกรรม</label>
          <input type="text" id="title"  v-model="newTitle" />
        </div>
        <div class="detail-section">
          <label for="description">รายละเอียดกิจกรรม</label>
          <textarea
            id="description"
            cols="3"
            rows="10"
            :value="[
              props.info.description != null && props.info.description != ''
                ? props.info.description
                : 'No Description',
            ]"
            style="width: 100%"
          ></textarea>
        </div>
        <div class="two-column">
          <div class="detail-section">
            <label for="registerStartDate">วันเปิดลงทะเบียน</label>
            <DateTimeFormat
              :eventStartTime="props.info.registerStartDate"
              :format="1"
            />
          </div>
          <div class="detail-section">
            <label for="registerEndDate">วันปิดลงทะเบียน</label>
            <DateTimeFormat
              :eventStartTime="props.info.registerEndDate"
              :format="1"
            />
          </div>
          <div class="detail-section">
            <label for="startDate">วันที่จัดกิจกรรม</label>

            <DateTimeFormat
              :eventStartTime="props.info.startDate"
              :format="1"
            />
          </div>
          <div class="detail-section">
            <label for="endDate">วันที่จบกิจกรรม</label>

            <DateTimeFormat :eventStartTime="props.info.endDate" :format="1" />
          </div>
        </div>
        <div class="detail-section">
          <label for="description">รูปภาพกิจกรรม</label>
          <img
            :src="props.info.posterImg"
            alt="Event Location"
            class="poster-img"
          />
        </div>
      </div>
      <div class="second">
        <div class="detail-section">
          <label for="category">หมวดหมู่</label>
          <input
            type="text"
            id="category"
            disabled
            v-model="props.info.category"
          />
        </div>
        <div class="detail-section">
          <label for="amountReceived">จำนวนผู้เข้าร่วม</label>
          <input
            type="text"
            id="amountReceived"
            disabled
            v-model="props.info.amountReceived"
          />
        </div>
        <div class="detail-section">
          <label for="description">ตรวจสอบการเข้าร่ววมกิจกรรม</label>
          <input
            type="text"
            id="description"
            disabled
            v-model="props.info.validationType"
          />
        </div>
        <div v-if="props.info.validationType == 'CURRENT_GPS' || props.info.validationType == 'QR_CODE,CURRENT_GPS' " class="detail-section">
          <label for="description">สถานที่</label>
          <input
            type="text"
            id="description"
            disabled
            v-model="props.info.locationName"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-if="state != '' && state == 'editEvent'">
    <EditEvent :info="props.info"></EditEvent>
  </div>
</template>
<style scoped>
.container {
  /* width: 1080px; */
  display: grid;
  grid-template-columns: 2fr 1fr;
  /* grid-template-columns: repeat(auto-fit, minmax( 2fr , 1fr)); */
  gap: 40px;
  /* background-color: blue; */
  border-radius: 15px;
  background-color: #ffffff;
  padding: 40px;
}

.header-component {
  margin-top: -0.83em;
}
button {
  background-color: #4520CC;
}

.edit-button {
  display: grid;
  place-items: end;
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
  /* background-color: bisque; */
}

.two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 24px;
}

input {
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

/* .detail-section-span {
  background-color: aqua;
  text-align: start;
} */

.second {
  display: block;
  grid-column: 2;
}

.event-detail {
  border: 1px solid #ddd;
  border-radius: 4px;
}

.detail-section {
  /* display: inline-block; */
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
</style>
