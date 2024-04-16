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
  console.log("In axios");
  console.log("display: "+displayName);
  console.log(localStorage.getItem("access_token"));
  await axios
    .post(
      `${import.meta.env.VITE_API_ENV}/edit-account`,null,
      // `http://cp23kw1.sit.kmutt.ac.th/dev/api/edit-account?dname=${displayName}`,
      {
        params:{
          dname:displayName
        },
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    )
    .then((response) => {
      console.log("thennnnnnnnnnnnnnnnnnnn");
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.log("erorrrrrrrrrrrrrrrrrr");
      console.log(error);
    });

  // Handle successful deletion response here
  // Handle error with informative message
}
