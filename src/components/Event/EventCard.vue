<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
    allEvents:{
        type:Array[Object],
        require:true
    }
})





</script>

<template>
    <div class="grid grid-cols-3 gap-[40px] mx-[80px] my-[40px]">
     <div class="" v-for="eventObj in props.allEvents" :key="eventObj.id">

        <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-img
      class="align-end text-white"
      height="200"
      :src="eventObj.posterImg"
      cover
    >
      <v-card-title>{{ eventObj.title }}</v-card-title>
    </v-img>

    <!-- <v-card-subtitle class="pt-4">
      Number 10
    </v-card-subtitle> -->

    <v-card-text>
      <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>

    <!-- <v-card-actions>
      <v-btn color="orange">
        Share
      </v-btn>

      <v-btn color="orange">
        Explore
      </v-btn>
    </v-card-actions> -->
  </v-card>

    </div>
    </div>
</template>

<style>

</style>