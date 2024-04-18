<template>
    <div class="readWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    传阅记录
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
                <Dtable name="recordGrid" ref="gridRef" :columns="columns" :gridUrl="Interface.readlogList" :tableHeight="200" :isCollapsed="isCollapsed"></Dtable>               
            </div>
        </div>
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    浏览记录
                </div>
                <div class="panel-btn">
                </div>
            </div>
            <div class="panel-bd">
                <!-- <a-table :columns="columns2" :data-source="list2">
                    <template #bodyCell="{ column }">
                        <template v-if="column.key === 'sortNumber'">
                        </template>
                    </template>
                </a-table> -->
                <Dtable name="browsingHistory" ref="browsingHistoryRef" :columns="columns2" :gridUrl="Interface.readlogList" :tableHeight="200" :isCollapsed="isCollapsed"></Dtable>               
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, toRefs, reactive, toRaw, onMounted, watch, getCurrentInstance } from "vue";
    import Interface from "@/utils/Interface.js";
    import Dtable from "@/components/Dtable.vue";
    const { proxy } = getCurrentInstance();
    const gridRef = ref(null);
    const browsingHistoryRef = ref(null);
    var columns = ref([
        // {
        //     title: "序号",
        //     // dataIndex: "FromActivityName"
        // },
        {
            title: "传阅人",
            field: "ToActivityName"
        },
        {
            title: "传阅时间",
            field: "CreatedOn"
        },
        {
            title: "接收人",
            field: "ReceiverName"
        },
        {
            title: "是否已读",
            field: "IsRead"
        }
    ]);
    var columns2 = ref([
        // {
        //     title: "序号",
        //     // dataIndex: "FromActivityName",
        //     key: "sortNumber"
        // },
        {
            title: "阅读人",
            field: "CreatedByName"
        },
        {
            title: "阅读时间",
            field: "CreatedOn"
        },
        {
            title: "IP地址",
            field: "IPAddr"
        },
        {
            title: "浏览器名称与版本",
            field: "BrowserName"
        }
    ]);
    const data = reactive({
        list: [],
        list2: []
    })
    const { list, list2 } = toRefs(data);
    // const columnList = toRaw(columns);
    // const columnList2 = toRaw(columns2);
    const getList = async () => {
        await proxy.$get(Interface.readlogList,{
            processInstanceId: "9fd5ec7f-86c8-44e2-b7ee-aa73f7730c2c"
        }).then(res=>{
            data.list2 = res.rows;
        })
    }
    onMounted(()=>{
        gridRef.value.loadGrid();
        browsingHistoryRef.value.loadGrid();
        getList();
    })
</script>
<style lang="less">
    .readWrap{
        width: 100%;
    }
</style>