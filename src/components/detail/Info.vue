<template>
    <div class="circulationInfo">
        <div class="status-card-wapper">
            <div class="status-card" :class="{'active':currentTab==0}" @click="handleTab(0)">
                <div class="icon">
                </div>
                <div class="status-card-info">
                    <p style="font-size: 26px;">4</p>
                    <p style="font-size: 12px; color: rgb(91, 91, 91);">总人次</p>
                </div>
            </div>
            <div class="status-card" :class="{'active':currentTab==1}" @click="handleTab(1)">
                <div class="icon">
                </div>
                <div class="status-card-info">
                    <p style="font-size: 26px;color: #8dc139;">4</p>
                    <p style="font-size: 12px; color: rgb(91, 91, 91);">已提交</p>
                </div>
            </div>
            <div class="status-card" :class="{'active':currentTab==2}" @click="handleTab(2)">
                <div class="icon">
                </div>
                <div class="status-card-info">
                    <p style="font-size: 26px; color: #b37bf8;">4</p>
                    <p style="font-size: 12px; color: rgb(91, 91, 91);">未提交</p>
                </div>
            </div>
            <div class="status-card" :class="{'active':currentTab==3}" @click="handleTab(3)">
                <div class="icon">
                </div>
                <div class="status-card-info">
                    <p style="font-size: 26px; color: #009bff;">4</p>
                    <p style="font-size: 12px; color: rgb(91, 91, 91);">已查看</p>
                </div>
            </div>
            <div class="status-card" :class="{'active':currentTab==4}" @click="handleTab(4)">
                <div class="icon">
                </div>
                <div class="status-card-info">
                    <p style="font-size: 26px;color: #ff1924;">4</p>
                    <p style="font-size: 12px; color: rgb(91, 91, 91);">未查看</p>
                </div>
            </div>
        </div>
        <div class="infoWrap">
            <div class="panel panel2">
                <!-- <div class="arrowIcon rightIcon" v-if="isAside" @click="isAside=false"></div> -->
                <div class="arrowIcon leftIcon" v-if="!isAside" @click="isAside=true"></div>
                <!-- <div class="panel-head">
                    <div class="panel-title">
                        流转信息
                    </div>
                    <div class="panel-btn">
                    </div>
                </div> -->
                <div class="search-view">
                    <a-form>
                        <a-form-item label="按节点过滤">
                            <a-select style="width: 200px" :allowClear="true" v-model:value="searchForm.ToActivityId">
                                <a-select-option v-for="(item, index) in search.ToActivityId" :value="item.id">{{ item.Name.textValue }}</a-select-option>
                            </a-select>
                        </a-form-item>
                        <a-form-item label="按操作者过滤">
                            <a-select style="width: 200px" :allowClear="true" v-model:value="searchForm.ToIdentityId"
                                :default-active-first-option="false" :filter-option="false" showSearch
                                @dropdownVisibleChange="(e)=>searchlookup('', 'ToIdentityId')" @search="(e)=>searchlookup(e,'ToIdentityId')">
                                <a-select-option v-for="(item, index) in search.ToIdentityId" :value="item.ID">{{ item.Name }}</a-select-option>
                                <template #suffixIcon>
                                    <SearchOutlined @click.stop="handleOpenLook('ToIdentityId')" />
                                </template>
                            </a-select>
                        </a-form-item>
                    </a-form>
                </div>
                <div class="panel-bd">
                    <!-- <Dtable name="infoGrid" ref="gridRef" :columns="columns" :gridUrl="Interface.rulelogList" :tableHeight="height" :isCollapsed="isCollapsed"></Dtable> -->
                    <!-- <Ntable ref="gridRef" :columns="columns" :gridUrl="Interface.list2" :tableHeight="height" :isCollapsed="isCollapsed"></Ntable> -->
                    <Dtable ref="gridRef" name="datagridFilter" :columns="columns" :gridUrl="Interface.list2"
                        :tableHeight="height" :loadFilter="loadFilter"></Dtable>

                </div>
            </div>
            <div class="panel panel1" v-if="isAside">
                <div class="arrowIcon rightIcon" @click="isAside=false"></div>
                <div class="panel-head">
                    <div class="panel-title">
                        审批流转时间线
                    </div>
                    <div class="panel-btn">
                        <!-- <a-button type="default" @click="handleUrging">催办</a-button> -->
                    </div>
                </div>
                <div class="panel-bd panel-bd1" ref="timelineContent">
                    <a-timeline>
                        <a-timeline-item v-for="(activity, index) in ApproveList" :key="index">
                            <template #dot>
                                <!-- <ClockCircleOutlined style="font-size: 16px;color: #1677ff;"
                                    v-if="ApproveList&&(ApproveList.length==index+1)" />
                                <CheckCircleOutlined style="font-size: 16px;color: green;" v-else /> -->
                                <div class="avatar">
                                    {{ activity.ExecutorIdentityName.slice(0, 2) }}
                                    <span class="status">
                                        <ClockCircleOutlined style="font-size: 16px;color: #1677ff;"
                                            v-if="ApproveList&&(ApproveList.length==index+1)" />
                                        <CheckCircleOutlined style="font-size: 16px;color: green;" v-else />
                                    </span>
                                </div>
                            </template>
                            <span class="timelinetime">{{activity.CreatedOn}}</span>
                            <p>
                                <span class="timelinetext">{{activity.ToActivityName}}</span>
                            </p>
                            <span class="timelinetext">{{activity.ExecutorIdentityName}}</span>
                            <span class="timelinetext">({{activity.StateCode}})</span>
                        </a-timeline-item>
                    </a-timeline>
                </div>
            </div>
        </div>
        <radio-user v-if="isRadioUser" :isShow="isRadioUser" @cancel="isRadioUser = false"
                    @selectVal="handleUserParams" :localId="localId"></radio-user>
    </div>
