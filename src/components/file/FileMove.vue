<template>
    <div>
        <a-modal v-model:open="props.isShow" width="480px" :style="{top:top+'px'}" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    {{ title }}
                </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px' }">
                    <div class="section">
                        <!-- <div class="sectionTitle">基本信息</div> -->
                        <div class="sectionRow">
                            <div class="sectionItem">
                                移动到：
                                <a-tree :tree-data="treeData" block-node @select="handleSelectTree" :fieldNames="fieldNames"
                                    :expanded-keys="expandedKeys" :selectedKeys="selectedKeys" @expand="onExpand" :auto-expand-parent="autoExpandParent">
                                    <template #title="{ name, key }">
                                        <span :key="key">{{ name }}</span>
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
                    <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
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
import e from "cors";
import { formTreeData } from "@/utils/common.js";
const { proxy } = getCurrentInstance();
console.log(document.documentElement.clientHeight);
const labelCol = ref({ style: { width: "100px" } });
const props = defineProps({
    isShow: Boolean,
    fileParams: Object,
    srchType: String
});
const emit = defineEmits(["cancel", "refresh"]);
const handleCancel = () => {
    emit("cancel", false);
};
const data = reactive({
    title: "移动",
    height: 350,
    treeData: [],
    ItemId: "",
    DestinationId: "",
    selectedKeys: [],
    fieldNames:{
        children:'children', title:'name', key:'id'
    },
    top:(document.documentElement.clientHeight - 480)/2
});
const {
    title,selectedKeys,fieldNames,top,
    height, treeData, ItemId, DestinationId
} = toRefs(data);
watch(() => props.fileParams, (newVal, oldVal) => {
}, { deep: true, immediate: true })
const expandedKeys = ref([]);
const autoExpandParent = ref(true);
const onExpand = (keys) => {
    expandedKeys.value = keys;
    autoExpandParent.value = false;
};
onMounted(() => {
    if (props.fileParams.FolderId) {
        data.DestinationId = props.fileParams.FolderId;
        expandedKeys.value = [props.fileParams.FolderId];
        data.selectedKeys = [props.fileParams.FolderId];
    }
    window.addEventListener("resize", (e) => {
        data.height =350;
        data.top = (document.documentElement.clientHeight - 480)/2
    });
});
const getTreeData = () => {
    proxy.$get(Interface.file.getMyFolderTree, {
    }).then(res => {
        // if (props.srchType == 'my') {
        //     data.treeData = [res.data[0]];
        // }
        // else if (props.srchType == 'share') {
        //     data.treeData = [res.data[1]];
        // }
        // else if (props.srchType == 'org') {
        //     data.treeData = [res.data[2]];
        // }
        // else {
        //     data.treeData = [res.data[0]];
        // }

        if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
            let response = res.actions[0].returnValue;
            data.treeData = response;
        }
    })
};
getTreeData();
const handleSelectTree = (e, node) => {
    //console.log("e", e, node);
    data.DestinationId = e[0];
    data.selectedKeys=e;
}

const handleSubmit = () => {
    // let obj = {
    //     ItemId: props.fileParams.id,
    //     DestinationId: data.DestinationId,
    //     isFolder: "",
    // };
    // var messages = JSON.stringify(obj);
    // proxy.$get(Interface.file.move, obj).then((res) => {
    //     message.warning("移动成功！");
    //     emit("refresh", false);
    //     emit("cancel", false);
    // });
    if (data.DestinationId) { } else {
        message.error("请选择移动到的目录");
        return false;
    }
    let url = Interface.edit;
    let d = {
        actions: [{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                recordInput: {
                    allowSaveOnDuplicate: false,
                    apiName: 'FileFolder',
                    objTypeCode: 100103,
                    fields: {
                        ParentId: data.DestinationId
                    }
                }
            }
        }]
    };
    if (props.fileParams.type == 'file') {
        d = {
            actions: [{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordInput: {
                        allowSaveOnDuplicate: false,
                        apiName: 'File',
                        objTypeCode: 100100,
                        fields: {
                            FolderId: data.DestinationId
                        }
                    }
                }
            }]
        };
    }
    if (props.fileParams.id) {
        d.actions[0].params.recordId = props.fileParams.id;
    }
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(url, obj).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
            message.success("移动成功！");
            emit("refresh", false);
            emit("cancel", false);
        }
        else {
            message.error("移动失败！");
        }
    });
};
</script>
<style lang="less">
@import url("@/style/modal.less");

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