<template>
    <div class="configWrap">
        <a-form>
            <a-form-item label="选择对象">
                <a-select v-model:value="item.entityId" style="width: 200px;">
                    <a-select-option v-for="(row,idx) in objectCodeList" :key="idx"
                        :value="row.ID">{{row.Name}}</a-select-option>
                </a-select>
            </a-form-item>
            <div class="filterWrap">
                <p class="label">查询条件</p>
                <div class="filterList">
                    <div class="fileterRow" v-for="(filter,filterIdx) in filterList" :key="filterIdx">
                        <a-form>
                            <a-form-item class="formItem" label="逻辑运算符">
                                <a-select v-model:value="filter.logical" placeholder="请选择逻辑运算符">
                                    <a-select-option value="AND">与</a-select-option>
                                    <a-select-option value="OR">或</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item class="formItem" label="字段">
                                <a-select v-model:value="filter.field" placeholder="请选择字段"
                                    @change="(e)=>changeField(e, filter, item)">
                                    <a-select-option v-for="(field,fieldIdx) in attributes"
                                        :value="field.fieldName">{{field.label}}</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item class="formItem" label="运算符">
                                <a-select v-model:value="filter.operator" placeholder="请选择运算符">
                                    <a-select-option v-for="(row,rowIdx) in filter.operatorList"
                                        :value="row.operator">{{row.label}}</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item class="formItem" label="值">
                                <div v-if="filter.dType=='DateTime'">
                                    <a-date-picker v-model:value="filter.value" />
                                </div>
                                <div v-else-if="filter.dType=='Numeric'">
                                    <a-input type="Number" v-model:value="filter.value"></a-input>
                                </div>
                                <div v-else-if="filter.dType=='Picklist'||filter.dType=='L'">
                                    <a-select mode="multiple" v-model:value="filter.value" placeholder="请选择">
                                        <a-select-option v-for="v in filter.options" :key="v.value" :value="v.value">
                                            {{v.label}}
                                        </a-select-option>
                                    </a-select>
                                </div>
                                <div v-else-if="filter.dType=='BusinessUnit'" style="position: relative;">
                                    <a-select allowClear v-model:value="filter.value" placeholder="请选择"
                                        :default-active-first-option="false" :filter-option="false" showSearch
                                        @search="e=>searchlookup(filter, e)"
                                        @dropdownVisibleChange="e=>searchlookup(filter, '')">
                                        <template #suffixIcon></template>
                                        <a-select-option v-for="v in filter.options" :key="v.ID" :value="v.ID">{{ v.Name
                                            }}</a-select-option>
                                    </a-select>
                                    <i class="iconfont icon-sousuo pointer"
                                        @click="handleOpenLook(filter, filterIdx)"></i>
                                </div>
                                <div v-else>
                                    <a-input v-model:value="filter.value"></a-input>
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                </div>
                <div>
                    <a-button :icon="h(PlusOutlined)" @click="handleAddFilter"></a-button>
                </div>
            </div>
            <a-form-item label="显示方式" class="formItem">
                <div>
                    <div class="showWayList">
                        <div class="chart-picker-label" :class="{'active':item.chartType=='pie-simple'}"
                            @click="changeChartType(item,'pie-simple',index,itemIdx)">
                            <div title="圈形图" class="boxIcon"
                                :style="{backgroundImage:'url('+ require('@/assets/img/designer/donut1.png') +')'}">
                            </div>
                        </div>
                        <div class="chart-picker-label" :class="{'active':item.chartType=='pie-half-donut'}"
                            @click="changeChartType(item,'pie-half-donut',index,itemIdx)">
                            <div title="半环形图" class="boxIcon"
                                :style="{backgroundImage:'url('+ require('@/assets/img/designer/gauge1.png') +')'}">
                            </div>
                        </div>
                        <div class="chart-picker-label" :class="{'active':item.chartType=='bar-y-category'}"
                            @click="changeChartType(item,'bar-y-category',index,itemIdx)">
                            <div title="水平条形图" class="boxIcon"
                                :style="{backgroundImage:'url('+ require('@/assets/img/designer/hbar1.png') +')'}">
                            </div>
                        </div>
                        <div class="chart-picker-label" :class="{'active':item.chartType=='line-category'}"
                            @click="changeChartType(item,'line-category',index,itemIdx)">
                            <div title="折线图" class="boxIcon"
                                :style="{backgroundImage:'url('+ require('@/assets/img/designer/hbar1.png') +')'}">
                            </div>
                        </div>
                    </div>
                    <div :id="'chartDiv_'+index+'_'+itemIdx" style="margin-top: 20px;width: 100%;height: 300px;"></div>
                </div>
            </a-form-item>
            <a-form-item label="分组字段">
                <a-select v-model:value="item.groupingField" style="width: 200px;margin-right: 10px;">
                    <a-select-option v-for="(row,idx) in attributes" :key="idx"
                        :value="row.name">{{row.label}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="汇总字段">
                <a-select v-model:value="item.aggregateField" style="width: 200px;margin-right: 10px;">
                    <a-select-option v-for="(row,idx) in attributes" :key="idx"
                        :value="row.name">{{row.label}}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="合计类型">
                <a-select v-model:value="item.aggregateType" placeholder="请选择合计类型" style="width: 200px;margin-right: 10px;">
                    <a-select-option value="count">计数</a-select-option>
                    <a-select-option value="Sum">汇总</a-select-option>
                </a-select>
            </a-form-item>
            <div class="footBtns">
                <a-button @click="saveConfig">保存</a-button>
                <a-button class="ml10" type="primary" @click="cancel">取消</a-button>
            </div>
        </a-form>
        <radio-dept v-if="isRadioDept" :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import "@/style/icon/iconfont.css";
    import {
        EllipsisOutlined, PlusOutlined
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        h,
        nextTick,
        defineProps,
        defineExpose,
        defineEmits,
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

    import draggable from 'vuedraggable';

    import RadioDept from "@/components/commonModal/RadioDept.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";
    import * as echarts from "echarts";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        item: Object,
        index: [String, Number],
        itemIdx: [String, Number]
    })
    const emit = defineEmits(['save-success']);
    const data = reactive({
        attributes: [],
        objectCodeList: [],
        filterExpression: [],
        jsonFilter: [],
        filterList: [],
        isRadioDept: false,
        filterIdx: '', // 记录筛选器下标
    });
    const { attributes, objectCodeList, filterExpression, jsonFilter, filterList, isRadioDept, filterIdx } = toRefs(data);

    console.log(props);
    const getFilterList = () => {
        let self = props.item;
        let item = props.item;
        // list
        if (self.config && self.config.filterExpression) {
            var filterExpression = JSON.parse(self.config.filterExpression);
            console.log("filterExpression", filterExpression);
            if (filterExpression && self.componentType != 'tablist') {
                data.filterList = [];
                filterExpression.forEach(function (v) {
                    var operatorList = getOperator(v.attribute, self);
                    var dType = getDType(v.attribute, self);
                    var operatorType = getOperatorType(v.operator, operatorList, self);
                    var Lktp = getLktp(v.attribute, self);
                    var options = [];
                    if (Lktp == '' && dType == 'BusinessUnit') {
                        Lktp = 10;
                    }
                    if (Lktp && dType == 'BusinessUnit' || dType == 'User' || dType == 'MasterDetail') {
                        var response = getEntityLookup(Lktp, '')
                        if (response) {
                            options = response.listData;
                        }
                    }
                    if (dType == 'Picklist' || dType == 'L') {
                        options = getFilterValues(v.attribute, self)
                    }
                    if (dType == 'Picklist' || dType == 'L' || dType == 'BusinessUnit' || dType == 'User' || dType == 'MasterDetail') {

                    } else {
                        if (v.operands && v.operands.length > 0) {
                            v.operands = v.operands[0];
                        }
                    }
                    data.filterList.push({
                        operator: v.operator,
                        field: v.attribute,
                        logical: v.logical,
                        operatorList: operatorList,
                        operatorType: operatorType,
                        dType: dType,
                        value: v.operands || v.value,
                        label: v.label,
                        Lktp: Lktp,
                        options: options,
                        deptText: ''
                    })
                })
            }
            console.log("data.filterList", data.filterList)
        }
    }

    const getOperator = (field, item) => {
        console.log(field, item, '123123');
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.operator || '';
    }
    const getDType = (field, item) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.dType || '';
    }
    const getOperatorType = (operator, list) => {
        if (list) {
            var row = list.find(function (v) {
                return v.operator == operator;
            });
            return row.operatorType;
        } else {
            return '';
        }
    }
    const getLktp = (field, item) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.referencedEntityObjectTypeCode || '';
    }
    const getEntityLookup = async (Lktp, lksrch) => {
        var response;
        var d = {
            Lktp: Lktp,
            lksrch: lksrch
        }
        await proxy.$get(Interface.design.look, {}).then(res => {
            response = res;
        })
        return response;
    }
    const getFilterValues = (field, item) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == field;
        });
        return row && row.filterValues || [];
    }

    const changeField = (e, item, parentItem) => {
        var row = data.attributes.find(function (v) {
            return v.fieldName == e;
        });
        item.field = e;
        item.dType = row.dType;
        item.operatorList = row.operator;
        item.label = row.label;
        item.Lktp = row.referencedEntityObjectTypeCode;
        item.options = row.filterValues;
        item.condition = '';
        item.value = '';
    }



    const getConfig = () => {
        proxy.$get(Interface.design.attrs, {
            objTypeCode: props.item.config?.templateObjectTypeCode
        }).then(res => {
            data.attributes = res.attributes;
            getFilterList();
        });
    }
    getConfig();
    const getLook = () => {
        proxy.$get(Interface.design.look, {
            Lktp: 100000
        }).then(res => {
            data.objectCodeList = res.listData;
            data.objectCodeList.push({
                ID: props.item.config?.templateId,
                Name: props.item.config?.templateTitle
            })
            props.item.entityId = props.item.config?.templateId;
        })
    }
    getLook();
    // 查询条件-搜索
    const searchlookup = (filter, searchVal) => {
        console.log("filter", filter);
        var res = getEntityLookup(filter.Lktp || 10, searchVal);
        res.then(response => {
            filter.options = response.listData;
        })
    }
    const handleOpenLook = (filter, filterIdx) => {
        data.filterIdx = filterIdx;
        if (filter.Lktp == 8) {

        } else {
            data.isRadioDept = true;
        }
    }
    // 关闭单选部门弹窗
    const cancelDeptModal = (e) => {
        data.isRadioDept = e;
    }
    const handleDeptParams = (params) => {
        console.log("params", params);
        let index = data.filterList[data.filterIdx].options.findIndex(item => params.ID == item.ID);
        if (index == -1) {
            data.filterList[data.filterIdx].options.push(params);
        }
        data.filterList[data.filterIdx].value = params.ID;
        data.isRadioDept = false;
    }
    // 添加查询条件
    const handleAddFilter = () => {
        var obj = Object.assign({}, data.filterList[0]);
        Object.keys(obj).forEach(function (key) {
            obj[key] = '';
        });
        data.filterList.push(obj);
    }
    const cancel = () => {
        props.item.isConfig = false;
    }
    // 保存
    const saveConfig = () => {
        console.log("props", props.item);
        let item = props.item;
        var isBook = true; // 是否可以保存
        let result = [];
        if (data.filterList && data.filterList.length > 0) {
            data.filterList.forEach(function (v) {
                if (!Array.isArray(v.value)) {
                    v.value = [v.value];
                }
                result.push({
                    logical: v.logical,
                    attribute: v.field,
                    label: v.label,
                    operator: v.operator,
                    operands: v.value,
                    column: v.field
                });
            });
        }
        if (item.config.templateObjectTypeCode == '') {
            isBook = false;
            message.error('请填写必填项！');
        }
        var filterExpression = JSON.stringify(result);
        item.config.filterExpression = filterExpression;
        item.config.detailUrl = item.detailUrl;
        item.config.moreLinkURL = item.moreLinkURL;
        item.config.templateObjectTypeCode = item.templateObjectTypeCode;
        item.config.templateId = item.entityId;
        item.config.sortField = item.sortField;
        item.config.sortType = item.sortType;
        if(item.componentType=='chart'){
            item.config.chartType = item.chartType;
            item.config.groupingField = item.groupingField;
            item.config.aggregateField = item.aggregateField;
            item.config.aggregateType = item.aggregateType;
            item.config.templateTitle = item.templateTitle;
            if(item.entityId==''||item.chartType==''||item.groupingField==''||item.aggregateField==''||item.aggregateType==''){
                this.$message.error('请填写必填项！');
                isBook = false;
                return false;
            }else {
                isBook = true;
            }
        }
        if (item.sortField && item.sortField != '') {
            var obj = [{
                attributeName: item.sortField,
                SortDir: item.sortType,
                sort: item.sortType
            }]
        }
        item.config.OrderExpression = JSON.stringify(item.orderExpression2);

        var obj = {
            params: {
                recordRep: {
                    id: item.id,
                    objTypeCode: 9171,
                    fields: {
                        detailUrl: item.detailUrl,
                        moreLinkURL: item.moreLinkURL,
                        Config: JSON.stringify(item.config),
                        filterExpression: item.config.filterExpression,
                        DisplayColumns: item.config.displayColumns,
                        orderExpression: item.config.OrderExpression,
                        EntityCode: item.config.entityCode,
                        TemplateObjectTypeCode: item.templateObjectTypeCode || item.config.templateObjectTypeCode,
                        DetailUrl: item.config.detailURL,
                        MoreLinkURL: item.config.moreLinkURL
                    }
                }
            }
        }

        var addObj = {
            showHeader: item.showHeader,
            sortField: item.sortField,
            sortType: item.sortType
        }
        console.log("addobj", addObj)
        Object.assign(obj.params.recordRep.fields, addObj);

        var d = {
            message: JSON.stringify(obj)
        }
        if (isBook) {
            proxy.$get(Interface.saveRecord, d).then(res => {
                emit("save-success", '');
                props.item.isConfig = false;
            })
        }
    }


    const changeChartType = (item, e, index, itemIdx) => {
        item.chartType = e;
        $('#chartDiv_' + index + '_' + itemIdx).show();
        nextTick(() => {
            var chartDom = document.getElementById('chartDiv_' + props.index + '_' + props.itemIdx);
            var myChart;
            if (myChart != null && myChart != "" && myChart != undefined) {
                myChart.dispose(); //销毁
            }
            myChart = echarts.init(chartDom);
            var option = "";
            if (e == 'pie-simple') {
                var data = [];
                if (item.chartData) {
                    data = JSON.parse(JSON.stringify(item.chartData));
                    var total = 0;
                    data.forEach(item => {
                        total += Number(item.value);
                    })
                    data.push({
                        value: total,
                        itemStyle: {
                            color: 'none',
                            decal: {
                                symbol: 'none'
                            }
                        },
                        label: {
                            show: false
                        }
                    })
                } else {
                    data = [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' },
                        {
                            // make an record to fill the bottom 50%
                            value: 1048 + 735 + 580 + 484 + 300,
                            itemStyle: {
                                // stop the chart from rendering this piece
                                color: 'none',
                                decal: {
                                    symbol: 'none'
                                }
                            },
                            label: {
                                show: false
                            }
                        }
                    ]
                }
                option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '5%',
                        left: 'center',
                        // doesn't perfectly work with our tricks, disable it
                        selectedMode: false
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            center: ['50%', '70%'],
                            startAngle: 180,
                            label: {
                                show: true,
                                formatter(param) {
                                    // correct the percentage
                                    return param.name + ' ' + param.value + ' (' + param.percent * 2 + '%)';
                                }
                            },
                            data: data
                        }
                    ]
                };
            } else if (e == 'pie-half-donut') {
                var data = [];
                if (item.chartData) {
                    data = JSON.parse(JSON.stringify(item.chartData));
                    var total = 0;
                    data.forEach(item => {
                        total += Number(item.value);
                    })
                    data.push({
                        value: total,
                        itemStyle: {
                            color: 'none',
                            decal: {
                                symbol: 'none'
                            }
                        },
                        label: {
                            show: false
                        }
                    })
                } else {
                    data = [
                        { value: 1048, name: 'Search Engine' },
                        { value: 735, name: 'Direct' },
                        { value: 580, name: 'Email' },
                        { value: 484, name: 'Union Ads' },
                        { value: 300, name: 'Video Ads' },
                        {
                            // make an record to fill the bottom 50%
                            value: 1048 + 735 + 580 + 484 + 300,
                            itemStyle: {
                                // stop the chart from rendering this piece
                                color: 'none',
                                decal: {
                                    symbol: 'none'
                                }
                            },
                            label: {
                                show: false
                            }
                        }
                    ]
                }
                option = {
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '5%',
                        left: 'center',
                        // doesn't perfectly work with our tricks, disable it
                        selectedMode: false
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            center: ['50%', '70%'],
                            startAngle: 180,
                            label: {
                                show: true,
                                formatter(param) {
                                    // correct the percentage
                                    return param.name + ' ' + param.value + ' (' + param.percent * 2 + '%)';
                                }
                            },
                            data: data
                        }
                    ]
                };
            } else if (e == 'bar-y-category') {
                var labels = ['Brazil', 'Indonesia', 'USA', 'India', 'China', 'World'];
                var boundaryGap = [];
                var series = [
                    {
                        name: '2011',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230]
                    },
                    {
                        name: '2012',
                        type: 'bar',
                        data: [19325, 23438, 31000, 121594, 134141, 681807]
                    }
                ];
                if (item.chartData) {
                    labels = [];
                    series = [];
                    item.chartData.forEach(item => {
                        labels.push(item.name)
                        boundaryGap.push(item.value);
                        series.push({
                            type: 'bar',
                            data: [item.value],
                            barWidth: 25
                        })
                    })
                }
                option = {
                    // title: {
                    //     text: 'World Population'
                    // },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {},
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value',
                        // boundaryGap: [0, 0.01]
                    },
                    yAxis: {
                        type: 'category',
                        data: labels
                    },
                    series: {
                        type: 'bar',
                        data: boundaryGap,
                        label: {
                            show: true,
                            formatter(param) {
                                return param.value;
                            }
                        },
                    }
                };
            } else if (e == 'line-category') {
                var labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                var boundaryGap = [150, 230, 224, 218, 135, 147, 260];
                if (item.chartData) {
                    labels = [];
                    boundaryGap = [];
                    item.chartData.forEach(item => {
                        labels.push(item.name)
                        boundaryGap.push(item.value);
                    })
                }
                option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: labels
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: boundaryGap,
                            type: 'line',
                            label: {
                                show: true,
                                formatter(param) {
                                    return param.value;
                                }
                            },
                        }
                    ]
                };
            }

            option && myChart.setOption(option);


        })
    }
