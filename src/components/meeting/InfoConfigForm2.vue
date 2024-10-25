<template>
    <div>
        <div class="modalContainer InfoConfigForm2Container">
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <div class="tabPanel">
                        <div class="barContainer">
                            <div class="groupContainer">
                                <a-dropdown>
                                    <div class="groupBtn">
                                        <span class="icon">
                                            <ControlOutlined />
                                        </span>
                                        <span class="text">答复选项</span>
                                        <span class="arrowIcon">
                                            <DownOutlined />
                                        </span>
                                    </div>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">请求答复</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">允许转发</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon"></span>
                                                    <span class="menuText">隐藏与会者列表</span>
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
                                            <ProjectOutlined/>
                                        </span>
                                        <span class="text">忙碌</span>
                                        <span class="arrowIcon">
                                            <DownOutlined />
                                        </span>
                                    </div>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">空闲</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">在其他地方工作</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">暂定</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">忙碌</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item>
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">外出</span>
                                                </div>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                                <a-dropdown>
                                    <div class="groupBtn">
                                        <span class="icon">
                                            <ClockCircleOutlined />
                                        </span>
                                        <span class="text">15分钟前</span>
                                        <span class="arrowIcon">
                                            <DownOutlined />
                                        </span>
                                    </div>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item v-for="(item,index) in menuTimes" :key="index">
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">{{item}}</span>
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
                                            <TagOutlined />
                                        </span>
                                        <span class="text">分类</span>
                                        <span class="arrowIcon">
                                            <DownOutlined />
                                        </span>
                                    </div>
                                    <template #overlay>
                                        <a-menu>
                                            <a-menu-item v-for="(item,index) in categoryList" :key="index">
                                                <div class="menu-row">
                                                    <span class="icon">
                                                        <CheckOutlined />
                                                    </span>
                                                    <span class="menuText">{{item.label}}</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item
                                                style="border-top: 1px solid #e2e3e5;border-radius: 0 4px 0px 4px;">
                                                <div class="menu-row">
                                                    <span class="icon">
                                                    </span>
                                                    <span class="menuText">新建类别</span>
                                                </div>
                                            </a-menu-item>
                                            <a-menu-item
                                                style="border-top: 1px solid #e2e3e5;border-radius: 0 4px 0px 4px;">
                                                <div class="menu-row">
                                                    <span class="icon">
                                                    </span>
                                                    <span class="menuText">管理类别</span>
                                                </div>
                                            </a-menu-item>
                                        </a-menu>
                                    </template>
                                </a-dropdown>
                                <div class="groupBtn">
                                    <span class="icon">
                                        <UnlockOutlined />
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
                                                <a-button :icon="h(EditOutlined)" />
                                            </div>
                                            <div class="rVal">
                                                <input type="text" v-model="formState.Subject" class="title"
                                                    placeholder="添加标题">
                                            </div>
                                            <div class="lIcon">
                                                <LockOutlined />
                                            </div>
                                        </div>
                                    </a-form-item>
                                    <a-form-item name="OwningUser">
                                        <div class="formRow">
                                            <div class="lIcon">
                                                <UserAddOutlined />
                                            </div>
                                            <div class="rVal">
                                                <a-select mode="single" allowClear
                                                    v-model:value="formState.OwningUser.Id"
                                                    :default-active-first-option="false" :filter-option="false"
                                                    showSearch @search=" (e) => { searchlookup(e, '8','OwningUser'); } "
                                                    @dropdownVisibleChange=" (e) => { searchlookup('', '8','OwningUser'); } "
                                                    :placeholder="'选择会议预约人'">
                                                    <template #suffixIcon></template>
                                                    <a-select-option v-for="(option, optionIdx) in OwningUser"
                                                        :key="optionIdx" :value="option.ID">
                                                        <a-avatar :size="37">
                                                            <template #icon><UserOutlined /></template>
                                                            <!-- <img :src="item.ImageUrls" alt="" class="commentAvatar" /> -->
                                                        </a-avatar>
                                                        {{ option.Name}}
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
                                            <ClockCircleOutlined />
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
                                                                <SyncOutlined />
                                                            </span>
                                                            <span class="text">不重复</span>
                                                            <span class="arrowIcon">
                                                                <DownOutlined />
                                                            </span>
                                                        </div>
                                                        <template #overlay>
                                                            <a-menu>
                                                                <a-menu-item>
                                                                    <div class="menu-row">
                                                                        <span class="icon">
                                                                            <CheckOutlined />
                                                                        </span>
                                                                        <span class="menuText">不重复</span>
                                                                    </div>
                                                                </a-menu-item>
                                                                <a-menu-item>
                                                                    <div class="menu-row">
                                                                        <span class="icon">
                                                                            <CheckOutlined />
                                                                        </span>
                                                                        <span class="menuText">每天</span>
                                                                    </div>
                                                                </a-menu-item>
                                                                <a-menu-item>
                                                                    <div class="menu-row">
                                                                        <span class="icon"></span>
                                                                        <span class="menuText">每周</span>
                                                                    </div>
                                                                </a-menu-item>
                                                                <a-menu-item>
                                                                    <div class="menu-row">
                                                                        <span class="icon"></span>
                                                                        <span class="menuText">每月</span>
                                                                    </div>
                                                                </a-menu-item>
                                                                <a-menu-item>
                                                                    <div class="menu-row">
                                                                        <span class="icon"></span>
                                                                        <span class="menuText">每年</span>
                                                                    </div>
                                                                </a-menu-item>
                                                            </a-menu>
                                                        </template>
                                                    </a-dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <a-form-item name="RoomId">
                                        <div class="formRow">
                                            <div class="lIcon">
                                                <HomeOutlined />
                                            </div>
                                            <div class="rVal">
                                                <a-select mode="single" allowClear
                                                    v-model:value="formState.RoomId.Id"
                                                    :default-active-first-option="false" :filter-option="false"
                                                    showSearch @search=" (e) => { searchlookup(e, '20034','RoomId'); } "
                                                    @dropdownVisibleChange=" (e) => { searchlookup('', '20034','RoomId'); } "
                                                    :placeholder="'请选择会议室'">
                                                    <template #suffixIcon></template>
                                                    <a-select-option v-for="(option, optionIdx) in RoomId"
                                                        :key="optionIdx" :value="option.ID">
                                                        <a-avatar :size="37">
                                                            <template #icon><HomeOutlined /></template>
                                                            <!-- <img :src="item.ImageUrls" alt="" class="commentAvatar" /> -->
                                                        </a-avatar>
                                                        {{ option.Name}}
                                                    </a-select-option>
                                                </a-select>
                                                <div class="selectIcon">
                                                    <SearchOutlined class="ant-select-suffix"
                                                        @click="handleOpenLook('20034','RoomId')" />
                                                </div>
                                            </div>
                                        </div>
                                    </a-form-item>
                                    <a-form-item name="Location">
                                        <div class="formRow">
                                            <div class="lIcon">
                                                <EnvironmentOutlined />
                                            </div>
                                            <div class="rVal">
                                                <input type="text" v-model="formState.Location" placeholder="搜索位置">
                                            </div>
                                        </div>
                                    </a-form-item>
                                    <!-- <a-form-item name="MeetingSummary">
                                        <div class="formRow" style="align-items: self-start;">
                                            <div class="lIcon">
                                                <FormOutlined />
                                            </div>
                                            <div class="rVal rVal2">
                                                <TEditor ref="editorRef" mode="middle" :placeholder="'会议内容'" :height=180
                                                    @input="getEditorContent" />
                                            </div>
                                        </div>
                                    </a-form-item> -->
                                    <a-form-item name="Description">
                                        <div class="formRow" style="align-items: self-start;">
                                            <div class="lIcon">
                                                <FormOutlined />
                                            </div>
                                            <div class="rVal rVal2">
                                                <TEditor ref="editorRef2" mode="middle" :placeholder="'备注'" :height=180
                                                    @input="getEditorContent2" />
                                            </div>
                                        </div>
                                    </a-form-item>
                                </a-form>
                            </div>
                        </div>
                        <div class="rightCalendar">
                            <DayCalendar ref="DayCalendarWrap" :id="props.id" :currentTime="formState.StartDateTime" :startDateTime="formState.startTime" :endDateTime="formState.endTime" :calendarType="formState.CalendarType||props.calendarType" @calendarDayChange="calendarDayChange" :objectTypeCode="props.objectTypeCode" />
                        </div>
                    </div>
                </div>
            </div>
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
        HomeOutlined,
        SwapOutlined,
        CheckOutlined,
        EllipsisOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import TEditor from "@/components/TEditor.vue";
    import DayCalendar from "@/components/meeting/AddMeetingDayModal.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const DayCalendarWrap=ref(null);
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        objectTypeCode: String,
        id: String,
        entityApiName: String,
        calendarType: String,
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
    const editorRef2 = ref();
    const data = reactive({
        title: "新建会议",
        height: document.documentElement.clientHeight - 380,
        menuTimes: [
            '不要提醒我', '在事件发生时', '5 分钟 钱', '30分钟 前', '1小时 前',
            '2小时 前', '12小时 前', '1天 前', '1周 前', '添加电子邮件提醒'
        ],
        categoryList: [
            {
                value: "#ff8c00",
                label: "橙色类别"
            },
            {
                value: "#e74856",
                label: "红色类别"
            },
            {
                value: "#fff100",
                label: "黄色类别"
            },
            {
                value: "#00bcf2",
                label: "蓝色类别"
            },
            {
                value: "#47d041",
                label: "绿色类别"
            },
            {
                value: "#8764b8",
                label: "紫色类别"
            }
        ],
        OwningUser: [],
        RoomId:[],
        calendarItem:{},
        isRadioUser:false,
    });
    const {
        title,
        height,
        menuTimes, categoryList, OwningUser,RoomId,isRadioUser
    } = toRefs(data);
    const formState = reactive({
        RegardingObjectTypeCode: 20290,
        RegardingObjectId: {},
        Subject: '',
        StartDateTime: '',
        StartDateTime_time: '',
        ScheduledStart: '',
        ScheduledEnd: '',
        EndDateTime: '',
        EndDateTime_time: '',
        OwningUser: {},
        RoomId:{},
        IsAllDayEvent: false,
        Location: '',
        Description: '',
        MeetingSummary:'',
        CalendarType: '',
        RegardingObjectIdName: '',
        BgColor: '',
        IsPrivate: false,
        Reminder: false,
        startTime: "",
        endTime: "",
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
            // if(props.paramsTime.end=='00:00'){
            //     formState.EndDateTime_time = "09:00";
            // }
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
    }else{
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
        formState.MeetingSummary = e;
    }
    const getEditorContent2 = (e) => {
        formState.Description = e;
    }
    watch(()=>formState.StartDateTime,(newVal,oldVal)=>{
        formState.startTime = newVal + ' ' + formState.StartDateTime_time;
        calendarGetData();
    }, {deep: true})
    watch(()=>formState.StartDateTime_time,(newVal,oldVal)=>{
        formState.startTime = formState.StartDateTime + '' + newVal;
        calendarGetData();
    }, {deep: true})
    watch(()=>formState.EndDateTime,(newVal,oldVal)=>{
        formState.endTime = newVal + '' + formState.EndDateTime_time;
        //calendarGetData();
    }, {deep: true})
    watch(()=>formState.EndDateTime_time,(newVal,oldVal)=>{
        formState.endTime = formState.EndDateTime + '' + newVal;
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
    const searchlookup = (search, Lktp,fieldApiName) => {
        let obj = {
        actions:[{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: 'MeetingRec',
                    fieldApiName: fieldApiName,
                    pageParam: 1,
                    pageSize: 25,
                    q: search,
                    searchType: "Recent",
                    targetApiName: 'SystemUser',
                    body: {
                        sourceRecord: {
                        apiName: 'MeetingRec',
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
        if(Lktp=='20034'){
            obj.actions[0].params.targetApiName='ResourceOrg';
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
        //         if(Lktp=='30020'){
        //             data.OwningUser = listData;
        //         }
        //         else{
        //             data.RoomId = listData;
        //         }
                
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
        //console.log("props1", props.paramsTime);
        data.calendarItem={
            Id:props.id||'001',
            Subject: formState.Subject,
            What: formState.Description,
            OwningUserName: formState.OwningUser?formState.OwningUser.Name:'',
            StartDateTime: formState.StartDateTime+' '+formState.StartDateTime_time,
            EndDateTime: formState.EndDateTime+' '+formState.EndDateTime_time,
            IsAllDayEvent: formState.IsAllDayEvent,
            IsPrivate: formState.IsPrivate,
            IsRecurrence2:false,
            Where:formState.RoomId?formState.RoomId.Name:(formState.Location||''),
            sobjectType: "Event",
            Telephone:formState.Telephone||'',
            StatusCodeName:formState.StatusCodeName||'',
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
        formState.EndDateTime = e.date;
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
    onMounted(() => {
        data.height = document.documentElement.clientHeight - 370;
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 370;
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
            formState.Location=fields.Location&&fields.Location.value?fields.Location.value:'';
            formState.Subject=fields.Name&&fields.Name.value?fields.Name.value:'';
            formState.Description=fields.Description&&fields.Description.value?fields.Description.value:'';
            formState.MeetingSummary=fields.MeetingSummary&&fields.MeetingSummary.value?fields.MeetingSummary.value:'';
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
            //editorRef.value.content=formState.MeetingSummary;
            editorRef2.value.content=formState.Description;
            formState.CalendarType=fields.CalendarType&&fields.CalendarType.value?fields.CalendarType.value:'';
            formState.IsAllDayEvent=fields.IsAllDayEvent?fields.IsAllDayEvent.value:'';
            
            if(fields.OwningUser&&fields.OwningUser.value){
                let OwningUserName=fields.OwningUser.displayValue||'';
                let OwningUserId=fields.OwningUser.value;
                formState.OwningUser={Id:OwningUserId,Name:OwningUserName};
                data.OwningUser.push({
                    ID: OwningUserId,
                    Name: OwningUserName
                });
            }
            searchlookup('', '8','OwningUser');

            if(fields.RoomId&&fields.RoomId.value){
                let RoomIdName=fields.RoomId.displayValue||'';
                let RoomIdValue=fields.RoomId.value;
                formState.RoomId={Id:RoomIdValue,Name:RoomIdName};
                data.RoomId.push({
                    ID: RoomIdValue,
                    Name: RoomIdName
                });
            }
            formState.Telephone=fields.Telephone?fields.Telephone.value:'';
            formState.StatusCodeName=fields.StatusCode?fields.StatusCode.displayValue:'';
            searchlookup('', '20034','RoomId');
            
            calendarGetData();
        }
    })
    
  }
  if(props.id){
      data.title = '编辑会议';
      getDetail();
  }
  else{
        if(props.paramsTime&&props.paramsTime.resourceId){
            data.RoomId.push({
                ID: props.paramsTime.resourceId,
                Name: props.paramsTime.resourceName
            });
            formState.RoomId.Id=props.paramsTime.resourceId;
        }
        let userInfo=window.localStorage.getItem('userInfo');
        if(userInfo){
            userInfo=JSON.parse(userInfo);
            data.OwningUser.push({
                ID: userInfo.userId,
                Name: userInfo.fullName
            });
            formState.OwningUser.Id=userInfo.userId;
        }
        calendarGetData();
  }

    const handleSubmit = () => {
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
                            Name: formState.Subject,
                            ScheduledStart: formState.StartDateTime+' '+formState.StartDateTime_time,
                            ScheduledStartTime:formState.StartDateTime_time,
                            ScheduledEnd: formState.EndDateTime+' '+formState.EndDateTime_time,
                            ScheduledEndTime:formState.EndDateTime_time,
                            Location: formState.Location,
                            // Telephone:'',
                            // IsPublic:false,
                            // AllowInviteeCheckin:false,
                            // Attachs:'',
                            // ReminderTime:"",
                            // ReminderTimeTime:'',
                            // InviteQty:'',
                            // AcceptQty:'',
                            // SpeakQty:'',
                            // layTableCheckbox:false,
                            // MeetingService_Name_1:'',
                            // MeetingItem_SortNumber_1:'',
                            // MeetingItem_Name_1:'',
                            // MeetingItem_ScheduledMeeting_1:'',
                            // MeetingType:'',
                            // StateCode:'',
                            StatusCode:1,
                            //MeetingSummary:formState.MeetingSummary,
                            Description: formState.Description,
                            RoomId:formState.RoomId.Id,
                            // OwningBusinessUnit:'',
                            // ContactUser:'',
                            // HostName:'',
                            // MeetingMgrId:'',
                            // OwningUser:formState.OwningUser.Id,
                            // MeetingService_HandleBy_1:'',
                            // MeetingItem_ApplyBy_1:'',
                            // MeetingItem_OwningBusinessUnit_1:''
                        }
                    }
                }
            }]
        };
        if(props.id){
            url = Interface.edit;
            d.actions[0].params.recordId = props.id;
        }
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(url, obj).then((res) => {
          message.success("保存成功！");
          emit("select-val", '');
          //emit("success", false);
        });
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
            formState.OwningUser.Id=params.id;
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
    }
    defineExpose({clearForm,handleSubmit})
</script>
<style lang="less" scoped>
    @import url("@/style/modal.less");

    .ant-modal-content .modalContainer .modalCenter {
        /* height: 500px !important; */
    }

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
            }

            .arrowIcon {
                height: 12px;
                line-height: 12px;
                width: 12px;
                fill: #242424;
                margin-left: 4px;
                margin-right: 2px;
                font-size: 12px;
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

                input::placeholder {}

                .formRow {
                    display: flex;
                    min-height: 48px;
                    align-items: center;

                    .lIcon {
                        width: 32px;
                        height: 32px;
                        margin-right: 9px;
                        text-align: center;
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
    .InfoConfigForm2Container{
        .ant-select-selection-item-content .ant-avatar{
            display: none !important;
        }
        .ant-select-selection-item .ant-avatar{
            display: none !important;
        }
        .barContainer{
            display: none;
        }
        .formContent{
            margin-top: 0;
            height: 100%;
        }
    }
    .ant-select-item-option-content .ant-avatar{
            margin-right: 8px !important;
        }
</style>