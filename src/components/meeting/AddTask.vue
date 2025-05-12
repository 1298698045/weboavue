<template>
    <div>
        <a-modal v-model:open="props.isShow" width="1200px" style="top:10px;" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    {{ title }}
                </div>
            </template>
            <div class="modalContainer AddTaskModalContainer">
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <div class="tabPanel">
                        <div class="barContainer">
                            <div class="groupContainer">
                                <a-dropdown>
                                    <div class="groupBtn">
                                        <span class="icon">
                                            <!-- <ControlOutlined /> -->
                                            <Icon name="Options" fill="rgb(97, 97, 97)" width="22" hight="22" />
                                        </span>
                                        <span class="text">{{Reply||'答复选项'}}</span>
                                        <span class="arrowIcon">
                                            <DownOutlined />
                                        </span>
                                    </div>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item v-for="(item,index) in ReplyList" :key="index">
                                                <div class="menu-row" @click="selectOption('Reply',item.value)" :class="{'selectOptionActive':formState.Reply==item.value}">
                                                    <span class="icon">
                                                        <template v-if="formState.Reply==item.value">
                                                            <CheckOutlined />
                                                        </template>
                                                    </span>
                                                    <span class="menuText">{{item.label}}</span>
                                                </div>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                                <div class="ribbon">
                                    <span class="ribbon-bottom-bar-divider"></span>
                                </div>
                                <a-dropdown>
                                    <div class="groupBtn">
                                        <span class="icon">
                                            <!-- <ProjectOutlined/> -->
                                            <Icon name="CalendarPattern" fill="rgb(97, 97, 97)" width="22" hight="22" />
                                        </span>
                                        <span class="text">{{ DisplayStatus }}</span>
                                        <span class="arrowIcon">
                                            <DownOutlined />
                                        </span>
                                    </div>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item v-for="(item,index) in DisplayStatusList" :key="index">
                                                <div class="menu-row" @click="selectOption('DisplayStatus',item.value)">
                                                    <span class="icon DisplayStatusIcon">
                                                        <i data-icon-name="ShowAsFreeIcon" aria-hidden="true" class="icon-520" v-if="item.value*1==1">
                                                            <div class="nvdEP iJ4J5" style="background-color: rgb(255, 255, 255);border-color: rgba(15, 108, 189, 0.9);z-index: 1;border-style: solid;border-width: 1px;"></div>
                                                        </i>
                                                        <i data-icon-name="ShowAsWorkingElsewhereIcon" aria-hidden="true" class="icon-507" v-if="item.value*1==2">
                                                            <div class="nvdEP f7wT9" style="background-color: rgba(15, 108, 189, 0.9); border-color: rgba(15, 108, 189, 0.9); z-index: 1; border-style: solid; border-width: 1px;"></div>
                                                        </i>
                                                        <i data-icon-name="ShowAsTentativeIcon" aria-hidden="true" class="icon-507" v-if="item.value*1==3">
                                                            <div class="nvdEP MtAE4" style="background-color: rgba(15, 108, 189, 0.9); border-color: rgba(15, 108, 189, 0.9); z-index: 1; border-style: solid; border-width: 1px;"></div>
                                                        </i>
                                                        <i data-icon-name="ShowAsBusyIcon" aria-hidden="true" class="icon-520" v-if="item.value*1==0">
                                                            <div class="nvdEP Zn9Tu" style="background-color: rgba(15, 108, 189, 0.9); border-color: rgba(15, 108, 189, 0.9); z-index: 1; border-style: solid; border-width: 1px;"></div>
                                                        </i>
                                                        <i data-icon-name="ShowAsOOFIcon" aria-hidden="true" class="icon-507" v-if="item.value*1==4">
                                                            <div class="nvdEP wvzTD" style="background-color: rgba(180, 0, 158, 0.9); border-color: rgba(180, 0, 158, 0.9); background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.8) 0px, rgba(255, 255, 255, 0.8) 1px, transparent 0px, transparent 50%), repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.8) 0px, rgba(255, 255, 255, 0.8) 1px, transparent 0px, transparent 50%); z-index: 1; border-style: solid; border-width: 1px;"></div>
                                                        </i>
                                                    </span>
                                                    <span class="menuText">{{item.label}}</span>
                                                </div>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                                <a-dropdown>
                                    <div class="groupBtn">
                                        <span class="icon">
                                            <!-- <ClockCircleOutlined /> -->
                                            <Icon name="ClockAlarm" fill="rgb(97, 97, 97)" width="20" hight="20" />
                                        </span>
                                        <span class="text">{{ReminderTime}}</span>
                                        <span class="arrowIcon">
                                            <DownOutlined />
                                        </span>
                                    </div>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item v-for="(item,index) in ReminderTimeList" :key="index">
                                                <div class="menu-row" @click="selectOption('ReminderTime',item.value)" :class="{'selectOptionActive':formState.ReminderTime==item.value}">
                                                    <span class="icon">
                                                        <template v-if="formState.ReminderTime==item.value">
                                                            <CheckOutlined />
                                                        </template>
                                                    </span>
                                                    <span class="menuText">{{item.label}}</span>
                                                </div>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                                <div class="ribbon">
                                    <span class="ribbon-bottom-bar-divider"></span>
                                </div>
                                <a-dropdown>
                                    <div class="groupBtn">
                                        <span class="icon">
                                            <!-- <TagOutlined /> -->
                                            <Icon name="Tag" fill="rgb(0, 120, 212)" width="16" hight="20" v-if="formState.CalendarType*1==0" />
                                            <Icon name="Tag" fill="rgb(14, 122, 11)" width="16" hight="20" v-if="formState.CalendarType*1==1" />
                                        </span>
                                        <span class="text">{{CalendarType||'分类'}}</span>
                                        <span class="arrowIcon">
                                            <DownOutlined />
                                        </span>
                                    </div>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item v-for="(item,index) in CalendarTypeList" :key="index">
                                                <div class="menu-row" @click="selectOption('CalendarType',item.value)" :class="{'selectOptionActive':formState.CalendarType==item.value}">
                                                    <span class="icon">
                                                        <template v-if="formState.CalendarType==item.value">
                                                            <CheckOutlined />
                                                        </template>
                                                    </span>
                                                    <span class="icon">
                                                        <Icon name="Tag" fill="rgb(0, 120, 212)" width="16" hight="20" v-if="item.value*1==0" />
                                                        <Icon name="Tag" fill="rgb(14, 122, 11)" width="16" hight="20" v-if="item.value*1==1" />
                                                    </span>
                                                    <span class="menuText">{{item.label}}</span>
                                                </div>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                                <div class="groupBtn" @click="formState.IsPrivate=!formState.IsPrivate">
                                    <span class="icon" v-if="!formState.IsPrivate">
                                        <!-- <UnlockOutlined /> -->
                                        <Icon name="LockOpen" fill="rgb(170, 132, 19)" width="22" hight="22" />
                                    </span>
                                    <span class="icon" v-if="formState.IsPrivate">
                                        <!-- <LockOutlined /> -->
                                        <Icon name="LockClosed" fill="rgb(170, 132, 19)" width="22" hight="22" />
                                    </span>
                                    <span class="text">私人</span>
                                </div>
                                <div class="ribbon">
                                    <span class="ribbon-bottom-bar-divider"></span>
                                </div>
                                <a-dropdown>
                                    <div class="groupBtn" style="padding: 0 4px;">
                                        <span class="text">
                                            <EllipsisOutlined></EllipsisOutlined>
                                        </span>
                                    </div>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">我的模板</span>
                                                </div>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                            </div>
                        </div>
                    </div>
                    <div class="formContent">
                        <div class="leftForm">
                            <div class="formWrap">
                                <a-form :model="formState" ref="formRef">
                                    <a-form-item name="Subject">
                                        <div class="formRow">
                                            <div class="lIcon">
                                                <!-- <a-button :icon="h(EditOutlined)" /> -->
                                                <a-button>
                                                    <template #icon>
                                                        <Icon name="EmojiTabSymbols" width="14" hight="14" />
                                                    </template>
                                                </a-button>
                                            </div>
                                            <div class="rVal rVal3">
                                                <input type="text" v-model="formState.Subject" class="title"
                                                    placeholder="添加标题">
                                            </div>
                                            <div class="lIcon" v-if="formState.IsPrivate">
                                                <!-- <LockOutlined /> -->
                                                <Icon name="LockClosed" width="22" hight="22" />
                                            </div>
                                        </div>
                                    </a-form-item>
                                    <a-form-item name="OwningUser">
                                        <div class="formRow">
                                            <div class="lIcon">
                                                <!-- <UserAddOutlined /> -->
                                                <Icon name="PeopleAdd" fill="rgb(97, 97, 97)" width="22" hight="22" />
                                            </div>
                                            <div class="rVal">
                                                <a-select mode="multiple" allowClear
                                                    v-model:value="formState.OwningUser.Id"
                                                    :default-active-first-option="false" :filter-option="false"
                                                    showSearch @search=" (e) => { searchlookup(e, '8','OwningUser'); } "
                                                    @dropdownVisibleChange=" (e) => { searchlookup('', '8','OwningUser'); } "
                                                    :placeholder="'请选择被分配人'">
                                                    <template #suffixIcon></template>
                                                    <a-select-option v-for="(option, optionIdx) in OwningUser"
                                                        :key="optionIdx" :value="option.ID">
                                                        <a-avatar :size="37">
                                                            <template #icon><UserOutlined /></template>
                                                            <!-- <img :src="item.ImageUrls" alt="" class="commentAvatar" /> -->
                                                        </a-avatar>
                                                        {{ option.Name }}
                                                    </a-select-option>
                                                </a-select>
                                                <div class="selectIcon">
                                                    <SearchOutlined class="ant-select-suffix"
                                                        @click="handleOpenLook('8','OwningUser')" />
                                                </div>
                                            </div>
                                        </div>
                                    </a-form-item>
                                    <div class="formRow" style="align-items: self-start;">
                                        <div class="lIcon">
                                            <!-- <ClockCircleOutlined /> -->
                                            <Icon name="Clock" fill="#424242" width="21" hight="21" />
                                        </div>
                                        <div class="timeBox">
                                            <div class="rowTime">
                                                <div class="date">
                                                    <a-date-picker v-model:value="formState.StartDateTime"
                                                        :valueFormat="dateFormat" />
                                                </div>
                                                <div class="time">
                                                    <a-time-picker v-model:value="formState.StartDateTime_time"
                                                        :valueFormat="hourFormat" format="HH:mm" />
                                                </div>
                                                <div class="switch">
                                                    <a-switch v-model:checked="formState.IsAllDayEvent" />
                                                    <span class="text">全天</span>
                                                </div>
                                            </div>
                                            <div class="rowTime">
                                                <div class="date">
                                                    <a-date-picker v-model:value="formState.EndDateTime"
                                                        :valueFormat="dateFormat" />
                                                </div>
                                                <div class="time">
                                                    <a-time-picker v-model:value="formState.EndDateTime_time"
                                                        :valueFormat="hourFormat" format="HH:mm" />
                                                </div>
                                                <div class="groupContainer">
                                                    <a-dropdown>
                                                        <div class="groupBtn show">
                                                            <span class="icon">
                                                                <!-- <SyncOutlined /> -->
                                                                <Icon name="ArrowRepeatAll" fill="#808080" width="20" hight="20" />
                                                            </span>
                                                            <span class="text">{{RecurrenceType}}</span>
                                                            <span class="arrowIcon">
                                                                <DownOutlined />
                                                            </span>
                                                        </div>
                                                        <template #overlay>
                                                            <a-menu>
                                                                <a-menu-item v-for="(item,index) in RecurrenceTypeList" :key="index">
                                                                    <div class="menu-row" @click="selectOption('RecurrenceType',item.value)" :class="{'selectOptionActive':formState.RecurrenceType==item.value}">
                                                                        <span class="icon">
                                                                            <template v-if="formState.RecurrenceType==item.value">
                                                                                <CheckOutlined />
                                                                            </template>
                                                                        </span>
                                                                        <span class="menuText">{{item.label}}</span>
                                                                    </div>
                                                                </a-menu-item>
                                                            </a-menu>
                                                        </template>
                                                    </a-dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a-form-item name="Location" class="formItemLocation">
                                        <div class="formRow">
                                            <div class="lIcon">
                                                <!-- <EnvironmentOutlined /> -->
                                                <Icon name="Location" fill="rgb(97, 97, 97)" width="22" hight="22" />
                                            </div>
                                            <div class="rVal">
                                                <input type="text" v-model="formState.Location" placeholder="搜索位置">
                                            </div>
                                        </div>
                                    </a-form-item>
                                    <a-form-item name="Description">
                                        <div class="formRow" style="align-items: self-start;">
                                            <div class="lIcon">
                                                <!-- <FormOutlined /> -->
                                                <Icon name="TextDescription" fill="rgb(97, 97, 97)" width="22" hight="22" />
                                            </div>
                                            <div class="rVal rVal2">
                                                <TEditor ref="editorRef" mode="middle" :placeholder="'添加描述或附件文档'" 
                                                :height=height2
                                                    @input="getEditorContent" />
                                            </div>
                                        </div>
                                    </a-form-item>
                                    <a-form-item name="RegardingObjectId">
                                        <div class="formRow">
                                            <div class="lIcon">
                                                <!-- <Icon name="TextDescription" fill="rgb(97, 97, 97)" width="22" hight="22" /> -->
                                            </div>
                                            <div class="rVal rValRegardingObjectTypeCode">
                                                <a-select mode="single"
                                                    v-model:value="formState.RegardingObjectTypeCode"
                                                    :default-active-first-option="false" :filter-option="false"
                                                    showSearch
                                                    @change="RegardingObjectTypeCodeChange"
                                                    :placeholder="'选择对象'">
                                                    <template #suffixIcon></template>
                                                    <a-select-option v-for="(option, optionIdx) in RegardingObjectTypeCode"
                                                        :key="optionIdx" :value="option.value">
                                                        {{ option.label}}
                                                    </a-select-option>
                                                </a-select>
                                                <div class="selectIcon">
                                                    <DownOutlined class="ant-select-suffix"/>
                                                </div>
                                            </div>
                                            <div class="rVal rValRegardingObjectId">
                                                <a-select mode="single" allowClear
                                                    v-model:value="formState.RegardingObjectId.Id"
                                                    :default-active-first-option="false" :filter-option="false"
                                                    showSearch @search=" (e) => { searchlookup(e, formState.RegardingObjectTypeCode,'RegardingObjectId'); } "
                                                    @dropdownVisibleChange=" (e) => { searchlookup('', formState.RegardingObjectTypeCode,'RegardingObjectId'); } "
                                                    :placeholder="'选择相关项'">
                                                    <template #suffixIcon></template>
                                                    <a-select-option v-for="(option, optionIdx) in RegardingObjectId"
                                                        :key="optionIdx" :value="option.ID">
                                                        <!-- <a-avatar :size="37">
                                                            <template #icon><HomeOutlined /></template> -->
                                                            <!-- <img :src="item.ImageUrls" alt="" class="commentAvatar" /> -->
                                                        <!-- </a-avatar> -->
                                                        {{ option.Name}}
                                                    </a-select-option>
                                                </a-select>
                                                <div class="selectIcon">
                                                    <SearchOutlined class="ant-select-suffix"
                                                        @click="handleOpenLook(formState.RegardingObjectTypeCode,'RegardingObjectId')" />
                                                </div>
                                            </div>
                                        </div>
                                    </a-form-item>
                                </a-form>
                            </div>
                        </div>
                        <div class="rightCalendar">
                            <DayCalendar ref="DayCalendarWrap" :id="props.id" :currentTime="formState.StartDateTime" :startDateTime="formState.startTime" :endDateTime="formState.endTime" :calendarType="formState.CalendarType" @calendarDayChange="calendarDayChange" :objectTypeCode="props.objectTypeCode" />
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
                </div>
            </template>
        </a-modal>
        <radio-user :isShow="isRadioUser" @selectVal="getUserData" @cancel="closeUser" @ok="refreshPeople"></radio-user>
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
        toRaw, h,nextTick
    } from "vue";

    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    dayjs.locale('zh-cn');
    import calendar from 'dayjs/plugin/calendar';
    import weekday from 'dayjs/plugin/weekday';
    import localeData from 'dayjs/plugin/localeData';
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    dayjs.extend(calendar);
    dayjs.extend(weekday);
    dayjs.extend(localeData);

    import {
        SearchOutlined,
        EditOutlined,
        ClockCircleOutlined,
        EnvironmentOutlined,
        UserAddOutlined,
        FormOutlined,
        TagOutlined,
        UnlockOutlined,
        LockOutlined,
        SyncOutlined,
        ProjectOutlined,
        ControlOutlined,
        DownOutlined,
        UserOutlined,
        SwapOutlined,
        CheckOutlined,
        EllipsisOutlined,
        BlockOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import TEditor from "@/components/TEditor.vue";
    import DayCalendar from "@/components/schedule/AddScheduleDayModal.vue";
    import Interface from "@/utils/Interface.js";
    import Icon from '@/components/icon/index.vue';
    const { proxy } = getCurrentInstance();
    const DayCalendarWrap=ref(null);
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        objectTypeCode: String,
        id: String,
        entityApiName: String,
        calendarType: String,
        RegardingObjectTypeCode: String,
        RegardingObjectId: String,
        RegardingObjectIdName: String,
        BgColor:String,
        paramsTime: [Object]
    });
    const dateFormat = 'YYYY-MM-DD';
    const hourFormat = 'HH:mm'
    const formRef = ref();
    const emit = defineEmits(["cancel","select-val"]);
    const handleCancel = () => {
        emit("cancel", false);
    };
    const editorRef = ref();
    const data = reactive({
        title: "新建任务",
        height: document.documentElement.clientHeight - 150,
        ReplyList: [
            {
                value: "0",
                label: "请求答复"
            },
            {
                value: "1",
                label: "允许转发"
            },
            {
                value: "2",
                label: "隐藏与会者列表"
            },
        ],
        DisplayStatusList:[
            {
                value: "1",
                label: "空闲"
            },
            {
                value: "2",
                label: "在其他地方工作"
            },
            {
                value: "3",
                label: "暂定"
            },
            {
                value: "0",
                label: "忙碌"
            },
            {
                value: "4",
                label: "外出"
            },
        ],
        ReminderTimeList: [
            {
                value: "5m",
                label: "5 分钟 前"
            },
            {
                value: "15m",
                label: "15 分钟 前"
            },
            {
                value: "30m",
                label: "30 分钟 前"
            },
            {
                value: "1h",
                label: "1 小时 前"
            },
            {
                value: "2h",
                label: "2 小时 前"
            },
            {
                value: "12h",
                label: "12 小时 前"
            },
            {
                value: "1d",
                label: "1 天 前"
            },
            {
                value: "7d",
                label: "1 周 前"
            },
        ],
        CalendarTypeList: [
            {
                value: "0",
                label: "工作安排"
            },
            {
                value: "1",
                label: "个人"
            },
        ],
        RecurrenceTypeList:[
            {
                value: "",
                label: "不重复"
            },
            {
                value: "day",
                label: "每天"
            },
            {
                value: "week",
                label: "每周"
            },
            {
                value: "month",
                label: "每月"
            },
            {
                value: "year",
                label: "每年"
            },
        ],
        OwningUser: [],
        RegardingObjectId:[],
        RegardingObjectTypeCode:[
            {value:'5000',label:'会议'},
            {value:'20290',label:'项目'},
            {value:'122',label:'流程事务'},
        ],
        calendarItem:{},
        isRadioUser:false,
        Reply:'',
        DisplayStatus:'忙碌',
        ReminderTime:'15 分钟 前',
        CalendarType: '工作安排',
        RecurrenceType:'不重复',
        height2: document.documentElement.clientHeight - 440,
    });
    const {
        height2,
        title,
        height,RegardingObjectId,RegardingObjectTypeCode,
        menuTimes, categoryList, OwningUser,isRadioUser,Reply,ReplyList,DisplayStatus,DisplayStatusList,ReminderTime,ReminderTimeList,CalendarType,CalendarTypeList,RecurrenceType,RecurrenceTypeList
    } = toRefs(data);
    const formState = reactive({
        RegardingObjectTypeCode: '5000',
        RegardingObjectId: {},
        Subject: '',
        StartDateTime: '',
        StartDateTime_time: '',
        ScheduledStart: '',
        ScheduledEnd: '',
        EndDateTime: '',
        EndDateTime_time: '',
        OwningUser: {},
        IsAllDayEvent: false,
        Location: '',
        Description: '',
        RegardingObjectIdName: '',
        BgColor: '',
        Reminder: false,
        startTime: "",
        endTime: "",
        Reply:'',
        DisplayStatus:'0',
        ReminderTime:'15m',
        CalendarType: '0',
        IsPrivate: false,
        RecurrenceType:''
    });
    if(props.paramsTime && props.paramsTime.date && props.paramsTime.time == ''){
        formState.StartDateTime = props.paramsTime.date;
        formState.StartDateTime_time = "08:00";
        formState.EndDateTime_time = "09:00";
        if(props.paramsTime.endDate){
            formState.EndDateTime = props.paramsTime.endDate;
        }
        else{
            formState.EndDateTime = props.paramsTime.date;
        }
    }else if(props.paramsTime && props.paramsTime.date && props.paramsTime.time){
        formState.StartDateTime = props.paramsTime.date;
        formState.StartDateTime_time = props.paramsTime.time;
        // if(props.paramsTime.time=='00:00'){
        //     formState.StartDateTime_time = "08:00";
        // }
        if(props.paramsTime.endDate){
            formState.EndDateTime = props.paramsTime.endDate;
        }
        else{
            formState.EndDateTime = props.paramsTime.date;
        }
        if(props.paramsTime.end){
            formState.EndDateTime_time = props.paramsTime.end;
            if(props.paramsTime.time=='00:00'&&props.paramsTime.end=='00:00'){
                formState.StartDateTime_time = "08:00";
                formState.EndDateTime_time = "09:00";
                var date = new Date(formState.EndDateTime);
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                formState.EndDateTime=(dayjs(new Date(year, month, day - 1)).format("YYYY-MM-DD"));
            }
        }
        else{
            let hour = new Date(props.paramsTime.date +' '+ props.paramsTime.time).getHours() + 1;
            hour = hour < 10 ? '0' + hour : hour;
            formState.EndDateTime_time = hour+':00';
        }
    }
    else{
        formState.StartDateTime = dayjs(new Date()).startOf("day").format("YYYY-MM-DD");
        formState.EndDateTime = dayjs(new Date()).endOf("day").format("YYYY-MM-DD");
        let hour = (new Date()).getHours() + 1;
        hour = hour < 10 ? '0' + hour : hour;
        formState.StartDateTime_time = hour+':00';
        let hour2 = (new Date()).getHours() + 2;
        hour2 = hour2 < 10 ? '0' + hour2 : hour2;
        formState.EndDateTime_time = hour2+':00';
    }
    const getEditorContent = (e) => {
        formState.Description = e;
    }
    watch(()=>formState.StartDateTime,(newVal,oldVal)=>{
        formState.startTime = newVal + ' ' + formState.StartDateTime_time;
        calendarGetData();
    }, {deep: true})
    watch(()=>formState.StartDateTime_time,(newVal,oldVal)=>{
        formState.startTime = formState.StartDateTime + ' ' + newVal;
        calendarGetData();
    }, {deep: true})
    watch(()=>formState.EndDateTime,(newVal,oldVal)=>{
        formState.endTime = newVal + ' ' + formState.EndDateTime_time;
        calendarGetData();
    }, {deep: true})
    watch(()=>formState.EndDateTime_time,(newVal,oldVal)=>{
        formState.endTime = formState.EndDateTime + ' ' + newVal;
        calendarGetData();
    }, {deep: true})
    const uniqu=(array, name)=>{
        var arr = []
        for (var j = 0; j < array.length; j++) {
            if (JSON.stringify(arr).indexOf(array[j][name]) == -1) {
                arr.push(array[j])
            }
        }
        return arr
    }
    const searchlookup = (search, Lktp, fieldApiName) => {
        let obj = {
        actions:[{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: 'ActivityPointer',
                    fieldApiName: fieldApiName,
                    pageParam: 1,
                    pageSize: 25,
                    q: search,
                    searchType: "Recent",
                    targetApiName: 'SystemUser',
                    body: {
                        sourceRecord: {
                        apiName: 'ActivityPointer',
                            fields: {
                                Id: null,
                                RecordTypeId: ""
                            }
                        }
                    }
                }
            }]
        }
        if(Lktp=='8'){
            obj.actions[0].params.targetApiName='SystemUser';
        }
        if(Lktp=='5000'){
            obj.actions[0].params.targetApiName='MeetingRec';
        }
        if(Lktp=='20290'){
            obj.actions[0].params.targetApiName='Project';
        }
        if(Lktp=='122'){
            obj.actions[0].params.targetApiName='WFProcessInstance';
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.lookup,d).then(res=>{
            let list = res.actions[0].returnValue.lookupResults.records;
            let arr = [];
            list.forEach(item=>{
                arr.push({
                    ID: item.fields.Id.value,
                    Name: item.fields.Name.value
                })
            });
            data[fieldApiName] = data[fieldApiName].concat(arr);
            data[fieldApiName] = uniqu(data[fieldApiName],'ID');
            //console.log(data[fieldApiName])
        })
        // proxy.$get(Interface.uilook, {
        //         Lktp: Lktp,
        //         Lksrch: search,
        //     })
        //     .then((res) => {
        //         let listData = res.listData;
        //         data.OwningUserList = listData;
        //     });
    };
    // const getPickerList = () => {
    //     proxy.$get(Interface.schedule.pickList, {
    //         objectTypeCode: 4200
    //     }).then(res => {
    //         var rows = res.actions[0].returnValue.picklistFieldValues.CalendarType;
    //         data.CalendarTypeList = rows.values;
    //     })
    // }
    // getPickerList();
    const calendarGetData=()=>{
        data.calendarItem={
            Id:props.id||'001',
            Subject: formState.Subject,
            What: formState.Description,
            Who: formState.OwningUser?formState.OwningUser.Name:'',
            StartDateTime: formState.StartDateTime+' '+formState.StartDateTime_time,
            EndDateTime: formState.EndDateTime+' '+formState.EndDateTime_time,
            IsAllDayEvent: formState.IsAllDayEvent,
            IsPrivate: formState.IsPrivate,
            IsRecurrence2:false,
            Where:formState.RoomId?formState.RoomId.Name:(formState.Location||''),
            sobjectType: "Event"
        }
        nextTick(()=>{
            if(typeof DayCalendarWrap !='undefined'&&DayCalendarWrap&&DayCalendarWrap.value){
                DayCalendarWrap.value.getQuery(data.calendarItem);
            }
        })
    }
    const calendarDayChange=(e)=>{
        formState.StartDateTime = e.date;
        formState.StartDateTime_time = e.time;
        if(e.endDate){
            formState.EndDateTime = e.endDate;
        }
        else{
            formState.EndDateTime = e.date;
        }
        if(e.end){
            formState.EndDateTime_time = e.end;
        }
        else{
            let hour = new Date(e.date +' '+ e.time).getHours() + 1;
            hour = hour < 10 ? '0' + hour : hour;
            formState.EndDateTime_time = hour+':00';
        }
    }
    const selectOption=(name,value)=>{
        if(value!='undefined'&&value!=null&&value!=''){
            formState[name]=value;
            let index = data[name+'List'].findIndex(item=>item.value==value);
            data[name]=(data[name+'List'][index]).label;
        }
        else if(name=='RecurrenceType'&&value==''){
            formState[name]=value;
            let index = data[name+'List'].findIndex(item=>item.value==value);
            data[name]=(data[name+'List'][index]).label;
        }
    }
