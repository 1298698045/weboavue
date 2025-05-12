<template>
    <div class="wrappper">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base" style="background: #217346;">
                    <img :src="require('@/assets/img/rightMenu/xiaozu.png')" alt="">
                </div>
                <span class="headerTitle">车辆使用情况</span>
            </div>
            <div class="headerRight">
                <a-button type="primary" @click="handleAddVehicle">新建</a-button>
            </div>
        </div>
        <div class="calendarBody">
            <div class="calendarRight">
                <CalendarVue ref="CalendarWrap" v-if="current == 1" />
            </div>
        </div>
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
    defineProps,
    defineExpose,
    defineEmits,
    nextTick
} from "vue";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
import CalendarVue from "@/components/Vehicle/VehicleCalendar.vue";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
const { proxy } = getCurrentInstance();
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const CalendarWrap = ref(null);
const data = reactive({
    current: 1,
});
const { current } = toRefs(data);
// 新建用车申请
const handleAddVehicle = () => {
    nextTick(() => {
        CalendarWrap.value.handleOpenNew();
    })
}
</script>
<style lang="less" scoped>
.wrappper {
    width: 100%;
    height: 100%;

    .calendarBody {
        display: flex;
        height: calc(~"100% - 52px");

        .leftMenuWrapper {
            min-width: 115px;
            width: 115px;
            height: 100%;
            padding: 8px 8px;
            border-right: 1px solid #e5e6eb;
            background: #fff;

            .leftTabMenu {
                width: 100%;
                height: 40px;
                line-height: 40px;
                display: flex;
                align-items: center;
                color: #4e5969;
                background: #fff;
                cursor: pointer;
                box-sizing: border-box;
                margin-bottom: 4px;
                border-radius: 2px;

                &.active {
                    color: var(--textColor);
                    background: #f2f3f5;
                }

                .iconfont {
                    padding-left: 10px;
                    font-size: 14px;
                }

                .name {
                    padding-left: 8px;
                }

                &:hover {
                    background: #f2f3f5;
                }

                &.active:hover {
                    font-weight: bold;
                }
            }
        }

        .calendarRight {
            flex: 1;
            height: 100%;
            background: #fff;
        }
    }
}
</style>