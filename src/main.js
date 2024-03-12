import { createApp, h, provide } from 'vue'
import '@/style.css'
import router from '@/plugins/router'
import App from '@/App.vue'
import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client/core'
import { DefaultApolloClient } from '@vue/apollo-composable'
// import { DefaultApolloClient } from '@vue/apollo-composable'

//HTTP connect API
const httpLink = createHttpLink({
    uri: 'https://capstone23.sit.kmutt.ac.th/kw1/dev/graphql',
})


//Cretae the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
})

// const app = createApp({});
// createApp(App).use(router).mount('#app')

const app = createApp({
    setup() {
        // provide(DefaultApolloClient, apolloClient)
        provide(DefaultApolloClient, apolloClient);
    },

    render: () => h(app),
})

// app.mount('#app')

createApp(App).use(router).provide('apolloClient', apolloClient).mount('#app');
// app.use(router).provide('apolloClient', apolloClient).mount('#app');

