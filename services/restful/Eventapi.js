import { data } from "autoprefixer";
import axios from "axios";
import moment from "moment";
import { formatDateTime } from "@/extend/formatDateTime.js";
import { nearbyMarkers } from "@/extend/mapStore";

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
  let response = await axios
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

      return response
    })
    .catch((error) => {
      console.log(error.data);
    });

    return response
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
  console.log("efoijaneogifjnoegss");
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
    startDate: event.newStartDate,
    endDate: event.newEndDate,
    registerStartDate: event.newRegisterStartDate,
    registerEndDate: event.newRegisterEndDate,   
     validationType: event.newValidationType,
    validationRules: event.newValidationType=='QR_CODE'?0:event.newValidationRules,
    posterImg: event.newPosterImg,
    updateBy: localStorage.getItem("email"),
    locationName: event.newLocationName,
    locationLatitude: event.newLocationLatitude,
    locationLongitude: event.newLocationLongitude,
  };
console.log(data);

  let response = await axios
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
      return response;
    })
    .catch((error) => {
      console.error(error);
    });

    return response
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
