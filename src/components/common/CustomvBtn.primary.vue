<script setup>
import { defineProps,ref } from 'vue'
const props = defineProps({
    label:{
        type:String,
        require:true,
    },
    isValid:{
        type:Boolean,
        require:false,
    },
    isAllowPolicy:{
        type:Boolean,
        require:false,
    },
    selectedRole:{
        type:String,
        require:false,
    },
})

</script>

<template>
<div>
    <v-btn :disabled="!(props.isValid&&props.isAllowPolicy&&selectedRole!=0)" type="submit" class="w-full h-[56px] text-white font-medium text-[18px]" color="#4520CC">{{props.label}}</v-btn>
</div>
</template>

<style>

</style>