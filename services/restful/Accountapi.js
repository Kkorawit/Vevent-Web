import axios from "axios";


// export async function updateDisplayName(displayName){
//   let response = await fetch(`/api/edit-event?dname${displayName}`,{
//     method:'POST',
//     mode: "cors",
//     headers :{
//       headers : {
//         'content-type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem("access_token")}}`
//     }
//     }
//   })
// }

export async function updateDisplayName(displayName) {
  console.log(displayName);
  let response = await axios
    .post(
      `${import.meta.env.VITE_API_ENV}/edit-account?dname=${displayName}`,
      // `http://localhost:8080/local/api/edit-account?dname=${displayName}`,
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      //   },
      // }
    )
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  // Handle successful deletion response here
  // Handle error with informative message
}
