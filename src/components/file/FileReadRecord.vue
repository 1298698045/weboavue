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
                <a-table :columns="columns" :data-source="list">
                    <template #bodyCell="{ column, record, index }">
                        <template v-if="column.key == 'sortNumber'">
                            {{ index+1 }}
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
            key: "sortNumber",
            dataIndex: "sortNumber"
        },
        {
            title: "部门",
            dataIndex: "BusinessUnitIdName"
        },
        {
            title: "姓名",
            dataIndex: "ReaderIdName"
        },
        {
            title: "状态",
            dataIndex: "StateCodeName"
        },
        {
            title: "IP地址",
            dataIndex: "IPAddr"
        },
        {
            title: "浏览器名称与版本",
            dataIndex: "CreatedOn"
        },
        {
            title: "阅读次数",
            dataIndex: "ReadTimes"
        },
        {
            title: "邀请时间",
            dataIndex: "CreatedOn"
        }
    ]
    const data = reactive({
        list: []
    })
    const { list } = toRefs(data);
    const columnList = toRaw(columns);
    const getList = async () => {
        var obj = {
            filterQuery: "fileId\teq\t"+"19e6ddee-9b2f-49ae-ba9a-cbf8d7bfe033",
            objectTypeCode: "100102",
            entityType: "070",
            page: 1,
            rows: 10
        }
        await proxy.$get(Interface.file.readRecord,obj).then(res=>{
            data.list = res.rows;
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