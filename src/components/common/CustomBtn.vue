<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    img:{
        type:String,
        require:false,
    },
    imgText:{
        type:String,
        require:false,
    },
})

</script>

<template>
<div>
    <button class="w-[258px] h-[140px] cursor-pointer border-2 border-solid border-red-400 focus:border-blue-700 rounded-[15px] grid justify-items-center">
        <img :src="`${props.img}`" alt="" />
        <div>{{ props.imgText }}</div>
    </button>
</div>
</template>

<style>

</style>