import { createApp } from 'vue';
import App from '@/App.vue';
//router
import router from '@/plugins/router.js';
//axios
import axios from 'axios';
//vue3 google login
import vue3GoogleLogin from 'vue3-google-login'
import './index.css'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  ssr:true,
})

//apollo client
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { createHttpLink } from '@apollo/client/link/http';
import { DefaultApolloClient} from '@vue/apollo-composable';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
const httpLink = createHttpLink({
    // uri: 'https://capstone23.sit.kmutt.ac.th/kw1/dev/graphql',
    uri: `http://localhost:8080/local/graphql`,
});

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});


const app = createApp(App);
  app.use(vue3GoogleLogin,{
    clientId:'403895376917-4c0smnvq340orrujns9s26emtsaq8s1c.apps.googleusercontent.com', // Replace with your Google client ID
  })
app.config.globalProperties.$axios = axios;
app.use(router);
app.use(vuetify);
app.provide(DefaultApolloClient, apolloClient);
app.component('VueDatePicker', VueDatePicker);
app.mount('#app');



