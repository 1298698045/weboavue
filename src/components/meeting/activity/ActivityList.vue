<template>
    <div class="wrapper">
        <div class="headerTab">
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="我创建的"></a-tab-pane>
                <a-tab-pane key="2" tab="我参与的"></a-tab-pane>
                <a-tab-pane key="3" tab="全部"></a-tab-pane>
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
        toRaw
    } from "vue";
    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    import ListFormSearch from "@/components/ListFormSearch.vue";
    const { proxy } = getCurrentInstance();
    const data = reactive({
        activeKey: "1",
        actionList: [],
    });
    const searchRef = ref();
    onMounted(() => {
        let height = searchRef.value.clientHeight;
    })
    const { activeKey, isNewMeeting } = toRefs(data);
    const columns = toRaw([
        {
            field: 'Action',
            title: '操作',
            formatter: function formatter(value, row, index) {
                var actionHTML = '<a style="color:blue;" href="/apps/meetings/campaignDetail.aspx?objectTypeCode=4400&id=' + row.CampaignId + '&retURL=%2f701%2fo" target="_blank">查看</a>';
                actionHTML += '&nbsp;|&nbsp;<a style="color: blue;" href="/campaign/preCampaignAct.aspx?objectTypeCode=4400&id=' + row.CampaignId + '&retURL=%2f701%2fo" target="_blank">预览</a>';
                actionHTML += "&nbsp;|&nbsp;<a style=\"color: blue; \" href=\"javascript:edit('" + row.CampaignId + "')\">编辑</a>";
                actionHTML += "&nbsp;|&nbsp;<a style=\"color: blue; \" href=\"javascript:deleteRow('" + row.CampaignId + "')\">删除</a>";
                return actionHTML;
            }
        },
        {
            field: 'Name',
            title: '标题',
            sortable: true
        },
        {
            field: 'StateCode',
            title: '状态',
            sortable: true,
            formatter: function formatter(value, row, index) {
                if (value == '0') {
                    return '草稿';
                }
                else {
                    return '已发布';
                }
            }
        },
        {
            field: 'NumOfPeople',
            title: '报名人数',
            sortable: true
        },
        {
            field: 'ActualStart',
            title: '开始时间',
            sortable: true
        },
        {
            field: 'ActualEnd',
            title: '结束时间',
            sortable: true
        },
        {
            field: 'CreatedByName',
            title: '创建人',
            sortable: true
        },
        {
            field: 'CreatedOn',
            title: '创建时间',
            sortable: true
        }
    ])
    const handleSearch = (params) => {
        var filterQuery = "";
        for (var key in params) {
            filterQuery += "\n" + key + "\teq\t" + params[key];
        }
        console.log(filterQuery, "filterQuery");
        data.filterQuery = filterQuery;
    };
    const loadGrid = () => {
        console.log("columns",columns);
        if ($.fn.pagination.defaults != undefined) {
            //分页工具栏处理
            $.fn.pagination.defaults.beforePageText = "";
            $.fn.pagination.defaults.afterPageText = "/{pages}";
            $.fn.pagination.defaults.displayMsg = "从{from} 到 {to} 总计 {total} 条";
        }
        $("#datagrid").datagrid({
            url: Interface.meetingActivity.list,
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

    onMounted(()=>{
        loadGrid();
    })
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

        .center {
            height: calc(~"100% - 44px");

            .gridWrap {
                height: calc(~"100% - 62px");
            }
        }
    }
</style>