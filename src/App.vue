<script>
import { RouterView } from "vue-router";

</script>

<template>
  <div class="grid-container">
    <div class="item">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 40px;
  /* margin: 40px; */
  /* background-color: blue; */
}

.item {
  grid-column-start: 3;
  grid-column-end: 10;

}
</style>
