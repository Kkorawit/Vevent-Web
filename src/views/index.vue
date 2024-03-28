<script setup>
import {
  useTokenClient,
  useCodeClient,
  decodeCredential
} from "vue3-google-signin";
import { onMounted } from "vue"
import { googleOneTap } from "vue3-google-login"

import axios from 'axios';
import { ref } from 'vue';

onMounted(() => {
  googleOneTap()
    .then((response) => {
      // This promise is resolved when user selects an account from the the One Tap prompt
      console.log("Handle the response", response)
    })
    .catch((error) => {
      console.log("Handle the error", error)
    })
})

const access_token = ref('');
const scope = ref('');

// decodeCredential(access_token.value,()=>{
//   console.log('token');
// })
const handleOnSuccess = (response) => {
  
  console.log(response);
  access_token.value = response.access_token;
  console.log("Access Token: ", response.access_token);
  revokeAccessToken(access_token.value)
};

const handleOnError = (errorResponse) => {
  console.log("Error: ", errorResponse);
};

const { isReady:isTokenReady, login:isTokenLogin } = useTokenClient({
  scope,
  onSuccess: handleOnSuccess,
  onError: handleOnError,
  ux_mode: "popup",
  // other options
});


</script>

<template>
  <div>

    <input placeholder="Scopes" v-model="scope"></input>
    asds
    <button :disabled="!isTokenReady" @click="() => isTokenLogin()">Login with Google</button>
    {{ isReady }}
    <!-- <GoogleSignInButton text="signin_with"></GoogleSignInButton> -->
      <!-- <div id=btnWrap>
        <div id="g_id_onload"
        data-client-id="403895376917-4c0smnvq340orrujns9s26emtsaq8s1c.apps.googleusercontent.com"
        data-ux_mode="popup"
        data-contect="signin"
        data-callback="handleCredentialResponse"
        data-auto_prompt="false"
        ></div>

        <div class="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
        ></div>
      </div> -->
  </div>
</template>

<style></style>
