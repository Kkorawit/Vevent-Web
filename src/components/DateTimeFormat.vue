<script setup>
import { onBeforeMount, ref } from "vue";
// import moment from 'moment';
import moment from "moment-timezone";

const prop = defineProps({
  eventStartTime: {
    type: String,
    request: true,
  },
  format: {
    type: Number,
    request: true,
  },
});


const chooseFormat = prop.format;
const format = ref(prop.format);
const dateTime = ref("");
const date = ref("");
const time = ref("");

const dateTImeFormat = () => {
  const input = prop.eventStartTime;
  date.value  = moment(input).format("ll");
//   time.value = moment(input).format('LT');
  time.value = moment(input).utcOffset(+'-7*60').format('LT');

  
  if(date.value != null && time.value != null){
      dateTime.value = date.value + ' ' + time.value
  }else {
      console.log('datetime is null');
  }


  

  // const eventStartDateTime = new Date(prop.eventStartTime)

  // const date = eventStartDateTime.toLocaleDateString()
  // const time = eventStartDateTime.toLocaleTimeString()
  // console.log(eventStartDateTime)
  // console.log(date)
  // console.log(time)
};

// const formatDateTime = (dateTimeString) => {
//   // Parse the date-time string using Date object
//   const dateObj = new Date(dateTimeString);

//   // Extract year, month (0-indexed), and date
//   const year = dateObj.getFullYear();
//   const month = dateObj.getMonth() + 1; // Adjust for 0-based month index
//   const day = dateObj.getDate();

//   // Extract hours, minutes, and seconds
//   const hours = dateObj.getHours().toString().padStart(2, '0'); // Pad with leading zero
//   const minutes = dateObj.getMinutes().toString().padStart(2, '0');
//   const seconds = dateObj.getSeconds().toString().padStart(2, '0');

//   // Calculate Buddhist Era year (BE)
//   const buddhistYear = year + 543;

//   // Format the date in the desired format

//    if(dateTimeString != null){
//         dateTime.value = `${month}/${day}/${buddhistYear} ${hours}:${minutes}:${seconds}`;
//         console.log(dateTime.value);
//     }else {
//         console.log('datetime is null');
//     }
// }

onBeforeMount(() => {
  dateTImeFormat();
  // formatDateTime(prop.eventStartTime);
});
</script>

<template>
  <div v-if="chooseFormat == 1">
    <input type="text" id="registerStartDate" disabled v-model="dateTime" />
  </div>
  <!-- just Date -->
  <div v-if="chooseFormat == 2">
    <!-- {{eventStartDateTime.toDateString().substring(3)}} -->
    <!-- {{prop.eventStartTime.moment().format('ll')}} -->
  </div>
  <!-- just Time -->
  <div v-if="chooseFormat == 3">
    <!-- {{eventStartDateTime.toLocaleTimeString()}} -->
    <!-- {{prop.eventStartTime.moment().format('LT')}} -->
  </div>

  <!-- date time -->
  <div v-if="chooseFormat == 3">
    {{ dateTime }}
  </div>
</template>

<style></style>
