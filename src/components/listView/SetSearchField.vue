<template>
    <div>
        <a-modal v-model:open="props.isShow" width="800px" :style="setTop" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div>
                    设置高级搜索字段
                </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter" style="height: auto;">
                    <div class="selectBox">
                        <a-transfer v-model:target-keys="targetKeys" v-model:selected-keys="selectedKeys"
                            :data-source="listData" :list-style="{
                                width: '260px',
                                height: '280px',
                            }" :locale="{itemUnit:'',itemsUnit:'',notFoundContent:'列表为空',searchPlaceholder: '请输入搜索内容'}"
                            show-search :titles="['可用项目', '所选项目']" :render="item => item.title" :disabled="disabled"
                            @change="handleChange" @selectChange="handleSelectChange" @scroll="handleScroll" />
                        <div class="sortBox">
                            <a-button size="small" @click="selectedKeys.length && handleMoveUp()"
                                :type="selectedKeys.length > 0 ? 'primary' : 'default' ">
                                <UpOutlined />
                            </a-button>
                            <a-button size="small" @click="selectedKeys.length && handleMoveDown()"
                                :type="selectedKeys.length > 0 ? 'primary' : 'default' ">
                                <DownOutlined />
                            </a-button>
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
        ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
        defineEmits, computed
    } from "vue";
    import { SearchOutlined, DeleteOutlined, UpOutlined, DownOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    // import Toast from "@/utils/toast.js";
    import Interface from "@/utils/Interface.js";

    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean,
        sObjectName: String,
        searchLayoutId: String
    })
    const emit = defineEmits(['cancel', 'success']);
    const modelContentRef = ref(null);

    const disabled = ref(false);
    const data = reactive({
        listData: [],
        targetKeys: [],
        selectedKeys: [],
        top: ""
    })
    const { listData, targetKeys, selectedKeys, top } = toRefs(data);

    onMounted(() => {
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126 - 186) / 2 + 'px';
    })

    const setTop = computed(() => ({
        top: data.top
    }));

    const handleChange = (nextTargetKeys, direction, moveKeys) => {
        if (direction == 'right') {
            const currentKeys = nextTargetKeys.filter(key => !moveKeys.includes(key));
            currentKeys.push(...moveKeys);
            data.targetKeys = currentKeys;
        }
    };

    const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    };
    const handleScroll = (direction, e) => {
    };

    const handleMoveUp = () => {
        const firstSelectedIndex = data.targetKeys.findIndex(item => data.selectedKeys.includes(item));
        if (firstSelectedIndex === 0) return;
        const newTargetKeys = [...data.targetKeys];
        for (let i = 1; i < newTargetKeys.length; i++) {
            if (data.selectedKeys.includes(newTargetKeys[i]) &&
                !data.selectedKeys.includes(newTargetKeys[i - 1])) {
                [newTargetKeys[i - 1], newTargetKeys[i]] = [newTargetKeys[i], newTargetKeys[i - 1]];
            }
        }
        data.targetKeys = newTargetKeys;
    };

    const handleMoveDown = () => {
        const lastSelectedIndex = data.targetKeys.reduce((acc, item, index) =>
            data.selectedKeys.includes(item) ? index : acc, -1);
        if (lastSelectedIndex === data.targetKeys.length - 1) return;

        const newTargetKeys = [...data.targetKeys];
        for (let i = newTargetKeys.length - 2; i >= 0; i--) {
            if (data.selectedKeys.includes(newTargetKeys[i]) &&
                !data.selectedKeys.includes(newTargetKeys[i + 1])) {
                [newTargetKeys[i], newTargetKeys[i + 1]] = [newTargetKeys[i + 1], newTargetKeys[i]];
            }
        }
        data.targetKeys = newTargetKeys;
    };

    const getDetail = () => {
        let obj = {
            actions: [{
                id: "4270;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.searchLayoutId,
                    apiName: "EntitySearchLayout",
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detail, d).then(res => {
            let { DisplayColumnNames } = res.actions[0].returnValue.fields;
            let displayColumnNamesArr = DisplayColumnNames.value.split(',');
            data.targetKeys = displayColumnNamesArr;
        })
    };

    const getQuery = () => {
        let d = {
            entityApiName: props.sObjectName
        }
        proxy.$get(Interface.entityFilter, d).then(res => {
            let attributes = res.attributes.map(item => {
                item.title = item.label + item.name;
                item.key = item.name;
                return item;
            });
            data.listData = attributes;
        })
    }
    getQuery();
    getDetail();

    const handleCancel = () => {
        emit("cancel", false);
    };

    const handleSubmit = () => {
        console.log("targetKeys", data.targetKeys);
        const filterTemp = data.listData.filter(item=>{
            return data.targetKeys.find(v=>v == item.key);
        });
        const DisplayColumnTitles = filterTemp.map(item=>item.label);
        const DisplayColumnNames = filterTemp.map(item=>item.key);
        let obj = {
            actions: [{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.searchLayoutId,
                    recordInput: {
                        allowSaveOnDuplicate: false,
                        apiName: "EntitySearchLayout",
                        objTypeCode: 100005,
                        fields: {
                            DisplayColumnTitles: DisplayColumnTitles.join(','),
                            DisplayColumnNames: DisplayColumnNames.join(','),
                        }
                    }
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.edit, d).then(res=>{
            if(res && res.actions && res.actions[0] && res.actions[0].state == "SUCCESS"){
                message.success("保存成功！");
                emit('cancel', false);
                emit("success", true);
            }else {
                message.error("保存失败！");
            }
        })
    }

</script>
<style lang="less">
    @import url('@/style/modal.less');

    :where(.css-dev-only-do-not-override-kqecok).ant-transfer {
        justify-content: center;
    }

    .filterSearch {
        padding-top: 1px;
        margin: 10px auto;

        .row {
            display: flex;
            margin-top: 10px;
            align-items: center;
            justify-content: center;

            .fieldCol {
                margin-left: 20px;

                .label {
                    padding: 0 10px 0 5px;
                }

                .iconDel {
                    font-size: 16px;
                    cursor: pointer;
                }

                .iconDel:hover {
                    color: var(--hoverColor);
                }
            }

            .fieldCol:first-child {
                margin-left: 0;
            }
        }

        .ant-btn {
            margin-top: 20px;
            margin-left: 60px;
        }
    }

    .selectBox {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .sortBox {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        gap: 5px;
    }

    :where(.css-dev-only-do-not-override-kqecok).ant-btn.ant-btn-sm {
        font-size: 12px !important;
        padding: 0px 5px !important;
    }
</style>