import axios from "axios";
import moment from "moment";


export async function deleteEventById (eid){
    // 2024-01-20T15:27:54.378693Z
    console.log(eid);
    const currentDT = moment().format()
    axios.delete(`${import.meta.env.VITE_API_ENV}/delete-event?eid=${eid}&currentDT=2023s-01-20T15:27:54.378693Z`
    ,{
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJPcmdhbml6YXRpb24uMDMyMzAxQGdtYWlsLmNvbSIsInJvbGUiOlsiT3JnYW5pemF0aW9uIl0sImV4cCI6MTcxMTkyNzAzNiwiaWF0IjoxNzExOTI1MjM2fQ.nia3b5gNux2x88KwGc42VxQoT7xfHhySrkH-giVzmVyYHJRJVAik2d4sUkd7fwriGZ_m3fAhs7x1n7j7sWAK6A`
          }
    }
    )
    .then(response => {
        console.log(response.data);
    }).catch(error => {
        console.error("Error fetching", error)
    });

}

export async function editEventById (){
    
}

export async function bookEventById (){
    
}

export default ({deleteEventById,editEventById,bookEventById})


