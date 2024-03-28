import { createApp } from 'vue';
import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable';
import App from '@/App.vue';
import router from '@/plugins/router';
import axios from 'axios';
import GoogleSignInPluginOptions from 'vue3-google-signin';
import vue3GoogleLogin from 'vue3-google-login'
import './index.css'

const httpLink = createHttpLink({
    uri: 'https://capstone23.sit.kmutt.ac.th/kw1/dev/graphql',
});

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});


const app = createApp(App);

app.use(GoogleSignInPluginOptions, {
    clientId: '403895376917-4c0smnvq340orrujns9s26emtsaq8s1c.apps.googleusercontent.com', // Replace with your Google client ID
    scopes: ['profile', 'email'], // Request profile and email scopes
  });
  app.use(vue3GoogleLogin,{
    clientId:'403895376917-4c0smnvq340orrujns9s26emtsaq8s1c.apps.googleusercontent.com', // Replace with your Google client ID
  })
app.config.globalProperties.$axios = axios;
app.use(router);
app.provide(DefaultApolloClient, apolloClient);
app.mount('#app');



