<template>
    <div class="addressBook">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base"></div>
                <span class="headerTitle">小组</span>
            </div>
            <div class="headerRight">
                <a-button class="ml10" type="primary">新建</a-button>
            </div>
        </div>
        <div class="todoListWrap">
            <div class="leftTree" v-if="isLeft">
                <div class="leftTreeWrap">
                    <a-tree :tree-data="treeData" block-node :selectedKeys="selectedKeys" @select="handleTreeSelect">
                        <template #title="{ text, key }">
                            <span>{{ text }}</span>
                        </template>
                    </a-tree>
                </div>
            </div>
            <div class="rightContainer">
                <div class="sanlan" :class="{'active':!isLeft}" @click="handleLeftShow">
                    <!-- <span class="icon">
                        <LeftOutlined v-if="isLeft" />
                        <RightOutlined v-else />
                    </span> -->
                </div>
                <div class="rightHeader">
                    <div class="lform">
                        <a-input-search
                            class="ml10"
                            v-model:value="searchVal"
                            placeholder="搜索此列表"
                            style="width: 200px;"
                            @search="onSearch"
                        />
                    </div>
                    <div class="rBtns">
                        <a-button class="ml10" type="primary">查询</a-button>
                        <a-button class="ml10">重置</a-button>
                        <a-button class="ml10" type="primary">新建</a-button>
                    </div>
                </div>
                <div class="tableWrap">
                    <a-table style="height: 100%;" :dataSource="dataSource" :columns="columns"  :pagination="{hideOnSinglePage:true}">
                        <template #bodyCell="{ column, text, record }">
                            <div v-if="column.key=='Name'">
                                <a href="javascript:;" @click="handleDetail(record)" style="color:var(--textColor);">{{ text }}</a>
                            </div>
                        </template>
                    </a-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, h
    } from "vue";
    import { useRouter, useRoute } from "vue-router";
    import { SearchOutlined, MoreOutlined, CopyOutlined, SortAscendingOutlined,LeftOutlined, RightOutlined, PlusOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    import { formTreeData } from "@/utils/common.js";
    import { message } from "ant-design-vue";
    const { proxy } = getCurrentInstance();
    const router = useRouter();
    const data = reactive({
        treeData: [{
            text: '我的小组',
            key: 'owner'
        },
        {
            text: '活动小组',
            key: 'join'
        },
        {
            text: '全部小组',
            key: 'public'
        }],
        pageNumber: 1,
        pageSize: 12,
        listData: [],
        searchVal: "",
        total: 0,
        isLeft: true,
        selectedKeys: ["owner"],
        dataSource: [],
        columns: [
            {
                title: '名称',
                dataIndex: 'Name',
                key: 'Name',
            },
            {
                title: '成员人数',
                dataIndex: 'Quantity',
                key: 'Quantity',
            },
            {
                title: '创建时间',
                dataIndex: 'CreatedOn',
                key: 'CreatedOn',
            },
            {
                title: '所有人',
                dataIndex: 'CreatedByName',
                key: 'CreatedByName',
            },
        ],
        groupList: []
    })
    const { treeData, pageNumber, pageSize, listData,
         searchVal, total, isLeft, selectedKeys, dataSource, columns, groupList } = toRefs(data);
    
    const handleTreeSelect = (e) => {
        data.selectedKeys = e;
    }
    const handleLeftShow = () => {
        data.isLeft = !data.isLeft;
    }
    const getQuery = () => {
        proxy.$get(Interface.user.groupList, {
            scope: data.selectedKeys[0],
            search: data.searchVal
        }).then(res => {
            data.dataSource = res.listData;
        })
    }
    getQuery();
    const onSearch = (e)=> {
        getQuery();
    }
    const handleMenuClick = (e) => {
        console.log("e",e);
    }
    const handleDetail = (row) => {
        let GroupId = row.GroupId;
        router.push({
            name: 'GroupDetail',
            query: {
                GroupId: GroupId
            }
        });
    }
</script>
<style lang="less" scoped>
    @import "@/style/addressBook.less";
    .rightContainer{
        .rightHeader{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 20px 0;
        }
        .tableWrap{
            height: calc(~"100% - 84px");
        }
    }
</style>