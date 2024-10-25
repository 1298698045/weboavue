<template>
    <div class="infoWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    详细信息
                </div>
                <div class="panel-btn">
                    <a-button type="default" @click="handleUrging">催办</a-button>
                </div>
            </div>
            <div class="panel-bd">
                <DetailInfo class="DetailInfo" :id="id" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName" />
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
                <!-- <a-table :columns="columns" :data-source="list">
                    <template #bodyCell="{ column }">
                        <template v-if="column.key === 'Action'">
                        </template>
                    </template>
                </a-table> -->
                <Dtable name="infoGrid" ref="gridRef" :columns="columns" :gridUrl="Interface.rulelogList" :tableHeight="200" :isCollapsed="isCollapsed"></Dtable>               
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, toRefs, reactive, toRaw, onMounted, watch, getCurrentInstance,defineEmits } from "vue";
    import Interface from "@/utils/Interface.js";
    import Dtable from "@/components/Dtable.vue";
    import DetailInfo from "@/components/detail/DetailInfo.vue";
    import { useRouter, useRoute } from "vue-router";
    import { message } from "ant-design-vue";
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const columns = ref([
        {
            title: "来源环节",
            field: "FromActivityName"
        },
        {
            title: "办理环节",
            field: "ToActivityName"
        },
        {
            title: "应办人",
            field: "ToIdentityName"
        },
        {
            title: "实办人",
            field: "ToIdentityName"
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
            title: "分配时间",
            field: "CreatedOn"
        },
        {
            title: "结束时间",
            field: "ModifiedOn"
        },
        {
            title: "办理时长",
            field: "TimeCost"
        },
        {
            title: "期限",
            field: "Deadline"
        },
        {
            title: "办理结果",
            field: "RuleLogStateCodeName"
        },
        {
            title: "办理方式",
            field: "StatusCodeName"
        },
        {
            title: "阅读时间",
            field: "ReadOn"
        }
    ]);
    const gridRef = ref(null);
    const data = reactive({
        list: [],
        id: route.query.id,
        objectTypeCode:'122',
        sObjectName:'WFProcessInstance',
    })
    const { list,id,objectTypeCode,sObjectName } = toRefs(data);
    // const columnList = toRaw(columns);
    const emit = defineEmits(['handleUrging']);
    const handleUrging=()=>{
        emit("handleUrging");
    }
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
        // getList();
        gridRef.value.loadGrid();
    })
</script>
<style lang="less" scoped>
    .infoWrap{
        width: 100%;
    }
    .ant-btn.ant-btn-text,.ant-btn.ant-btn-text:hover{
        color: var(--textColor);
    }
    .panel{
        padding: 20px 0 0 0;
        .panel-head{
            padding: 0 20px;
        }
    }
</style>