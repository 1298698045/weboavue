<template>
    <div class="wrappper">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base" style="background: #217346;">
                    <img :src="require('@/assets/img/rightMenu/xiaozu.png')" alt="">
                </div>
                <span class="headerTitle">日历</span>
            </div>
            <div class="headerRight">
                <dRadioGroup :current="current" @change="changeRadioGroup" v-if="showComponent">
                    <a-radio-button :value="0">
                        <i class="iconfont icon-liebiaoshitu"></i>
                    </a-radio-button>
                    <a-radio-button :value="1">
                        <i class="iconfont icon-rilishitu"></i>
                    </a-radio-button>
                </dRadioGroup>
                <a-button type="primary" class="ml10" @click="handleAddSchedule" v-if="CalendarActionsConfig.canAddEvent">新建日程</a-button>
                <a-button class="ml10" @click="openShare" v-if="CalendarActionsConfig.isCalendarShareable">共享日历</a-button>
                <a-button class="ml10" @click="openImport" v-if="CalendarActionsConfig.canAddEvent">导入日程</a-button>
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
            <div class="calendarRight" v-if="showComponent">
                <ListView v-if="current==0" :layoutName="layoutName" />
                <CalendarVue v-if="current==1" @getCalendarActionsConfig="getCalendarActionsConfig" />
            </div>
        </div>
        <NewSchedule :isShow="isSchedule" v-if="isSchedule" @cancel="cancelNewSchedule" />
        <AddSchedule :isShow="isAddSchedule" v-if="isAddSchedule" @cancel="cancelAddSchedule" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" :id="id" @selectVal="handleNewScheduleVal" :paramsTime="paramsTime" />
        <ImportSchedule :isShow="isImport" v-if="isImport"  @cancel="cancelImport" />
        <ShareCalendar :isShow="isShare" v-if="isShare"  @cancel="cancelShare" :fileParams="fileParams" />
    </div>
</template>
<script setup>
    // import "@/style/oldIcon/iconfont.css";
    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
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
        h,
        nextTick
    } from "vue";
    import "@/style/schedule/icon/iconfont.css";
    import ListView from "@/components/schedule/list/index.vue";
    import CalendarVue from "@/components/schedule/calendar/ScheduleCalendar.vue";


    import NewSchedule from "@/components/schedule/NewSchedule.vue";
    import AddSchedule from "@/components/schedule/AddSchedule.vue";
    import ShareCalendar from "@/components/schedule/ShareCalendar.vue";
    import ImportSchedule from "@/components/schedule/ImportSchedule.vue";
    import dRadioGroup from "@/components/antDefault/Dradio-group.vue"
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
        isImport: false,
        fileParams: {},
        size: "large",
        id:'',
        paramsTime: {
            date: "",
            time: ""
        },
        objectTypeCode:'4200',
        sObjectName:'ActivityPointer',
        layoutName:'MyActivityPointer',
        CalendarActionsConfig:{
            canAddEvent: false,
            canDragAndDropItems: false,
            canModifyColor: false,
            canShowOnlyCalendar: false,
            isCalendarDeletable: false,
            isCalendarEditable: false,
            isCalendarShareable: false,
            isCalendarToggleable: false,
            isCalendarUnsubscribable: false,
        },
        showComponent:false
    });
    const { showComponent, CalendarActionsConfig,current, isSchedule, isAddSchedule, isShare, isImport, fileParams, size,id,paramsTime,objectTypeCode,sObjectName,layoutName } = toRefs(data);
    const changeRadioGroup = (e) => {
        data.current = e;
    }
    // 关闭新建
    const cancelNewSchedule = (e) => {
        data.isSchedule = e;
    }
    const cancelAddSchedule = (e) => {
        data.isAddSchedule = e;
    }
    // 新建
    const handleAddSchedule = () => {
        // data.isSchedule =  true;
        data.id='';
        data.isAddSchedule = true;
    }
    const cancelImport = (e) => {
        data.isImport = e;
    }
    const cancelShare = (e) => {
        data.isShare = e;
    }
    const openShare = () => {
        data.isShare = true;
    }
    const openImport = () => {
        data.isImport = true;
    }
    const handleNewScheduleVal = (e) => {
        data.isAddSchedule = false;
        //onSearch();
    }
    const getCalendarActionsConfig=(e)=>{
        if(e){
            data.CalendarActionsConfig=e;
        }
    }
    watch(() => route, (newVal, oldVal) => {
        data.current=1;
        data.showComponent = false;
        nextTick(() => (data.showComponent = true));
    }, { deep: true, immediate: true })
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