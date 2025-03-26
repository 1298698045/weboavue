<template>
    <div>
        <a-modal v-model:open="props.isShow" width="60%" :style="setTop" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div class="modal_title">
                    批量导入子表
                </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <a-form :model="formState" ref="formRef" :label-col="labelCol" labelAlign="left">
                        <div class="section">
                            <div class="sectionTitle">基本信息</div>
                            <div class="sectionRow">
                                <a-form-item label="导入文件:">
                                    <a-upload v-model:fileList="formState.upload"
                                        name="logo"
                                        action="/upload.do"
                                        list-type="picture"
                                    >
                                    <a-button>导入文件</a-button>
                                    <span class="desc" style="padding-left: 20px;">未选择任何文件</span>
                                  </a-upload>
                                </a-form-item>
                            </div>
                            <div class="sectionRow">
                                <a-form-item label="模板文件:">
                                    <a-button type="link">下载模板</a-button>请下载模版文件，填入数据后导入!
                                </a-form-item>
                            </div>
                            <div class="sectionTitle">说明</div>
                            <div class="sectionRow">
                                如果导入数据过多导入可能需要较长时间，请不要"刷新'或关闭窗口!
                            </div>
                        </div>
                    </a-form>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button type="primary" @click.prevent="handleSubmit">导入</a-button>
                    <a-button @click="handleCancel">关闭</a-button>
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
    import { SearchOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const labelCol = ref({ style: { width: '200px' } });
    const props = defineProps({
        isShow: Boolean,
        sObjectName: String,
        recordId: String
    })
    const emit = defineEmits(['cancel', 'load']);
    const modelContentRef = ref(null);
    const formState = reactive({
        upload: []
    })
    const data = reactive({
        top: ""
    })
    const { top } = toRefs(data);

    onMounted(() => {
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126) / 2 + 'px';
    })
    const setTop = computed(() => ({
        top: data.top
    }));
    const handleCancel = () => {
        emit("cancel", false);
    }
    const handleSubmit = () => {
        emit("cancel", false);
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');

    .modalCenter {
        height: auto !important;
    }
</style>