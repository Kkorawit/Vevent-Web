import axios from "axios";
import moment from "moment";


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


