<template>
    <div>
        <a-modal v-model:open="props.isShow" width="640px" :style="setTop" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div class="modal_title">
                    子表附件上传
                </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <a-upload v-model:file-list="fileList" :before-upload="beforeUpload" :maxCount="1">
                        <a-button>
                            <upload-outlined></upload-outlined>
                            上传文件
                        </a-button>
                    </a-upload>
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
    import { SearchOutlined, UploadOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const props = defineProps({
        isShow: Boolean,
    });

    const emit = defineEmits(['cancel', 'file']);
    const modelContentRef = ref(null);

    const data = reactive({
        top: "",
        fileList: []
    })
    const { top, fileList } = toRefs(data);

    onMounted(() => {
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126) / 2 + 'px';
    });

    const setTop = computed(() => ({
        top: data.top
    }));

    const beforeUpload = (e) => {
        data.fileListe = [...(data.fileList || []), file];
        return false;
    };

    const handleCancel = () => {
        emit("cancel", false);
    };
    const handleSubmit = () => {
        console.log("data.fiels", data.fileList);
        let file = data.fileList[0];
        emit("file", file);
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');

    .modalCenter {
        height: auto !important;
    }
</style>