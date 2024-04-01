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
};

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
