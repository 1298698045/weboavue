<template>
    <div class="infoWrap">
        <div class="panel panel2">
            <div class="panel-head">
                <div class="panel-title">
                    流转信息
                </div>
                <div class="panel-btn">
                </div>
            </div>
            <div class="panel-bd">
                <!-- <Dtable name="infoGrid" ref="gridRef" :columns="columns" :gridUrl="Interface.rulelogList" :tableHeight="height" :isCollapsed="isCollapsed"></Dtable> -->
                <!-- <Ntable ref="gridRef" :columns="columns" :gridUrl="Interface.list2" :tableHeight="height" :isCollapsed="isCollapsed"></Ntable> -->
                <Dtable ref="gridRef" name="datagridFilter" :columns="columns" :gridUrl="Interface.list2"
                    :tableHeight="height" :loadFilter="loadFilter"></Dtable>

            </div>
        </div>
        <div class="panel panel1">
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
    import { CheckCircleOutlined, ClockCircleOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    //import Dtable from "@/components/Dtable.vue";
    // import Ntable from "@/components/Ntable.vue";
    import Dtable from "@/components/Dtable_nodes.vue";

    import DetailInfo from "@/components/detail/DetailInfo.vue";
    import { useRouter, useRoute } from "vue-router";
    import { message } from "ant-design-vue";
    import { girdFormatterValue } from "@/utils/common.js";
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const timelineContent = ref(null);
    const props = defineProps({
        processInstanceId: String
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
            filterQuery: '\nProcessInstanceId\teq\t' + props.processInstanceId,
            displayColumns: 'FromActivityName,ToActivityName,StatusCode,SourceType,StateCode,ToIdentityName,ExecutorIdentityName,CreatedByName,CreatedOn,ModifiedOn,TimeCost,Deadline,IsRead,,Description',
            sort: 'CreatedOn',
            order: 'ASC'
        },
    })
    const { list, id, objectTypeCode, sObjectName, height, ApproveList } = toRefs(data);
    // const columnList = toRaw(columns);
    const emit = defineEmits(['handleUrging']);
    const handleUrging = () => {
        emit("handleUrging");
    }
    const getList = async () => {
        let filterQuery = '\nProcessInstanceId\teq\t' + props.processInstanceId;
        proxy.$post(Interface.list2, {
            filterId: '',
            objectTypeCode: '123',
            entityName: 'WFRuleLog',
            filterQuery: filterQuery,
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
        data.height = h - 200;
        window.addEventListener("resize", (e) => {
            let h = document.documentElement.clientHeight;
            let t = timelineContent.value.clientHeight;
            let s = h - t - 360;
            data.height = h - 200;
        });
    });
</script>
<style lang="less" scoped>
    .infoWrap {
        width: 100%;
        display: flex;

        .panel1 {
            margin-left: 20px;
            width: 33%;
            margin-bottom: 0;
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
        .status{
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
</style>