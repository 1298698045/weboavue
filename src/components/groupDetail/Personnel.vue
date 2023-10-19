<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    人员信息
                </div>
                <div class="panel-btn">
                </div>
            </div>
            <div class="panel-bd">
                <div class="peopleHeader">
                    <div class="left">
                        <a-input-search
                            v-model:value="searchVal"
                            placeholder="搜索动态"
                            style="width: 300px;"
                            @search="onSearch"
                        />
                    </div>
                    <div class="rightOption">
                        <a-button class="ml10" type="primary">添加成员</a-button>
                        <a-button class="ml10" type="primary">添加管理员</a-button>
                        <a-button class="ml10" type="primary">查询</a-button>
                        <a-button class="ml10" type="default">重置</a-button>
                        <a-button class="ml10" type="default">导出</a-button>

                    </div>
                </div>
                <a-table :columns="columns" :data-source="listData">
                 <template #bodyCell="{ column,index }">
                    <template v-if="column.key === 'Action'">
                      <a-button type="text" size="small">删除</a-button>
                    </template>
                    <template v-if="column.key === 'index'">
                        <div>
                            {{index+1}}
                        </div>
                    </template>
                    <template v-if="column.key === 'sort'">
                        <div class="sortIcon">
                            <ArrowUpOutlined />
                            <ArrowDownOutlined />
                        </div>
                    </template>
                  </template>
                </a-table>
            </div>
        </div>
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import { ref, toRefs, reactive, toRaw, onMounted, watch, getCurrentInstance } from "vue";
    import { SwapLeftOutlined, SwapRightOutlined, ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    var columns = [
        {
            title: "序号",
            dataIndex: "index",
            key:"index"
        },
        {
            title: "排序",
            dataIndex: "",
            key:"sort"
        },
        {
            title: "姓名",
            dataIndex: "FullName"
        },
        {
            title: "部门",
            dataIndex: "BusinessUnitIdName"
        },
        {
            title: "角色",
            dataIndex: "RoleCode"
        },
        {
            title: "电话",
            dataIndex: "MobilePhone"
        },
        {
            title: "邮箱",
            dataIndex: "EMailAddress"
        },
        {
            title: "职位",
            dataIndex: "JobTitle"
        },
        {
            title: "操作",
            key: 'Action',
            width: 150
        }
    ]
    const data = reactive({
        list: [],
        selectedRowKeys: [],
        loading: false,
        listData: [],
        searchVal: ""
    })
    const columnList = toRaw(columns);
    const { listData, searchVal } = toRefs(data);
    const getQuery = () => {
        proxy.$get(Interface.user.groupUser,{}).then(res=>{
            data.listData = res.rows;
        })
    }
    const onSearch = (e) => {
        getQuery();
    }
    getQuery();
</script>
<style lang="less">
    .relatedWrap{
        width: 100%;
    }
    .peopleHeader{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }
</style>