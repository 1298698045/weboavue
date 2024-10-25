<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :maskClosable="false" @cancel="handleCancel"
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
                        <a-input placeholder="请输入关键字搜索"></a-input>
                    </div>
                </div>
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <div class="tabContainerTree" v-if="currentTab==1">
                        <a-tree :tree-data="deptTreeList" block-node @select="handleSelectTree">
                            <template #title="{ text, key }">
                                <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ text }}</span>
                                <template v-else>{{ text }}</template>
                            </template>
                        </a-tree>
                    </div>
                    <div class="tabContainerTree" v-if="currentTab==2">
                        <a-tree :tree-data="deptList" block-node @select="handleSelectTree">
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
    import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons-vue";
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
        height: document.documentElement.clientHeight - 380,
    })
    const { currentTab, deptTreeList, deptList, selectData,height } = toRefs(data);
    const getTreeDept = () => {
        proxy.$get(Interface.treeList, {
            entity: "organizationtree",
            search: ""
        }).then(res => {
            console.log("res", res);
            data.deptList = res.rows;
            let rows = res.rows;
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
    }
    const clearData = () => {
        data.selectData = [];
    }
    const handleSubmit = () => {
        if(Object.keys(data.selectData).length){
            emit("select-val", data.selectData);
        }else {
            message.error('请选择部门!');
        }
    }
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 380;
        });
    });
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