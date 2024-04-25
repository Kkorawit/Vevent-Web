// import { compact } from '@apollo/client/utilities';
// import router from './router';
// import { computed, ref } from 'vue';
// import { empty } from '@apollo/client';\
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export async function auth(email, role, displayName, profileImg) {
  console.log(email);
  console.log(role);
  console.log(displayName);
  console.log(profileImg);
  const data = {
    email: email,
    role:role,
    profileImg: profileImg,
  };
  
  if(role!="Guest"){
    console.log("have role");
    data.displayName = displayName
  }

    let response = await axios.post(
      // `${import.meta.env.VITE_API_ENV}/auth`,
      `https://capstone23.sit.kmutt.ac.th/kw1/dev/api/auth`,
      // `http://localhost:8080/local/api/auth`,
      data
    ).then(response => {
      console.log(response.data);
      setToken(response.data)
      getUserInfo()
      return response.data
    }).catch(error => {
      console.log(error);
    });
    // Handle successful deletion response here
    // Handle error with informative message
    return response
}

export const fetchRefreshToken = async () => {
  console.log("get refresh token");
  const res = await fetch(`${import.meta.env.APP_API_ENV}/refresh-token`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("refresh_token")}`,
    },
  });
  if (res.status == 200) {
    console.log(res.status);
    let tokens = await res.json();
    localStorage.setItem("access_token", tokens.access_token);
    localStorage.setItem("refresh_token", tokens.refresh_token);
    return 200;
  } else if (res.status == 401) {
    console.log("Refresh Token is expired");
    localStorage.clear();
    alert("Please Sign-in again.");
    return 401;
  }
};

export const setToken = (obj) => {
  localStorage.setItem("access_token",obj.access_token)
  localStorage.setItem("refresh_token",obj.refresh_token)
}

const setUserInfo = (obj) => {
  console.log(obj);
  localStorage.setItem("role",obj.role)
  localStorage.setItem("email",obj.email)
  localStorage.setItem("displayName",obj.displayName)
  localStorage.setItem("profileImg",obj.profileImg)
}

export const getUserInfo = async () => {
  let access_token = localStorage.getItem("access_token")

  let info = decodeToken(access_token)
  console.log(info);
  setUserInfo(info)
}

export const clearStorage = () => {
  localStorage.clear()
}

// export const getRefreshToken = () => {
//   let refresh_token = localStorage.getItem("refresh_token")
//   return decodeToken(refresh_token);
// }

export const decodeToken = (token) => {
  let details = jwtDecode(token)

  let userInfo = {
    "email":details.sub,
    "profileImg":details.profileURL,
    "displayName":details.displayName,
    "role":details.role[0],
  }

  return userInfo
}

export default { 
  auth, 
  fetchRefreshToken,
  decodeToken,
  setToken,
  getUserInfo,
  clearStorage,
  // getRefreshToken,
 };
