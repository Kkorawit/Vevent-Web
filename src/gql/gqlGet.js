import gql from "graphql-tag";
import { ref } from "vue";
import { useApolloClient, useQuery } from "@vue/apollo-composable";
import { GET_ALL_CREATEDBY_QUERY,GET_ONE_EVENT_ID } from '@/gql/setup/gqlQuery.js';
import { id } from "vuetify/locale";

export async function getAllEvents () {
  let query = gql`
  query AllEvents {
    allEvents {
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
    const { resolveClient } = useApolloClient();
    const client = resolveClient();
    const { data,error } = await client.query({
    query: query,
  });
  console.log(data.allEvents);
  if(error){
    console.error('GraphQL error:',error.value)
    return { error: true}
  }
  return data?.allEvents || []

}


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



export async function getEventDetailById (eid) {
  console.log("get event detail gql")
  let query = gql`
  query FindEventDetailsByEventId {
    findEventDetailsByEventId(id: ${eid}) {
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
    console.log(eid);
    const { resolveClient } = useApolloClient();
    const client = resolveClient();
    const { data,error } = await client.query({
    // query:  GET_ONE_EVENT_ID,
    query:  query,
    // variables: {
    //   id: eid, // Use the reactive email value
    // },
  });
  console.log(data.findEventDetailsByEventId);
  if(error){
    console.error('GraphQL error:',error.value)
    return { error: true}
  }
  
  return data?.findEventDetailsByEventId || []

}


export async function getAllEventRegisEventByUEmail (email) {
  console.log(email);
  console.log("get event event by email gql")
  let query = gql`
  query FindAllRegisEventsByUEmail {
    findAllRegisEventsByUEmail(uEmail: "${email}") {
        user_event_id
        status
        doneTimes
        event {
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
}
`;
    console.log(email);
    const { resolveClient } = useApolloClient();
    const client = resolveClient();
    const { data,error } = await client.query({
    query:  query,
  });
  console.log(data.findAllRegisEventsByUEmail);
  if(error){
    console.error('GraphQL error:',error.value)
    return { error: true}
  }
  
  return data?.findAllRegisEventsByUEmail || []

}


export async function getAllParticipantsByEventId (id) {
  console.log(id);
  console.log("get paarticipants by id gql")
  let query = gql`
  query FindAllParticipantsByEventId {
    findAllParticipantsByEventId(eid: ${id}) {
        status
        user {
            userEmail
            role
            displayName
            profileImg
        }
    }
}
`;
    console.log(id);
    const { resolveClient } = useApolloClient();
    const client = resolveClient();
    const { data,error } = await client.query({
    query:  query,
  });
  console.log(data.findAllParticipantsByEventId);
  if(error){
    console.error('GraphQL error:',error.value)
    return { error: true}
  }
  
  return data?.findAllParticipantsByEventId || []

}



export default ({getAllEventCreatedByUEmail , getEventDetailById, getAllEventRegisEventByUEmail, getAllParticipantsByEventId , getAllEvents})






