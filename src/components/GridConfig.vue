<template>
    <div class="gridWrap">
        <div id="datagrid"></div>
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined,
        CheckOutlined,
        SettingOutlined,
        RedoOutlined,
        SearchOutlined,
    } from "@ant-design/icons-vue";
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        h, defineProps, defineExpose
    } from "vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        objectTypeCode: [String, Number],
        entityType: String,
    });
    const data = reactive({
        columns: [],
    });
    const { columns } = toRefs(data);
    const getConfig = () => {
        function formatOper(val, row, index, entityType, listViewActions) {
            var rowId = row["LIST_RECORD_ID"];
            var action = "";
            action += '<div class="iconBox">'
            action += '<div class="popup">'
            for (var i = 0; i < listViewActions.length; i++) {
                var item = listViewActions[i];
                action +=
                    '<div class="option-item" href="javascript:;" onclick="' +
                    [item.devNameOrId] +
                    "('" +
                    rowId +
                    "','" +
                    entityType +
                    "')\">" +
                    item.title +
                    "</div>";
            }
            action += '</div><svg t="1695373438173" class="icon img" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1943" width="200" height="200"><path d="M512 256a64 64 0 1 0-64-64 64.1 64.1 0 0 0 64 64z m0 192a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z m0 320a64 64 0 1 0 64 64 64.1 64.1 0 0 0-64-64z" p-id="1944"></path></svg></div>'
            return action;
        }
        proxy.$get(Interface.listView.config, {
            entityType: props.entityType,
            objecttypecode: props.objectTypeCode
        }).then((res) => {
            console.log(res, "res");

            var cols = res.DataSet.Columns;
            var columnsArray = [];
            var col = {
                field: "Action",
                title: "操作",
                formatter: function formatter(value, row, index) {
                    return formatOper(
                        value,
                        row,
                        index,
                        data.entityType,
                        data.listViewActions
                    );
                },
            };
            columnsArray.push(col);
            for (var i = 0; i < cols.length; i++) {
                var c = cols[i];
                var col = {
                    field: c.Name,
                    title: c.Title,
                    sortable: true,
                };
                columnsArray.push(col);
            }
            data.columns = columnsArray;
            loadGrid(data.columns);
        });
    };

    const getActions = () => {
        proxy.$get(Interface.listView.handleActions, {
            objectTypeCode: props.objectTypeCode,
        })
            .then((res) => {
                var listViewActions =
                    res.actions[0].returnValue.actionsContainers[0].listViewActions;
                var actionList =
                    res.actions[0].returnValue.actionsContainers[0].actionList;
                data.listViewActions = listViewActions;
                var temp = [];
                for (var i = 0; i < actionList.length; i++) {
                    let item = actionList[i];
                    if (item.isSeparator) {
                        temp.push([item]);
                    } else {
                        if (Array.isArray(temp[temp.length - 1])) {
                            temp[temp.length - 1].push(item);
                        } else {
                            temp.push(item);
                        }
                    }
                }
                console.log("temp", temp);
                data.actionList = temp;
                getConfig();
            });
    };
    getActions();
    const loadGrid = (columns) => {
        if ($.fn.pagination.defaults != undefined) {
            //分页工具栏处理
            $.fn.pagination.defaults.beforePageText = "";
            $.fn.pagination.defaults.afterPageText = "/{pages}";
            $.fn.pagination.defaults.displayMsg = "从{from} 到 {to} 总计 {total} 条";
        }
        $("#datagrid").datagrid({
            url: Interface.listView.list,
            method: "get",
            columns: [columns],
            queryParams: {
                entityType: props.entityType,
                objectTypeCode: props.objectTypeCode,
                filterQuery: data.filterQuery,
            },
            // data: tableList,
            singleSelect: false,
            checkOnSelect: false,
            selectOnCheck: false,
            pagination: true,
            pageNumber: 1,
            pageSize: 10,
            fit: true,
            striped: false,
            rownumbers: true,
            onLoadSuccess: function () { },
        });
    };
    defineExpose({getActions})
</script>
<style lang="less" scoped>
    .gridWrap {
        width: 100%;
        height: 100%;
    }
</style>