onMounted(() => {
    data.height = document.documentElement.clientHeight - 150;
    if (document.documentElement.clientHeight - 440 > 100) {
        data.height2 = document.documentElement.clientHeight - 440;
    }
    else {
        data.height2 = 100;
    }
    window.addEventListener("resize", (e) => {
        data.height = document.documentElement.clientHeight - 150;
        if (document.documentElement.clientHeight - 440 > 100) {
            data.height2 = document.documentElement.clientHeight - 440;
        }
        else {
            data.height2 = 100;
        }
    });
});

    const getDetail = () => {
    let d = {
        actions:[{
            id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                  recordId: props.id,
                  apiName:props.entityApiName,
                  objTypeCode: props.objectTypeCode
                }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(Interface.detail,obj).then(res=>{
        if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.fields){
            let fields=res.actions[0].returnValue.fields;
            selectOption('Reply',(fields.Reply?fields.Reply.value:''));
            selectOption('DisplayStatus',(fields.DisplayStatus?fields.DisplayStatus.value:''));
            selectOption('ReminderTime',(fields.ReminderTime?fields.ReminderTime.value:''));
            selectOption('CalendarType',(fields.CalendarType?fields.CalendarType.value:'0'));
            selectOption('RecurrenceType',(fields.RecurrenceType?fields.RecurrenceType.value:''));
            formState.IsPrivate=fields.IsPrivate&&fields.IsPrivate.value?fields.IsPrivate.value:false;

            formState.Location=fields.Location&&fields.Location.value?fields.Location.value:'';
            formState.Subject=fields.Subject&&fields.Subject.value?fields.Subject.value:'';
            formState.Description=fields.Description&&fields.Description.value?fields.Description.value:'';

            formState.StartDateTime=fields.ScheduledStart&&fields.ScheduledStart.value?dayjs(fields.ScheduledStart.value).format("YYYY-MM-DD"):'';
            formState.StartDateTime_time=fields.ScheduledStart&&fields.ScheduledStart.value?dayjs(fields.ScheduledStart.value).format("HH:mm"):'';
            formState.EndDateTime=fields.ScheduledEnd&&fields.ScheduledEnd.value?dayjs(fields.ScheduledEnd.value).format("YYYY-MM-DD"):'';
            formState.EndDateTime_time=fields.ScheduledEnd&&fields.ScheduledEnd.value?dayjs(fields.ScheduledEnd.value).format("HH:mm"):'';

            if(props.paramsTime.end&&props.paramsTime.end!=props.paramsTime.time){
                formState.StartDateTime = props.paramsTime.date;
                formState.StartDateTime_time = props.paramsTime.time;
                formState.EndDateTime = props.paramsTime.endDate;
                formState.EndDateTime_time = props.paramsTime.end;
            }
            
            editorRef.value.content=formState.Description;

            formState.IsAllDayEvent=fields.IsAllDayEvent?fields.IsAllDayEvent.value:'';
            if(fields.OwningUser&&fields.OwningUser.value){
                let OwningUserName=fields.OwningUser.displayValue||'';
                let OwningUserId=fields.OwningUser.value;
                formState.OwningUser={Id:[OwningUserId],Name:OwningUserName};
                data.OwningUser.push({
                    ID: OwningUserId,
                    Name: OwningUserName
                });
            }
            searchlookup('', '8','OwningUser');
            if(fields.RegardingObjectId&&fields.RegardingObjectId.value){
                let RegardingObjectIdName=fields.RegardingObjectId.displayValue||'';
                let RegardingObjectIdValue=fields.RegardingObjectId.value;
                formState.RegardingObjectId={Id:RegardingObjectIdValue,Name:RegardingObjectIdName};
                formState.RegardingObjectIdName=RegardingObjectIdName||(RegardingObjectIdValue==props.RegardingObjectId?props.RegardingObjectIdName:'');
                data.RegardingObjectId.push({
                    ID: RegardingObjectIdValue,
                    Name: formState.RegardingObjectIdName
                });
            }
            formState.RegardingObjectTypeCode=fields.RegardingObjectTypeCode.value||''
            searchlookup('', '5000','RegardingObjectId');
            calendarGetData();
        }
    })
    
  }
  if(props.id){
      data.title = '编辑任务';
      getDetail();
  }
  else{
        let userInfo=window.localStorage.getItem('userInfo');
        if(props.paramsTime&&props.paramsTime.resourceId){
            data.OwningUser.push({
                ID: props.paramsTime.resourceId,
                Name: props.paramsTime.resourceName
            });
            formState.OwningUser.Id=[props.paramsTime.resourceId];
        }
        else if(userInfo){
            userInfo=JSON.parse(userInfo);
            var userId=userInfo.userId;
            if(userId=='jackliu'){
                userId='2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
            }
            data.OwningUser.push({
                ID: userId,
                Name: userInfo.fullName
            });
            formState.OwningUser.Id=[userId];
        }
        if(props.RegardingObjectId){
            data.RegardingObjectId.push({
                ID: props.RegardingObjectId,
                Name: props.RegardingObjectIdName
            });
            formState.RegardingObjectId.Id=props.RegardingObjectId;
        }
        if(props.RegardingObjectTypeCode){
            formState.RegardingObjectTypeCode=props.RegardingObjectTypeCode;
        }
      calendarGetData();
  }
    const handleSubmit = () => {
        if(!formState.Subject){
            message.error("标题不能为空。");
            return
        }
        if(formState.OwningUser&&formState.OwningUser.Id&&formState.OwningUser.Id.length){}else{
            message.error("被分配人不能为空。");
            return
        }
        if(formState.RegardingObjectId&&formState.RegardingObjectId.Id){}else{
            message.error("相关项不能为空。");
            return
        }
    formRef.value.validate().then(() => {
        // console.log("values", formState, toRaw(formState));
        let url = Interface.create;
        let d = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    // recordId: props.id,
                    recordInput:{
                        allowSaveOnDuplicate: false,
                        apiName: props.entityApiName,
                        objTypeCode: props.objectTypeCode,
                        fields: {
                            Location: formState.Location,
                            Subject: formState.Subject,
                            Description: formState.Description,
                            ScheduledStart: formState.StartDateTime+' '+formState.StartDateTime_time,
                            ScheduledEnd: formState.EndDateTime+' '+formState.EndDateTime_time,
                            IsAllDayEvent: formState.IsAllDayEvent,
                            Reply:formState.Reply,
                            DisplayStatus:formState.DisplayStatus,
                            ReminderTime:formState.ReminderTime,
                            CalendarType:formState.CalendarType,
                            IsPrivate:formState.IsPrivate,
                            RecurrenceType:formState.RecurrenceType
                        }
                    }
                }
            }]
        };
        if(props.id){
            url = Interface.edit;
            d.actions[0].params.recordId = props.id;
            //d.actions[0].params.recordInput.fields.CalendarType=formState.CalendarType||'';
        }
        else{
            //d.actions[0].params.recordInput.fields.CalendarType=props.calendarType||'';
            d.actions[0].params.recordInput.fields.ActivityTypeCode=4201;
            if(props.RegardingObjectId){
                d.actions[0].params.recordInput.fields.RegardingObjectTypeCode=formState.RegardingObjectTypeCode||props.RegardingObjectTypeCode;
                d.actions[0].params.recordInput.fields.RegardingObjectId=formState.RegardingObjectId.Id||props.RegardingObjectId;
                d.actions[0].params.recordInput.fields.RegardingObjectIdName=formState.RegardingObjectIdName||props.RegardingObjectIdName;
                d.actions[0].params.recordInput.fields.BgColor=props.BgColor;
            }
        }
        var ids=formState.OwningUser&&formState.OwningUser.Id&&formState.OwningUser.Id.length?formState.OwningUser.Id:[];
        if(ids&&ids.length){
            for(var i=0;i<ids.length;i++){
                if(ids[i]=='jackliu'){
                    ids[i]='2ec00cf2-a484-4136-8fef-e2a2719c5ed6';
                }
                d.actions[0].params.recordInput.fields.OwningUser=ids[i];
                let obj = {
                    message: JSON.stringify(d)
                }
                proxy.$post(url, obj).then((res) => {
                    //if(i==ids.length-1){
                        message.success("保存成功！");
                        //emit("cancel", false);
                        emit("select-val", '');
                    //}
                });
            }
        }
        
      })
      .catch((err) => {
        console.log("error", err);
      });
  };
    const handleOpenLook= (Lktp, fieldApiName) => {
        if(Lktp=='8'){
            data.isRadioUser = true;
        }
    }
    const closeUser = (e) => {
        data.isRadioUser = false;
    };
    const getUserData = (params) => {
      //console.log("params:", params);
      data.isRadioUser = false;
      if(params.id){
        let index = data.OwningUser.findIndex(item=>item.ID==params.id);
        if(index==-1 && params.id){
            data.OwningUser.push({
                ID: params.id,
                Name: params.name
            });
            formState.OwningUser.Id.push(params.id);
        }
        if(index>=0){
            message.error("不能重复添加！");
        }
      }
    };
    const refreshPeople=(e)=>{
       
    }
    const clearForm = () => {
            formRef.value.resetFields();
            formState.RegardingObjectIdName='';
    }
    const RegardingObjectTypeCodeChange=(val)=>{
        formState.RegardingObjectTypeCode=val;
        data.RegardingObjectId=[];
        // data.RegardingObjectId.push({
        //             ID: formState.RegardingObjectId.Id,
        //             Name: formState.RegardingObjectIdName
        //         });
        searchlookup('', val,'RegardingObjectId');
    }
    defineExpose({clearForm,handleSubmit})
