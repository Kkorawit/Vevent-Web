<script setup>
import Sidebar from "../components/Sidebar.vue";
// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import gql from "graphql-tag";
import { onBeforeMount } from "vue";
// import { useQuery } from "@apollo/client";
import { ref } from "vue";
// import { compact } from "@apollo/client/utilities";
import { useApolloClient } from "@vue/apollo-composable";
// const uEmail = "Organization.032301@gmail.com";
const GET_EVENTS = gql`
  query FindAllEventCreatedByUEmail {
    findAllEventCreatedByUEmail(uEmail: "Organization.032301@gmail.com") {
      id
      title
    }
  }
`;
const { resolveClient } = useApolloClient();
const client = resolveClient();
const result = ref();
onBeforeMount(async () => {
  const { data, error } = await client.query({
    query: GET_EVENTS,
  });
  if (error) {
    console.error("GraphQL error:", error);
  }
  result.value = data;
  console.log(result.value);
});


const eventDemo = ref([
  {
    id: "1",
    title: "อาสาเติมสี แต้มฝันให้น้อง ณ โรงเรียนวัดบางในน้อย นครปฐม",
    eventDescription: null,
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
    description:
      "We Volunteer Spirit Thailand ขอเชิญน้องๆร่วมโครงการจิตอาสาเติมสี แต้มฝันให้น้อง ณ โรงเรียนวัดบางในน้อย อ.บางเลน จ.นครปฐม กิจกรรมสร้างสรรค์ดีๆ สำหรับน้องๆ ระดับชั้นมัธยมที่สนใจร่วมกิจกรรมเพื่อเก็บชั่วโมงอาสาและสะสมในแฟ้มประวัติผลงาน (Portfolio)",
    validate_times: 1,
    eventStatus: "CO",
  },
  {
    id: "2",
    title: "ปั้น EM Ball บำบัดน้ำเสียเพื่อชุมชน อา 05 พย 66 (BTS คลองสาน)",
    eventDescription: null,
    amountReceived: "50",
    category: "Volunteers",
    subCategory: "Environmental",
    startDate: "2023-11-05T09:30:00Z",
    endDate: "2023-11-05T16:30:00Z",
    registerStartDate: "2023-10-04T23:59:00Z",
    registerEndDate: "2023-11-04T23:59:00Z",
    validationType: "CURRENT_GPS",
    validationRules: 10,
    posterImg:
      "https://firebasestorage.googleapis.com/v0/b/vevent-capstone.appspot.com/o/NK-2%2FPoster_image%2Fevent02.png?alt=media&token=7f6e852c-06c9-43d7-a309-43efea6fd25d",
    createBy: "Organization.032301@gmail.com",
    createDate: "2023-10-03T08:21:00Z",
    updateBy: "Organization.032301@gmail.com",
    updateDate: "2023-10-03T08:21:00Z",
    locationName: "ลานกิจกรรมท่าดินแดง BTS คลองสาน สายสีทอง",
    locationLatitude: 13.7366819600835,
    locationLongitude: 100.503764281096,
    description:
      "ปั้น EM Ball บำบัดน้ำเสียเพื่อชุมชน อาทิตย์ 05 พฤศจิกายน 2566 (ใกล้ไอคอนสยาม BTS คลองสาน) EM Ball จุลินทรีย์ที่ใช้สำหรับบำบัดน้ำเสีย ใน คู คลอง แม่น้ำ และแหล่งน้ำเสียทุกชนิด. ช่วยกำจัดกลิ่นเน่าเสียได้ เราจะมาร่วมกันทำจิตอาสาด้วยการปั้น em ball เพื่อส่งต่อให้ชุมชน สิ่งที่อาสาจะได้รับจากการเข้าร่วมกิจกรรม ได้รับความรู้ในการทำEm ball ฝึกทำ EM ball รู้จักการแบ่งปัน",
    validate_times: 1,
    eventStatus: "CO",
  },
  {
    id: "3",
    title: "เก็บขยะชายหาด อนุรักษ์ทรัพยากรป่าชายเลน จ.ระยอง",
    eventDescription: null,
    amountReceived: "40",
    category: "Volunteers",
    subCategory: "Environmental",
    startDate: "2023-11-12T09:30:00Z",
    endDate: "2023-11-12T16:00:00Z",
    registerStartDate: "2023-10-10T00:00:00Z",
    registerEndDate: "2023-11-11T23:59:59Z",
    validationType: "QR_CODE,CURRENT_GPS",
    validationRules: 10,
    posterImg:
      "https://firebasestorage.googleapis.com/v0/b/vevent-capstone.appspot.com/o/NK-2%2FPoster_image%2Fevent03.jpeg?alt=media&token=41baadda-09a5-4b9d-a35f-fad74797a1b8",
    createBy: "Organization.032301@gmail.com",
    createDate: "2023-10-09T07:39:00Z",
    updateBy: "Organization.032301@gmail.com",
    updateDate: "2023-10-09T07:39:00Z",
    locationName: "สะพานรักษ์แสม ต.เนินฆ้อ อ.แกลง จ.ระยอง",
    locationLatitude: 12.7185566993781,
    locationLongitude: 101.656304009922,
    description:
      "กิจกรรมเก็บขยะชายหาด อนุรักษ์ทรัพยากรป่าชายเลน ( เก็บขยะ ปล่อยปู ) เยี่ยมชมเรือรบหลวงประแส 12 พ.ย. 2566 @ สะพานรักษ์แสม-เรือรบหลวงประแส-ทุ่งโปรงทอง อ.แกลง จ.ระยอง กรีน อีเว้นท์ Green Event ",
    validate_times: 1,
    eventStatus: "CO",
  },
  {
    id: "4",
    title: "ล่องแก่งเก็บขยะ จ.นครนายก 19 พ.ย. 2566",
    eventDescription: null,
    amountReceived: "40",
    category: "Volunteers",
    subCategory: "Environmental",
    startDate: "2023-11-19T09:30:00Z",
    endDate: "2023-11-19T15:00:00Z",
    registerStartDate: "2023-10-17T00:00:00Z",
    registerEndDate: "2023-11-17T23:59:00Z",
    validationType: "QR_CODE,CURRENT_GPS",
    validationRules: 20,
    posterImg:
      "https://firebasestorage.googleapis.com/v0/b/vevent-capstone.appspot.com/o/NK-2%2FPoster_image%2Fevent04.jpeg?alt=media&token=c75b54ad-e362-4528-bfa2-e1478a822dce",
    createBy: "Organization.032301@gmail.com",
    createDate: "2023-10-16T09:15:00Z",
    updateBy: "Organization.032301@gmail.com",
    updateDate: "2023-10-16T09:15:00Z",
    locationName: "เขื่อนขุนด่านปราการชล",
    locationLatitude: 14.3142082352198,
    locationLongitude: 101.321321896447,
    description:
      "กรีน อีเว้นท์ เราเป็นต้นตำหรับของกิจกรรมล่องแก่งเก็บขยะแม่น้ำนครนายก จัดรุ่นแรกเมื่อปี 2558 ออกอากาศทาง ททบ.5 หลังจากนั้น ททท. ได้ติดต่อขอข้อมูลการจัดกิจกรรม จนกระทั่งเมื่อปี 2559 ททท. ร่วมกับสมาคมล่องแก่งนครนายก ได้จัดกิจกรรมอาสาล่องแก่งเก็บขยะครั้งใหญ่ที่สุดในโลก โดยมีเรือเข้าร่วมกว่า 300 ลำ เพื่อโปรโมทการท่องเที่ยว และ CSR เกิดเป็นกระแสทำตามกัน จนสร้างงานสร้างรายได้ให้กับคนพื้นที่",
    validate_times: 1,
    eventStatus: "CO",
  },
  {
    id: "5",
    title: "อาสาทำสื่อการเรียนพวงกุญแจสูตรคูณให้น้องพท.ห่างไกล อา 26พย66",
    eventDescription: null,
    amountReceived: "50",
    category: "Volunteers",
    subCategory: "Social Services",
    startDate: "2023-04-26T09:30:00Z",
    endDate: "2023-04-26T20:00:00Z",
    registerStartDate: "2023-10-25T00:00:00Z",
    registerEndDate: "2023-11-25T23:59:00Z",
    validationType: "CURRENT_GPS",
    validationRules: 10,
    posterImg:
      "https://firebasestorage.googleapis.com/v0/b/vevent-capstone.appspot.com/o/NK-2%2FPoster_image%2Fevent05.png?alt=media&token=d07ebca7-5903-41e7-b536-ca7d4b56e0f5",
    createBy: "Organization.032301@gmail.com",
    createDate: "2023-10-24T09:48:00Z",
    updateBy: "Organization.032301@gmail.com",
    updateDate: "2023-10-24T09:48:00Z",
    locationName: "Let’s say cafe อนุสาวรีย์ชัยสมรภูมิ",
    locationLatitude: 13.762906740218,
    locationLongitude: 100.54081339644,
    description:
      "อาสาทำสื่อการเรียนพวงกุญแจสูตรคูณให้น้องพท.ห่างไกล อาทิตย์ 26 พฤศจิกายน 66 (08.30-12.30) วัตถุประสงค์ ชวนน้องๆ มาร่วมทำกิจกรรมสร้างสื่อการเรียนพวงกุญแจสูตรคูณ พวงกุญแจขนาดพกพา น้องๆ สามารถพกไปไหนมาไหน ส่งเสริมการเรียนรู้ตลอดเวลามีเกียรติบัตรรับรองให้อาสาที่เข้าร่วมกิจกรรม แจกหลังเสร็จกิจกรรม สามารถนำเอกสารหรือสมุดมาให้เซ็นเพื่อรับรองชั่วโมงกิจกรรมได้ (หากมี)",
    validate_times: 1,
    eventStatus: "CA",
  },
  {
    id: "6",
    title: "ค่ายอาสา Paint ถุงยา DIY by SPHERE สะ-เฟียร์ รุ่นที่ 4",
    eventDescription: null,
    amountReceived: "40",
    category: "Volunteers",
    subCategory: "Social Services",
    startDate: "2024-02-03T10:30:00Z",
    endDate: "2024-02-03T16:30:00Z",
    registerStartDate: "2023-12-15T00:00:00Z",
    registerEndDate: "2024-01-15T23:59:00Z",
    validationType: "QR_CODE",
    validationRules: 0,
    posterImg:
      "https://firebasestorage.googleapis.com/v0/b/vevent-capstone.appspot.com/o/NK-2%2FPoster_image%2Fevent06.png?alt=media&token=0aed3991-6ffd-4d84-b2aa-43f798fb1dbf",
    createBy: "Organization.032301@gmail.com",
    createDate: "2023-12-14T15:51:00Z",
    updateBy: "Organization.032301@gmail.com",
    updateDate: "2023-12-14T15:51:00Z",
    locationName: "กิจกรรมออนไลน์ผ่าน Zoom Meeting",
    locationLatitude: 13.6138,
    locationLongitude: 100.6175,
    description:
      "กลับมาอีกครั้งตามคำเรียกร้อง! ค่ายอาสาทำความดีออนไลน์ที่เด็กสาย Art พลาดไม่ได้! สร้างจินตนาการผ่านงาน Paint ถุงผ้า ลุยเก็บชั่วโมงและเกียรติบัตรกับ “ค่ายอาสา Paint ถุงยา DIY by SPHERE สะ-เฟียร์ รุ่นที่ 4” ",
    validate_times: 1,
    eventStatus: "UP",
  },
]);
</script>

<template>
  <div class="content">
    <div class="side-bar">
      <Sidebar></Sidebar>
    </div>
    <div>
      <div class="header" >
        <div>Events</div>
        <h2>All My Events</h2>
      <hr/>
      </div>
      <br>
      <div>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Event Name</th>
              <th>Date/Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="event in eventDemo" :key="event.id">
              <td>{{ event.id }}</td>
              <td>{{ event.title }}</td>
              <td>{{ event.startDate }}</td>
              <td>{{ event.eventStatus }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div>Events List</div>
  <!-- <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div> -->
  <div>{{ result }}</div>
  <!-- <div v-if="loading">Loading data...</div>
  <div v-else-if="error">Error: {{ error.message }}</div> -->
  <!-- <ul v-else>
    <li v-for="event in data">
      {{ event.title}}
    </li>
  </ul> -->
</template>


<style>
.content {


  margin-top: 40px;
  margin-left: 0;
}
.side_bar {
  grid-column-start: 1;
  grid-column-end: 2;
}

.header {
  text-align: start;
  line-height: 80%;
}


</style>
