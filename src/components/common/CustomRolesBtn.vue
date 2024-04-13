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
    <button class="w-[258px] h-[140px] cursor-pointer focus:border-2 focus:border-solid focus:border-primaryColor rounded-[15px] grid justify-items-center shadow-2xl">
        <img  class="pt-4" :src="`${props.img}`" alt="role image" />
        <div class="text-primaryColor text-[18px]">{{ props.imgText }}</div>
    </button>
</div>
</template>

<style>

</style>