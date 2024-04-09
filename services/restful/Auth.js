// import { compact } from '@apollo/client/utilities';
// import router from './router';
// import { computed, ref } from 'vue';
// import { empty } from '@apollo/client';\
import axios from "axios";

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

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_ENV}/auth`,
      data
    );

    // Handle successful deletion response here
    console.log(response.data);
    
  } catch (error) {
    // Handle error with informative message
    console.error("Error deleting event:", error.message);
  }
}

export const getRefreshToken = async () => {
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

export const storeToken = () => {
  const accessToken = ref(localStorage.getItem("access_token"));
  const userRole = ref("");
  const userEmail = ref("");

  const getAccessToken = computed(() => {
    return accessToken.value;
  });

  const getUserRole = computed(() => {
    return userRole.value;
  });

  const getUserEmail = computed(() => {
    return userEmail.value;
  });

  const setAccessToken = (token) => {
    if (token === null) {
      accessToken.value = "";
      return;
    }
    accessToken.value = token;
  };

  const setUserRole = (role) => {
    if (role === null) {
      userRole.value = "";
      return;
    }
    userRole.value = role;
  };

  const setUserEmail = (email) => {
    if (email === null) {
      userEmail.value = "";
      return;
    }
    userEmail.value = email;
  };

  return {
    accessToken,
    userRole,
    userEmail,
    setAccessToken,
    setUserRole,
    setUserEmail,
    getAccessToken,
    getUserRole,
    getUserEmail,
  };
};

export default { auth, getRefreshToken };
