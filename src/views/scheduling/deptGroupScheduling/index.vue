<template>
    <div class="attdWrap">
        <div class="attdHead">
            <div class="attdTop">
                <div class="col_left">
                    <div class="uiImg">
                        <img :src="require('@/assets/img/rili.png')" alt="">
                    </div>
                    <div class="info">
                        <p class="name">部门组月排班</p>
                        <h1 class="time">
                            2024-03-01至2024-03-31
                        </h1>
                    </div>
                </div>
                <div class="col_right">
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
                    <a-date-picker class="ml5" v-model:value="time" picker="month" valueFormat="YYYY-MM" />
                    <a-button :icon="h(UndoOutlined)" class="ml5"></a-button>
                    <a-button class="ml5">打印</a-button>
                    <a-button class="ml5">排班统计</a-button>
                    <a-button class="ml5">设置班次</a-button>
                    <a-button class="ml5">删除排班</a-button>
                    <a-button class="ml5">批量排班</a-button>
                    <a-button class="ml5">模板排班</a-button>
                    <a-button class="ml5">换班</a-button>
                    <a-button class="ml5">复制排班</a-button>
                    <a-button class="ml5">添加人员</a-button>
                    <a-button class="ml5">移除人员</a-button>
                    <a-button class="ml5">同步人员</a-button>
                    <a-button class="ml5">排序</a-button>
                    <a-button class="ml5">保存备注</a-button>
                    <a-button class="ml5">提交排班</a-button>
                </div>
            </div>
        </div>
        <div class="attdBd" ref="bdRef">
            <div class="attd-departmentcheck" ref="shiftRef">
                <span class="typeLabel">班次：</span>
                <div>
                    <a-popconfirm trigger="hover" :showCancel="false" :showOk="false"
                        v-for="(item,index) in AttendTypes" :key="index">
                        <template #icon></template>
                        <template #okButton></template>
                        <template #title>
                            <div class="typeItemInfo">
                                <div class="typeItemInfoHead">
                                    <div class="leftImg">
                                        <img :src="require('@/assets/img/type.logo.png')" alt="">
                                    </div>
                                    <span class="typeTitle">{{item.Name}}</span>
                                </div>
                                <div class="typeItemInfoBd">
                                    <div class="typeInfoRow">
                                        <div class="typeInfoCol">上下班次数：0</div>
                                        <div class="typeInfoCol">应出勤时长：9小时</div>
                                    </div>
                                    <div class="typeInfoRow">
                                        <div class="typeInfoCol">第一次上班：08:00</div>
                                        <div class="typeInfoCol">第一次下班：17:00</div>
                                    </div>
                                    <div class="typeInfoRow">
                                        <div class="typeInfoCol">第二次上班： </div>
                                        <div class="typeInfoCol">第二次下班：</div>
                                    </div>
                                    <div class="typeInfoRow">
                                        <div class="typeInfoCol">第三次上班：</div>
                                        <div class="typeInfoCol">第三次下班：</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <span class="typeItem" :class="{'active':currentType.Id==item.Id}"
                            @click="handleAttdTypes(item, index)">{{item.Name}}</span>
                    </a-popconfirm>
                </div>
            </div>
            <div class="scheduleContent" :style="{height:height+'px'}">
                <div class="schedule_left" v-if="!isCollapsed">
                    <a-tree block-node :tree-data="deptGroupTree" :fieldNames="fieldNames" @select="changeDeptGroup">
                        <template #title="{ Name }">
                            {{ Name }}
                        </template>
                    </a-tree>
                </div>
                <div class="schedule_right">
                    <div class="wea-left-right-layout-btn wea-left-right-layout-btn-show"
                        :class="{ 'wea-left-right-layout-btn-hide': isCollapsed }" @click="handleCollapsed"></div>
                    <div class="schedule_table">
                        <div class="tableHeaderFlex">
                            <table>
                                <thead>
                                    <tr>
                                        <th style="min-width: 70px;width: 70px;">小组</th>
                                        <th style="min-width: 40px;width: 40px;">序号</th>
                                        <th style="min-width: 79px;width: 79px;">操作</th>
                                        <th style="min-width: 40px;width: 40px;">
                                            <a-checkbox></a-checkbox>
                                        </th>
                                        <th :style="{width:nameWidth+'px'}">姓名</th>
                                        <th :style="{width:empcodeWidth+'px'}">工号</th>
                                        <th class="thDay" :style="{width:item.width+'px'}" v-for="(item, index) in objData.Days" :key="index">
                                            <p>{{weekdate[item.DayofWeek]}}</p>
                                            <p>{{getDateFn(item.Date)}}</p>
                                        </th>
                                    </tr>
                                </thead>
                                <!-- <tbody>
                                    <tr v-for="(item, index) in listData.slice(0, 1)" :key="index">
                                        <td style="width: 70px;" :rowspan="listData.length">
                                            未分组
                                        </td>
                                        <td style="width: 40px;">1</td>
                                        <td style="width: 79px;">
                                            <div class="operaImgs">
                                                <img :src="require('@/assets/img/02.1.2.1.Subtract_.png')" alt="">
                                                <img :src="require('@/assets/img/Ascending2.png')" alt="" @click="handleItemSortUp(item, index)">
                                                <img :src="require('@/assets/img/Descending2.png')" alt="" @click="handleItemSortDown(item, index)">
                                            </div>
                                        </td>
                                        <td style="width: 40px;">
                                            <a-checkbox></a-checkbox>
                                        </td>
                                        <td>{{item.Name}}</td>
                                        <td>{{item.EmployeeNo}}</td>
                                        <td class="shiftTd" v-for="(row, idx) in item.AttendData" :key="idx" @click.stop="handleSelectCol(item, index, row, idx)">
                                            <p class="shiftItem" v-for="(shiftRow, shiftIdx) in row.Shifts" :key="shiftIdx">
                                                {{shiftRow.Name}}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr v-for="(item, index) in listData.slice(1, listData.length)" :key="index">
                                        <td style="width: 40px;">{{index+2}}</td>
                                        <td style="width: 79px;">
                                            <div class="operaImgs">
                                                <img :src="require('@/assets/img/02.1.2.1.Subtract_.png')" alt="">
                                                <img :src="require('@/assets/img/Ascending2.png')" alt="" @click="handleItemSortUp(item, index+1)">
                                                <img :src="require('@/assets/img/Descending2.png')" alt="" @click="handleItemSortDown(item, index+1)">
                                            </div>
                                        </td>
                                        <td style="width: 40px;">
                                            <a-checkbox></a-checkbox>
                                        </td>
                                        <td>{{item.Name}}</td>
                                        <td>{{item.EmployeeNo}}</td>
                                        <td class="shiftTd" v-for="(row, idx) in item.AttendData" :key="idx" @click.stop="handleSelectCol(item, index, row, idx)">
                                            <p class="shiftItem" v-for="(shiftRow, shiftIdx) in row.Shifts" :key="shiftIdx">
                                                {{shiftRow.Name}}
                                            </p>
                                        </td>
                                    </tr>
                                </tbody> -->
                            </table>
                        </div>
                        <div class="tableBody">
                            <table>
                                <thead style="visibility: hidden;">
                                    <tr>
                                        <th style="width: 70px;min-width: 70px;">小组</th>
                                        <th style="width: 40px;min-width: 40px;">序号</th>
                                        <th style="width: 79px;min-width: 79px;">操作</th>
                                        <th style="width: 40px;min-width: 40px;">
                                            <a-checkbox></a-checkbox>
                                        </th>
                                        <th ref="nameRef">姓名</th>
                                        <th ref="empcodeRef">工号</th>
                                        <th class="thDay" :class="{'active':item.DayofWeek==0||item.DayofWeek==6}" v-for="(item, index) in objData.Days" :key="index">
                                            <p>{{weekdate[item.DayofWeek]}}</p>
                                            <p>{{getDateFn(item.Date)}}</p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in listData.slice(0, 1)" :key="index">
                                        <td style="width: 70px;min-width: 70px;" :rowspan="listData.length">
                                            未分组
                                        </td>
                                        <td style="width: 40px;min-width: 40px;">1</td>
                                        <td style="width: 79px;min-width: 79px;">
                                            <div class="operaImgs">
                                                <img :src="require('@/assets/img/02.1.2.1.Subtract_.png')" alt="">
                                                <img :src="require('@/assets/img/Ascending2.png')" alt="" @click="handleItemSortUp(item, index)">
                                                <img :src="require('@/assets/img/Descending2.png')" alt="" @click="handleItemSortDown(item, index)">
                                            </div>
                                        </td>
                                        <td style="width: 40px;min-width: 40px;">
                                            <a-checkbox></a-checkbox>
                                        </td>
                                        <td>{{item.Name}}</td>
                                        <td>{{item.EmployeeNo}}</td>
                                        <td class="shiftTd" :ref="(el) => {setColumnRef(el, item, index);}" :class="{'active':item.DayofWeek==0||item.DayofWeek==6}" v-for="(row, idx) in item.AttendData" :key="idx" @click.stop="handleSelectCol(item, index, row, idx)">
                                            <p class="shiftItem" v-for="(shiftRow, shiftIdx) in row.Shifts" :key="shiftIdx">
                                                {{shiftRow.Name}}
                                            </p>
                                        </td>
                                    </tr>
                                    <tr v-for="(item, index) in listData.slice(1, listData.length)" :key="index">
                                        <td style="width: 40px;min-width: 40px;">{{index+2}}</td>
                                        <td style="width: 79px;min-width: 79px;">
                                            <div class="operaImgs">
                                                <img :src="require('@/assets/img/02.1.2.1.Subtract_.png')" alt="">
                                                <img :src="require('@/assets/img/Ascending2.png')" alt="" @click="handleItemSortUp(item, index+1)">
                                                <img :src="require('@/assets/img/Descending2.png')" alt="" @click="handleItemSortDown(item, index+1)">
                                            </div>
                                        </td>
                                        <td style="width: 40px;min-width: 40px;">
                                            <a-checkbox></a-checkbox>
                                        </td>
                                        <td>{{item.Name}}</td>
                                        <td>{{item.EmployeeNo}}</td>
                                        <td class="shiftTd" v-for="(row, idx) in item.AttendData" :key="idx" @click.stop="handleSelectCol(item, index, row, idx)">
                                            <p class="shiftItem" v-for="(shiftRow, shiftIdx) in row.Shifts" :key="shiftIdx">
                                                {{shiftRow.Name}}
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
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

    const headRef = ref(null);
    const bdRef = ref(null);
    const shiftRef = ref(null);

    const nameRef = ref(null);
    const empcodeRef = ref(null);
    const data = reactive({
        time: "",
        objData: {},
        AttendTypes: [],
        listData: [],
        total: 0,
        deptCurrent: {
            id: "",
            name: ""
        },
        currentType: {
            Id: "",
            Name: ""
        },
        height: "",
        deptGroupTree: [],
        fieldNames: {
            children: "Groups",
            title: "Name",
            key: "Id"
        },
        isCollapsed: false,
        monthDays: [],
        nameWidth: "",
        empcodeWidth: ""
    });
    const itemRefs = [];
    const weekdate = toRaw(['日', '一', '二', '三', '四', '五', '六']);
    const getDateFn = (time) => {
        return new Date(time).getDate();
    }
    const { time, objData, AttendTypes, listData, total, deptCurrent, currentType, height, deptGroupTree, fieldNames, isCollapsed, monthDays, nameWidth, empcodeWidth } = toRefs(data);
    data.time = dayjs(new Date).format('YYYY-MM');
    data.yearNumber = dayjs(new Date).format('YYYY');
    data.monthNumber = dayjs(new Date).month() + 1;

    const getQuery = () => {
        proxy.$get(Interface.scheduling.deptMonthList, {}).then(res => {
            data.objData = res;
            data.AttendTypes = res.AttendTypes;
            nextTick(()=>{
                data.nameWidth = nameRef.value.offsetWidth;
                data.empcodeWidth = empcodeRef.value.offsetWidth;
                console.log("data.empcodeWidth", data.empcodeWidth)
                data.objData.Days.forEach((item,index)=>{
                    // console.log(itemRefs[index].el.offsetWidth);
                    item.width = itemRefs[index].el.offsetWidth;
                    console.log(item.width);
                })
            })
        })
    };
    
    const getList = () => {
        proxy.$get(Interface.scheduling.monthDeptgroupList, {}).then(res => {
            data.listData = res.listData;
            getQuery();
            // nextTick(()=>{
            //     console.log("nameRef", nameRef.value.offsetWidth)
            //     data.nameWidth = nameRef.value.offsetWidth;
            //     data.empcodeWidth = empcodeRef.value.offsetWidth;
            // })
        })
    }
    getList();
    const changeDeptGroup = (e,node) => {
        console.log("e",e, node);
        data.deptCurrent = {
            Id: node.node.Id,
            Name: node.node.Name
        }
    };
    onMounted(() => {
        window.addEventListener('resize', getHeight);
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'));
        });
    });

    const getHeight = () => {
        nextTick(() => {
            let bdHeight = bdRef.value.clientHeight;
            let shiftHeight = shiftRef.value.clientHeight;
            let height = bdHeight - shiftHeight;
            data.height = height;
        })
    };

    const handleCollapsed = () => {
        data.isCollapsed = !data.isCollapsed;
    }
    
    const getDeptGroup = () => {
        let d = {
            md0: "",
            md1: "",
            calendar: 1,
            viewMode: 2,
            unitType: 4030
        }
        proxy.$get(Interface.scheduling.deptGroup, d).then(res => {
            console.log("res", res);
            data.deptGroupTree = res.Units;
        })
    }
    getDeptGroup();

    function getMonthDate(year, month) {
        const dates = [];
        const endDate = new Date(year, month, 0);
        for (let date = 1; date <= endDate.getDate(); date++) {
            // console.log(new Date(year, month, date).getMonth())
            dates.push(new Date(year, month - 1, date));
        }
        return dates;
    };
    const dates = getMonthDate(data.yearNumber, data.monthNumber);
    dates.forEach(date => {
        // console.log(date.toLocaleDateString()); // 输出日期格式为YYYY-MM-DD
        let dateInfo = {
            day: date.getDay(),
            d: date.getDate(),
            date: date.toLocaleDateString(),
            isDay: date.getDay() == 0 || date.getDay() == 6 ? true : false,
        }
        data.monthDays.push(dateInfo);
    });
    const handleAttdTypes = (item, index) => {
        data.currentType = item;
    };
    // 单点单元格填考勤
    const handleSelectCol = (item, index, row, idx) => {
        console.log(item, row);
        if(data.currentType.Id!=''){
            let d = {
                day: row.AttendDate,
                employeeId: item.EmployeeId,
                objectTypeCode: 10,
                deptId: data.deptCurrent.id,
                unitId: data.deptCurrent.id,
                workshiftId: data.currentType.Id,
                elementId: ""
            }
            proxy.$get(Interface.scheduling.workshiftSet ,d).then(res=>{
                message.success(res.msg);
                getQuery();
                getList();
            })
        }else {
            message.error("请在上面类型中随意选择一个班次！")
        }
    };
    const handleItemSortUp = (item, index) => {
        let EmployeeId2 = data.listData[index-1].EmployeeId;
        let d = {
            yearNumber: data.yearNumber,
            monthNumber: data.monthNumber,
            DeptId: data.deptCurrent.Id,
            GroupId: "",
            EmployeeId: item.EmployeeId,
            EmployeeId2: EmployeeId2,
        }
        proxy.$get(Interface.scheduling.deptgroupEmpSort, d).then(res=>{
            message.success("保存成功！");
            getList();
        })
    };
    const handleItemSortDown = (item, index) => {
        console.log("index", index);
        let EmployeeId2 = data.listData[index+1].EmployeeId;
        let d = {
            yearNumber: data.yearNumber,
            monthNumber: data.monthNumber,
            DeptId: data.deptCurrent.Id,
            GroupId: "",
            EmployeeId: item.EmployeeId,
            EmployeeId2: EmployeeId2,
        }
        proxy.$get(Interface.scheduling.deptgroupEmpSort, d).then(res=>{
            message.success("保存成功！");
            getList();
        })
    };
    const setColumnRef = (el, item, index) => {
        if(el && el!=null){
            itemRefs.push({
                el
            })
        };
    }
