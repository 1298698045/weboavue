<template>
    <div>
        <a-modal v-model:open="props.isShow" width="550px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    重命名
                 </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter">
                    <a-form :model="formState" :label-col="labelCol">
                        <a-form-item label="列表名称" :rules="[{ required: true, message: '请输入列表名称!' }]">
                            <a-input v-model:value="formState.name" />
                        </a-form-item>
                        <a-form-item label="List API Name">
                            <a-input v-model:value="formState.apiname" />
                        </a-form-item>
                    </a-form>
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
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps,defineExpose,
        defineEmits } from "vue";
    import { SearchOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean
    })
    const emit = defineEmits(['cancel']);
    const handleCancel = ()=> {
        emit("cancel", false);
    }
    const handleSubmit = ()=> {

    }
    const data = reactive({
        listData: []
    })
    const { listData } = toRefs(data);
    const formState = reactive({
        name: "",
        apiname: "",
        Resources: "",
        role: ""
    })
    const handleSearch = (val) =>{
        console.log('val',val);
        getPeople(val)
    }
    const handleChange = (e) =>{
    }
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');
</style>