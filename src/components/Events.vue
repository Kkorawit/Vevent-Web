<script setup>
import gql from 'graphql-tag'

const uEmail = "Organization.032301@gmail.com";

const GET_EVENTS = gql `
query FindAllRegisEventsByUEmail {
    findAllEventCreatedByUEmail(uEmail: ${uEmail}) {
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
  async mounted() {
    const response = await this.$apollo.query({
      query: GET_EVENTS,
      variables: { uEmail: uEmail }, // Replace with your actual ID
    });

    this.data = response.data;
  },
};



</script>

<template>
    <div>
        <H1>{{ data.id }}</H1>
    </div>
</template>