import { createApp } from 'vue';
import App from '@/App.vue';
//router
import router from '@/plugins/router';
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
const httpLink = createHttpLink({
    // uri: 'https://capstone23.sit.kmutt.ac.th/kw1/dev/graphql',
    uri: `http://localhost:8080${import.meta.env.VITE_GL_ENV}`,
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
app.mount('#app');