</script>
<style lang="less" scoped>
    @import url("~@/style/public.css");

    .attdWrap {
        width: 100%;
        height: 100vh;
        overflow: hidden;
        position: relative;
        z-index: 999;

        .attdHead {
            padding: 10px 16px;
            background: #f3f2f2;
            border: 1px solid #dddbda;

            .attdTop {
                display: flex;
                justify-content: space-between;

                .col_left {
                    display: flex;
                    align-items: center;

                    .uiImg {
                        width: 32px;
                        height: 32px;
                        overflow: hidden;
                        margin-right: 12px;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .info {
                        .name {
                            font-size: 12px;
                            margin-top: 5px;
                        }

                        .time {
                            font-size: 18px;
                            font-weight: 700;
                            line-height: 21px;
                        }
                    }
                }
            }

            .attdBottom {
                margin-top: 10px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .backText {
                    color: #1b5297;
                    font-weight: bold;
                    margin-right: 10px;
                }

                .status {
                    color: #ff6666;
                    font-weight: bold;
                }

                .col_right {
                    display: flex;
                }
            }
        }

        .attdBd {
            height: calc(~"100% - 106px");

            .attd-departmentcheck {
                background: #f2f2f3;
                max-height: 80px;
                padding-bottom: 5px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #e2e3e5;

                .typeLabel {
                    display: inline-block;
                    margin-left: 43px;
                    line-height: 42px;
                    white-space: nowrap;
                }

                .typeItem {
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

                    &:hover,
                    &.active {
                        background: #1b5297;
                        color: #fff;
                    }
                }
            }

            .scheduleContent {
                display: flex;

                .schedule_left {
                    width: 200px;
                    min-width: 200px;
                    height: 100%;
                    border-right: 1px solid #e2e3e5;
                    padding: 5px;
                    overflow-y: auto;
                }

                .schedule_right {
                    flex: 1;
                    height: 100%;
                    position: relative;
                    .schedule_table{
                        width: 100%;
                        height: 100%;
                        overflow: auto;
                        margin-left: -1px;
                        .tableHeaderFlex{
                            width: calc(~"100% - 210px");
                            position: fixed;
                            z-index: 999;
                        }
                        table{
                            width: 100%;
                            font-size: 12px;
                            border-collapse: collapse;
                            thead{
                                position: sticky;
                                tr{
                                    th{
                                        height: 41px;
                                        padding: 8px 0;
                                        border: 1px solid #d8d8d8;
                                        background: #f2f2f2;
                                        font-weight: normal;
                                        text-align: center;
                                        &.thDay{
                                            font-weight: bold;
                                        }
                                        &.thDay.active{
                                            color: red;
                                        }
                                    }
                                }
                            }
                            tbody{
                                tr{
                                    td{
                                        height: 30px;
                                        border: 1px solid #d8d8d8;
                                        background: #f4f7fc;
                                        text-align: center;
                                        box-sizing: border-box;
                                        &.shiftTd{
                                            cursor: pointer;
                                        }
                                        .shiftItem{
                                            width: 100%;
                                            margin: 3px;
                                            line-height: 25px;
                                            background: #f0fbf8;
                                        }
                                        .operaImgs{
                                            display: flex;
                                            align-items: center;
                                            justify-content: space-around;
                                            img{
                                                width: 16px;
                                                height: 16px;
                                                cursor: pointer;
                                            }
                                        }
                                    }
                                }
                                tr:nth-child(2n){
                                    td{
                                        background: #f2f2f2;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .empty {
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        text-align: center;

        img {
            max-width: 100%;
            height: auto;
        }

        .emptyText {
            font-size: 14px;
            color: #666;
            margin-top: 10px;
        }
    }

    .clear {
        clear: both;
    }

    .typeItemInfo {
        width: 220px;

        .typeItemInfoHead {
            display: flex;
            align-items: center;

            .leftImg {
                width: 32px;
                height: 32px;
                background: #1797c0;
                border-radius: 4px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .typeTitle {
                font-size: 17px;
                font-weight: 700;
                margin-left: 10px;
            }
        }

        .typeItemInfoBd {
            margin-top: 10px;

            .typeInfoRow {
                font-size: 12px;
                display: flex;
                line-height: 24px;

                .typeInfoCol {
                    flex: 1;
                }
            }
        }
    }

    .wea-left-right-layout-btn {
        width: 18px;
        height: 60px;
        position: absolute;
        top: 50%;
        left: 0;
        margin-top: -30px;
        z-index: 11;
        cursor: pointer;
        background-size: 100% 100%;
    }

    .wea-left-right-layout-btn.wea-left-right-layout-btn-show {
        background: url(~@/assets/img/leftTree-show.png) no-repeat -2px 0;
    }

    .wea-left-right-layout-btn.wea-left-right-layout-btn-show:hover {
        background: url(~@/assets/img/leftTree-show-hover.png) no-repeat -2px 0;
    }

    .wea-left-right-layout-btn.wea-left-right-layout-btn-hide {
        background: url(~@/assets/img/leftTree-hide.png) no-repeat -2px 0;
    }

    .wea-left-right-layout-btn.wea-left-right-layout-btn-hide:hover {
        background: url(~@/assets/img/leftTree-hide-hover.png) no-repeat -2px 0;
    }
</style>