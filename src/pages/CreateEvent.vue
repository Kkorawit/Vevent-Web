<script setup>
import { rules } from "@/extend/utils.ts";
import { ref, computed } from "vue";

const startDate = ref("2024-04-10T14:30:00");

const posterStatus = ref("");
const newPoster = ref("");
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
</script>

<template>
  <div class="grid grid-cols-12 justify-items-center">
    <div
      class="col-span-8 col-start-3 w-[1080px] h-[1336px] bg-white shadow-xl rounded-b-[16px]"
    >
      <div class="p-[40px] space-y-[50px]">
        <!-- header -->
        <div>
          <div>asdasd</div>
          <div>asdasd</div>
          <div>asdasd</div>
        </div>
        <hr />
        <!-- form -->
        <v-form fast-fail @submit.prevent>
          <div class="flex justify-between py-8">
          <div>
            รายละเอียดกิจกรรม
          </div>
          <div>
            <v-btn class="" type="submit" block>Submit</v-btn>
          </div>
        </div>
        <!-- fill -->
          <div class="grid grid-cols-2 justify-items-stretch pb-36">
            <!-- left form -->
            <div class="justify-self-start space-y-[60px]">
              <!-- หัวข้อกิจกรรม -->
              <div>
                <v-text-field
                  class="w-[620px] h-[80px] rounded-full"
                  bg-color="#ECE9FA"
                  variant="outlined"
                  :label="`หัวข้อกิจกรรม`"
                  :rules="rules.require"
                  :prepend-inner-icon="`mdi-magnify`"
                  :width="`20px`"
                ></v-text-field>
              </div>
              <!-- รายละเอียด -->
              <div>
                <v-textarea
                variant="outlined"
                  class="w-[ุ620px] h-[166px]"
                  bg-color="#ECE9FA"
                  label="รายละเอียดกิจกรรม"
                  :rules="rules.require"
                  prepend-inner-icon="mdi-magnify"
                ></v-textarea>
              </div>
              <!-- วันที่เปิด - ปิด รับสมัคร -->
              <div class="flex justify-center space-x-2">
                <div class="w-[290px] ">
                  <VueDatePicker
                    placeholder="วันเปิดรับสมัคร"
                    dark="true"
                  ></VueDatePicker>
                </div>
                <div class="pt-2">-</div>
                <div class="w-[290px] h-[56px]">
                  <VueDatePicker
                    placeholder="วันปิดรับสมัคร"
                    dark="true"
                  ></VueDatePicker>
                </div>
              </div>
                <!-- วันที่เปิด - ปิด กิจกรรม -->
              <div class="flex justify-center space-x-2">
                <div class="w-[290px] h-[56px]">
                  <VueDatePicker
                    placeholder="วันเริ่มกิจกรรม"
                    dark="true"
                  ></VueDatePicker>
                </div>
                <div class="pt-2">-</div>
                <div class="w-[290px] h-[56px]">
                  <VueDatePicker
                    placeholder="วันจบกิจกรรม"
                    dark="true"
                  ></VueDatePicker>
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
            <div class="justify-self-end space-y-[60px]">
              <!-- หมวดหมู่ -->
              <div>
                <v-text-field
                  bg-color="#ECE9FA"
                  variant="outlined"
                  class="w-[334px] h-[56px]"
                  :label="`หมวดหมู่`"
                  hint="asdasdawdwsadaw"
                  :rules="rules.require"
                  :prepend-inner-icon="`mdi-magnify`"
                  :width="`20px`"
                ></v-text-field>
              </div>
              <!-- หมวดหมู่ย่อย -->
              <div>
                <v-text-field
                  bg-color="#ECE9FA"
                  variant="outlined"
                  color="#4520CC"
                  class="w-[334px] h-[56px]"
                  :label="`หมวดหมู่ย่อย`"
                  hint="asdasdasdasdasdasdasd"
                  :rules="rules.require"
                  :prepend-inner-icon="`mdi-magnify`"
                  :width="`20px`"
                ></v-text-field>
              </div>
              <!-- จำนวนผู้เข้าร่วม -->
              <div>
                <v-text-field
                variant="outlined"
                  bg-color="#ECE9FA"
                  type="number"
                  class="w-[334px] h-[56px] bg-[primaryLight]"
                  label="จำนวนผู้เข้าร่วม"
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
                  label="ตรวจสอบการเข้าร่วมโดย"
                  :items="['QR Code', 'Step Counter', 'GPS', 'QR Code&GPS']"
                  bg-color="#ECE9FA"
                >
                </v-select>
              </div>
              <div>
                <v-select
                  class="w-[334px] h-[56px] rounded-[6px]"
                  variant="outlined"
                  label="ตรวจสอบการเข้าร่วมโดย"
                  bg-color="#ECE9FA"
                >
                </v-select>
              </div>
            </div>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dp__theme_dark {
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
  --dp-border-color-hover: #aaaeb7;
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
