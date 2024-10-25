<template>
    <div class="MeetingRoomFullCalendarWrap">
        <div ref="MeetingRoomFullCalendarRef">
            <FullCalendar class="fullCalendar" ref="fullCalendarRef" :options="calendarOptions" >
                <template #eventContent="arg" >
                    <div class="my-custom-event" :style="{background:arg.event.backgroundColor,color:arg.event.textColor,borderColor:arg.event.borderColor}">
                        <a-popconfirm placement="topLeft" trigger="hover" cancelText="删除" okText="编辑" @confirm="openEdit(arg.event)" @cancel="handleDelete(arg.event)" :z-index="20000" overlayClassName="meeting-popover">
                                    <template #icon></template>
                                    <template #title>
                                        <div class="meetingMessageWrap">
                                            <div class="meetingHead">
                                                <div class="meetingLogo">
                                                    <img :src="require('@/assets/img/meeting.png')" alt="">
                                                </div>
                                                <p class="meetingName">{{arg.event.title}}</p>
                                            </div>
                                            <div class="meetingBody">
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        会议主题：
                                                        <span class="Subject">{{arg.event.extendedProps.Subject}}</span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        会议时间：
                                                        <span class="StartDateTime">{{dayjs(arg.event.start).format("YYYY-MM-DD HH:mm")}}</span>&nbsp;&nbsp;止&nbsp;&nbsp;<span class="EndDateTime">{{dayjs(arg.event.end).format("YYYY-MM-DD HH:mm")}}</span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        会议地点：
                                                        <span class="Where">{{arg.event.extendedProps.Where || ''}}</span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        会议召集人：
                                                        <span class="OwningUserName">{{arg.event.extendedProps.OwningUserName}}</span>
                                                    </div>
                                                    <div class="meetingInfoItem">
                                                        联系电话：
                                                        <span class="TelePhone">{{ arg.event.extendedProps.Telephone }}</span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        审批状态：
                                                        <span class="StatusCodeName" v-if="arg.event.extendedProps.StatusCode=='0'" style="color:#0070d2;">{{arg.event.extendedProps.StatusCodeName || ''}}</span>
                                                        <span class="StatusCodeName" v-else-if="arg.event.extendedProps.StatusCode=='1'" style="color:#f7aa2d;">{{arg.event.extendedProps.StatusCodeName || ''}}</span>
                                                        <span class="StatusCodeName" v-else-if="arg.event.extendedProps.StatusCode=='3'" style="color:#31BA6A;">{{arg.event.extendedProps.StatusCodeName || ''}}</span>
                                                        <span class="StatusCodeName" v-else-if="arg.event.extendedProps.StatusCode=='5'" style="color:#b3b3b3;">{{arg.event.extendedProps.StatusCodeName || ''}}</span>
                                                        <span class="StatusCodeName" v-else>{{arg.event.extendedProps.StatusCodeName || ''}}</span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo">
                                                    <div class="meetingInfoItem">
                                                        会议内容：
                                                        <span class="What" v-html="arg.event.extendedProps.What||''"></span>
                                                    </div>
                                                </div>
                                                <div class="meetingInfo meetingInfo1">
                                                    <a-button type="link" @click.stop="handleDetailView(arg.event.id)">详细信息</a-button>
                                                </div>
                                            </div>
                                        </div>
                                    </template>
                                    <div class="eventItem">
                                        <p>{{dayjs(arg.event.start).format("HH:mm")}}-{{dayjs(arg.event.end).format("HH:mm")}}&nbsp;&nbsp;&nbsp;{{arg.event.title}}</p>
                                        <!-- <p>{{dayjs(arg.event.start).format("HH:mm")}}-{{dayjs(arg.event.end).format("HH:mm")}}</p>
                                        <p>{{arg.event.CreatedByName}}</p> -->
                                    </div>
                                </a-popconfirm>
                    </div>
                </template>
            </FullCalendar>
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
        nextTick,
        toRaw
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

    import { SearchOutlined, DeleteOutlined,LeftOutlined,RightOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    
    import FullCalendar from '@fullcalendar/vue3'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import timeGridPlugin from '@fullcalendar/timegrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import zhCnLocale from '@fullcalendar/core/locales/zh-cn'
    import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
    import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

    import { getLunar } from 'chinese-lunar-calendar'
    import { Lunar, Solar, HolidayUtil } from "lunar-javascript";
    // 获取农历日期
    const getlunarVal = (date) => {
        let dateStr = dayjs(date).format("YYYY-MM-DD");
        let lunarDay = Lunar.fromDate(new Date(dateStr)).getDayInChinese();
        return lunarDay;
    };
    // 获取节日
    const getFestivals = (date) => {
        let festival = '';
        let dateStr = dayjs(date).format("YYYY-MM-DD");
        let SolarFestival = Solar.fromDate(new Date(dateStr)).getFestivals();
        let lunar2 = Solar.fromDate(new Date(dateStr)).getLunar();
        let year = lunar2.getYear();
        let month = lunar2.getMonth();
        let day = lunar2.getDay();
        let LunarFestival = Lunar.fromYmd(year, month, day).getFestivals();
        let LunarJieQi = Lunar.fromYmd(year, month, day).getJieQi();
        if(SolarFestival && SolarFestival.length){
            SolarFestival.forEach(item=>{
                festival += item;
            });
        };
        if(LunarFestival && LunarFestival.length){
            LunarFestival.forEach(item=>{
                festival += item;
            });
        }
        if(LunarJieQi){
            festival += LunarJieQi;
        }
        return festival;
    };
    // 假期
    const getHolidayVal = (date) => {
        let holiday = '';
        let dateStr = dayjs(date).format("YYYY-MM-DD");
        let d = HolidayUtil.getHoliday(dateStr);
        if(d && d!=null){
            let isWork = d.isWork();
            if (isWork) {
                holiday = '班';
            }else {
                holiday = '休';
            }
        }else {
            let weekend = new Date(dateStr).getDay();
            // if (weekend == 0 || weekend == 6) {
            //     holiday = '休';
            // }
        }
        return holiday;
    };
    const getlunarClass = (date) => {
        let month = dayjs(date).format('MM');
        let currentMonth = dayjs(props.currentDate).format('MM');
        return month != currentMonth ? true : false;
    }
    const { proxy } = getCurrentInstance();
    const emit = defineEmits(['openNew','handleDetail','openEdit','handleDelete','select-val','calendarDayChange']);
    const colors = ["#3399ff","#f0854e","#61cc53","#eb3d85"]
    const props = defineProps({
        id:String,
        currentTime: [Object],
        startDateTime:String,
        endDateTime:String,
        calendarType:String,
        calendarView:String
    })

    const data = reactive({
        height: "",
        weekList: [],
        meetingList: {},
        times: ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00",
            "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"],
        currentDate: '',
        paramsTime: {
            date: "",
            time: ""
        },
        resources:[],
        calendarOptions:{
            plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin,resourceTimeGridPlugin,resourceTimelinePlugin], //需要加载的插件 
            initialView: props.calendarView, //初始视图
            //initialDate:props.currentTime,
            height: "auto",
            contentHeight: 100,
            locale: zhCnLocale, //语言汉化
            selectable: true,
            editable: true,
            firstDay:0,
            forceEventDuration: true,
            droppable: true,
            // dropAccept: ".eventListItems", //可被拖进
            // dayMaxEventRows: 99, //事件最大展示列数
            nowIndicator: true,
            fixedWeekCount: false, //因为每月起始日是星期几不固定，导致一个月的行数会不固定，是否固定行数
            // drop: null, //外部拖拽进的事件方法
            handleWindowResize: true,
            windowResizeDelay: 100,
            allDaySlot: false, // 关闭全天选项,
            dayMaxEvents: 5,
            moreLinkContent: '+ 更多',
            slotEventOverlap:false,
            aspectRatio: 2, //宽高比
            // 最小时间
            slotMinTime: '06:00:00',
            // 最大时间
            slotMaxTime: '24:00:00',
            slotDuration:'00:30:00',
            slotLabelFormat: {
                hour: '2-digit',
                minute: '2-digit',
                meridiem: false,
                hour12: false // 设置时间为24小时
            },
            selectMirror:true,
            customButtons: {
                myCustomButton: {
                    text: '看板',
                    click: function() {
                    isWeekViewShow.value = true
                    }
                }
            },
            headerToolbar: {
                left: "today prev next",
                center: "title",
                //right: "myCustomButton,dayGridMonth,timeGridWeek,timeGridDay"
            }, //日历上方的按钮和title
            events: [
                // {
                //     backgroundColor: "#1055BC",
                //     borderColor: "#1055BC",
                //     end: "2024-08-06 23:00:00",
                //     id: "001",
                //     start: "2024-08-06 22:00:00",
                //     textColor: "#FFF",
                //     title: "测试"
                // }
            ], //绑定展示事件
            // 自定义会议展示内容
              eventTimeFormat: {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: false
                },
            // eventContent: event => {},
            // eventRender: function(event, element) {
            //     element.css('background-color', event.backgroundColor);
            // },
            views:{
                // resourceTimeGridDay: {
                //     type: 'resourceTimeline',
                //     duration: { days: 1 },
                //     buttonText: '日',
                //     slotMinTime:'06:00:00',
                //     slotMaxTime:'24:00:00',
                //     slotLabelFormat:[
                //             {hour:'numeric',hour12:false},
                //     ]
                // },
                resourceTimelineWeek:{
                    //type:'resourceTimeline',
                    nowIndicator: false,
                    duration: { week: 1 },
                    slotDuration: { days: 1 },
                    buttonText: '周',
                    // slotLabelFormat: [
                    // {day:'2-digit', weekday:'short',month:'2-digit'},
                    // ],
                    slotLabelFormat: function (date)
                    {
                        //console.log(date)
                        var dtime=date.date.year+'-'+(date.date.month+1)+'-'+date.date.day;
                        let weektext=weeks[(new Date(dtime)).getDay()];
                        var time=(date.date.month+1)+'月'+date.date.day+'日'+'（'+weektext+'）';
                        return time;
                    },
                },
                resourceTimelineMonth:{
                    nowIndicator: false,
                    duration: { month: 1 },
                    slotDuration: { days: 1 },
                    buttonText: '月',
                    // slotLabelFormat: [
                    // {day:'2-digit', weekday:'short',month:'2-digit'},
                    // ],
                    slotLabelFormat: function (date)
                    {
                        //console.log(date)
                        var dtime=date.date.year+'-'+(date.date.month+1)+'-'+date.date.day;
                        let weektext=weeks[(new Date(dtime)).getDay()];
                        var time=(date.date.month+1)+'月'+date.date.day+'日'+'（'+weektext+'）';
                        return time;
                    },
                },
            },
            resources:[],
            resourceAreaWidth:'10%',
            resourceAreaColumns: [
            {
                field: 'title',
                headerContent: '会议室名称'
            }
            ],
            refetchResourcesOnNavigate: true,
            resourceOrder:'dispalyorder',
            aspectRatio: 1.5,
            eventDidMount: (info) => {
                //calendarDayChange2(info,'eventDidMount');
            },
            //点击日期info是单元格的信息
            dateClick: info => {
                //calendarDayChange2(info,'点击日期');
            },
            //事件的点击
            eventClick: info => {
                calendarDayChange2(info,'事件的点击');
            },
            // 移动事件或者拓展事件时间触发函数 返回数组 item._context.options.events Array 当前所有事件
            eventsSet: info => {
                if(info&&info[0]&&info[0].id&&info[0].id=='001'){
                    //calendarDayChange2(info,'移动事件或者拓展事件');
                }
            },
            // 滑动选择时触发                                                                                                                                                                                  
            select: info => {
                calendarDayChange2(info,'滑动选择时触发');
            },
            // 时间调整结束后触发
            eventResize: info => {
                calendarDayChange2(info,'时间调整结束后触发');
            },
            // 拖动会议触发
            eventDrop: info => {
                calendarDayChange2(info,'拖动会议触发');
            },
            // 切换视图时触发
            datesSet: view => {},
        }
    });
    watch(()=>props.startDateTime,(newVal,oldVal)=>{
        data.currentDate = dayjs(newVal).format("YYYY-MM-DD");
        data.calendarOptions.initialDate=dayjs(newVal).format("YYYY-MM-DD");
        //console.log("data.currentDate",data.currentDate);
    },{deep: true, immediate: true})
    watch(()=>props.calendarView,(newVal,oldVal)=>{
        data.calendarOptions.initialView=newVal;
    },{deep: true, immediate: true})
    const weeks = toRaw(['周日', '周一', '周二', '周三', '周四', '周五', '周六']);
    const { height, weekList, meetingList, times, currentDate, paramsTime,calendarOptions } = toRefs(data);
    const MeetingRoomFullCalendarRef = ref(null);
    const fullCalendarRef = ref(null);
    onMounted(() => {
        data.height = MeetingRoomFullCalendarRef.value.scrollHeight;
        data.currentDate=props.currentTime;
        //getQuery();
    })

    const today = dayjs();
    const week = [];
    for (let i = 0; i < 7; i++) {
        const date = today.startOf('week').add(i - 1, 'day');
        // console.log("date",date.format("YYYY-MM-DD"))
        var time = date.format("YYYY-MM-DD");
        week.push(time);
    }

    // const calendarDayChange = (e, item) => {
    //     let layerY = e.layerY;
    //     let index = Math.floor(layerY/30/2);
    //     let startTime = data.times[index > 0 ?  index-1 : index];
    //     data.paramsTime.date = item;
    //     let obj = {
    //         date: item,
    //         time: startTime
    //     }
    //     emit("calendarDayChange", obj);
    // }
    const calendarDayChange2 = (info,text) => {
        console.log(text,info)
        let start='';
        let end='';
        let resourceId='';
        if(text=='滑动选择时触发'&&info.start){
            start=info.start;
            end=info.end;
            resourceId=info.resource.id;
        }
        // if(text=='移动事件或者拓展事件'&&info[0]){
        //     start=info[0].startStr;
        //     end=info[0].endStr;
        //     resourceId=info[0]._def.resourceIds[0];
        // }
        if((text=='事件的点击'||text=='拖动会议触发'||text=='时间调整结束后触发')&&info.event){
            start=info.event.startStr;
            end=info.event.endStr;
            resourceId=info.event._def.resourceIds[0];
        }
        let startDate=dayjs(start).format("YYYY-MM-DD");
        let endDate=dayjs(end).format("YYYY-MM-DD");
        let startTime=dayjs(start).format("HH:mm");
        let endTime=dayjs(end).format("HH:mm");
        data.paramsTime.date = startDate;
        let resources=(data.resources).filter(item=>{
            return item.id==resourceId;
        });
        let obj = {
            date: startDate,
            time: startTime,
            end:endTime,
            endDate:endDate,
            resourceId:resourceId,
            resourceName:resources&&resources[0]?resources[0].title:''
        }
        let obj2={
            resourceId:resourceId,
            StartDateTime:dayjs(start).format("YYYY-MM-DD HH:mm:ss"),
            EndDateTime:dayjs(end).format("YYYY-MM-DD HH:mm:ss")
        }
        if(start&&end&&start!=end){
            if(text=='滑动选择时触发'&&info.start){
                //getQuery2(obj2);
                openNew(obj);
            }
            if(text=='移动事件或者拓展事件'&&info[0]){
                let e={
                  paramsTime:obj,
                  Id:info[0].id
                }
                if(!info[0].id){
                    //getQuery2(obj2);
                    openNew(obj);
                }
                else{
                    openEdit(e);
                }
            }
            if((text=='拖动会议触发'||text=='时间调整结束后触发')&&info.event){
                let e={
                    paramsTime:obj,
                    Id:info.event.id
                }
                if(!info.event.id){
                    //getQuery2(obj2);
                    openNew(obj);
                }
                else{
                    openEdit2(e);
                }
            }
            if(text=='事件的点击'&&info.event){
                let e={
                  Id:info.event.id
                }
                if(!info.event.id){
                    openNew(obj);
                }
                else{
                    handleDetail(e);
                }
                
            }
        }
    }
    //删除
    const handleDelete = (e) => {
        if(!e.Id){
            e.Id=e.id;
        }
        emit("handleDelete", e);
    }
    //编辑
    const openEdit = (e) => {
        if(!e.Id){
            e.Id=e.id;
        }
        emit("openEdit", e);
    }
    const openEdit2 = (e) => {
        let url = Interface.edit;
        let d = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: e.Id,
                    recordInput:{
                        allowSaveOnDuplicate: false,
                        apiName: 'MeetingRec',
                        objTypeCode: '5000',
                        fields: {
                            ScheduledStart: e.paramsTime.date+' '+e.paramsTime.time,
                            ScheduledEnd: e.paramsTime.endDate+' '+e.paramsTime.end,
                        }
                    }
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(url, obj).then((res) => {
            if(res&&res.actions&&res.actions[0]&&res.actions[0].state=='SUCCESS'){
                message.success("保存成功！");
                //emit("select-val", '');
            }
            else{
                message.success("保存失败！");
            }
        });
    }
    //新建
    const openNew = (obj) => {
        emit("openNew", obj);
    }
    //详情
    const handleDetail= (e) => {
        emit("handleDetail", e);
    }
    //详情页
    const handleDetailView=(id)=>{
        window.open('/#/lightning/o/Meeting/view?id='+(id||''));
    }
    // 日-切换日期
    // const changeTime = (e) => {
    //     data.currentDate=dayjs(e).format("YYYY-MM-DD");
    //     nextTick(()=>{
    //         let startTime = data.paramsTime.time;
    //         data.paramsTime.date = data.currentDate;
    //         let obj = {
    //             date: data.currentDate,
    //             time: startTime
    //         }
    //         emit("calendarDayChange", obj);
    //     })
    // }
    
    const handleNextDay = () => {
        var date = new Date(data.currentDate);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        data.currentDate=(dayjs(new Date(year, month, day + 1)).format("YYYY-MM-DD"));
        changeTime(data.currentDate);
    }
    const handlePrevDay = () => {
        var date = new Date(data.currentDate);
        var year = date.getFullYear();
        var month = date.getMonth();
        var day = date.getDate();
        data.currentDate=(dayjs(new Date(year, month, day - 1)).format("YYYY-MM-DD"));
        changeTime(data.currentDate);
    }
    // 判断是否是今天
    const isToDay = (time) => {
        const currentTime = dayjs(new Date()).format("YYYY-MM-DD");
        return currentTime == time ? true : false;
    }
    
    // data.currentDate = dayjs(new Date()).format("YYYY-MM-DD");
    // const week2 = week.map(date => {
    //     if (date.isSame(today, 'day')) {
    //         return '今天';
    // } else {
    //     return date.format('MM.DD');
    //     }
    // });

    //console.log("week", week);
    data.weekList = week;
    // const countTop = (row) => {
    //     let index = data.times.findIndex(item => item == row.meetingdStartTime);
    //     // console.log("index",index);
    //     return (index + 1) * 2 * 30 + "px";
    // }
    const countTop = (row) => {
        var time = dayjs(row.StartDateTime).get('hour');
        let index = data.times.findIndex(item => item.split(':')[0] == time);
        // console.log("index:",index);
        return (index + 1) * 2 * 30 + "px";
    }
    const countHeight = (row) => {
        //console.log("dayjs(row.EndDateTime).get('hour')",dayjs(row.EndDateTime).get('hour'));
        let index = data.times.findIndex(item => item.split(':')[0] == dayjs(row.StartDateTime).get('hour'));
        let endIndex = data.times.findIndex(item => item.split(':')[0] == dayjs(row.EndDateTime).get('hour'));
        //console.log("endIndex",index,endIndex);
        let num = endIndex - index;
        return num * 60 + 'px';
    }
    const getQuery = () => {
        data.paramsTime.date = data.currentDate;
        let d = {
            actions:[{
                "id": "5764;a",
                "descriptor": "",
                "callingDescriptor": "UNKNOWN",
                "params": {
                    "startDateTime": props.startDateTime,
                    "endDateTime": props.endDateTime,
                    "calendarType": 'week',
                    "queryMeetings": true
                }

            }]
        };
        if(data.calendarOptions.initialView=='resourceTimelineMonth'){
            d.actions[0].params.calendarType='month';
        }else if(data.calendarOptions.initialView=='resourceTimelineWeek'){
            d.actions[0].params.calendarType='week';
        }
        else if(data.calendarOptions.initialView=='resourceTimeGridDay'){
            d.actions[0].params.calendarType='day';
        }
        let obj = {
            message: JSON.stringify(d)
        }
        data.meetingList =[];
        data.resources=[];
        proxy.$post(Interface.meetingRoom.roomList,obj).then(res=>{
            fullCalendarRef.value.getApi().view.calendar.changeView(data.calendarOptions.initialView);
            setTimeout(function(){
                fullCalendarRef.value.getApi().gotoDate(new Date(data.currentDate));
                if(data.calendarOptions.initialView=='resourceTimeGridDay'&&document.getElementsByClassName('fc-timegrid-axis')&&document.getElementsByClassName('fc-timegrid-axis').length){
                    //document.getElementsByClassName('fc-scrollgrid-sync-inner')[0].innerHTML='';
                    document.getElementsByClassName('fc-timegrid-axis')[0].innerHTML='时间';
                    //let weektext=weeks[(new Date(data.currentDate)).getDay()];
                    //document.getElementsByClassName('fc-scrollgrid-sync-inner')[0].innerHTML=dayjs(data.currentDate).format("YYYY-MM-DD")+' '+weektext;
                }
                //if(data.calendarOptions.initialView=='timeGridWeek'&&document.getElementsByClassName('fc-timegrid-axis')&&document.getElementsByClassName('fc-timegrid-axis').length){
                    //document.getElementsByClassName('fc-timegrid-axis')[0].innerHTML='时间';
                //}
            },200)
            if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue&&res.actions[0].returnValue.length){
                        let roomList = res.actions[0].returnValue;
                        let obj = {};
                        roomList.forEach((item,index)=>{
                            let roomitem={
                                id:item.meetingRoom?item.meetingRoom.Id:'',
                                title:item.meetingRoom?item.meetingRoom.Name:''
                            }
                            data.resources.push(roomitem);
                            fullCalendarRef.value.getApi().view.calendar.addResource(roomitem);
                            item.meetingItems.forEach((item1,index1)=>{
                                let daydate = dayjs(item1.StartDateTime).format('YYYY-MM-DD');
                                if(!obj[daydate]){
                                    obj[daydate] = [];
                                }
                                item1.StartDateTime=item1.StartDateTime?dayjs(item1.StartDateTime).format("YYYY-MM-DD HH:mm"):'';
                                item1.EndDateTime=item1.EndDateTime?dayjs(item1.EndDateTime).format("YYYY-MM-DD HH:mm"):'';
                                obj[daydate].push(item1);
                                let remainder = index1 % 4;
                                let event={
                                    id: item1.Id,
                                    resourceId:item.meetingRoom?item.meetingRoom.Id:'',
                                    title: item1.Subject||'',
                                    start: item1.StartDateTime,
                                    end: item1.EndDateTime,
                                    Subject:item1.Subject||'',
                                    Where:item1.Where||'',
                                    OwningUserName:item1.OwningUserName||'',
                                    Telephone:item1.Telephone||'',
                                    StatusCodeName:item1.StatusCodeName||item1.statusCodeName||'',
                                    StatusCode:item1.StatusCode||item1.statusCode||'',
                                    What:item1.What||'',
                                    backgroundColor: colors[remainder], // 该事件的背景颜色
                                    borderColor: colors[remainder], // 该事件的边框颜色
                                    textColor: '#FFF' // 该事件的文字颜色
                                }
                                if(fullCalendarRef.value.getApi().view.calendar.getEventById(item1.Id)){
                                    fullCalendarRef.value.getApi().view.calendar.getEventById(item1.Id).remove();
                                }
                                // data.calendarOptions.events.push(event);
                                fullCalendarRef.value.getApi().view.calendar.addEvent(event);
                            })
                            
                        })
                        data.meetingList = obj;
                        //console.log(data.calendarOptions.resources,data.calendarOptions.events)
            }
        })
        
    }
    //getQuery();
    const getQuery2 = (obj) => {
        let event={
            id: '001',
            resourceId:obj.resourceId,
            title: '',
            start: obj.StartDateTime,
            end: obj.EndDateTime,
            backgroundColor: '#1055BC', // 该事件的背景颜色
            borderColor: '#1055BC', // 该事件的边框颜色
            textColor: '#FFF' // 该事件的文字颜色
        }
        if(fullCalendarRef.value.getApi().view.calendar.getEventById('001')){
            fullCalendarRef.value.getApi().view.calendar.getEventById('001').remove();
        }
        fullCalendarRef.value.getApi().view.calendar.addEvent(event);
    }
    defineExpose({getQuery});
