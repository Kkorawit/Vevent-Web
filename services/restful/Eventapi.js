import { data } from "autoprefixer";
import axios from "axios";
import moment from "moment";
import { formatDateTime } from "@/extend/formatDateTime.js";

export async function createEvent(event){
  console.log(event);

  const data = {
          "title": event.title,
          "description": event.description,
          "amountReceived": event.amountReceived,
          "category": event.category,
          "subCategory": event.subCategory,
          "startDate": formatDateTime(event.startDate),
          "endDate": formatDateTime(event.endDate),
          "registerStartDate": formatDateTime(event.registerStartDate),
          "registerEndDate": formatDateTime(event.registerEndDate),
          "validationType": event.validationType,
          "validationRules": event.validationRules,
          "posterImg": event.posterImg,
          "createBy": localStorage.getItem("email"),
          "updateBy": localStorage.getItem("email"),
          "locationName": event.locationName,
          "locationLatitude": event.locationLatitude,
          "locationLongitude": event.locationLongitude
      }

  const res = await fetch(`${import.meta.env.VITE_API_ENV}/create-event`,{
    method:'POST',
    headers:{
      'content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.getItem("access_token")}`
    },
    body:JSON.stringify(data)
  }).then((response)=>{
    console.log(response.json());
    return response.json()
  }).catch((error)=>{
    console.log(error);
  });

 
}

// export async function createEvent(event){

//   console.log(event);
//   console.log(formatDateTime(event.startDate))
//   const currentDT = moment().format('YYYY-MM-DDTHH:mm:ss[Z]')
//   console.log(currentDT);

//   const data = {
//       "title": event.title,
//       "description": event.description,
//       "amountReceived": event.amountReceived,
//       "category": event.category,
//       "subCategory": event.subCategory,
//       "startDate": formatDateTime(event.startDate),
//       "endDate": formatDateTime(event.endDate),
//       "registerStartDate": formatDateTime(event.registerStartDate),
//       "registerEndDate": formatDateTime(event.registerEndDate),
//       "validationType": event.validationType,
//       "validationRules": event.validationRules,
//       "posterImg": event.posterImg,
//       "createBy": localStorage.getItem("email"),
//       "updateBy": localStorage.getItem("email"),
//       "locationName": event.locationName,
//       "locationLatitude": event.locationLatitude,
//       "locationLongitude": event.locationLongitude
//   }
//   console.log(data);
//   console.log(localStorage.getItem("access_token"));
//     await axios.post(
//       `${import.meta.env.VITE_API_ENV}/create-event`,
//       // `https://capstone23.sit.kmutt.ac.th/kw1/dev/api/create-event`,
//       data,
//       {
//         headers:{
//           'content-Type': 'application/json',
//           "Authorization": `Bearer ${localStorage.getItem("access_token")}`
//         },
//         params:{
//           currentDT:currentDT
//         }
      
//       }
//     ).then(response => {
//       console.log(response.data);
//       return response.data
//     }).catch(error => {
//       console.log(error.data);
//     })

// }


export async function deleteEventById (eid){
    // 2024-01-20T15:27:54.378693Z
    console.log(eid);
    const currentDT = moment().format()
    console.log(currentDT)

        const response = await axios.delete(
          `${import.meta.env.VITE_API_ENV}/delete-event`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("access_token")}`
            },
            params: {
              eid: eid,
              currentDT: '2023-12-11T00:00:00Z',
            }
          }
        );

        // Handle successful deletion response here
        console.log(response.data);


}

export async function editEventById (){
    
}

export async function bookEventById (){
    
}



export default ({createEvent,deleteEventById,editEventById,bookEventById})


