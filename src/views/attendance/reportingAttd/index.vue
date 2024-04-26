<template>
    <div class="attdWrap">
        <div class="attdHead">
            <div class="attdTop">
                <div class="col_left">
                    <div class="uiImg">
                        <img :src="require('@/assets/img/rili.png')" alt="">
                    </div>
                    <div class="info">
                        <p class="name">按部门报考勤</p>
                        <h1 class="time">
                            2024-03-01至2024-03-31
                        </h1>
                    </div>
                </div>
                <div class="col_right">
                    <div class="btnGroup">
                        <a-button>导出</a-button>
                        <a-button>调动记录</a-button>
                        <a-button @click="handleTransferPerm">转移权限</a-button>
                    </div>
                </div>
            </div>
            <div class="attdBottom">
                <div class="col_left">
                    <a href="javascript:;" class="backText">
                        « 返回列表
                    </a>
                    <span>
                        状态：<span class="status">{{objData.GroupReportStatusName}}</span>
                    </span>
                </div>
                <div class="col_right">
                    <a-input-search style="width: 200px;"></a-input-search>
                    <a-date-picker class="ml10" v-model:value="time" picker="month" valueFormat="YYYY-MM" />
                    <a-button :icon="h(UndoOutlined)" class="ml10"></a-button>
                    <a-button class="ml10" @click="handleClearAttdRecord">清除考勤记录</a-button>
                    <a-button class="ml10" @click="handleBatchAttd">批量填报考勤</a-button>
                    <div class="btnGroup ml10">
                        <a-button @click="handleEmpIn">人员调入</a-button>
                        <a-button @click="handleEmpOut">人员调出</a-button>
                        <a-button @click="handleSort">排序</a-button>
                    </div>
                    <a-button class="ml10" @click="handleRemarks">备注</a-button>
                    <a-button type="primary" class="ml10" @click="handleSubmitAttd(0)" v-if="objData.GroupReportStatus==1">撤销考勤</a-button>
                    <a-button type="primary" class="ml10" @click="handleSubmitAttd(1)" v-else>提交考勤</a-button>
                </div>
            </div>
        </div>
        <div class="attdBd" ref="bdRef">
            <!-- <div class="empty">
                <div>
                    <img :src="require('@/assets/img/empty.png')" alt="">
                    <div class="emptyText">
                        当前考勤未开放，2024年9月25日开始填报
                    </div>
                </div>
            </div> -->
            <div class="attd-classcheck" ref="attdCheckRef">
                <div class="col">
                    <span class="label">出勤部门:</span>
                    <span class="deptTag" :class="{'active':deptCurrent.id == item.id}" v-for="(item, index) in objData.Units" :key="index" @click="handleDeptTab(item)">{{item.name}} <span>未上报</span></span>
                </div>
                <div class="col">
                    <span class="label">设置请假时长：</span>
                    <a-select style="width: 100px;" v-model:value="leaveDuration">
                        <a-select-option value="1">1天</a-select-option>
                        <a-select-option value="2">半天</a-select-option>
                    </a-select>
                </div>
            </div>
            <div class="attd-departmentcheck" ref="attdDeptRef">
                <span class="typeLabel">类型：</span>
                <div>
                    <span class="typeItem" :class="{'active':currentType.Id==item.Id}" v-for="(item,index) in AttendTypes" :key="index" @click="handleAttdTypes(item, index)">{{item.Name}}</span>
                </div>
            </div>
            <div class="attdTable">
                <div class="attend-table-head">
                    <div class="attend-table-head-left">
                        <div class="attend-table-row">
                            <div class="attend-table-td" style="width:25px !important;min-width:25px;">
                                <div>
                                    <span></span>
                                </div>
                            </div>
                            <div class="attend-table-td" style="width:25px !important;min-width:25px;">
                                <div>
                                    <a-checkbox></a-checkbox>
                                </div>
                            </div>
                            <div class="attend-table-td">
                                <div>姓名</div>
                            </div>
                            <div class="attend-table-td">
                                <div>工号</div>
                            </div>
                            <div class="attend-table-td">
                                <div>人员类别</div>
                            </div>
                            <div class="attend-table-td">
                                <div>人员类型</div>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </div>
                    <div class="attend-table-head-right" ref="headRef">
                        <div class="attend-table-row" :style="{width:widthHead+'px'}">
                            <div class="attend-table-td" style="width: 75px;" v-for="(item, index) in objData.Days" :key="index">
                                <div class="weekdate">
                                    <p>{{weekdate[item.DayofWeek]}}</p>
                                    <p>{{item.Name}}</p>
                                </div>
                            </div>
                            <div class="attend-table-td" style="width:104px;height:40px;line-height:40px;">    
                                <div class="">备注</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="attend-table-body">
                    <div class="attend-table-body-left" :style="{height:(height-10)+'px'}" ref="leftRef">
                        <div>
                            <a-checkbox-group v-model:value="employeeSelect">
                                <div class="attend-table-row" v-for="(item, index) in listData" :key="index">
                                    <div class="attend-table-td" style="min-width: 25px; width: 25px; height: 30px; line-height: 30px;">
                                        <div><span>{{index+1}}</span></div>
                                    </div>
                                    <div class="attend-table-td" style="min-width: 25px; width: 25px; height: 30px; line-height: 30px;">
                                        <div>
                                            <a-checkbox :value="item.EmployeeId"></a-checkbox>
                                        </div>
                                    </div>
                                    <div class="attend-table-td" style="width: 75px; height: 30px; line-height: 30px;">        
                                        <div>{{item.Name}}</div>    
                                    </div>
                                    <div class="attend-table-td" style="width: 75px; height: 30px; line-height: 30px;">        
                                        <div>{{item.EmployeeNo}}</div>    
                                    </div>
                                    <div class="attend-table-td" style="width: 75px; height: 30px; line-height: 30px;">        
                                        <div>{{item.CategoryCodeName}}</div>    
                                    </div>
                                    <div class="attend-table-td" style="width: 75px; height: 30px; line-height: 30px;">        
                                        <div></div>    
                                    </div>
                                </div>
                            </a-checkbox-group>
                        </div>
                    </div>
                    <div class="attend-table-body-right" :style="{height:height+'px'}" ref="bodyRef">
                        <div>
                            <div class="attend-table-row" :style="{width:width+'px'}" v-for="(item, index) in listData" :key="index">
                                <div class="attend-table-td" style="width: 75px; height: 30px; line-height: 30px;" v-for="(row, idx) in item.AttendData" :key="idx" @click.stop="handleSelectCol(item, index, row, idx)">        
                                    <div>
                                        <p class="attdLeave" v-for="(leave, leaveIdx) in row.LeaveDetail" :key="leaveIdx">{{leave.LeaveTypeName}}({{leave.LeaveDays}})</p>
                                    </div>
                                </div>
                                <div class="attend-table-td Descriptionschedual" style="width: 104px; height: 30px;">
                                    <div>
                                        <input class="texteare-description" style="width:95px;margin-top:4px;min-height: 20px;" value="" title="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <canvas id="canvas" class="canvas"></canvas> -->
                    </div>
                </div>
            </div>
            <div class="attdPagination">
                <span class="num">
                    绩效总人数：{{ total }}
                </span>
                <a-pagination v-model:current="pageNumber" :defaultPageSize="50" :total="total" @change="changePagination" />
            </div>
        </div>
        <TransferPerm :isShow="isTransferPerm" v-if="isTransferPerm" @cancel="isTransferPerm=false" />
        <BatchWriteAttd :isShow="isBatchWriteAttd" v-if="isBatchWriteAttd" :empSelects="empSelects" @cancel="isBatchWriteAttd=false" @writesave="writesave" />
        <PeopleOut :isShow="isPeopleOut" v-if="isPeopleOut" :empSelects="empSelects" @cancel="isPeopleOut=false"></PeopleOut>
        <PeopleIn :isShow="isPeopleIn" v-if="isPeopleIn" :deptCurrent="deptCurrent" :time="time" @cancel="isPeopleIn=false" />
        <NotAddPeople :isShow="isNotAddPeople" v-if="isNotAddPeople" @cancel="isNotAddPeople=false" />
        <DeleteAttd :isShow="isDeleteAttd" v-if="isDeleteAttd" :yearNumber="yearNumber" :monthNumber="monthNumber" :unitId="deptCurrent.id" :empSelects="empSelects" @cancel="isDeleteAttd=false"></DeleteAttd>
        <RemarksAttd :isShow="isRemarks" v-if="isRemarks" :yearNumber="yearNumber" :monthNumber="monthNumber" :unitId="deptCurrent" @cancel="isRemarks=false" />
        <SubmitAttd :isShow="isSubmitAttd" v-if="isSubmitAttd" :yearNumber="yearNumber" :monthNumber="monthNumber" :unitId="deptCurrent.id" :status="status" :time="time" @cancel="isSubmitAttd=false" />
        <SortAttdPeople :isShow="isSort" v-if="isSort" :peoples="listData" :yearNumber="yearNumber" :monthNumber="monthNumber" :unitId="deptCurrent.id" @cancel="isSort=false" @sortOk="handleSortOk" />
    </div>
    <canvas id="canvas" class="canvas"></canvas>
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
        toRaw,
        inject, h, nextTick
    } from "vue";
    import {
        AlignCenterOutlined, SearchOutlined, RightOutlined, UndoOutlined
    } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import dayjs from 'dayjs';
    import { message } from "ant-design-vue";
    const { proxy } = getCurrentInstance();
    import TransferPerm from "@/components/attd/TransferPerm.vue";
    import BatchWriteAttd from "@/components/attd/BatchWriteAttd.vue";
    import PeopleOut from "@/components/attd/PeopleOut.vue";
    import PeopleIn from "@/components/attd/PeopleIn.vue";
    // 未添加人员列表
    import NotAddPeople from "@/components/attd/NotAddPeople.vue";
    import DeleteAttd from "@/components/attd/DeleteAttd.vue";
    import RemarksAttd from "@/components/attd/RemarksAttd.vue";
    import SubmitAttd from "@/components/attd/SubmitAttd.vue";
    import SortAttdPeople from "@/components/attd/SortAttdPeople.vue";
    const bodyRef = ref(null);
    const offsetTop = ref(null);
    nextTick(()=>{
        // console.log("offsetTop", bodyRef.value.offsetTop);
        // console.log("offsetLeft", bodyRef.value.offsetLeft);
        offsetTop.value = bodyRef.value.offsetTop + 10;
    })
    const headRef = ref(null);
    const leftRef = ref(null);
    const bdRef = ref(null);
    const attdCheckRef = ref(null);
    const attdDeptRef = ref(null);
    import { Drawer, Rect } from '@/utils/canvasExtend/drawer-ui.js';
    const drawer = ref(null);

    const initCanvas = () => {
        const canvas = document.getElementById('canvas');
        canvas.width = window.innerWidth - 20
        canvas.height = window.innerHeight - 20
        drawer.value = new Drawer({ view: canvas });
    }

    const areaPoint = {
        startX: 0,
        startY: 0,
        endX: 0,
        endY: 0
    };

    // 是否开始获取坐标
    const startMove = ref(false);

    // 鼠标按下
    const mouseDown = (e) => {
        startMove.value = true;
        if(e.x < 350 || e.y < offsetTop.value){
            startMove.value = false;
        }
        const {x, y} = e;
        // areaPoint.startX = x - 350;
        // areaPoint.startY = y - offsetTop.value;
        areaPoint.startX = x;
        areaPoint.startY = y;
    };

    // 鼠标移动
    const mouseMove = (e) => {
        if(e.x < 350 || e.y < offsetTop.value){
            startMove.value = false;
            drawer.value?.clear();
        }
        if(startMove.value){
            const {x, y} = e;
            // areaPoint.endX = x - 350;
            // areaPoint.endY = y - offsetTop.value;
            areaPoint.endX = x;
            areaPoint.endY = y;

            drawer.value?.clear();
            const { startX, startY, endX, endY } = areaPoint;
            const rect = new Rect({
                x: startX,
                y: startY,
                width: endX - startX,
                height: endY - startY,
                isFill: false,
            },'rect');
            drawer.value?.add(rect);
        }
    };

    // 鼠标抬起/释放
    const mouseUp = (e) => {
        const { screenX, screenY } = e
        // areaPoint.endX = screenX - 350;
        // areaPoint.endY = screenY - offsetTop.value;
        areaPoint.endX = screenX;
        areaPoint.endY = screenY;
        startMove.value = false;
        drawer.value?.clear();
    };
    function bindEvent() {
        window.addEventListener('mousedown', mouseDown);
        window.addEventListener('mousemove', mouseMove);
        window.addEventListener('mouseup', mouseUp);
        // bodyRef.value.addEventListener('keydown', keyDown);
        // bodyRef.value.addEventListener('keyup', keyUp);
    }

    const data = reactive({
        time: "",
        leaveDuration: "1",
        objData: {},
        AttendTypes: [],
        listData: [],
        width: "",
        pageNumber: 1,
        total: 0,
        height: "",
        widthHead: "",
        employeeSelect: [],
        empSelects: [],
        isTransferPerm: false,
        isBatchWriteAttd: false,
        isPeopleOut: false,
        isPeopleIn: false,
        deptCurrent: {
            id: "",
            name: ""
        },
        currentType: {
            Id: "",
            Name: ""
        },
        isNotAddPeople: false,
        isDeleteAttd: false,
        yearNumber: "",
        monthNumber: "",
        isRemarks: false,
        isSubmitAttd: false,
        status: 1,
        isSort: false
    });
    const weekdate = toRaw(['日', '一', '二', '三', '四', '五', '六'])
    const { time, leaveDuration, objData, AttendTypes, listData, 
        width, pageNumber, total, height, widthHead, employeeSelect,
        isTransferPerm, isBatchWriteAttd, empSelects, isPeopleOut, isPeopleIn, deptCurrent,
        currentType, isNotAddPeople, isDeleteAttd, yearNumber, monthNumber, isRemarks, isSubmitAttd, status, isSort } = toRefs(data);
    data.time = dayjs(new Date).format('YYYY-MM');
    data.yearNumber = dayjs(new Date).format('YYYY');
    data.monthNumber = dayjs(new Date).format('MM');
    const getQuery = () => {
        proxy.$get(Interface.attd.list, {}).then(res=>{
            data.objData = res;
            data.AttendTypes = res.AttendTypes;
            data.listData = res.listData;
            data.width = res.Days.length * 75 + 104;
            data.widthHead = res.Days.length * 75 + 104;
            data.total = res.pageInfo.totalRows;
            if(data.total * 30 > data.height){
                console.log("666")
                data.widthHead = data.widthHead + 10;
            }
        })
    };
    getQuery();
    const handleDeptTab = (item) => {
        data.deptCurrent = item;
    };
    onMounted(()=>{
        bodyRef.value.addEventListener('scroll',(e)=>{
            let left = e.target.scrollLeft;
            let top = e.target.scrollTop;
            headRef.value.scrollLeft = left;
            leftRef.value.scrollTop = top;
        });
        window.addEventListener('resize', getHeight);
        setTimeout(function () {
          window.dispatchEvent(new Event('resize'));
        });
        // bodyRef.value.addEventListener("mousedown", (e)=>{
        //     e.stopPropagation();
        //     console.log("mousedown", e);
        // });
        // bodyRef.value.addEventListener("mouseup", (e)=>{
        //     e.stopPropagation();
        //     console.log("mouseup", e);
        // });
        initCanvas();
        bindEvent();
    });

    const getHeight = () => {
        nextTick(()=>{
            let bdHeight = bdRef.value.clientHeight;
            let checkHeight = attdCheckRef.value.clientHeight;
            let deptHeight = attdDeptRef.value.clientHeight;
            let height = bdHeight - checkHeight - deptHeight - 102;
            data.height = height; 
        })
    };

    const changePagination = (e) => {

    };

    // 清除考勤记录
    const handleClearAttdRecord = () => {
        if(isEmployeeSelect()){
            data.isDeleteAttd = true;
        }
    };
    // 批量填报考勤
    const handleBatchAttd = () => {
        console.log("1231", data.employeeSelect.length);
        if(isEmployeeSelect()){
            let arr = data.listData.filter(item=>{
                return data.employeeSelect.find(row=>{
                    return row == item.EmployeeId;
                })
            });
            console.log("arr", arr);
            data.empSelects = arr;
            data.isBatchWriteAttd = true;
        }
    };
    const writesave = () => {
        data.isBatchWriteAttd = false;
        getQuery();
    }
    // 人员调入
    const handleEmpIn = () => {
        data.isPeopleIn = true;
    };
    // 人员调出
    const handleEmpOut = () => {
        if(isEmployeeSelect()){
            let arr = data.listData.filter(item=>{
                return data.employeeSelect.find(row=>{
                    return row == item.EmployeeId;
                })
            });
            console.log("arr", arr);
            data.empSelects = arr;
            data.isPeopleOut = true;
        }
    };
    const isEmployeeSelect = () => {
        let isBoolean = true;
        if (data.employeeSelect.length == 0) {
            message.error("请先选择人员!");
            isBoolean = false;
        } else {
            
        }
        return isBoolean;
    }
    // 转移权限
    const handleTransferPerm = () => {
        data.isTransferPerm = true;
    }
    const handleAttdTypes = (item, index) => {
        data.currentType = item;
    };
    // 单点单元格填考勤
    const handleSelectCol = (item, index, row, idx) => {
        console.log(item, row);
        if(data.currentType.Id!=''){
            let d = {
                attendDate: "",
                employeeId: item.EmployeeId,
                objectTypeCode: 10,
                businessUnitId: item.BusinessUnitId,
                unitId: item.businessUnitId,
                newStatus: 3,
                leaveDays: data.leaveDuration,
                oldStatus: 0,
                elementId: ""
            }
            proxy.$get(Interface.attd.setAttdLeave ,d).then(res=>{
                message.success(res.msg);
                getQuery();
            })
        }else {
            message.error("请在上面类型中随意选择一个类型！")
        }
    };
    // 排序
    const handleSort = () => {
        data.isSort = true;
    };
    // 备注
    const handleRemarks = () => {
        data.isRemarks = true;
    }
    const handleSubmitAttd = (status) => {
        data.status = status;
        data.isSubmitAttd = true;
    }
    const handleSortOk = () => {
        data.isSort = false;
        getQuery();
    }
