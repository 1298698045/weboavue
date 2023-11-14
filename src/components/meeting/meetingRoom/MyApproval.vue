<template>
    <div class="wrapper">
        <div class="headerTab">
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="待审批"></a-tab-pane>
                <a-tab-pane key="2" tab="已通过"></a-tab-pane>
                <a-tab-pane key="3" tab="已拒绝"></a-tab-pane>
            </a-tabs>
            <div class="rightOption">
                <!-- <a-button type="primary" @click="handleAddMeeting">新建会议</a-button> -->
            </div>
        </div>
        <div class="center">
            <div class="search-common" ref="searchRef">
                <list-form-search ref="searchRef" @search="handleSearch"></list-form-search>
            </div>
            <div class="gridWrap">
                <div id="datagrid"></div>
            </div>
        </div>
        <NewMeeting :isShow="isNewMeeting" @cancel="cancelNewMeeting" @selectVal="handleNewMeetingVal" />
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
    import ListFormSearch from "@/components/ListFormSearch.vue";
    import NewMeeting from "@/components/meeting/meetingCalendar/NewMeeting.vue";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        activeKey: "1",
        columns: [],
        actionList: [],
        isNewMeeting: false
    });
    const searchRef = ref();
    onMounted(()=>{
        let height = searchRef.value.clientHeight;
    })
    const { activeKey, columns, isNewMeeting } = toRefs(data);
    const handleSearch = (params) => {
        var filterQuery = "";
        for (var key in params) {
            filterQuery += "\n" + key + "\teq\t" + params[key];
        }
        console.log(filterQuery, "filterQuery");
        data.filterQuery = filterQuery;
        loadGrid(data.columns);
    };
    const getConfig = () => {
        function formatOper(val, row, index, entityType, listViewActions) {
            var rowId = row["LIST_RECORD_ID"];
            var action = "";
            for (var i = 0; i < listViewActions.length; i++) {
                var item = listViewActions[i];
                action +=
                    '<a style="color:#015ba7;font-size:13px;" href="javascript:;" onclick="' +
                    [item.devNameOrId] +
                    "('" +
                    rowId +
                    "','" +
                    entityType +
                    "')\">" +
                    item.title +
                    "</a>&nbsp;&nbsp;";
            }
            return action;
        }
        proxy.$get(Interface.listView.config, {}).then((res) => {
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
        proxy
            .$get(Interface.listView.handleActions, {
                objectTypeCode: 30053,
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
    // 关闭新建
    const cancelNewMeeting = (e) => {
        data.isNewMeeting = e;
    }
    const handleNewMeetingVal = (e) => {
        data.isNewMeeting = false;
    }
    // 新建会议
    const handleAddMeeting = () => {
        data.isNewMeeting =  true;
    }
</script>
<style lang="less" scoped>
    .wrapper {
        width: 100%;
        height: 100%;
        .headerTab {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e2e3e5;
            padding: 0 10px;
        }
        .center{
            height: calc(~"100% - 44px");
            .gridWrap{
                height: calc(~"100% - 62px");
            }
        }
    }
</style>