<template>
    <div class="wrappper">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base" style="background: #217346;">
                    <img :src="require('@/assets/img/rightMenu/xiaozu.png')" alt="">
                </div>
                <span class="headerTitle">日程一览表</span>
            </div>
            <div class="headerRight">
                <a-button type="primary" @click="handleAddSchedule">新建日程</a-button>
                <a-button class="ml10" @click="exportSchedule">导出</a-button>
            </div>
        </div>
        <div class="calendarBody">
            <TableCalendar />
        </div>
        <NewSchedule v-if="isSchedule" :isShow="isSchedule" @cancel="cancelNewSchedule" />
        <AddSchedule v-if="isAddSchedule" :isShow="isAddSchedule" @cancel="cancelAddSchedule"
            :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" :id="id" @selectVal="handleNewScheduleVal"
            :paramsTime="paramsTime" />
    </div>
</template>
<script setup>
// import "@/style/oldIcon/iconfont.css";
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
import CalendarVue from "@/components/schedule/calendar/ScheduleCalendar.vue";
import NewSchedule from "@/components/schedule/NewSchedule.vue";
import AddSchedule from "@/components/schedule/AddSchedule.vue";
import TableCalendar from "@/components/scheduleTable/TableCalendar.vue";
import { message } from "ant-design-vue";
import Interface from "@/utils/Interface.js";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const data = reactive({
    current: 1,
    isSchedule: false,
    isAddSchedule: false,
    isShare: false,
    fileParams: {},
    id: '',
    paramsTime: {
        date: "",
        time: ""
    },
    objectTypeCode: '4200',
    sObjectName: 'ActivityPointer',
});
const { current, isSchedule, isAddSchedule, fileParams, id, paramsTime, objectTypeCode, sObjectName } = toRefs(data);

const handleAddSchedule = () => {
    // data.isSchedule =  true;
    data.isAddSchedule = true;
}
const exportSchedule = () => {

}
// 关闭新建
const cancelNewSchedule = (e) => {
    data.isSchedule = e;
}
const cancelAddSchedule = (e) => {
    data.isAddSchedule = e;
}
const handleNewScheduleVal = (e) => {
    data.isAddSchedule = false;
}
</script>
<style lang="less" scoped>
.wrappper {
    width: 100%;
    height: 100%;

    .calendarBody {
        height: calc(~"100% - 52px");
        background: #fff;
    }
}
</style>