</script>
<style lang="less" scoped>
    .MeetingRoomFullCalendarWrap {
        width: 100%;
        height: 100%;
.arrowIcon{
    cursor: pointer;
}
        .weekCalendar {
            height: 100%;

            .weekCalendarHead {
                line-height: 42px;
                background: #fff;
                border-bottom: 1px solid #e5e6eb;
                display: flex;
                align-items: center;

                .timeZone {
                    width: 80px;
                    text-align: center;
                }

                .calendarDayHeaders {
                    flex: 1;
                    display: flex;

                    .weekDayHeadItem {
                        flex: 1;
                        text-align: center;
                    }
                }
            }

            .weekCalendarBody {
                height: calc(~"100% - 43px");
                overflow: auto;
                background: #fff;
                display: flex;

                .timeBox {
                    width: 80px;
                    height: 100%;
                    background: #f0f2f6;
                    text-align: center;

                    strong {
                        display: block;
                        height: 60px;
                        border-top: 1px solid rgb(221, 219, 218);
                        padding: 10px 0 0 0;
                        font-size: .8125rem;
                        color: rgb(62, 62, 60);
                        font-weight: normal;
                        box-sizing: border-box;
                        background: #f0f2f6;
                        border-right: 1px solid rgb(221, 219, 218);

                        &:first-child {
                            border-top: 0;
                        }

                        span {
                            position: relative;
                            top: -20px;
                            padding: 6px;
                            background: #f0f2f6;
                        }
                    }
                }

                .weekRightDay {
                    flex: 1;
                    display: flex;

                    .calendarDay {
                        flex: 1;
                        text-align: center;

                        .eventList {
                            height: 1000px;
                            margin: 0;
                            padding: 0;
                            position: relative;
                            box-sizing: content-box;
                            border-left: 1px solid rgb(221, 219, 218);
                            border-bottom: 1px solid rgb(221, 219, 218);
                            background: linear-gradient(rgba(0, 0, 0, .1) 1px, transparent 1.01px);
                            background-size: 100% 30px;
                            border-width: 1px;
                            border-color: #eee;
                            border-right: none;

                            &:last-child {
                                border-right: 1px solid #eee;
                            }

                            &.active {
                                background-color: rgb(254, 250, 230);
                                background-size: 100% 30px;
                            }

                            .eventItem {
                                width: 100%;
                                height: 60px;
                                background: var(--backColor);
                                color: #fff;
                                position: absolute;
                                text-align: left;
                                padding: 5px;
                                cursor: pointer;
                            }
                        }
                    }
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
                margin-left: 15px;
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
    .MeetingRoomFullCalendarWrap{
        :deep .fc .fc-toolbar-title{
            font-size: 18px;
        }
        :deep .fc .fc-button-group{
            display: none;
        }
        :deep .fc .fc-toolbar.fc-header-toolbar{
            height: 50px;
            margin-bottom: 0;
            display: none;
        }
        :deep .fc-button {
            position: absolute;
        }
        :deep .fc-header-toolbar{
            position: relative;
        }
        :deep .fc-next-button{
            top: 13px;
            right: 100px;
            background: #fff;
            border: none;
            color: #333;
            padding: 0;
        }
        :deep .fc-nextYear-button{
            top: 13px;
            right: 80px;
            background: #fff;
            border: none;
            color: #333;
            padding: 0;
        }
        :deep .fc-prev-button{
            top: 13px;
            left: 88px;
            background: #fff;
            border: none;
            color:#333;
            padding: 0;
        }
        :deep .fc-prevYear-button{
            top: 13px;
            left: 70px;
            background: #fff;
            border: none;
            color:#333;
            padding: 0;
        }
        :deep .fc-today-button{
            top: 10px;
            left: 18px;
            border-radius: 2px;
            background-color: #1677ff;
            border-color: #1677ff;
            font-size: 14px;
            height: 32px;
            padding: 4px 10px;
            display: none !important;
        }
        :deep .fc .fc-scrollgrid{
            border: 0 !important;
        }
        :deep .fc .fc-scrollgrid-section-sticky > *{
            // position: relative;
        }
        :deep .fc .fc-button:disabled {
            opacity: 0.3 !important;
        }
        :deep .fc .fc-button:not(:disabled).fc-button-active:focus,:deep .fc .fc-button:not(:disabled):active:focus{
            box-shadow: none !important;
        }
        :deep .fc-button:focus,:deep .fc-button:active{
            box-shadow: none !important;
        }
        :deep .fc .fc-button:not(:disabled).fc-button-active,:deep .fc .fc-button:not(:disabled):active{
            background: #fff;
            border: none !important;
            color: #333;
        }
        :deep .fc-event-time{
            font-size: 12px !important;
            margin-left: 6px !important;
        }
        :deep .fc-event-title{
            font-size: 12px !important;
            margin-left: 6px !important;
        }
        :deep .fc-timegrid-slots colgroup{
            background: #f0f2f6;
        }
        :deep .fc-timegrid-slots colgroup col, :deep .fc-col-header colgroup col,:deep .fc-timegrid-cols colgroup col{
            width: 70px !important;
        }
        :deep .fc-scrollgrid > colgroup > col {
            min-width: 70px !important;
        }
        :deep table.fc-col-header{
            line-height: 40px;
        }
        :deep .fc-col-header-cell-cushion{
            // display: none !important;
            color: #333;
        }
        :deep .fc-direction-ltr .fc-timegrid-slot-label-frame{
            text-align: center !important;
        }
        // :deep .fc .fc-timegrid-col.fc-day{
        //     position: relative;
        //     left: 24px;
        //     width: calc(~"100% - 24px");
        // }
        :deep .my-custom-event{
            height: 100%;
            width: 100%;
            border-radius: 3px;
            min-height: 18px;
            display: flex;
            align-items: center;
            .eventItem{
                height: 100%;
                width: 100%;
                margin-left: 6px;
                p{
                    margin-top: 0px;
                }
            }
        }
        :deep .fc .fc-daygrid-body-unbalanced .fc-daygrid-day-events{
            min-height: 96px !important;
        }
        :deep .fc-daygrid-dot-event{
            padding: 1px 0px !important;
            margin-top: 0px !important;
            background: transparent !important;
        }
        .lunarDisabled{
            color: rgba(0, 0, 0, 0.25);
        }
        :deep .festivals,:deep .holiday{
            font-size: 14px;
            padding-right: 10px;
            color: red;
        }
        :deep .fc-theme-standard td.fc-day-sat, :deep .fc-theme-standard td.fc-day-sun{ 
            background-color: rgba(0, 0, 0, 0.04); 
        }
        :deep th.fc-col-header-cell.fc-day.fc-day-sat .fc-col-header-cell-cushion,:deep th.fc-col-header-cell.fc-day.fc-day-sun .fc-col-header-cell-cushion{
            color: red;
        }
        :deep th.fc-timeline-slot-label.fc-day.fc-day-sun,:deep th.fc-timeline-slot-label.fc-day.fc-day-sat{
            color: red;
        }
        :deep td.fc-timeline-slot-lane.fc-day.fc-day-tue.fc-day-today{
            background: rgba(255,220,40,.15);
        }
        :deep .fc .fc-daygrid-day-top{
            color: rgba(0, 0, 0, 0.88) !important;
        }
        :deep .fc-direction-ltr .fc-daygrid-more-link{
            color: #1677ff !important;
        }
        :deep .fc-more-popover-misc {
            display: flex;
            float: right;
        }
        :deep .fc-license-message{
            display: none;
        }
        :deep .fc-datagrid-cell-frame{
            text-align: center;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        :deep .fc-theme-standard td{
            min-height: 60px !important;
            line-height: 1 !important;
        }
        :deep .fc .fc-datagrid-cell-cushion{
            width: 100%;
        }
        :deep .fc-resource-timeline-divider{
            display: none;
        }
        :deep .fc-scrollgrid-section.fc-scrollgrid-section-header.fc-scrollgrid-section-sticky>th:last-child{
            width: 100%;
        }
        :deep td.fc-day-today{
            background: rgba(255,220,40,.15) !important;
        }
        :deep .fc .fc-timeline-slot-cushion{
            padding-left: 10px;
        }
    }
    .meetingMessageWrap{
        line-height: 30px !important;
        width: 360px;
        .meetingInfo1{
            margin-top: 5px;
        }
        .meetingInfoItem{
            font-size: 14px !important;
            display: flex;
        }
    }
    
</style>