<template>
    <div class="infoWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    详细信息
                </div>
                <div class="panel-btn">
                    <a-button type="default">催办</a-button>
                </div>
            </div>
            <div class="panel-bd">
                
            </div>
        </div>
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    流转信息
                </div>
                <div class="panel-btn">
                </div>
            </div>
            <div class="panel-bd">
                <a-table :columns="columns" :data-source="list">
                    <template #bodyCell="{ column }">
                        <template v-if="column.key === 'Action'">
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, toRefs, reactive, toRaw, onMounted, watch, getCurrentInstance } from "vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    var columns = [
        {
            title: "来源环节",
            dataIndex: "FromActivityName"
        },
        {
            title: "办理环节",
            dataIndex: "ToActivityName"
        },
        {
            title: "应办人",
            dataIndex: "ToIdentityName"
        },
        {
            title: "实办人",
            dataIndex: "ToIdentityName"
        },
        {
            title: "来源类型",
            dataIndex: "SourceType"
        },
        {
            title: "提交人",
            dataIndex: "CreatedByName"
        },
        {
            title: "分配时间",
            dataIndex: "CreatedOn"
        },
        {
            title: "结束时间",
            dataIndex: "ModifiedOn"
        },
        {
            title: "办理时长",
            dataIndex: "TimeCost"
        },
        {
            title: "期限",
            dataIndex: "Deadline"
        },
        {
            title: "办理结果",
            dataIndex: "RuleLogStateCodeName"
        },
        {
            title: "办理方式",
            dataIndex: "StatusCodeName"
        },
        {
            title: "阅读时间",
            dataIndex: "ReadOn"
        }
    ]
    const data = reactive({
        list: []
    })
    const { list } = toRefs(data);
    const columnList = toRaw(columns);


    const getList = async () => {
        await proxy.$get(Interface.rulelogList,{
            processInstanceId: "9fd5ec7f-86c8-44e2-b7ee-aa73f7730c2c",
            page: 1,
            rows: 10
        }).then(res=>{
            data.list = res.rows;
        })
    }
    onMounted(()=>{
        getList();
    })
</script>
<style lang="less">
    .infoWrap{
        width: 100%;
    }
</style>