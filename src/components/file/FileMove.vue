<template>
    <div>
        <a-modal v-model:open="props.isShow" width="850px" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    {{ title }}
                </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px' }">
                    <div class="section">
                        <div class="sectionTitle">基本信息</div>
                        <div class="sectionRow">
                            <div class="sectionItem">
                                移动到
                                <a-tree :tree-data="treeData" block-node @select="handleSelectTree">
                                    <template #title="{ label, key }">
                                        {{label}}
                                    </template>
                                </a-tree>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">保存</a-button>
                </div>
            </template>
        </a-modal>
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
        toRaw,
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    console.log(document.documentElement.clientHeight);
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        fileParams: Object
    });
    const emit = defineEmits(["cancel"]);
    const handleCancel = () => {
        emit("cancel", false);
    };
    const data = reactive({
        title: "移动",
        height: document.documentElement.clientHeight - 300,
        treeData: [],
        ItemId: "",
        DestinationId: ""
    });
    const {
        title,
        height, treeData, ItemId, DestinationId
    } = toRefs(data);
    watch(() => props.fileParams, (newVal, oldVal) => {
    }, { deep: true, immediate: true })

    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 300;
        });
    });
    const getTreeData = () => {
        proxy.$get(Interface.file.tree,{
            srchType: "foldertree"
        }).then(res=>{
            data.treeData = res.data;
        })
    };
    getTreeData();
    const handleSelectTree = (e,node) => {
        console.log("e",e,node);
        data.DestinationId = node.node.value;
    }

    const handleSubmit = () => {
        let obj = {
            ItemId: props.fileParams.id,
            DestinationId: data.DestinationId,
            isFolder: "",
        };
        var messages = JSON.stringify(obj);
        proxy.$get(Interface.file.move, obj).then((res) => {
            message.warning("保存成功！");
            emit("cancel", false);
        });
    };
</script>
<style lang="less">
    @import url("@/style/modal.less");

    .ant-modal-content .modalContainer .modalCenter {
        /* height: 500px !important; */
    }

    .section {
        .sectionTitle {
            height: 30px;
            background-color: rgb(243, 242, 242);
            line-height: 30px;
            border-radius: 4px;
            padding-left: 15px;
            margin-bottom: 12px;
            /* margin: 2rem 2rem 0.5rem 2rem; */
        }

        .sectionRow {
            padding: 0 10px;
            box-sizing: border-box;
            display: flex;

            .sectionItem {
                flex: 1;
                margin-right: 20px;

                .ant-row {
                    display: block !important;
                }
            }

            .sectionItem:last-child {
                margin-right: 0;
            }
        }
    }

    :where(.css-dev-only-do-not-override-kqecok).ant-picker {
        width: 100%;
    }

    .ant-form-item {
        position: relative;
    }

    .selectIcon {
        position: absolute;
        right: 10px;
        top: 5px;
    }
</style>