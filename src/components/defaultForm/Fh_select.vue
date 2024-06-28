<template>
    <div class="picklist">
        <div class="pickLabel">
            {{label}}
        </div>
        <div class="pickValue" @click.stop>
            <a class="pickerInp" href="javascript:;" @click.stop="handleFocus">{{selectVal}}</a>
            <div class="select-options" v-if="isFoucs">
                <ul class="scrollable">
                    <li class="options-item" v-for="(item, index) in options" :key="index" @click.stop="changeSelect(item)">
                        <a href="javascript:;" :class="{'selected':item.id==current}">
                            <b></b>
                            {{item.label}}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h, nextTick, defineProps, defineEmits, defineExpose } from "vue";
    const props = defineProps({
        label: String,
        options: {
            type: Array,
        }
    });
    const emit = defineEmits(['row']);
    const data = reactive({
        current: "",
        selectVal: "",
        isFoucs: false
    });
    if(props.options){
        data.current = props.options[0].id;
        data.selectVal = props.options[0].label;
    }
    const { current, selectVal, isFoucs } = toRefs(data);
    watch(()=> data.current, (newVal, oldVal) => {
        let row = props.options.find(item=>item.id==data.current);
        emit('row', row);
    }, {deep: true, immediate: true})
    onMounted(()=>{
        window.addEventListener("click",(e)=>{
            data.isFoucs = false;
        })
    })
    const changeSelect = (item) => {
        data.selectVal = item.label;
        data.current = item.id;
        data.isFoucs = false;
    }
    const handleFocus = () => {
        data.isFoucs = true;
    }
    const blur = ()=>{
        data.isFoucs = false;
    }
</script>
<style lang="less" scoped>
    .picklist {
        .pickLabel {
            color: #444444;
            line-height: 1.5;
            margin-bottom: 4px;
        }

        .pickValue {
            width: 100%;
            position: relative;

            a.pickerInp {
                width: 100%;
                height: 30px;
                line-height: 30px;
                padding: 0 14px;
                background-image: url("~@/assets/img/select-right.svg");
                background-repeat: no-repeat;
                background-position: 97.5% 50%;
                background-size: 14px 14px, 100% 100%;
                color: #181818;
                border: 1px solid #747474;
                border-radius: 4px;
                cursor: pointer;
                display: inline-block;
            }

            a.pickerInp:focus {
                outline: 0;
                border: 1px solid #0b5cab;
                box-shadow: 0 0 3px #0176d3;
            }

            .select-options {
                position: absolute;
                width: 100%;
                top: 30px;
                background: #ffffff;
                box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.16);
                border: 1px solid #747474;
                border-radius: 4px;
                padding: 8px 0;
                margin-top: 2px;
                z-index: 999;
                .scrollable{
                    overflow-y: auto;
                    max-height: 15rem;
                    .options-item{
                        a{
                            display: block;
                            padding: 8px 12px;
                            color: #181818;
                            position: relative;
                            white-space: nowrap;
                            font-size: 12px;
                            overflow-x: hidden;
                            text-overflow: ellipsis;
                            transition: color .1s linear;
                            &:hover{
                                background: #f3f3f3;
                            }
                            b{
                                float: left;
                                display: block;
                                width: 16px;
                                height: 16px;
                                margin-right: 2px;
                            }
                        }
                        a.selected{
                            b{
                                background: url("~@/assets/img/menuitem-check.png") no-repeat center center;
                            }
                        }
                    }
                }
            }
        }

    }
</style>