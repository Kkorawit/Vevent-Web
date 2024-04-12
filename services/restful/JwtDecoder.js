import jwtDecode from 'jwt-decode';

const token = ref(localStorage.getItem("access_token")); // Store your JWT token here
const decodedToken = ref(null);

const decodeToken = () => {
  if (token.value) {
    try {
      decodedToken.value = jwtDecode(token.value);
      localStorage.setItem("email",decodedToken.value.data)
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  } else {
    decodedToken.value = null; // Clear decoded data if no token
  }
};

// Call decodeToken whenever the token changes
watch(token, decodeToken);
export default {decodeToken}