</script>
<style lang="less" scoped>
    .formItem {
        margin-bottom: 10px;

        :deep .ant-row {
            display: block !important;
        }
    }

    .formRow {
        display: flex;

        .formItem {
            flex: 1;
        }
    }

    .filterWrap {
        .ant-form {
            display: flex;

            .formItem {
                flex: 1;
                margin-right: 5px;
            }

            .formItem:last-child {
                margin-right: 0;
            }
        }
    }

    .icon-sousuo {
        position: absolute;
        top: 3px;
        right: 10px;
        cursor: pointer;
    }

    .showWayList {
        display: flex;
    }

    .showWay .label,
    .filterWrap .label {
        color: #606266;
        padding: 10px 0;
    }

    .showWayList .chart-picker-label {
        color: #6b6d70;
        font-size: .75rem;
        line-height: 1;
        background: #fff;
        border: 0;
        display: inline-block;
        margin: 0 2px;
        outline: none;
        padding: 0;
        position: relative;
        cursor: pointer;
    }

    .showWayList .chart-picker-label .boxIcon {
        background-repeat: no-repeat;
        background-size: cover;
        display: block;
        height: 40px;
        padding: 2px;
        width: 40px;
    }

    .showWayList .chart-picker-label.active .boxIcon {
        background-position: 0 67%;
    }

    #chartDiv {
        width: 500px;
        height: 300px;
        margin-top: 20px;
    }
</style>