<template>
    <div class="readWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    阅读记录
                </div>
                <div class="panel-btn">
                </div>
            </div>
            <div class="panel-bd">
                <a-table :columns="columns2" :data-source="list2">
                    <template #bodyCell="{ column }">
                        <template v-if="column.key === 'sortNumber'">
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
            title: "序号",
            // dataIndex: "FromActivityName"
        },
        {
            title: "传阅人",
            dataIndex: "ToActivityName"
        },
        {
            title: "传阅时间",
            dataIndex: "CreatedOn"
        },
        {
            title: "接收人",
            dataIndex: "ReceiverName"
        },
        {
            title: "是否已读",
            dataIndex: "IsRead"
        }
    ]
    var columns2 = [
        {
            title: "序号",
            // dataIndex: "FromActivityName",
            key: "sortNumber"
        },
        {
            title: "阅读人",
            dataIndex: "CreatedByName"
        },
        {
            title: "阅读时间",
            dataIndex: "CreatedOn"
        },
        {
            title: "IP地址",
            dataIndex: "IPAddr"
        },
        {
            title: "浏览器名称与版本",
            dataIndex: "BrowserName"
        }
    ]
    const data = reactive({
        list: [],
        list2: []
    })
    const { list, list2 } = toRefs(data);
    const columnList = toRaw(columns);
    const columnList2 = toRaw(columns2);
    const getList = async () => {
        await proxy.$get(Interface.readlogList,{
            processInstanceId: "9fd5ec7f-86c8-44e2-b7ee-aa73f7730c2c"
        }).then(res=>{
            data.list2 = res.rows;
        })
    }
    onMounted(()=>{
        getList();
    })
</script>
<style lang="less" scoped>
    .readWrap{
        width: 100%;
        height: 100%;
        .panel{
            height: 100%;
            background: #fff;
            margin-bottom: 0;
        }
    }
</style>