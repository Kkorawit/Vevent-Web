<script setup>
import { onBeforeMount, ref } from 'vue';


const prop = defineProps({
    eventStartTime: {
        type:String,
        request:true
    },
    format: {
        type:Number,
        request:true
    }

})


console.log(prop.eventStartTime)


const chooseFormat = prop.format
console.log(chooseFormat)

const dateTime = ref('');


const dateTImeFormat = () => {
    const eventStartDateTime = new Date(prop.eventStartTime)
    const date = eventStartDateTime.toLocaleDateString()
    const time = eventStartDateTime.toLocaleTimeString()
    console.log(eventStartDateTime)
    console.log(date)
    console.log(time)

    if(date != null && time != null){
        dateTime.value = date + ' ' + time
        console.log(dateTime.value);
    }else {
        console.log('datetime is null');
    }
}

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




onBeforeMount( () => {
    dateTImeFormat()
    // formatDateTime(prop.eventStartTime);
})

</script>
 
<template>
    <div v-if="chooseFormat == 1">
         <input
            type="text"
            id="registerStartDate"
            disabled
            v-model="dateTime"
          />
    </div>
    <!-- just Date -->
    <div v-if="chooseFormat == 2">
        {{eventStartDateTime.toDateString().substring(3)}}
    </div>
    <!-- just Time -->
    <div v-if="chooseFormat == 3">
        {{eventStartDateTime.toLocaleTimeString()}}
    </div>

</template>
 
<style>

</style>