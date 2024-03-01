<script setup>
import { ref } from 'vue';


//Variable
let num = ref(0)

</script>


<template>
    <div>
        <div>Button</div>
        <button @click="num++">Click to plus</button>
        <p>num: {{ num }}</p>
    </div>
</template>

<style scoped></style>

