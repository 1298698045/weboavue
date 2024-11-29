<template>
    <div class="inputColor">
        <a-input v-model:value="color.hex">
            <template #suffix>
                <a-dropdown :open="showPicker"
                @openChange="handleVisibleChange"  trigger="click">
                    <div class="colorPickerBtn" :class="{'active':color.hex!=''}" :style="{background:color.hex!=''?color.hex:'#fff'}"></div>
                    <template #overlay>
                        <div @mousedown.stop>
                            <Chrome v-model="color" @input="changeColor" />
                        </div>
                    </template>
                </a-dropdown>
            </template>
        </a-input>
    </div>
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
        toRaw,
        nextTick,
        defineEmits,
        defineProps,
        defineExpose,
        inject,
    } from "vue";
    import { Chrome } from '@ckpack/vue-color';

    const props = defineProps({
        color: String
    })
    const emit = defineEmits(['change']);


    const data = reactive({
        color: {
            hex: '',
        },
        showPicker: false,
    });
    const { color, showPicker } = toRefs(data);

    if(props.color){
        data.color.hex = props.color;
    }

    const  handleVisibleChange = (val)=> {
      data.showPicker = val;
    }
    const handleColorPicker = () => {
        console.log("color");
    }

    const changeColor = (e) => {
        console.log("e", 123123123);
    }

    watch(()=>data.color, (newVal, oldVal)=>{
        emit("change", data.color);
    });
</script>
<style lang="less" scoped>
    .colorPickerBtn{
        position: relative;
        width: 26px;
        height: 26px;
        background: #fff;
        cursor: pointer;
        border: 1px solid #000;
        &::after,&::before{
            content: '';
            position: absolute;
            right: 0;
            bottom: 0;
            border-left: 23px solid transparent;
        }
        &::after{
            left: 1px;
            top: 0;
            border-bottom: 23px solid #fff;
        }
        &::before{
            top: 0;
            left: 0;
            border-bottom: 23px solid #ff4d4f;
        }
        &.active{
            &::after,&::before{
                display: none;
            }
        }
    }
</style>