</script>
<style lang="less" scoped>
    @import url("~@/style/public.css");
    .attdWrap{
        width: 100%;
        height: 100vh;
        overflow: hidden;
        position: relative;
        z-index: 999;
        .attdHead{
            padding: 10px 16px;
            background: #f3f2f2;
            border: 1px solid #dddbda;
            .attdTop{
                display: flex;
                justify-content: space-between;
                .col_left{
                    display: flex;
                    align-items: center;
                    .uiImg{
                        width: 32px;
                        height: 32px;
                        overflow: hidden;
                        margin-right: 12px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .info{
                        .name{
                            font-size: 12px;
                            margin-top: 5px;
                        }
                        .time{
                            font-size: 18px;
                            font-weight: 700;
                            line-height: 21px;
                        }
                    }
                }
            }
            .attdBottom{
                margin-top: 10px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .backText{
                    color: #1b5297;
                    font-weight: bold;
                    margin-right: 10px;
                }
                .status{
                    color: #ff6666;
                    font-weight: bold;
                }
                .col_right{
                    display: flex;
                }
            }
        }
        .attdBd{
            height: calc(~"100% - 106px");
            .attd-classcheck{
                padding: 10px 20px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #d8d8d8;
                .label{
                    display: inline-block;
                    min-width: 80px;
                }
                .deptTag{
                    background-color: #b0adab;
                    border-radius: 14px;
                    color: #fff;
                    padding: 0 10px;
                    line-height: 0px;
                    height: 25px;
                    line-height: 25px;
                    text-align: center;
                    display: inline-block;
                    cursor: pointer;
                    margin-right: 10px;
                    &.active{
                        background: #1b5297;
                    }
                    span{
                        color: red;
                        padding-left: 10px;
                    }
                }
            }
            .attd-departmentcheck{
                background: #f2f2f3;
                max-height: 80px;
                padding-bottom: 5px;
                display: flex;
                .typeLabel{
                    display: inline-block;
                    margin-left: 43px;
                    line-height: 42px;
                    white-space: nowrap;
                }
                .typeItem{
                    display: inline-block;
                    font-size: 13px;
                    background-color: #f9f9fa;
                    border: 1px solid #c4c6ca;
                    border-radius: 2px;
                    color: #1b5297;
                    height: 25px;
                    line-height: 25px;
                    margin-top: 3px;
                    padding: 0 5px;
                    cursor: pointer;
                    margin-left: 10px;
                    &:hover,&.active{
                        background: #1b5297;
                        color: #fff;
                    }
                }
            }
            .attdTable{
                border-top: 1px solid #d8d8d8;
                overflow: hidden;
                .attend-table-head{
                    height: 40px;
                    position: relative;
                    background-color: #f2f2f3;
                    display: flex;
                    overflow: hidden;
                    .attend-table-head-left > div{
                        background-color: #f2f2f3;
                        font-weight: 700;
                        color: #555;
                        float: left;
                        height: 41px;
                    }
                    .attend-table-head-left{
                        .attend-table-td{
                            line-height: 40px;
                        }
                    }
                    .attend-table-row{
                        min-height: 29px;
                        min-width: 30px;
                        display: flex;
                    }
                }
                .attend-table-td {
                    float: left;
                    border: 1px solid #d8d8d8;
                    border-left: 0;
                    border-top: 0;
                    padding-left: 5px;
                    padding-right: 5px;
                    text-align: center;
                    cursor: pointer;
                    height: 40px;
                    min-width: 75px;

                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    .weekdate{

                    }
                    &>div{
                        width: 100%;
                    }
                    .attdLeave{
                        width: 100%;
                        height: 15px;
                        line-height: 15px;
                        padding: 0 5px;
                        margin-top: 1px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background: #6ce26c;
                        color: #333;
                        font-size: 12px;
                        border-radius: 2px;
                        white-space: nowrap;
                    }
                }
                .attend-table-head-right{
                    width: calc(~"100% - 350px") !important;
                    overflow: hidden;
                    overflow-x: auto;
                    &::-webkit-scrollbar {
                        width: 0;
                        height: 0;
                        background-color: transparent;
                    }

                    &::-webkit-scrollbar-thumb {
                        border-radius: 0;
                        -webkit-box-shadow: none;
                    }

                    &::-webkit-scrollbar-track {
                        -webkit-box-shadow: transparent;
                        background-color: transparent;
                    }
                }
                .attend-table-body{
                    width: 100%;
                    /* height: 200px; */
                    /* position: relative; */
                    color: #888;
                    overflow: hidden;
                    /* overflow-y: auto; */
                    display: flex;
                    .attend-table-body-left{
                        height: 100%;
                        overflow-y: hidden;
                        &::-webkit-scrollbar {
                            width: 0;
                            height: 0;
                            background-color: transparent;
                        }

                        &::-webkit-scrollbar-thumb {
                            border-radius: 0;
                            -webkit-box-shadow: none;
                        }

                        &::-webkit-scrollbar-track {
                            -webkit-box-shadow: transparent;
                            background-color: transparent;
                        }
                        /deep/ .ant-checkbox-group{
                            display: block;
                            width: 100%;
                        }
                    }
                    .attend-table-row{
                        min-width: 30px;
                        min-height: 30px;
                        height: 29px;
                    }
                    .attend-table-body-right {
                        width: calc(~"100% - 350px") !important;
                        overflow: auto;
                        position: relative;
                        z-index: 999;
                    }
                }
            }
        }
        .attdPagination{
            width: 100%;
            padding: 10px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .num{
                color: red;
            }
        }
    }
    .empty{
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        text-align: center;
        img{
            max-width: 100%;
            height: auto;
        }
        .emptyText{
            font-size: 14px;
            color: #666;
            margin-top: 10px;
        }
    }
    .clear{
        clear: both;
    }
    .canvas {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>