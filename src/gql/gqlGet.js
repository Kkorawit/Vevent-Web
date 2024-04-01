import gql from "graphql-tag";
import { ref } from "vue";
import { useApolloClient, useQuery } from "@vue/apollo-composable";
import { GET_ALL_CREATEDBY_QUERY } from '@/gql/setup/gqlQuery.js';

export async function getAllEventCreatedByUEmail (email) {
  let query = gql`
  query FindAllEventCreatedByUEmail($uEmail: ID!) {
    findAllEventCreatedByUEmail(uEmail: $uEmail) {
      id
      title
      description
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
      validate_times
      eventStatus
    }
  }
`;
    console.log(email);
    const { resolveClient } = useApolloClient();
    const client = resolveClient();
    const { data,error } = await client.query({
    query: GET_ALL_CREATEDBY_QUERY,
    variables: {
      uEmail: email, // Use the reactive email value
    },
  });
  console.log(data.findAllEventCreatedByUEmail);
  // console.log(error);
  // if(loading.value){
  //   return {loading:true}
  // }
  if(error){
    console.error('GraphQL error:',error.value)
    return { error: true}
  }
  
  return data?.findAllEventCreatedByUEmail || []

}


// export async function getAllEventCreatedByUEmail (email) {
//   let query = gql`
//   query FindAllEventCreatedByUEmail  {
//     findAllEventCreatedByUEmail (uEmail: "'${email}'" )  {
//         id
//         title
//         description
//         amountReceived
//         category
//         subCategory
//         startDate
//         endDate
//         registerStartDate
//         registerEndDate
//         validationType
//         validationRules
//         posterImg
//         createBy
//         createDate
//         updateBy
//         updateDate
//         locationName
//         locationLatitude
//         locationLongitude
//         validate_times
//         eventStatus
//     }
// }
// `;
// console.log("test repo");
// const { resolveClient } = useApolloClient();
// const client = resolveClient();
// const result = ref();

// result.value = ref();
// const { data, error } = await client.query({
//   query: query,
// });
// if (error) {
//   console.error("GraphQL error:", error);
// }
// return result.value = data;


// }

// export async function getAllEventCreatedByUEmail (mail) {

//   let query = gql`
//   query FindAllEventCreatedByUEmail($uEmail: String!)  {
//     findAllEventCreatedByUEmail (uEmail: $uEmail )  {
//         id
//         title
//         description
//         amountReceived
//         category
//         subCategory
//         startDate
//         endDate
//         registerStartDate
//         registerEndDate
//         validationType
//         validationRules
//         posterImg
//         createBy
//         createDate
//         updateBy
//         updateDate
//         locationName
//         locationLatitude
//         locationLongitude
//         validate_times
//         eventStatus
//     }
// }
// `;

// console.log("test repo");
// const { result, error, loading } = useQuery(query, {
//   variables: {
//     uEmail: mail
//   }
// })
// if(loading.value){
//   return {loading:true};
// }

// if(error.value){
//   console.error('GraphQL error:',error.value)
//   return { error: true}
// }

// const event = result.data?.findAllEventCreatedByEmail || [];
// const { resolveClient } = useApolloClient();
// const client = resolveClient();
// const result = ref();

// result.value = ref();
// const { data, error } = await client.query({
//   query: query,
// });
// if (error) {
//   console.error("GraphQL error:", error);
// }
// return { event }


// }


export default ({getAllEventCreatedByUEmail})






