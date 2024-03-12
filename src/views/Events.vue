<script setup>
import Sidebar from "../components/Sidebar.vue";
// import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import gql from "graphql-tag";
import { computed } from "vue";
// import { useQuery } from "@apollo/client";
import { ref,onMounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
// import { compact } from "@apollo/client/utilities";


// const uEmail = "Organization.032301@gmail.com";
const GET_EVENTS = gql`
  query FindAllEventCreatedByUEmail {
    findAllEventCreatedByUEmail(uEmail: "Organization.032301@gmail.com") {
        id
        title
    }
}
`
// const result = ref()


const { data } = useQuery(GET_EVENTS)
console.log(data);
const result = computed(()=> data.find)

// result.value = computed(()=>{
//   data.value.data.title ?? []
// })



  


// watchEffect(()=> {
//   console.log(data?.value);
//   console.log(result.value);
// })

// if (error.value) {
//   console.error('GraphQL error:', error.value);
// }


// console.log(result);
// onBeforeMount(()=>{
  
// const { data,error } = useQuery(GET_EVENTS)
// if (error.value) {
//   console.error('GraphQL error:', error.value);
// }
// const result = computed(()=> data.value ? data.value.data.title : [])

// })
// onBeforeMount(() => {
//   const { data }  = useQuery()
//   // result.value = data;
//   console.log("test on mounted");
//   // console.log(result.value);
// })

// export default {
//   setup() {
//     const result = ref(null);

//     onMounted(async () => {
//       const data = await useQuery(GET_EVENTS);
//       result.value = data;
//     });
//     console.log(result.value);

//     return {
//       result
//     }
//   }
// }



// const { data, loading, error } = useQuery(query);
// const events = UseResultReturn(result, [], result.findAllEventCreatedByUEmail);
// const events = computed(() => result.value?. all)

// watchEffect(() =>{
//     console.log(events);
// })

// export default function useGetdata(query) {
//   const GET_EVENTS = query;

//   onBeforeMount(() => {
//     console.log()
//   })

//   return useQuery(GET_EVENTS);


// }

// const { data, loading, error } = useGetdata(query);

// export default {
//   async mounted() {
//     const response = await this.$apollo.query({
//       query: GET_EVENTS,
//       variables: { uEmail: uEmail }, // Replace with your actual ID
//     });

//     // this.data = response.data;

//     var events = response.data;
//   },
// };

// export default {
//    setup() {
//     const events =  new ApolloClient({
//       link: new HttpLink({ uri: 'https://capstone23.sit.kmutt.ac.th/kw1/dev/graphql' }),
//       cache: new InMemoryCache(),
//     });

//     const { loading, error, data } = useQuery(GET_EVENTS, events);

//     return {
//       loading,
//       error,
//       data,
//     };
//   },
// };

// onBeforeMount(async () => {
//     await GET_EVENTS
//     console.log();
// })
</script>

<template>
  <div>
    <Sidebar></Sidebar>
  </div>
  <div>Events List</div>
  <!-- <div v-if="loading">Loading...</div>
  <div v-else-if="error">Error: {{ error.message }}</div> -->
  <div>{{ result }}</div>
  <!-- <div v-if="loading">Loading data...</div>
  <div v-else-if="error">Error: {{ error.message }}</div> -->
  <!-- <ul v-else>
    <li v-for="event in data">
      {{ event.title}}
    </li>
  </ul> -->
</template>
