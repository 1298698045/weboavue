<template>
    <div>
        <a-table :columns="columns" :data-source="dataList">
            
        </a-table>
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
    } from "vue";
    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        columns: [
            
        ],
        dataList: []
    });
    const { columns, dataList } = toRefs(data);
    const getRelated = () => {
        proxy.$get(Interface.meeting.relatedrecords,{}).then(res=>{
            console.log("res",res);
            let record = res.actions[0].returnValue;
            let listItems = record.listItems;
            let recordIds = record.recordIds;
            data.columns = listItems.MeetingItem.map(item=>{
                item.title = item.title;
                item.dataIndex = item.field;
                item.key = item.field;
                return item;
            })
        })
    }
    getRelated();
</script>
<style lang="less">
</style>