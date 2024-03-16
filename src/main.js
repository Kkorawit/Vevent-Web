import { createApp } from 'vue';
import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client/core';
import { DefaultApolloClient, provideApolloClient } from '@vue/apollo-composable';
import App from '@/App.vue';
import router from '@/plugins/router';
import '@/style.css'

const httpLink = createHttpLink({
    uri: 'https://capstone23.sit.kmutt.ac.th/kw1/dev/graphql',
});

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

const app = createApp(App);
app.use(router);
app.provide(DefaultApolloClient, apolloClient);
app.mount('#app');



