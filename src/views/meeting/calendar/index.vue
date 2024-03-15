<template>
    <div class="wrappper">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base" style="background: #217346;">
                    <img :src="require('@/assets/img/rightMenu/xiaozu.png')" alt="">
                </div>
                <span class="headerTitle">会议日历</span>
            </div>
            <div class="headerRight">
                <a-button type="primary" @click="handleAddMeeting">新建会议</a-button>
                <a-button type="primary" v-if="current==1" class="ml10" @click="handleAddRepeatMeeting">新建重复会议</a-button>
            </div>
        </div>
        <div class="calendarBody">
            <div class="leftMenuWrapper">
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
            </div>
            <div class="calendarRight">
                <ListView v-if="current==0" />
                <CalendarVue v-if="current==1" />
            </div>
        </div>
        <NewMeeting :isShow="isNewMeeting" @cancel="cancelNewMeeting" @selectVal="handleNewMeetingVal" />
        <NewRepeatMeeting :isShow="isRepeatMeeting" @cancel="cancelRepeatMeeting" @selectVal="handleRepeatMeetingVal" />
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
    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import ListView from "@/components/meeting/meetingCalendar/List.vue";
    import CalendarVue from "@/components/meeting/meetingCalendar/Calendar.vue";
    import { message } from "ant-design-vue";

     // 新建
     import NewMeeting from "@/components/meeting/meetingCalendar/NewMeeting.vue";
    // 重复会议
    import NewRepeatMeeting from "@/components/meeting/meetingCalendar/NewRepeatMeeting.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        current: 1,
        isNewMeeting: false,
        isRepeatMeeting: false
    });
    const { current, isNewMeeting, isRepeatMeeting } = toRefs(data);
    // 关闭新建
    const cancelNewMeeting = (e) => {
        data.isNewMeeting = e;
    }
    const handleNewMeetingVal = (e) => {
        data.isNewMeeting = false;
    }
    // 新建会议
    const handleAddMeeting = () => {
        data.isNewMeeting =  true;
    }
    // 新建重复会议
    const handleAddRepeatMeeting = () => {
        data.isRepeatMeeting =  true;
    }
    // 关闭重复会议弹窗
    const cancelRepeatMeeting = (e) => {
        data.isRepeatMeeting = e;
    }
    const handleRepeatMeetingVal = (e) => {
        data.isRepeatMeeting = false;
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