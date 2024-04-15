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
      // `${import.meta.env.VITE_API_ENV}/auth`,
      `http://localhost:8080/local/api/edit-account?dname=${displayName}`,
      {
        headers: {
          'Access-Control-Allow-Origin': "*",
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJwcm9maWxlVVJMIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jTENYVGhxa1lodV9jREZ5NDNVZGJUMHdScllrRnZjcHJBd3NwLTFFVWZINW0yWE9RPXM5Ni1jIiwic3ViIjoiYmtvc3MxNzE1Mjk0OEBnbWFpbC5jb20iLCJyb2xlIjpbIlBhcnRpY2lwYW50cyJdLCJkaXNwbGF5TmFtZSI6IktvcmF3aXQgV2F0dGEuIiwiZXhwIjoxNzEzMTE2OTM3LCJpYXQiOjE3MTMxMTUxMzd9.O5IuoayPfws-ZXv4MnqHSVZcSTBVNkMhD7XG-n87LNNKrxjuue4gQzzf5iYRGmq_y9431NmE2QMFL2UDvJP35g`,
        },
      }
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
