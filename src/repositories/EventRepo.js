import gql from "graphql-tag";
import { ref } from "vue";
import { useApolloClient } from "@vue/apollo-composable";

export  async function getAllEvent () {
    let query = gql`
  query FindAllEventCreatedByUEmail {
    findAllEventCreatedByUEmail(uEmail: "Organization.032301@gmail.com") {
      id
      title
      description
      category
      startDate
      eventStatus
      posterImg
      startDate
      endDate
    }
  }
`;
  console.log("test repo");
const { resolveClient } = useApolloClient();
const client = resolveClient();
const result = ref();

result.value = ref();
  const { data, error } = await client.query({
    query: query,
  });
  if (error) {
    console.error("GraphQL error:", error);
  }
  return result.value = data;


}


export default async function getAllEventCreatedByUEmail (email) {
  let query = gql`
  query FindAllEventCreatedByUEmail  {
    findAllEventCreatedByUEmail (uEmail: "${email}")  {
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
console.log("test repo");
const { resolveClient } = useApolloClient();
const client = resolveClient();
const result = ref();

result.value = ref();
const { data, error } = await client.query({
  query: query,
});
if (error) {
  console.error("GraphQL error:", error);
}
return result.value = data;


}









