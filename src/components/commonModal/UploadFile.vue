<template>
    <div>
        <a-modal v-model:open="props.isShow" width="60%" :maskClosable="false" @cancel="handleCancel">
            <template #title>
                <div>
                    {{ title }}
                </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter" :style="{ height: height + 'px!important' }">
                    <FilesList :parentId="id" :entityName="entityName"></FilesList>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <!-- <a-button type="primary" @click.prevent="handleSubmit">保存</a-button> -->
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
        inject
    } from "vue";
    import {
        SearchOutlined,
        DownOutlined,
        UserOutlined,
    } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import FilesList from "@/components/detail/FilesList.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
        id: String,
        title: String,
        entityName: String
    });
    const formRef = ref();
    const emit = defineEmits(["cancel", "callback"]);
    
    const data = reactive({
        height: document.documentElement.clientHeight - 300
    });
    const {
        height
    } = toRefs(data);
    const formState = reactive({
        Name: '', // 名称
    });
    formState.Name = props.name;
    onMounted(() => {
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 300;
        });
    });
    const handleCancel = () => {
        emit("cancel", false);
    };
</script>
<style lang="less">
    @import url("@/style/modal.less");

    .ant-modal-content .modalContainer .modalCenter {
        /* height: 500px !important; */
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