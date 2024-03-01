<script>

</script>

<template>
  <div>
    <router-view/>
    <ul>
      <li>
        <router-link :to="{name:'home'}">Home</router-link>
        <router-link :to="{name:'a'}">A Page</router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
</style>