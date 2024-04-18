<template>
    <div class="wrappper">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base" style="background: #217346;">
                    <img :src="require('@/assets/img/rightMenu/xiaozu.png')" alt="">
                </div>
                <span class="headerTitle">领导日程</span>
            </div>
            <div class="headerRight">
                <dRadioGroup :current="current" @change="changeRadioGroup">
                    <a-radio-button :value="0">
                        <i class="iconfont icon-liebiaoshitu"></i>
                    </a-radio-button>
                    <a-radio-button :value="1">
                        <i class="iconfont icon-rilishitu"></i>
                    </a-radio-button>
                </dRadioGroup>
                <a-button type="primary" class="ml10" @click="handleAddSchedule">新建日程</a-button>
            </div>
        </div>
        <div class="calendarBody">
            <!-- <div class="leftMenuWrapper">
                <div class="leftTabMenu" :class="{'active':current==0}" @click="current=0">
                    <div class="menuIcon">
                        <i class="iconfont icon-rililiebiao"></i>
                    </div>
                    <div class="name">
                        列表
                    </div>
                </div>
                <div class="leftTabMenu" :class="{'active':current==1}" @click="current=1">
                    <div class="menuIcon">
                        <i class="iconfont icon-rili1"></i>
                    </div>
                    <div class="name">
                        日历
                    </div>
                </div>
            </div> -->
            <div class="calendarRight">
                <ListView v-if="current==0" />
                <CalendarVue v-if="current==1" @openDateNew="handleOpenDateNew" />
            </div>
        </div>
        <NewSchedule :isShow="isSchedule" @cancel="cancelNewSchedule" />
        <AddSchedule :isShow="isAddSchedule" v-if="isAddSchedule" :paramsTime="paramsTime" @cancel="cancelAddSchedule" />
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
    } from "vue";
    import "@/style/schedule/icon/iconfont.css";
    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import ListView from "@/components/meeting/meetingCalendar/List.vue";
    import CalendarVue from "@/components/leaderSchedule/LeaderCalendar.vue";

    import NewSchedule from "@/components/schedule/NewSchedule.vue";
    import AddSchedule from "@/components/schedule/AddSchedule.vue";
    import dRadioGroup from "@/components/antDefault/Dradio-group.vue"

    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        current: 1,
        isSchedule: false,
        isAddSchedule: false,
        paramsTime: {
            date: "",
            time: ""
        }
    });
    const { current, isSchedule, isAddSchedule, paramsTime } = toRefs(data);
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
    };
    const handleOpenDateNew = (e) => {
        console.log("parent", e);
        data.paramsTime = e;
        data.isAddSchedule = true;
    }
    const changeRadioGroup = (e) => {
        data.current = e;
    }
</script>
<style lang="less" scoped>
    .wrappper{
        width: 100%;
        height: 100%;
        .calendarBody{
            display: flex;
            height: calc(~"100% - 52px");
            .leftMenuWrapper{
                min-width: 115px;
                width: 115px;
                height: 100%;
                padding: 8px 8px;
                border-right: 1px solid #e5e6eb;
                background: #fff;
                .leftTabMenu{
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
                    &.active{
                        color: var(--textColor);
                        background: #f2f3f5;
                    }
                    .iconfont{
                        padding-left: 10px;
                        font-size: 14px;
                    }
                    .name{
                        padding-left: 8px;
                    }
                    &:hover{
                        background: #f2f3f5;
                    }
                    &.active:hover{
                        font-weight: bold;
                    }
                }
            }
            .calendarRight{
                flex: 1;
                height: 100%;
                background: #fff;
            }
        }
    }
</style>