</script>
<style lang="less" scoped>
    @import url("@/style/modal.less");

    .section {
        .sectionTitle {
            height: 30px;
            background-color: rgb(243, 242, 242);
            line-height: 30px;
            border-radius: 4px;
            padding-left: 15px;
            margin-bottom: 12px;
            /* margin: 2rem 2rem 0.5rem 2rem; */
        }

        .sectionRow {
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;

            .sectionItem {
                flex: 1;
                margin-right: 20px;

                .ant-row {
                    display: block !important;
                }
            }

            .sectionItem:last-child {
                margin-right: 0;
            }
        }
    }

    :where(.css-dev-only-do-not-override-kqecok).ant-picker {
        width: 100%;
    }

    .ant-form-item {
        position: relative;
        margin-bottom: 5px !important;
    }

    .selectIcon {
        position: absolute;
        right: 10px;
        top: 14px;
    }

    .timeWrap {
        display: flex;
        align-items: center;

        .timeItem:last-child {
            margin-left: 10px;
        }
    }

    .menuRow {
        display: flex;
        align-items: center;

        .ant-btn {
            border-radius: 4px 0 0 4px;
        }

        .ant-select-show-search:where(.css-dev-only-do-not-override-kqecok).ant-select:not(.ant-select-customize-input) .ant-select-selector {
            border-radius: 0 4px 4px 0 !important;
            margin-left: -1px !important;
        }
    }

    .selectFlex {
        width: 100%;
        position: relative;

        .suffixIcon {
            position: absolute;
            right: 5px;
        }
    }

    .tabPanel {
        padding: 0 4px;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.14);

        .barContainer {
            display: flex;

        }
    }

    .groupContainer {
        display: flex;
        align-items: center;

        .groupBtn {
            height: 32px;
            line-height: 32px;
            text-align: center;
            margin: 4px 0;
            border: 1px solid transparent;
            padding-left: 9px;
            border-radius: 4px;

            .icon {
                font-size: 16px;
                position: relative;
                top: 5px;
            }

            .arrowIcon {
                height: 12px;
                line-height: 12px;
                width: 12px;
                fill: #242424;
                color: #242424;
                margin-left: 4px;
                margin-right: 2px;
                font-size: 12px;
                position: relative;
                top: -1px;
            }
            
            &:hover {
                background: #fafafa;
                color: #242424;
                border: 1px solid #e5e5e5;
                cursor: pointer;
            }

            &.show {
                background: #fafafa;
                color: #242424;
                border: 1px solid #e5e5e5;
                cursor: pointer;
            }

            .text {
                line-height: 16.41px;
                text-align: left;
                margin-left: 4px;
                margin-right: 2px;
                font-weight: 400;
                font-size: 14px;
            }
        }

        .ribbon {
            display: inline-flex;
            height: 32px;
            align-items: center;
            padding: 4px;

            .ribbon-bottom-bar-divider {
                width: 1px;
                height: 100%;
                background-color: #e0e0e0;
                border-radius: 0px;
            }
        }
    }

    .menu-row {
        display: flex;

        .icon {
            min-width: 30px;
        }
    }

    .formContent {
        height: calc(~"100% - 60px");
        // height: auto;
        margin-top: 12px;
        display: flex;

        .leftForm {
            flex: 1;
            border: 1px solid #f0f0f0;
            background: #fff;
            border-radius: 4px;
            overflow: auto;
            margin-right: 10px;

            .formWrap {
                padding: 0 16px 19px 8px;

                input {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: 0;
                }

                input.title {
                    font-size: 21px;
                    font-weight: 600;
                    color: #424242;
                }

                .formRow {
                    display: flex;
                    min-height: 48px;
                    align-items: center;

                    .lIcon {
                        width: 32px;
                        height: 32px;
                        margin-right: 9px;
                        text-align: center;
                        padding-top: 5px;
                        :deep .ant-btn{
                            height: 30px !important;
                        }
                    }

                    .rVal {
                        flex: 1;
                        height: 32px;
                        border-bottom: 1px solid #e0e0e0;
                        height: auto;
                    }
                    .rVal2{
                        border-bottom: none;
                    }
                    .rVal3{
                        margin-top: 15px
                    }
                    .timeBox {
                        .rowTime {
                            display: flex;
                            align-items: center;
                            margin-bottom: 10px;

                            .date {
                                width: 142px;
                            }

                            .time {
                                width: 98px;
                                margin-left: 5px;
                                margin-right: 10px;
                            }

                            .switch {
                                display: flex;
                                align-items: center;

                                .text {
                                    padding-left: 5px;
                                }
                            }
                        }
                    }
                }
            }
        }

        .rightCalendar {
            width: 371px;
            min-height: 250px;
            height: 100%;
            border: 1px solid #f0f0f0;
            border-radius: 4px;
        }
    }
    :deep .ant-select-show-search:where(.css-dev-only-do-not-override-kqecok).ant-select:not(.ant-select-customize-input) .ant-select-selector{
        border: none !important;
        outline: 0 !important;
    }
    .AddTaskModalContainer{
        .ant-select-selection-item-content .ant-avatar{
            display: none !important;
        }
    }
    .ant-select-item-option-content .ant-avatar{
            margin-right: 8px !important;
        }
        :deep .ant-dropdown-menu-item{
            padding: 0 1px !important;
        }
        .menu-row{
            width: 100%;
            cursor: pointer;
            height: 32px;
            padding: 5px 12px;
            .icon{
                position: relative;
                top: 1px;
            }
        }
        .selectOptionActive{
            font-weight: bolder !important;
            background-color: #F0F0F0;
            box-sizing: border-box;
            border: 1px solid #A6A6A6;
            border-radius: 4px;
        }
        .DisplayStatusIcon{
            .icon-520 {
                display: inline-block;
                vertical-align: middle;
                flex-shrink: 0;
                width: 20px;
                height: 20px;
                font-size: 20px;
                line-height: 20px;
                margin: 0px;
                padding: 0px 10px 0px 0px;
                fill: rgb(15, 108, 189);
                color: rgb(15, 108, 189);
                position: relative;
                top: -4px;
            }
            .MtAE4, .f7wT9, .iJ4J5, .r3Aus {
                --fbBackgroundColor: transparent;
                --fbHighlightColor: #FFFFFF;
            }
            .f7wT9 {
    background-image: linear-gradient(0deg, transparent 25%, #FFFFFF 25%, #FFFFFF 50%, transparent 50%, transparent 75%, #FFFFFF 75%, #FFFFFF), linear-gradient(90deg, transparent 25%, #FFFFFF 25%, #FFFFFF 50%, transparent 50%, transparent 75%, #FFFFFF 75%, #FFFFFF), linear-gradient(45deg, #FFFFFF 38%, transparent 38%), linear-gradient(45deg, #FFFFFF 38%, transparent 38%);
    background-position: 0 0, 1px 0, 0 0, 2px 2px;
    background-size: 4px 4px;
    border-style: solid;
    border-width: 1px;
}
.MtAE4 {
    background-image: linear-gradient(-45deg, #FFFFFF 19%, transparent 19%, transparent 50%, #FFFFFF 50%, #FFFFFF 69%, transparent 69%, transparent);
    border-image-source: none;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
            .iJ4J5 {
                background: #FFFFFF;
                border-width: 1px;
            }
            .Zn9Tu, .iJ4J5 {
                border-style: solid;
                -webkit-box-sizing: border-box;
                box-sizing: border-box;
            }
            .f7wT9, .wvzTD {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.MtAE4, .r3Aus {
    background-size: 6px 6px;
}
.Zn9Tu {
    border-width: 1px;
}
.wvzTD {
    background-position-x: -1px;
    background-size: 6px 6px;
}
            .nvdEP {
                display: inline-block;
                height: 100%;
                margin-left: 10px;
                margin-right: 10px;
                margin-top: -4px;
                vertical-align: middle;
                width: 6px;
            }
            .icon-507 {
                display: inline-block;
                vertical-align: middle;
                flex-shrink: 0;
                width: 20px;
                height: 20px;
                font-size: 20px;
                line-height: 20px;
                margin: 0px;
                padding: 0px 10px 0px 0px;
                fill: #242424;
                position: relative;
                top: -4px;
            }

        }
        .barContainer .arrowIcon {
                font-size: 8px !important;
                position: relative;
                top: -1px;
            }
            :deep .rValRegardingObjectTypeCode{
                width: 180px !important;
                flex: unset !important;
                border: none !important;
                margin-right: 10px;
                position: relative;
                .ant-select.ant-select-show-search .ant-select-selector{
                    border: 1px solid #e0e0e0 !important;
                    border-radius: 4px !important;
                }
                .selectIcon{
                    top: 5px;
                    .anticon svg{
                        color: rgba(34, 47, 62, 0.5);
                        font-size: 12px;
                    }
                }
            }
            :deep .rValRegardingObjectId{
                border: none !important;
                .ant-select.ant-select-show-search .ant-select-selector{
                    border: 1px solid #e0e0e0 !important;
                    border-radius: 4px !important;
                }
            }
            :deep .formItemLocation{
                //margin-bottom: 0 !important;
                .rVal input{
                    font-size: 14px;
                }
            }
            .AddTaskModalContainer .formContent .leftForm  .formWrap{
                padding: 0 16px 0px 8px;
            }
            .AddTaskModalContainer {
                :deep .ant-select-selector{
                    border: none !important;
                    outline: 0 !important;
                }
                .ant-select-selection-item-content .ant-avatar {
                    display: none !important;
                }

                .ant-select-selection-item .ant-avatar {
                    display: none !important;
                }

                .barContainer {
                    display: none;
                }

                .formContent {
                    margin-top: 0;
                    height: 100%;
                }

                .formContent .leftForm .formWrap .formRow {
                    min-height: 30px !important;
                }

                .selectIcon {
                    top: 5px !important;
                }

                .formContent .leftForm .formWrap .formRow .timeBox .rowTime {
                    margin-bottom: 0px !important;
                }

                .formContent .leftForm .formWrap {
                    padding: 0px 16px 0 8px !important;
                }
            }
            .ant-modal-wrap{
                overflow: hidden !important;
            }
</style>