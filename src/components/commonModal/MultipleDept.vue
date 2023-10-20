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
                    <div class="search">
                        <a-input placeholder="请输入关键字搜索"></a-input>
                    </div>
                </div>
                <div class="modalCenter">
                    <div class="tabContainerTree">
                        <a-tree :tree-data="deptTreeList" checkable block-node
                        v-model:expandedKeys="expandedKeys"
                        v-model:selectedKeys="selectedKeys"
                        v-model:checkedKeys="checkedKeys">
                            <template #title="{ text, key }">
                                <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ text }}</span>
                                <template v-else>{{ text }}</template>
                            </template>
                        </a-tree>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
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
    import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons-vue";
    import { message } from 'ant-design-vue';
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
        deptTreeList: [],
        deptList: [],
        selectData: [],
        selectedKeys: [],
        checkedKeys: [],
        expandedKeys: []
    })
    const { currentTab, deptTreeList, deptList, selectData, selectedKeys, checkedKeys, expandedKeys } = toRefs(data);
    const getTreeDept = () => {
        proxy.$get(Interface.treeList, {
            entity: "organizationtree",
            search: ""
        }).then(res => {
            console.log("res", res);
            data.deptList = res.rows;
            let rows = res.rows;
            rows.map(item=>{
                item.key = item.id;
                return item;
            })
            data.deptTreeList = formTreeData(rows);
            console.log("deptTreeList", data.deptTreeList)
        })
    }
    getTreeDept();

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

    const handleSelectTree = (selectedKeys,selectedNodes) => {
        console.log("e",selectedKeys,selectedNodes);
        data.selectData = {
            ID: selectedNodes.node.id,
            Name: selectedNodes.node.text
        }
        console.log('data.selectData',data.selectData);
    }
    const handleSubmit = () => {
        console.log("选中的数据",data.checkedKeys);
        var temp = data.deptList.filter(item=>{
            return data.checkedKeys.find(row=>{
                return row == item.id;
            })
        })
        if(data.checkedKeys.length){
            emit("select-val", temp);
        }else {
            message.error('请选择部门!');
        }
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');

    .headerTab {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-bottom: 1px solid #e2e3e5;
        padding: 0 10px 10px;
        

        .search {
            width: 200px;
        }
    }

    :deep :where(.css-dev-only-do-not-override-kqecok).ant-tabs>.ant-tabs-nav,
    :where(.css-dev-only-do-not-override-kqecok).ant-tabs>div>.ant-tabs-nav {
        margin: 0 !important;
    }
    :deep .ant-tree-title{
        line-height: 34px !important;
    }
</style>