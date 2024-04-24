import { data } from "autoprefixer";
import axios from "axios";
import moment from "moment";
import { formatDateTime } from "@/extend/formatDateTime.js";

export async function createEvent(event){

  console.log(event);
  console.log(formatDateTime(event.startDate))
  
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
  console.log(data);
    await axios.post(
      `${import.meta.env.VITE_API_ENV}/create-event`,
      data,
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        },
        params:{
          currentDT:moment().format('YYYY-MM-DDTHH:mm:ss[Z]')
        }
      
      }
    ).then(response => {
      console.log(response.data);
      return response.data
    }).catch(error => {
      console.log(error.data);
    })

}


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


