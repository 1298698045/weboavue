<template>
    <div class="wrappper">
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
    import ListView from "@/components/meeting/meetingCalendar/List.vue";
    import CalendarVue from "@/components/schedule/calendar/ScheduleCalendar.vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        current: 1
    });
    const { current } = toRefs(data);
</script>
<style lang="less">
    .wrappper{
        width: 100%;
        height: 100%;
        .calendarBody{
            display: flex;
            height: 100%;
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