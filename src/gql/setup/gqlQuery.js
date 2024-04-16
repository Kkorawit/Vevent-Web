import gql from "graphql-tag";

export const GET_ALL_REGIS_QUERY = gql`
  query FindAllRegisEventsByUEmail($uEmail: String!) {
    findAllRegisEventsByUEmail(uEmail: $uEmail) {
      user_event_id
      status
      doneTimes
      user {
        userEmail
        role
        displayName
        profileImg
      }
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

export const GET_ALL_CREATEDBY_QUERY = gql`
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

export const GET_ONE_USER = gql`
  query FindAllEventCreatedByUEmail($uEmail: String!) {
    findUserByEmail(uEmail: $uEmail) {
      userEmail
      role
      displayName
      profileImg
    }
  }
`;

export const GET_ALL_PARTICIPANTS = gql`
  query FindAllParticipantsByEventId($eid: ID!) {
    findAllParticipantsByEventId(eid: $eid) {
      user_event_id
      status
      doneTimes
      user {
        userEmail
        role
        displayName
        profileImg
      }
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

export const GET_ONE_EVENT_UEID = gql`
  query FindEventDetailsByUserEventId($ueid: ID!) {
    findEventDetailsByUserEventId(id: $ueid) {
      user_event_id
      status
      doneTimes
      user {
        userEmail
        role
        displayName
        profileImg
      }
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

export const GET_ONE_EVENT_ID = gql`
  query FindEventDetailsByEventId {
    findEventDetailsByEventId(id: $id) {
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

export const GET_ALL_EVENT_CATEGORY = gql`
  query FindEventByCategory($category: String!) {
    findEventByCategory(category: $category) {
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


export default ({
    GET_ALL_EVENT_CATEGORY,
    GET_ONE_EVENT_ID,
    GET_ONE_EVENT_UEID,
    GET_ALL_PARTICIPANTS,
    GET_ONE_USER,
    GET_ALL_CREATEDBY_QUERY,
    GET_ALL_REGIS_QUERY
})