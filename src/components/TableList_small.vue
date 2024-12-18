<template>
    <div class="tableList">
        <table>
            <thead>
                <tr>
                    <template v-for="(item, index) in columns" :key="index">
                        <th v-if="item.field!='Action'">{{ item.title }}</th>
                    </template>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr class="rowTr" v-for="(item, index) in listData" :key="index">
                    <template v-for="(row, idx) in columns" :key="idx">
                        <td v-if="row.field!='Action'">
                            <div v-html="formatterHtml(item, row)" @click="row.isClick && handleClickCell(item, row)"></div>
                        </td>
                        <td v-else>
                            <a-dropdown :trigger="['click']">
                                <a href="javascript:;" class="btnMenu">
                                    <CaretDownOutlined />
                                </a>
                                <template #overlay>
                                    <a-menu :trigger="['click']" style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
                                        <a-menu-item style="min-width: 98px;line-height: 35px;" v-for="(action, actionIdx) in row.formmatterActions(item)" :key="actionIdx" @click="handleClick(action, item)">
                                            {{ action.name }}
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </td>
                    </template>
                </tr>
            </tbody>
        </table>
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

    const emit = defineEmits(['changeBtn','clickCell']);
    
    const props = defineProps({
        columns: Array,
        gridUrl: String,
        actions: Array,
        queryParams: Object
    });

    const data = reactive({
        listData: []
    });
    
    const { listData } = toRefs(data);

    const loadGrid = () => {
        proxy.$get(props.gridUrl, props.queryParams).then(res=>{
            // console.log("res1", res);
            if(Array.isArray(res)){
                data.listData = res;
            }else if(res.rows){
                data.listData = res.rows;
            }else if(res.nodes){
                data.listData = res.nodes;
            }else if(res.actions[0].returnValue){
                data.listData = res.actions[0].returnValue;
            }
        })
    };

    loadGrid();
    
    const formatterHtml = (item, row) => {
        let html = item[row.field];
        if(item[row.field] instanceof Object){
            html = item[row.field].textValue;
            if(row.dataType=='U'){
                html = item[row.field].userValue.DisplayName;
            }else if(row.dataType=='D'){
                html = item[row.field].dateTime;
            }else {
                html = item[row.field].textValue;
            }
        }
        // console.log(typeof row.formatter)
        if(row.formatter && typeof row.formatter == 'function'){
            // console.log('12312', row.formatter(item[row.field], row))
            html = row.formatter(item[row.field], item);
        }
        return html;
    };

    const handleClick = (action, item) => {
        emit("changeBtn", action, item);
    }

    const handleClickCell = (item, row) => {
        emit('clickCell', item);
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
                    line-height: 29px;
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
                        width: 20px;
                        height: 20px;
                        line-height: 20px;
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
    
</style>