<script setup>
import { onMounted, ref } from "vue";
import { getAllParticipantsByEventId } from "@/gql/gqlGet.js";

const emits = defineEmits(["isShow", "close"]);
const props = defineProps({
  eid: {
    type: Number,
    required: true,
  },
});

const participants = ref([]);
onMounted(async ()=>{
  let getParticipants = await getAllParticipantsByEventId(props.eid)
  console.log(getParticipants);
  participants.value = getParticipants
})
console.log("event detail page");


</script>
<template>
  <v-form fast-fail @submit.prevent class="mt-0">
    <div class="flex justify-between items-center pt-[40px] pb-[24px]">
      <div class="text-[24px] font-bold flex">
        ผู้เข้าร่วมกิจกรรม
        <div class="flex items-center mt-[4px]">
          <img
            src="@/assets/user-outline.png"
            width="20"
            height="20"
            alt="user icon"
            class="ml-[16px] mr-[4px]"
          />
          <p class="text-[14px] text-primaryColor">{{ participants.length }}</p>
        </div>
      </div>
    </div>
    <div class="rounded-lg border border-[1px] ">
      <v-table class="w-full table-flxed">
        <thead>
          <tr class="bg-gray-50">
            <th class="text-center w-[60px] ">#</th>
            <th class="w-[314px]">Name</th>
            <th class="text-left">Email</th>
            <th class="text-left">Validate Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(person, index) in participants" :key="person.name">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img
                    class="h-10 w-10 rounded-full"
                    :src="person.user.profileImg"
                    alt=""
                  />
                </div>
                <div class="ml-4 w-full">
                  <div class="text-sm font-medium text-gray-900">
                    {{ person.user.displayName }}
                  </div>
                </div>
              </div>
            </td>
            <td>{{ person.user.userEmail }}</td>
            <td class="py-4 whitespace-nowrap">
              <span v-if="person.status == 'P' " 
                class="flex justify-center w-[96px] inline-flex text-xs leading-8 font-semibold rounded-full bg-gray-100 text-gray-400"
              >
                Pending
              </span>
              <span v-if="person.status == 'S' " 
                class="flex justify-center w-[96px] inline-flex text-xs leading-8 font-semibold rounded-full bg-green-100 text-green-600"
              >
                Success
              </span>
              <span v-if="person.status == 'F'" 
                class="flex justify-center w-[96px] inline-flex text-xs leading-8 font-semibold rounded-full bg-red-100 text-red-500"
              >
                False
              </span>
            </td>
          </tr>
        </tbody>
      </v-table>
    </div>
  </v-form>
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
  --dp-border-color: #d9d9d9; /*border color*/
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
