<template>
    <div class="calendarWrap">
        <!-- <div class="leftBox">
            <div class="tabsWrap">
                <a-tabs v-model:activeKey="activeKey">
                    <a-tab-pane key="1" tab="会议状态"></a-tab-pane>
                    <a-tab-pane key="2" tab="人员组织"></a-tab-pane>
                </a-tabs>
            </div>
            <ul class="meetingStatelist" v-if="activeKey=='1'">
                <li class="statusItem" :class="{'active':statusCurrent==index}" v-for="(item,index) in statusList" :key="index"
                    @click="handleStatus(item,index)">{{ item.label }}</li>
            </ul>
            <div class="peopleOrgBody" v-else>
                <a-input-search v-model:value="searchVal" placeholder="请输入" style="width: 100%" @search="onSearch" />
                <div class="userTree">
                    <a-tree blockNode :tree-data="userListTree"></a-tree>
                </div>
            </div>
        </div> -->
        <div class="rightBox">
            <div class="calendarHeader" v-if="type!='print'">
                <div class="form">
                    <div class="formItem ml10" v-if="calendarType==0">
                        <a-date-picker v-model:value="currentTime" @change="changeTime" />
                    </div>
                    <div class="formItem ml10 pickerTime" v-if="calendarType==1">
                        <span class="arrowIcon" @click="handlePrevWeek">
                            <LeftOutlined />
                        </span>
                        <a-date-picker v-model:value="startWeekTime" @change="changeStartTime" />
                        ~
                        <a-date-picker v-model:value="endWeekTime" @change="changeEndTime" />
                        <span class="arrowIcon" @click="handleNextWeek">
                            <RightOutlined />
                        </span>
                    </div>
                    <div class="formItem ml10 pickerMonth" v-if="calendarType==2">
                        <span class="arrowIcon" @click="handlePrevMonth" title="上一月">
                            <LeftOutlined />
                        </span>
                        <a-date-picker v-model:value="monthValue" :format="monthFormat" picker="month" @change="changeMonth" />
                        <span class="arrowIcon" @click="handleNextMonth" title="下一月">
                            <RightOutlined />
                        </span>
                    </div>
                    <a-button :disabled="currentTimeNow==dayjs(currentTime).format('YYYY-MM-DD')" class="ml10" v-if="calendarType==0" @click="backNowTime(0)">今天</a-button>
                    <a-button :disabled="currentStartWeekTime==dayjs(startWeekTime).format('YYYY-MM-DD')&&currentEndWeekTime==dayjs(endWeekTime).format('YYYY-MM-DD')" class="ml10" v-if="calendarType==1" @click="backNowTime(1)">本周</a-button>
                    <a-button :disabled="currentMonthValue==dayjs(monthValue).format('YYYY-MM')" class="ml10" v-if="calendarType==2" @click="backNowTime(2)">本月</a-button>

                    <a-button class="ml10" :icon="h(RedoOutlined)" @click="calendarTypeChange(calendarType);" title="刷新"></a-button>
                </div>
               
                <div class="btnOptions">
                    <!-- <a-button type="primary" @click="handleAddMeeting"></a-button>
                    <a-button type="primary" class="ml10" @click="handleAddRepeatMeeting"></a-button> -->
                </div>
            </div>
            <div class="calendarHeader" v-if="type=='print'">
                <div class="printTitle">{{ pagetime+' '+pagename }}</div>
            </div>
            <div class="calendarBody Dutyshift">
                <!-- <MonthCalendar ref="MonthCalendarWrap" v-if="calendarType==2" :currentDate="currentDate" :startDateTime="startTime" :endDateTime="endTime" :calendarType="formState.type" @openNew="handleSelectCalendar" @handleDetail="handleDetail" @openEdit="handleOpenEdit" @handleDelete="handleDelete" />
                <DayCalendar ref="DayCalendarWrap" :id="meetingId" v-if="calendarType==0" :currentTime="currentTime" @openNew="handleOpenNew" :startDateTime="startTime" :endDateTime="endTime" :calendarType="formState.type" @handleDetail="handleDetail" @openEdit="handleOpenEdit" @handleDelete="handleDelete" />
                <WeekVue ref="WeekVueWrap" v-if="calendarType==1" :week="week" :startDateTime="startTime" :endDateTime="endTime" :calendarType="formState.type" @openNew="handleOpenNew" @handleDetail="handleDetail" @openEdit="handleOpenEdit" @handleDelete="handleDelete" /> -->
                <DutyshiftFullCalendar ref="FullCalendarWrap" :calendarView="calendarView" :id="meetingId" :currentTime="currentTime"  @openNew="handleOpenNew" :startDateTime="startTime" :endDateTime="endTime" :calendarType="formState.type" @handleDetail="handleDetail" @openEdit="handleOpenEdit" @handleDelete="handleDelete" @selectVal="handleNewMeetingVal" />
                <div class="Description">
                    <span>备注：</span>
                    <a-textarea id="Description" placeholder="" :rows="8" v-model:value="Description" @change="handleSave" />
                </div>
                <div class="LeaveMessage">
                    <span>备注二：</span>
                    <a-textarea id="LeaveMessage" placeholder="" :rows="8" v-model:value="LeaveMessage" @change="handleSave" />
                </div>
            </div>
        </div>
        <NewMeeting :isShow="isNewMeeting" :meetingId="meetingId" v-if="isNewMeeting" @cancel="cancelNewMeeting" @selectVal="handleNewMeetingVal" :paramsTime="paramsTime" :calendarType="formState.type" />
        <NewRepeatMeeting :isShow="isRepeatMeeting" @cancel="cancelRepeatMeeting" @selectVal="handleRepeatMeetingVal" />
        <MeetingDetailModal :isShow="isMeetingDetail" v-if="isMeetingDetail" :meetingId="meetingId" @cancel="isMeetingDetail=false" @edit="handleOpenEdit" @handleDelete="handleDelete" />
        <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="onSearch" :sObjectName="sObjectName" :recordId="meetingId" :objTypeCode="objectTypeCode" :external="external" />
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
        h,
        nextTick
    } from "vue";
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    dayjs.locale('zh-cn');
    import calendar from 'dayjs/plugin/calendar';
    import weekday from 'dayjs/plugin/weekday';
    import localeData from 'dayjs/plugin/localeData';
    
    dayjs.extend(calendar);
    dayjs.extend(weekday);
    dayjs.extend(localeData);

    import WeekVue from "@/components/meeting/meetingCalendar/Week.vue";
    import DayCalendar from "@/components/meeting/meetingCalendar/DayCalendar2.vue";
    import MonthCalendar from "@/components/meeting/meetingCalendar/MonthCalendar.vue";

    import DutyshiftFullCalendar from "@/components/Dutyshift/DutyshiftAdmin/DutyshiftFullCalendar.vue";

    // 会议详情
    import MeetingDetailModal from "@/components/meeting/MeetingDetailModal2.vue";

    // 新建
    import NewMeeting from "@/components/meeting/meetingCalendar/NewMeeting.vue";
    // 重复会议
    import NewRepeatMeeting from "@/components/meeting/meetingCalendar/NewRepeatMeeting.vue";
    import { SearchOutlined, DeleteOutlined, RedoOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons-vue";
    import { Descriptions, message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import Delete from "@/components/listView/Delete.vue";
    import { Lunar, Solar, HolidayUtil } from "lunar-javascript";
    import { useRouter, useRoute } from "vue-router";
    import { girdFormatterValue,formTreeData } from "@/utils/common.js";
    const route = useRoute();
    const router = useRouter();
    const MonthCalendarWrap=ref(null);
    const DayCalendarWrap=ref(null);
    const WeekVueWrap=ref(null);
    const emit = defineEmits(['refresh']);
    onMounted(()=>{
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    })
    const formRef = ref();
    const monthFormat = 'YYYY-MM';
    const data = reactive({
        activeKey: "1",
        statusList: [
            {
                label: "全部",
                value: ""
            },
            {
                label: "草稿",
                value: "0"
            },
            {
                label: "已发布",
                value: "1"
            },
            {
                label: "已完成",
                value: "2"
            },
            {
                label: "已取消",
                value: "3"
            },
        ],
        statusCurrent: 0,
        searchVal: "",
        userListTree: [],
        meetingList: {},
        monthValue: dayjs(new Date()),
        calendarType: 2,
        calendarView:'dayGridMonth',
        currentTime: dayjs(),
        startWeekTime: "",
        endWeekTime: "",
        week: [],
        isNewMeeting: false,
        isRepeatMeeting: false,
        paramsTime: {
            date: "",
            time: "",
            end:"",
            endDate:""
        },
        meetingId: "",
        isMeetingDetail: false,
        startTime:'',
        endTime:'',
        objectTypeCode:'5000',
        sObjectName:'MeetingRec',
        isDelete: false,
        deleteDesc: '确定要删除吗？',
        external:false,
        LeaveMessage:'',
        Description:'',
        type:'',
        pagename:'',
        pagetime:'',
        id:''
    });
    const { id,pagetime,pagename,type,activeKey, statusList, statusCurrent, searchVal, userListTree, meetingList,LeaveMessage,Description,
         monthValue, calendarType, currentTime, startWeekTime, endWeekTime, week, isNewMeeting, isRepeatMeeting, paramsTime,
         meetingId, isMeetingDetail,startTime,endTime,objectTypeCode,sObjectName,isDelete,deleteDesc,external,calendarView} = toRefs(data);
    const colors = ["#3399ff","#f0854e","#61cc53","#eb3d85"]
    const FullCalendarWrap=ref(null);
    const calendarTypeChange=(e)=>{
        data.calendarType=e;
        if(e==2){
            data.startTime = dayjs(data.monthValue || new Date()).startOf("month").format("YYYY-MM-DD");
            data.endTime = dayjs(data.monthValue || new Date()).endOf('month').format('YYYY-MM-DD');
            data.calendarView='dayGridMonth';
            // nextTick(()=>{
            //     MonthCalendarWrap.value.getQuery();
            // })
        }
        else if(e==1){
            data.startTime = dayjs(data.startWeekTime).format("YYYY-MM-DD");
            data.endTime = dayjs(data.endWeekTime).format("YYYY-MM-DD");
            data.calendarView='timeGridWeek';
            // nextTick(()=>{
            //     WeekVueWrap.value.getQuery();
            // })
        }
        else if(e==0){
            data.startTime = dayjs(data.currentTime || new Date()).startOf("day").format("YYYY-MM-DD");
            data.endTime = dayjs(data.currentTime || new Date()).endOf('day').format('YYYY-MM-DD');
            data.calendarView='timeGridDay';
            // nextTick(()=>{
            //     DayCalendarWrap.value.getQuery();
            // })
        }
        nextTick(()=>{
            FullCalendarWrap.value.getQuery();
        })
    }

    const backFn = (list) => {
        var len = list.length;
        var index = Math.floor(Math.random() * len);
        return colors[index];
    }
    const formState = reactive({
        type: ""
    })
    // 周/日历 点击单元格新建
    const handleOpenNew = (params) => {
        data.meetingId='';
        data.paramsTime = params;
        data.isNewMeeting =  true;
    }
    // 月历 点击单元格新建
    const handleSelectCalendar = (e,info) => {
        data.meetingId='';
        data.paramsTime={
            date: e.format("YYYY-MM-DD"),
            time: ""
        }
        data.isNewMeeting = true;
    }
    // 日-切换日期
    const changeTime = (e) => {
        data.currentTime = dayjs(e);
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    const today = dayjs();
    for (let i = 0; i < 7; i++) {
        const date = today.startOf('week').add(i - 1, 'day');
        // console.log("date",date.format("YYYY-MM-DD"))
        var time = date.format("YYYY-MM-DD");
        data.week.push(time);
    }
    data.startWeekTime = dayjs(data.week[0]);
    data.endWeekTime = dayjs(data.week[data.week.length-1]);

    const currentMonthValue=dayjs(new Date()).format("YYYY-MM");
    const currentTimeNow = dayjs(new Date()).format("YYYY-MM-DD");
    const week0 = data.week;
    const currentStartWeekTime = dayjs(data.week[0]).format("YYYY-MM-DD");
    const currentEndWeekTime = dayjs(data.week[data.week.length-1]).format("YYYY-MM-DD");
    
    const backNowTime=(e)=>{
        if(e==2){
            currentDate.value = dayjs(new Date());
            data.monthValue=dayjs(new Date());
            emit("refresh", dayjs(data.monthValue).format("YYYY-MM"));
        }
        else if(e==1){
            data.week=week0;
            data.startWeekTime = dayjs(week0[0]).format("YYYY-MM-DD");
            data.endWeekTime = dayjs(week0[week0.length-1]).format("YYYY-MM-DD");
        }
        else if(e==0){
            data.currentTime=dayjs(new Date());
        }
        nextTick(()=>{
            calendarTypeChange(e);
        })
    }
    
    watch(route.query.name,(newVal,oldVal)=>{
        data.type=route.query.type||'';
        data.pagename=route.query.name||'';
        //data.pagetime=dayjs(data.monthValue).format("YYYY-MM");
        data.pagetime=route.query.time||'';
        emit("refresh", dayjs(data.monthValue).format("YYYY-MM"));
    },{deep: true, immediate: true})
    
    // 周-切换日期
    const changeStartTime = (e) => {
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    const changeEndTime = (e) => {
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    // 周-上周
    const handlePrevWeek = () => {
        let temp = [];
        for (let i = 0; i < 7; i++) {
            const date = dayjs(data.endWeekTime).startOf('week').add(i - 8, 'day');
            var time = date.format("YYYY-MM-DD");
            temp.push(time);
        }
        //console.log("temp",temp);
        data.week = temp;
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    // 周-下周
    const handleNextWeek = () => {
        let temp = [];
        for (let i = 0; i < 7; i++) {
            const date = dayjs(data.endWeekTime).startOf('week').add(i + 6, 'day');
            var time = date.format("YYYY-MM-DD");
            temp.push(time);
        }
        //console.log("temp",temp);
        data.week = temp;
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    // 月-上月
    const handlePrevMonth = () => {
        window.dayjs = dayjs;
        let month = dayjs(data.monthValue).startOf('month').add(-1, 'day');
        changeMonth(month);
    }
    // 月-下月
    const handleNextMonth = () => {
        window.dayjs = dayjs;
        let month = dayjs(data.monthValue).endOf('month').add(1, 'day');
        changeMonth(month);
    }
    const handleStatus = (item, index) => {
        data.statusCurrent = index;
    }
    const onSearch = (e) => {
        data.isMeetingDetail = false;
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    
    const currentDate = ref(dayjs());
    const getListData = value => {
        // console.log("value:", value.date());
        // let listData;
        // switch (value.date()) {
        //     case 8:
        //         listData = [
        //             {
        //                 type: 'warning',
        //                 content: 'This is warning event.',
        //             },
        //             {
        //                 type: 'success',
        //                 content: 'This is usual event.',
        //             },
        //         ];
        //         break;
        //     case 10:
        //         listData = [
        //             {
        //                 type: 'warning',
        //                 content: 'This is warning event.',
        //             },
        //             {
        //                 type: 'success',
        //                 content: 'This is usual event.',
        //             },
        //             {
        //                 type: 'error',
        //                 content: 'This is error event.',
        //             },
        //         ];
        //         break;
        //     case 15:
        //         listData = [
        //             {
        //                 type: 'warning',
        //                 content: 'This is warning event',
        //             },
        //             {
        //                 type: 'success',
        //                 content: 'This is very long usual event。。....',
        //             },
        //             {
        //                 type: 'error',
        //                 content: 'This is error event 1.',
        //             },
        //             {
        //                 type: 'error',
        //                 content: 'This is error event 2.',
        //             },
        //             {
        //                 type: 'error',
        //                 content: 'This is error event 3.',
        //             },
        //             {
        //                 type: 'error',
        //                 content: 'This is error event 4.',
        //             },
        //         ];
        //         break;
        //     default:
        // }
        // return listData || [];
        let date = value.date();
        return data.meetingList[date] || [];
    };
    const getMonthData = value => {
        if (value.month() === 8) {
            return 1394;
        }
    };
    const changeMonth = (e) => {
        data.monthValue = dayjs(e, monthFormat);
        emit("refresh", dayjs(data.monthValue).format("YYYY-MM"));
        // console.log("data.monthValue",data.monthValue.format("YYYY-MM"));
        // console.log('dayjs---', data.monthValue)
        window.dayjs = dayjs;
        currentDate.value = dayjs(e);
        getQuery();
        getDetail();
        nextTick(()=>{
            calendarTypeChange(data.calendarType);
        })
    }
    const getQuery = ()=> {
        data.startTime = dayjs(data.monthValue || new Date()).startOf("month").format("YYYY-MM-DD");
        data.endTime = dayjs(data.monthValue || new Date()).endOf('month').format('YYYY-MM-DD');
        // proxy.$get(Interface.meeting.getall,{
        //     startTime: startTime,
        //     endTime: endTime,
        //     MeetingType: "",
        //     employeeId: "",
        //     StatusCode: ""
        // }).then(res=>{
        //     let meetingItems = res.returnValue.meetings[0].meetingItems;
        //     let obj = {};
        //     meetingItems.forEach(item=>{
        //         let daydate = dayjs(item.ScheduledStartDate).format('DD');
        //         console.log("daydate",daydate);
        //         if(!obj[daydate]){
        //             obj[daydate] = [];
        //         }
        //         obj[daydate].push(item);
        //     })
        //     data.meetingList = obj;
        //     console.log("obj",obj)
        // })
    }
    getQuery();
    // 关闭新建
    const cancelNewMeeting = (e) => {
        data.isNewMeeting = false;
    }
    const handleNewMeetingVal = (e) => {
        data.isNewMeeting = false;
        onSearch();
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
    // 编辑日历会议
    const handleEditMeeting = (item,e) => {
        data.paramsTime.date = e.format('YYYY-MM-DD');
        data.meetingId = item.MeetingId;
        data.isNewMeeting = true;
    }
    const handleDetail = (item, date) => {
        data.meetingId=item.Id;
        nextTick(()=>{
            data.isMeetingDetail = true;
        })
    }
    // 编辑
    const handleOpenEdit = (e) => {
        data.paramsTime={
            date: "",
            time: ""
        }
        if(e.paramsTime){
            data.paramsTime=e.paramsTime
        }
        data.meetingId=e.Id;
        data.isNewMeeting = true;
    }
    //删除
    const handleDelete = (e) => {
        data.meetingId=e.Id;
        data.isDelete = true;
    }
    //删除关闭
    const cancelDelete = (e) => {
        data.isDelete = false;
    };

  const getDetail = () => {
    data.LeaveMessage='';
    data.Description='';
    data.id='';
    let YearNumber=dayjs(data.monthValue).format("YYYY");
    let MonthNumber=Number(dayjs(data.monthValue).format("MM"));
    let filterQuery='\nShiftId\teq\t'+route.query.categoryId+'\nYearNumber\teq\t'+YearNumber+'\nMonthNumber\teq\t'+MonthNumber;
        proxy.$post(Interface.list2, {
            filterId:'',
            objectTypeCode:'30641',
            entityName:'HRAttendDutyMonth',
            filterQuery:filterQuery,
            search:'',
            page: 1,
            rows: 10,
            sort:'CreatedOn',
            order:'desc',
            displayColumns:'Description,LeaveMessage'
        }).then(res => {
            if(res&&res.nodes&&res.nodes.length){
              for (var i = 0; i < res.nodes.length; i++) {
                  var item = res.nodes[i];
                  for(var cell in item){
                      if(cell!='id'&&cell!='nameField'){
                          item[cell]=girdFormatterValue(cell,item);
                      }
                  }
                  if(i==0){
                    data.LeaveMessage=item.LeaveMessage||'';
                    data.Description=item.Description||'';
                    data.id=item.id;
                  }
              }
            }
        })
  };

  const handleSave = () => {
    let YearNumber=dayjs(data.monthValue).format("YYYY");
    let MonthNumber=Number(dayjs(data.monthValue).format("MM"));
        let url=Interface.create;
        let d = {
        actions:[{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              recordInput: {
                allowSaveOnDuplicate: false,
                apiName:'HRAttendDutyMonth',
                objTypeCode: '30641',
                fields: {
                    ShiftId:route.query.categoryId,
                    Description:data.Description,
                    LeaveMessage:data.LeaveMessage,
                    YearNumber:YearNumber,
                    MonthNumber:MonthNumber
                }
              }              
            }
        }]
    };
    if(data.id){
        url=Interface.edit;
        d.actions[0].params.recordId=data.id;
    }
    let obj = {
        message: JSON.stringify(d)
    }
        proxy.$post(url,obj).then(res=>{
          if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].state=='SUCCESS'){
                //message.success("保存成功！");
          }
          else{
            if(res&&res.actions&&res.actions[0]&&res.actions[0].state&&res.actions[0].errorMessage){
                message.success(res.actions[0].errorMessage);
            }
            else{
                message.success("保存失败！");
            }
          }
        });
    }
    watch(route.query.categoryId,(newVal,oldVal)=>{
        getDetail();
    },{deep: true, immediate: true})
</script>
<style lang="less" scoped>
    .calendarWrap {
        width: 100%;
        height: 100%;
        display: flex;

        .leftBox {
            width: 220px;
            height: 100%;
            border-right: 1px solid #e5e6eb;
            padding: 15px 0;

            .tabsWrap {
                padding: 0 15px;
            }

            .meetingStatelist {
                line-height: 30px;
                margin-top: 15px;
                padding: 0 15px;

                .statusItem {
                    padding-left: 20px;
                    cursor: pointer;
                    margin-bottom: 4px;

                    &:hover {
                        background: #f2f3f5;
                        color: var(--textColor);
                        font-weight: 700;
                    }

                    &.active {
                        background: #f2f3f5;
                        font-weight: 700;
                        color: var(--textColor);
                    }
                }
            }

            .peopleOrgBody {
                margin-top: 15px;
                padding: 0 15px;

                .userTree {
                    margin-top: 10px;
                }
            }
        }

        .rightBox {
            flex: 1;
            flex-direction: column;
            display: flex;
            :deep .ant-btn {
                margin-top: 0px;
            }
            :deep .ant-picker .ant-picker-input{
                width: 96px;
            }
            .calendarHeader {
                width: 100%;
                padding: 12px;
                border-bottom: 1px solid #e5e6eb;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .printTitle{
                    font-size: 20px;
                    margin: 10px;
                    font-weight: bold;
                    width: 100%;
                    text-align: center;
                }
                .form{
                    display: flex;
                    .ant-btn{
                        color: #888;
                    }
                    .formItem{
                        &.pickerTime{
                            display: flex;
                            align-items: center;
                            .arrowIcon{
                                cursor: pointer;
                            }
                            .ant-picker{
                                border: none;
                            }
                        }
                        &.pickerMonth{
                            display: flex;
                            align-items: center;
                            margin: 0px 5px;
                            .arrowIcon{
                                cursor: pointer;
                                color: #888;
                            }
                            .ant-picker{
                                border: none;
                                width: 80px;
                                :deep .ant-picker-suffix,:deep .ant-picker-clear{
                                    display: none !important;
                                }
                                :deep .ant-picker-input >input{
                                    text-align: center;
                                    font-size: 15px;
                                }
                            }
                        }
                    }
                }
            }
            .calendarBody{
                height: calc(~"100% - 60px");
                overflow: auto;
            }
        }
    }

    .events {
        list-style: none;
        margin: 0;
        padding: 0;
        .messageItem{
            background: #2977f6;
            padding: 5px;
            color: #fff;
            border-radius: 3px;
            margin-bottom: 3px;
            font-size: 12px;
        }
    }

    .events .ant-badge-status {
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        text-overflow: ellipsis;
        font-size: 12px;
    }

    .notes-month {
        text-align: center;
        font-size: 28px;
    }

    .notes-month section {
        font-size: 28px;
    }
    .ant-picker-content{
        border-collapse: collapse;
    }
    :deep .ant-picker-content tr td{
        border: 1px solid #e2e3e5;
    }
    :deep :where(.css-dev-only-do-not-override-kqecok).ant-picker-calendar.ant-picker-calendar-full .ant-picker-calendar-date{
        border-top:none;
    }
    :deep .ant-picker-content thead tr{
        height: 30px;
        line-height: 30px;
        text-align: center;
    }
    :deep .ant-picker-content thead tr th{
        border: 1px solid #e2e3e5;
    }
    .calendar-selectlist{
        width: 122px;
        border: 1px solid #e5e6eb;
        border-radius: 4px;
        /* background: #f2f3f5; */
        background: #fff;
        height: 32px;
        padding-top: 0px;
        margin-left: 15px;
        box-sizing: content-box;
        .calendar-typechook{
            display: flex;
            height: 100%;
            li{
                cursor: pointer;
                /* padding: 3px 9px;
                margin: 0 4px;
                margin-top: 3px; */
                width: 100%;
                height: 100%;
                margin: 0;
                display: inline-block;
                text-align: center;
                line-height: 32px;
                &.active{
                    font-weight: 700;
                    background: var(--backColor);
                    border-radius: 4px;
                    /* color: var(--textColor); */
                    color: #fff;
                }
            }
        }
    }
    .meetingMessageWrap{
        width: 300px;
        .meetingHead{
            display: flex;
            align-items: center;
            .meetingLogo{
                width: 32px;
                height: 32px;
                background: var(--backColor);
                border-radius: 4px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .meetingName{
                margin-left: 20px;
                font-size: 16px;
                font-weight: bold;
            }
        }
        .meetingBody{
            margin-top: 10px;
            .meetingInfo{
                display: flex;
                .meetingInfoItem{
                    flex: 1;
                    font-size: 12px;
                }
                :deep .ant-btn{
                    padding: 0;
                }
            }
        }
    }
    :deep .ant-picker-content tbody tr td:first-child{
        background: #f9f9f9;
    }
    :deep .ant-picker-content tbody tr td:last-child{
        background: #f9f9f9;
    }
    .lunarDisabled{
        color: rgba(0, 0, 0, 0.25);
    }
    .festivals,.holiday{
        font-size: 12px;
        padding-right: 10px;
        color: red;
    }
    .calendarWrap :deep .ant-tabs-nav-operations{
        display: none !important;
    }
    .calendarWrap :deep .ant-tabs-nav-wrap{
        display: block !important;
    }
    .Dutyshift{
        .Description{
            padding:0 20px;
            margin-top: 10px;
        }
        #Description{
            width:100%;
            height:55px;
            border:1px solid #ccc;
            margin-top: 5px;
            border-radius: 4px;
        }
        .LeaveMessage{
            padding:0 20px;
            padding-top:5px;
            padding-bottom: 20px;
        }
        #LeaveMessage{
            width:100%;
            height:55px;
            border:1px solid #ccc;
            margin-top: 5px;
            border-radius: 4px;
        }
        .MeetingFullCalendarWrap{
            height: auto;
        }
    }
    .calendarWrap{
        .rightBox{
            display: block;
        }
    }
</style>