<template>
    <a-radio-group v-model:value="value" @click="changeRadioGroup">
        <slot></slot>
    </a-radio-group>
</template>
<script setup>
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        defineProps,
        defineExpose,
        defineEmits,
        h
    } from "vue";
    const props = defineProps({
        current: [String, Number]
    });
    const data = reactive({
        value: ""
    });
    data.value = props.current;
    const { value } = toRefs(data);
    const emit = defineEmits(['change']);

    watch(()=>data.value,(newVal, oldVal)=>{
        emit('change', newVal);
    });
</script>
<style lang="less" scoped>
    .ant-radio-group{
        /deep/ .ant-radio-button-wrapper{
            border-radius: 0 !important;
            width: 32px !important; 
            padding: 0 !important;
            text-align: center;
        }
    }
</style>