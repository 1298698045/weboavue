<template>
    <div class="tableList">
        <table>
            <thead>
                <tr>
                    <template v-for="(item, index) in columns" :key="index">
                        <th v-if="item.fieldApiName!='Action'">{{ item.label }}</th>
                    </template>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr class="rowTr" v-for="(item, index) in listData" :key="index">
                    <template v-for="(row, idx) in columns" :key="idx">
                        <td v-if="row.fieldApiName!='Action'">
                            <div v-html="formatterHtml(item, row)"></div>
                        </td>
                        <td v-else>
                            <a-dropdown :trigger="['click']">
                                <a href="javascript:;" class="btnMenu">
                                    <CaretDownOutlined />
                                </a>
                                <template #overlay>
                                    <a-menu :trigger="['click']" style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
                                        <a-menu-item style="min-width: 98px;line-height: 35px;" v-for="(action, actionIdx) in actions" :key="actionIdx" @click="handleRowClick(action, item)">
                                            {{ action.label }}
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
        <div class="pagination" v-if="total">
            <a-pagination v-model:current="pageNumber" :total="total" />
        </div>
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        nextTick,
        defineProps,
        defineExpose
    } from "vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const emit = defineEmits(['changeBtn']);
    
    const props = defineProps({
        columns: Array,
        gridUrl: String,
        // actions: Array,
        // queryParams: Object
        id: String,
        relatedId:  String,
        relatedEntityName: String,
        fieldApiName: String
    });

    console.log("props.id", props);

    const data = reactive({
        listData: [],
        pageNumber: 1,
        pageSize: 10,
        actions: [],
        total: 0
    });
    
    const { listData, pageNumber, pageSize, actions, total } = toRefs(data);

    const getActions = () => {
        let obj = {
            actions:[{
                id: "13285;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.id,
                    context: "RELATED_LIST_RECORD",
                    actionTypes: ["standardButton"],
                    inContextOfRecordId: props.relatedId,
                    listNameOrId: props.fieldApiName,
                    entityApiName: props.relatedEntityName,
                    isLABPreview: false,
                    actionsRequestId: 3
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detailObj.relatedListActions, d).then(res=>{
            let actions = res.actions[0].returnValue;
            data.actions = actions;
        })
    }

    const loadGrid = () => {
        // console.log("relatedListId - in", props);
        let obj = {
            actions: [{
                id: "1051;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    parentRecordId: props.id,
                    listRecordsQuery: {
                        relatedListId: props.relatedId,
                        relatedEntityName: props.relatedEntityName,
                        pageNumber: data.pageNumber,
                        pageSize: data.pageSize,
                        sortBy: [],
                        where: ""
                    }
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detailObj.relatedListData, d).then(res=>{
            getActions();
            let { nodes, totalCount } = res.actions[0].returnValue;
            data.total = totalCount;
            data.listData = nodes;
        })
    };

    watch(()=>props.relatedId, (newVal, oldVal)=>{
        if(newVal){
            loadGrid();
        }
    },{ immediate: true, deep: true })

    const formatterHtml = (item, row) => {
        // console.log("item, row", item, row);
        let html = item[row.fieldApiName]?.textValue;
        if(['L','LT','DT'].includes(row.dataType)) {
            html = item[row.fieldApiName]?.name || item[row.fieldApiName]?.value;
        } else if(['D'].includes(row.dataType)){
            html = item[row.fieldApiName]?.date;
        }
        // console.log(typeof row.formatter)
        if(row.formatter && typeof row.formatter == 'function'){
            // console.log('12312', row.formatter(item[row.fieldApiName], row))
            html = row.formatter(item[row.fieldApiName], item);
        }
        return html;
    };

    const handleRowClick = (action, item) => {
        emit("changeBtn", action, item);
    }
    defineExpose({ loadGrid })
</script>
<style lang="less" scoped>
    .tableList{
        width: 100%;
        height: 100%;
        overflow-y: auto;
        table{
            width: 100%;
            border-collapse: collapse;
            thead{
                tr{
                    th{
                        max-width: 150px;
                        background: #f3f3f3;
                        border-bottom: 1px solid #e5e5e5;
                        padding: 4px 8px;
                        color: #444444;
                        text-align: left;
                        font-weight: 700;
                        white-space: nowrap;
                        font-size: 14px;
                        color: #0b5cab;
                    }
                }
            }
            tbody{
                .rowTr{
                    line-height: 49px;
                    &:hover{
                        td{
                            background: #f3f3f3;
                        }
                    }
                    td{
                        max-width: 250px;
                        border-bottom: 1px solid #e5e5e5;
                        padding: 4px 8px;
                        white-space: pre-line;
                        font-weight: normal;
                        text-align: left;
                        background: #fff;
                    }
                    .btnMenu{
                        display: inline-block;
                        width: 32px;
                        height: 32px;
                        line-height: 32px;
                        border: 1px solid #c9c9c9;
                        color: #747474;
                        /* vertical-align: middle; */
                        border-radius: 4px;
                        text-align: center;
                        &:hover{
                            color: var(--textColor);
                        }
                    }
                }
            }
        }
    }
    .pagination{
        padding: 10px;
        text-align: right;
    }
</style>