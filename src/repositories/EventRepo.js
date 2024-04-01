import gql from "graphql-tag";
import { ref } from "vue";
import { useApolloClient } from "@vue/apollo-composable";







export async function getAllEvent () {
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
  console.log(query);
const { resolveClient } = useApolloClient();
const client = resolveClient();
const result = ref();

  const { data, error } = await client.query({
    query: query,
  });
  if (error) {
    console.error("GraphQL error:", error);
  }
  return result.value = data;


}


export async function getAllEventCreatedByUEmail (email) {
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





export async function getEventById (id) {
  console.log("มึงเข้าไหมเนี้ยไอ้เหี้ย");
  let query = gql`
  query FindAllRegisEventsByUEmail {
    findEventDetailsByEventId(id: ${id}) {
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

const { resolveClient } = useApolloClient();
const client = resolveClient();
const result = ref();

result.value = ref();
const { data, error } = await client.query({
  query: query,
});
console.log("มึงเข้าไหมเนี้ยไอ้เหี้ย");
if (error) {
  console.log("มึงเข้าไหมเนี้ยไอ้เหี้ย");
  console.error("GraphQL error:", error);
}
console.log("มึงเข้าไหมเนี้ยไอ้เหี้ย");
return result.value = data;


}


export default ({getAllEventCreatedByUEmail,getAllEvent,getEventById});