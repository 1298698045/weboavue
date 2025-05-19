<template>
    <div>
        <a-modal v-model:open="props.isShow" width="550px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    选择部门
                </div>
            </template>
            <div class="modalContainer">
                <div class="headerTab">
                    <a-tabs v-model:activeKey="currentTab">
                        <a-tab-pane key="1" tab="组织结构"></a-tab-pane>
                        <a-tab-pane key="2" tab="按列表"></a-tab-pane>
                    </a-tabs>
                    <div class="search">
                        <a-input placeholder="请输入关键字搜索" v-model:value="searchVal" @change="handleSearch"></a-input>
                    </div>
                </div>
                <div class="modalCenter">
                    <div class="tabContainerTree" v-if="currentTab==1">
                        <a-tree :tree-data="deptTreeList" :selectedKeys="selectedKeys" :fieldNames="fieldNames"
                            block-node @select="handleSelectTree">
                            <template #title="{ name, key }">
                                <span>{{name}}</span>
                            </template>
                        </a-tree>
                    </div>
                    <div class="tabContainerTree" v-if="currentTab==2">
                        <a-tree :tree-data="deptList" :fieldNames="fieldNames" :selectedKeys="selectedKeys" block-node
                            @select="handleSelectTree">
                            <template #title="{ name, key }">
                                <span>{{name}}</span>
                            </template>
                        </a-tree>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
                    <a-button @click="clearData">清除</a-button>
                    <a-button @click="handleCancel">取消</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import {
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits
    } from "vue";
    import { message } from 'ant-design-vue';
    import Toast from "@/utils/toast.js";
    import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons-vue";
    import { flatten } from "@/utils/common.js";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean
    })
    const emit = defineEmits(['cancel', 'select-val']);
    const handleCancel = () => {
        emit("cancel", false);
    }

    const data = reactive({
        currentTab: '1',
        deptTreeList: [],
        deptList: [],
        selectData: {},
        fieldNames: {
            key: "id",
            title: "name",
            children: "children"
        },
        searchVal: "",
        selectedKeys: []
    })
    const { currentTab, deptTreeList, deptList, selectData, fieldNames, searchVal, selectedKeys } = toRefs(data);
    const getTreeDept = () => {
        proxy.$get(Interface.deptTree, {
            search: data.searchVal
        }).then(res => {
            let listData = res.actions[0].returnValue;
            data.deptTreeList = listData;
            data.deptList = flatten(listData);
            console.log("data.deptList", data.deptList);
        })
    }
    getTreeDept();

    const handleSearch = (e) => {
        getTreeDept();
    }

    const formTreeData = (list) => {
        var result = [];
        if (!Array.isArray(list)) {
            return result;
        }
        var map = {};
        list.forEach(function (item) {
            map[item.id] = item;
        });
        list.forEach(function (item) {
            var parent = map[item.pid];
            if (parent) {
                parent.children = parent.children || [];
                parent.children.push(item);
            } else {
                result.push(item);
            }
        });
        return result;
    }

    const handleSelectTree = (selectedKeys, selectedNodes) => {
        console.log("e", selectedKeys, selectedNodes);
        data.selectedKeys = selectedKeys;
        data.selectData = {
            ID: selectedNodes.node.id,
            Name: selectedNodes.node.name
        }
    }
    const clearData = () => {
        data.selectData = {};
        data.selectedKeys = [];
    }
    const handleSubmit = () => {
        if (Object.keys(data.selectData).length) {
            emit("select-val", data.selectData);
        } else {
            Toast.error('请选择部门!');
        }
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');

    .headerTab {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #e2e3e5;
        padding: 0 10px;

        .search {
            width: 200px;
        }
    }

    :deep :where(.css-dev-only-do-not-override-kqecok).ant-tabs>.ant-tabs-nav,
    :where(.css-dev-only-do-not-override-kqecok).ant-tabs>div>.ant-tabs-nav {
        margin: 0 !important;
    }
</style>