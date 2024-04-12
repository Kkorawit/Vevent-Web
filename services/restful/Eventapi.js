import { data } from "autoprefixer";
import axios from "axios";
import moment from "moment";

export async function createEvent(event){
  console.log(event);
  const data = {
      "title": event.title,
      "description": event.description,
      "amountReceived": event.amountReceived,
      "category": event.category,
      "subCategory": event.subCategory,
      "startDate": event.startDate,
      "endDate": event.endDate,
      "registerStartDate": event.registerStartDate,
      "registerEndDate": event.registerEndDate,
      "validationType": event.validationType,
      "validationRules": event.validationRules,
      "posterImg": event.posterImg,
      "createBy": localStorage.getItem("email"),
      "updateBy": localStorage.getItem("email"),
      "locationName": event.locationName,
      "locationLatitude": event.locationLatitude,
      "locationLongitude": event.locationLongitude
  }

    const response = await axios.post(
      `${import.meta.env.VITE_API_ENV}/create-event`,
      data,
      {
        headers:{
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        },
      
      }
    ).then(response => {
      console.log(response.data);
    }).catch(error => {
      console.log(error.data);
    })

    return response.data
}


export async function deleteEventById (eid){
    // 2024-01-20T15:27:54.378693Z
    console.log(eid);
    const currentDT = moment().format()
    try {
        const response = await axios.delete(
          `${import.meta.env.VITE_API_ENV}/delete-event`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJPcmdhbml6YXRpb24uMDMyMzAxQGdtYWlsLmNvbSIsInJvbGUiOlsiT3JnYW5pemF0aW9uIl0sImV4cCI6MTcxMTk5MTAxMywiaWF0IjoxNzExOTg5MjEzfQ.v12byI4DkHVHym79js9NqFxwQlB7wn2-HCc2K1azp3GUs-i_OROiTICw4es3iKYC8F9ZdhAYovJ249UgUkuCBQ`
            },
            params: {
              eid: eid,
              currentDT: '2023-12-11T00:00:00Z',
            }
          }
        );
    
        // Handle successful deletion response here
        console.log(response.data);
      } catch (error) {
        // Handle error with informative message
        console.error("Error deleting event:", error.message);
      }

}

export async function editEventById (){
    
}

export async function bookEventById (){
    
}



export default ({deleteEventById,editEventById,bookEventById})


