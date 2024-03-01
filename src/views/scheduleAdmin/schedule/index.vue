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
                <a-button class="ml10" @click="openShare">导出</a-button>
            </div>
        </div>
        <div class="calendarBody">
            <TableCalendar />
        </div>
        <NewSchedule :isShow="isSchedule" @cancel="cancelNewSchedule" />
        <AddSchedule :isShow="isAddSchedule" @cancel="cancelAddSchedule" />
    </div>
</template>
<script setup>
    import "@/style/oldIcon/iconfont.css";
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
    } from "vue";
    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import CalendarVue from "@/components/schedule/calendar/ScheduleCalendar.vue";
    import NewSchedule from "@/components/schedule/NewSchedule.vue";
    import AddSchedule from "@/components/schedule/AddSchedule.vue";
    import TableCalendar from "@/components/schedule/table/TableCalendar.vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        current: 1,
        isSchedule: false,
        isAddSchedule: false,
        isShare: false,
        isExport: false,
        fileParams: {}
    });
    const { current, isSchedule, isAddSchedule, isShare, isExport, fileParams } = toRefs(data);

    const handleAddSchedule = () => {
        // data.isSchedule =  true;
        data.isAddSchedule = true;
    }
    // 关闭新建
    const cancelNewSchedule = (e) => {
        data.isSchedule = e;
    }
    const cancelAddSchedule = (e) => {
        data.isAddSchedule = e;
    }
</script>
<style lang="less" scoped>
.wrappper{
    width: 100%;
    height: 100%;
    .calendarBody{
        height: calc(~"100% - 52px");
        background: #fff;
    }
}
</style>