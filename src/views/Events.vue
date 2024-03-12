<script setup>
import Sidebar from "../components/Sidebar.vue";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import gql from "graphql-tag";
import { onBeforeMount, onBeforeUpdate, watchEffect } from "vue";
import { useQuery } from "@apollo/client";
import { ref,onMounted } from "vue";


// const uEmail = "Organization.032301@gmail.com";

const GET_EVENTS = gql`
  query FindAllRegisEventsByUEmail {
    findAllEventCreatedByUEmail(uEmail: "Organization.032301@gmail.com") {
      id
      title
      eventDescription
      amountReceived
      category
      subCategory
      startDate
      endDate
      registerStartDate
      registerEndDate
      validationType
      validationRules
      posterImg
      createBy
      createDate
      updateBy
      updateDate
      locationName
      locationLatitude
      locationLongitude
      description
      validate_times
      eventStatus
    }
  }
`;

export default {
  setup() {
    const result = ref(null);

    onMounted(async () => {
      const { data } = await useQuery(GET_EVENTS);
      result.value = data;
    });
    console.log(result.value);

    return {
      result
    }
  }
}



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
  <div v-if="loading">Loading data...</div>
  <div v-else-if="error">Error: {{ error.message }}</div>
  <ul v-else>
    <li v-for="event in data">
      {{ event.title}}
    </li>
  </ul>
</template>
