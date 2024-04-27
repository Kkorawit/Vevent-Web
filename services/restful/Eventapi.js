import { data } from "autoprefixer";
import axios from "axios";
import moment from "moment";
import { formatDateTime } from "@/extend/formatDateTime.js";


// export async function createEvent(event){
//   console.log(event);

//   const data = {
//           "title": event.title,
//           "description": event.description,
//           "amountReceived": event.amountReceived,
//           "category": event.category,
//           "subCategory": event.subCategory,
//           "startDate": formatDateTime(event.startDate),
//           "endDate": formatDateTime(event.endDate),
//           "registerStartDate": formatDateTime(event.registerStartDate),
//           "registerEndDate": formatDateTime(event.registerEndDate),
//           "validationType": event.validationType,
//           "validationRules": event.validationRules,
//           "posterImg": event.posterImg,
//           "createBy": localStorage.getItem("email"),
//           "updateBy": localStorage.getItem("email"),
//           "locationName": event.locationName,
//           "locationLatitude": event.locationLatitude,
//           "locationLongitude": event.locationLongitude
//       }

//       const data2 = {
//         "title": "MOCK",
//         "description": "MOCK description",
//         "amountReceived": 3,
//         "category": "BB",
//         "subCategory": "CC",
//         "startDate": "2024-04-28T16:59:00Z",
//         "endDate": "2024-04-28T18:41:02Z",
//         "registerStartDate": "2024-04-28T18:41:02Z",
//         "registerEndDate": "2024-04-28T18:41:02Z",
//         "validationType": "Qr_Code,CURRENT_GPS",
//         "validationRules": 225,
//         "posterImg": "",
//         "createBy": "koraw2948@gmail.com",
//         // "createDate": "2024-04-24T18:41:02ZZ",
//         "updateBy": "koraw2948@gmail.com",
//         // "updateDate": "2024-04-24T18:41:02Z",
//         "locationName": "โรงเรียนวัดบางในน้อย อ.บางเลน จ.นครปฐม",
//         "locationLatitude": 14.1423399808249,
//         "locationLongitude": 100.116024883473
//     }

//     const currentDT = moment().format('YYYY-MM-DDTHH:mm:ss[Z]')

//     const res = await fetch(`${import.meta.env.VITE_API_ENV}/create-event?currentDT=${currentDT}`,{
//     method:'POST',
//     headers:{
//       "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
//       'Content-Type': 'application/json'
//     },
//     body:JSON.stringify(data)
//   });

//   if(res.status!=201){
//     const textRes = await res.text()
//     console.error(textRes)
//   }
//   console.log(res.json());

// }
const currentDT = moment().format("YYYY-MM-DDTHH:mm:ss[Z]");

export async function createEvent(event) {
  console.log(event);
  console.log(formatDateTime(event.startDate));
  if(event.validationType=='QR_CODE'){
    
  }
  const data = {
    title: event.title,
    description: event.description,
    amountReceived: event.amountReceived,
    category: event.category,
    subCategory: event.subCategory,
    startDate: formatDateTime(event.startDate),
    endDate: formatDateTime(event.endDate),
    registerStartDate: formatDateTime(event.registerStartDate),
    registerEndDate: formatDateTime(event.registerEndDate),
    validationType: event.validationType,
    validationRules: event.validationType=='QR_CODE'?0:event.validationRules,
    posterImg: event.posterImg,
    createBy: localStorage.getItem("email"),
    updateBy: localStorage.getItem("email"),
    locationName: event.locationName,
    locationLatitude: event.locationLatitude,
    locationLongitude: event.locationLongitude,
  };
  console.log(data);
  console.log(localStorage.getItem("access_token"));
  await axios
    .post(
      `${import.meta.env.VITE_API_ENV}/create-event`,
      // `https://capstone23.sit.kmutt.ac.th/kw1/dev/api/create-event`,
      data,
      {
        headers: {
          "content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        params: {
          currentDT: currentDT,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      alert(response.data);
    })
    .catch((error) => {
      console.log(error.data);
    });
}

export async function deleteEventById(eid) {
  // 2024-01-20T15:27:54.378693Z
  console.log(eid);
  console.log(currentDT);

  const response = await axios.delete(
    `${import.meta.env.VITE_API_ENV}/delete-event`,
    {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        eid: eid,
        currentDT: currentDT,
      },
    }
  );

  // Handle successful deletion response here
  console.log(response.data);
}

export async function editEventById(event) {
  console.log(event);
  console.log(event.newLocationLatitude);
  console.log(event.newLocationLongitude);
  console.log(event.newLocationName);
  const data = {
    id:event.id,
    title: event.newTitle,
    description: event.newDescription,
    amountReceived: event.newAmountReceived,
    category: event.newCategory,
    subCategory: event.newSubCategory,
    startDate: formatDateTime(event.newStartDate),
    endDate: formatDateTime(event.newEndDate),
    registerStartDate: formatDateTime(event.newRegisterStartDate),
    registerEndDate: formatDateTime(event.newRegisterEndDate),
    validationType: event.newValidationType,
    validationRules: event.newValidationType=='QR_CODE'?0:event.newValidationRules,
    posterImg: event.newPosterImg,
    updateBy: localStorage.getItem("email"),
    locationName: event.newLocationName,
    locationLatitude: event.newLocationLatitude,
    locationLongitude: event.newLocationLongitude,
  };
console.log(data);

  await axios
    .put(
      `${import.meta.env.VITE_API_ENV}/edit-event`, 
      // `http://localhost:8080/local/api/edit-event`,
      data, {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        currentDT: currentDT,
      },
    })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export async function bookEventById(eid) {
  await axios.post(
    `${import.meta.env.VITE_API_ENV}/book-event`,
    {},
    {
      headers: {
        "content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      params: {
        eid: eid,
        currentDT: currentDT,
      },
    }
  ).then((response) => {
      alert(response.data)
  }).catch((error)=>{
      alert(error.response.data)
      console.error(error.response);
  });
}

export default { createEvent, deleteEventById, editEventById, bookEventById };