</template>
<script setup>
    import { ref, toRefs, reactive, toRaw, onMounted, watch, getCurrentInstance, defineEmits, defineProps } from "vue";
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
    import { CheckCircleOutlined, ClockCircleOutlined, SearchOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    //import Dtable from "@/components/Dtable.vue";
    // import Ntable from "@/components/Ntable.vue";
    import Dtable from "@/components/Dtable_nodes.vue";

    import DetailInfo from "@/components/detail/DetailInfo.vue";
    import RadioUser from "@/components/commonModal/RadioUser.vue";

    import { useRouter, useRoute } from "vue-router";
    import { message } from "ant-design-vue";
    import { girdFormatterValue } from "@/utils/common.js";
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const timelineContent = ref(null);
    const props = defineProps({
        processInstanceId: String,
        processId: String
    });

    const searchForm = reactive({
        ToActivityId: '',
        ToIdentityId: ''
    })

    const columns = ref([
        {
            title: "来源节点",
            field: "FromActivityName"
        },
        {
            title: "办理节点",
            field: "ToActivityName"
        },
        {
            title: "办理方式",
            field: "StatusCode"
        },
        {
            title: "办理结果",
            field: "StateCode"
        },
        {
            title: "应办人",
            field: "ToIdentityName"
        },
        {
            title: "实办人",
            field: "ExecutorIdentityName"
        },
        {
            title: "来源类型",
            field: "SourceType"
        },
        {
            title: "提交人",
            field: "CreatedByName"
        },
        {
            title: "提交时间",
            field: "CreatedOn"
        },
        {
            title: "结束时间",
            field: "ModifiedOn"
        },
        {
            title: "办理时长小时",
            field: "TimeCost"
        },
        {
            title: "办理期限",
            field: "Deadline"
        },
        {
            title: "已读",
            field: "IsRead"
        },
        {
            title: "办理意见",
            field: "Description"
        }
    ]);
    const gridRef = ref(null);

    const filterCondition = ref([
        {
            attribute: "ProcessInstanceId",
            column: "ProcessInstanceId",
            label: "流程实例",
            operator: "eq",
            logical: "AND",
            picklistValues: [],
            isEditable: false,
            operands: [props.processInstanceId]
        }
    ])

    const data = reactive({
        list: [],
        id: route.query.id,
        objectTypeCode: '122',
        sObjectName: 'WFProcessInstance',
        height: 0,
        ApproveList: [],
        queryParams: {
            filterId: '',
            objectTypeCode: '123',
            entityName: 'WFRuleLog',
            // filterQuery: '\nProcessInstanceId\teq\t' + props.processInstanceId,
            displayColumns: 'FromActivityName,ToActivityName,StatusCode,SourceType,StateCode,ToIdentityName,ExecutorIdentityName,CreatedByName,CreatedOn,ModifiedOn,TimeCost,Deadline,IsRead,,Description',
            sort: 'CreatedOn',
            order: 'ASC',
            filterCondition: JSON.stringify(filterCondition.value)
        },
        isAside: true,
        currentTab: 0,
        search: {
            ToActivityId: [],
            ToIdentityId: []
        },
        localId: "",
        isRadioUser: false
    })
    const { list, id, objectTypeCode, sObjectName, height, ApproveList, isAside, currentTab, search, localId, isRadioUser } = toRefs(data);
    // const columnList = toRaw(columns);
    const emit = defineEmits(['handleUrging']);
    const handleUrging = () => {
        emit("handleUrging");
    }
    const handleTab = (index) => {
        data.currentTab = index;
        if (index == 0) {
            filterCondition.value = [{
                attribute: "ProcessInstanceId",
                column: "ProcessInstanceId",
                label: "流程实例",
                operator: "eq",
                logical: "AND",
                picklistValues: [],
                isEditable: false,
                operands: [props.processInstanceId]
            }]
        } else if (index == 1) {
            filterCondition.value = [
                {
                    attribute: "ProcessInstanceId",
                    column: "ProcessInstanceId",
                    label: "流程实例",
                    operator: "eq",
                    logical: "AND",
                    picklistValues: [],
                    isEditable: false,
                    operands: [props.processInstanceId]
                },
                {
                    attribute: "StateCode",
                    column: "StateCode",
                    label: "审批状态",
                    operator: "eq",
                    logical: "AND",
                    picklistValues: [],
                    isEditable: false,
                    operands: [2]
                }
            ]
        } else if (index == 2) {
            filterCondition.value = [
                {
                    attribute: "ProcessInstanceId",
                    column: "ProcessInstanceId",
                    label: "流程实例",
                    operator: "eq",
                    logical: "AND",
                    picklistValues: [],
                    isEditable: false,
                    operands: [props.processInstanceId]
                },
                {
                    attribute: "StateCode",
                    column: "StateCode",
                    label: "审批状态",
                    operator: "neq",
                    logical: "AND",
                    picklistValues: [],
                    isEditable: false,
                    operands: [2]
                }
            ]
        } else if (index == 3) {
            filterCondition.value = [
                {
                    attribute: "ProcessInstanceId",
                    column: "ProcessInstanceId",
                    label: "流程实例",
                    operator: "eq",
                    logical: "AND",
                    picklistValues: [],
                    isEditable: false,
                    operands: [props.processInstanceId]
                },
                {
                    attribute: "IsRead",
                    column: "IsRead",
                    label: "是否已读",
                    operator: "neq",
                    logical: "AND",
                    picklistValues: [],
                    isEditable: false,
                    operands: [1]
                }
            ]
        } else if (index == 3) {
            filterCondition.value = [
                {
                    attribute: "ProcessInstanceId",
                    column: "ProcessInstanceId",
                    label: "流程实例",
                    operator: "eq",
                    logical: "AND",
                    picklistValues: [],
                    isEditable: false,
                    operands: [props.processInstanceId]
                },
                {
                    attribute: "IsRead",
                    column: "IsRead",
                    label: "是否已读",
                    operator: "neq",
                    logical: "AND",
                    picklistValues: [],
                    isEditable: false,
                    operands: [0]
                }
            ]
        }


        data.queryParams.filterCondition = JSON.stringify(filterCondition.value);
        getList();
    }

    const getFlowNodes = () => {
        let filterCondition = [{
            attribute: "ProcessId",
            column: "ProcessId",
            label: "流程",
            operator: "eq",
            logical: "AND",
            picklistValues: [],
            isEditable: false,
            operands: [props.processId]
        }]
        let d = {
            filterId: "",
            entityType: "WFStep",
            search: "",
            sort: "stepCode",
            order: "asc",
            filterCondition: JSON.stringify(filterCondition)
        };
        proxy.$post(Interface.list2, d).then(res => {
            data.search.ToActivityId = res.nodes;
            console.log("data", data.search)
        })
    };
    getFlowNodes();

    const searchlookup = (search, fieldName) => {
        let obj = {
            actions: [{
                id: "6129;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    objectApiName: "WFRuleLog",
                    fieldApiName: "ToIdentityId",
                    pageParam: 1,
                    pageSize: 25,
                    q: search,
                    searchType: "Recent",
                    targetApiName: "SystemUser",
                    body: {
                        sourceRecord: {
                            apiName: "WFRuleLog",
                            fields: {
                                Id: null,
                                RecordTypeId: ""
                            }
                        }
                    }
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.lookup, d).then((res) => {
            let list = res.actions[0].returnValue.lookupResults.records;
            let arr = [];
            list.forEach(item => {
                arr.push({
                    ID: item.fields.Id.value,
                    Name: item.fields.Name.value
                })
            });
            data.search[fieldName] = arr;
        })
    };

    const handleOpenLook = (fieldName) => {
        data.localId = fieldName;
        data.isRadioUser = true;
    };

    const handleUserParams = (params) => {
        console.log('params', params);
        searchForm[data.localId] = params.id;
        var isEmpty = data.search[data.localId].some((item) => item.ID == params.id);
        if (!isEmpty) {
            data.search[data.localId].push({
                ID: params.id,
                Name: params.name,
            });
        };
        data.isRadioUser = false;
    };

    watch(()=>searchForm, (newVal, oldVal)=>{
        let ToActivityId = {
            attribute: "ToActivityId",
            column: "ToActivityId",
            label: "当前节点ID",
            operator: "eq",
            logical: "AND",
            picklistValues: [],
            isEditable: false,
            operands: [newVal.ToActivityId]
        };
        let ToIdentityId = {
            attribute: "ToIdentityId",
            column: "ToIdentityId",
            label: "应执行人ID",
            operator: "eq",
            logical: "AND",
            picklistValues: [],
            isEditable: false,
            operands: [newVal.ToIdentityId]
        }
        let temp = [];
        if(newVal.ToActivityId){
            temp.push(ToActivityId);
        }
        if(newVal.ToIdentityId){
            temp.push(ToIdentityId);
        }
        
        let notFilterCondition = filterCondition.value.filter(item=>item.column != 'ToActivityId' && item.column != 'ToIdentityId');
        filterCondition.value = [...notFilterCondition, ...temp];
        data.queryParams.filterCondition = JSON.stringify(filterCondition.value);
        loadGrid();
    },{deep: true})

    const loadGrid = () => {
        gridRef.value.loadGrid(data.queryParams);
    }

    const getList = async () => {
        // let filterQuery = '\nProcessInstanceId\teq\t' + props.processInstanceId;
        proxy.$post(Interface.list2, {
            filterId: '',
            objectTypeCode: '123',
            entityName: 'WFRuleLog',
            // filterQuery: filterQuery,
            filterCondition: JSON.stringify(filterCondition.value),
            search: '',
            page: 1,
            rows: 100,
            sort: 'CreatedOn',
            order: 'ASC',
            // displayColumns: 'Name,CreatedOn,ExecutorIdentityName,ToActivityName,StatusCodeName,RuleLogStateCodeName'
        }).then(res => {
            if (res && res.nodes && res.nodes.length) {
                var list = [];
                for (var i = 0; i < res.nodes.length; i++) {
                    var item = res.nodes[i];
                    for (var cell in item) {
                        if (cell != 'id' && cell != 'nameField') {
                            item[cell] = girdFormatterValue(cell, item);
                        }
                        if (cell == 'CreatedOn') {
                            item[cell] = item[cell] ? dayjs(item[cell]).format("YYYY-MM-DD HH:mm") : '';
                        }
                    }
                    list.push(item)
                }
                data.ApproveList = list;
                console.log("data.ApproveList", data.ApproveList);
            }
            gridRef.value.loadGrid(data.queryParams);
        })
    }
    watch(() => data.isAside, (newVal, oldVal) => {
        gridRef.value.loadGrid(data.queryParams);
    }, { deep: true });
    const loadFilter = (res) => {
        let fields = data.queryParams.displayColumns.split(',');
        var data0 = { rows: [], total: 0 }
        if (res) {
            if (res.nodes) {
                let list = [];
                fields.forEach(field => {
                    list = res.nodes.map(row => {
                        if (field != 'id' && field != 'nameField') {
                            row[field] = girdFormatterValue(field, row);
                        }
                        row.LIST_RECORD_ID = row.id;
                        return row;
                    })
                })
                data0.rows = list;
            } else {
                data0.rows = res;
            }
        }
        data0.total = res && res.totalCount ? Number(res.totalCount) : data0.rows.length;
        return data0
    }
    onMounted(() => {
        getList();
        let h = document.documentElement.clientHeight;
        let t = timelineContent.value.clientHeight;
        let s = h - t - 360;
        data.height = h - 200 - 80;
        window.addEventListener("resize", (e) => {
            let h = document.documentElement.clientHeight;
            let t = timelineContent.value.clientHeight;
            let s = h - t - 360;
            data.height = h - 200 - 80;
        });
    });
</script>
<style lang="less" scoped>
    .circulationInfo {
        width: 100%;
    }

    .infoWrap {
        width: 100%;
        height: calc(100% - 80px);
        display: flex;

        .panel1 {
            margin-left: 20px;
            width: 33%;
            margin-bottom: 0;
            position: relative;
        }

        .panel2 {
            flex: 1;
            margin-bottom: 0;
        }

        .panel-bd1 {
            min-height: 100px;
            height: auto;
            margin-top: 45px;
            margin-left: 35%;

            :deep .ant-timeline .ant-timeline-item-tail {
                border-inline-start: 2px solid #E4E7ED;
            }

            :deep .ant-timeline .ant-timeline-item {
                padding-bottom: 38px;
            }
        }

        .timelinetext {
            font-size: 14px;
            color: #303133;
            margin-left: 15px;
        }

        .timelinetime {
            font-size: 14px;
            position: absolute;
            left: -196px;
            top: -6px;
            color: #8393b0;
            width: 140px;
            line-height: 20px;
            text-align: right;
            margin-top: 8px;
        }
    }

    .ant-btn.ant-btn-text,
    .ant-btn.ant-btn-text:hover {
        color: var(--textColor);
    }

    .panel {
        padding: 20px 20px 17px 20px;

        .panel-head {
            padding: 0px;
        }
    }

    .avatar {
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 4px;
        background: #3399ff;
        color: #fff;
        font-size: 14px;
        position: relative;

        .status {
            position: absolute;
            bottom: -10px;
            right: -10px;
            background: #fff;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .panel.panel2 {
        position: relative;
    }

    .arrowIcon {
        position: absolute;
        top: 50%;
        z-index: 999;
        width: 16px;
        height: 60px;
        background: url(@/assets/img/right.png) center center no-repeat;
        cursor: pointer;
        left: 0;
    }

    .arrowIcon.rightIcon:hover {
        background: url(@/assets/img/right_hover.png) center center no-repeat;
    }

    .arrowIcon.leftIcon {
        top: 50%;
        left: inherit !important;
        right: 0;
        background: url(@/assets/img/left.png) center center no-repeat;

        &:hover {
            background: url(@/assets/img/left_hover.png) center center no-repeat;
        }
    }

    .status-card-wapper {
        width: 100%;
        overflow: hidden;
        margin-bottom: 20px;

        .status-card {
            background-color: #fff;
            width: 19%;
            height: 80px;
            border: 1px solid #d5d5d5;
            cursor: pointer;
            font-size: 50px;
            padding-left: 2%;
            white-space: nowrap;
            overflow: hidden;
            -o-text-overflow: ellipsis;
            text-overflow: ellipsis;
            -webkit-box-shadow: 0 0 5px #ddd;
            box-shadow: 0 0 5px #ddd;
            float: left;
            margin-right: 1.25%;
            display: flex;
            align-items: center;

            &:last-child {
                margin-right: 0;
            }

            &.active {
                border: 1px solid rgb(0, 138, 255);
                color: rgb(58, 200, 210);
                box-shadow: rgb(0, 138, 255) 0px 0px 5px;
            }

            .icon {
                width: 50px;
                height: 50px;
                background: red;
                border-radius: 50%;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .status-card-info {
                margin-left: 10px;
            }
        }
    }
</style>
<style lang="less">
    .search-view {
        width: 100%;
        display: flex;

        .ant-form {
            display: flex;

            .ant-form-item {
                margin-right: 10px;
            }
        }
    }
</style>