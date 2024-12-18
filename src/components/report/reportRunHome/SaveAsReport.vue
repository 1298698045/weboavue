<template>
    <div>
        <a-modal v-model:open="props.isShow" width="70%" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div class="modal_title">
                    另存报表为
                 </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <a-form :model="formState" ref="formRef">
                        <a-form-item label="报表名称" name="Name" :rules="[{ required: true, message: '请输入报表名称!' }]">
                            <a-input v-model:value="formState.Name" />
                        </a-form-item>
                        <a-form-item label="报表唯一名称" name="UniqueName">
                            <a-input v-model:value="formState.UniqueName" />
                        </a-form-item>
                        <a-form-item label="报表描述" name="Description">
                            <a-textarea v-model:value="formState.Description"  :rows="4" allow-clear />
                        </a-form-item>
                        <a-form-item label="文件夹" name="FolderId">
                            <div class="flex">
                                <a-input v-model:value="formState.FolderId.Name" />
                                <a-button class="ml10" @click="handleOpenFolder">选择文件夹</a-button>
                            </div>
                        </a-form-item>
                    </a-form>
                    <SelectFolder :isShow="isSelectFolder" v-if="isSelectFolder" @cancel="isSelectFolder=false" @ok="selectOkFolder" />
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
        defineEmits, computed, toRaw } from "vue";
    import { SearchOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    import SelectFolder from "@/components/report/SelectFolder.vue";

    const labelCol = ref({ style: { width: '100px' } });

    const formRef = ref(null);

    const props = defineProps({
        isShow: Boolean,
        reportId: String
    })
    const emit = defineEmits(['cancel','load']);
    const modelContentRef = ref(null);
    
    const formState = reactive({
        Name: "",
        UniqueName: "",
        Description: "",
        FolderId: {
            Id: "",
            Name: ""
        }
    })
    
    const data = reactive({
        listData: [],
        top: "",
        isSelectFolder: false
    })

    const { listData, top, isSelectFolder } = toRefs(data);
    
    const handleSearch = (val) =>{

    }
    onMounted(()=>{
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126) / 2 + 'px';
    })

    const setTop = computed(() => ({
        top: data.top
    }));

    const getDetail = () => {
        let obj = {
            actions:[{
                id: "4270;a",
                descriptor: "aura://RecordUiController/ACTION$getRecordWithFields",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.reportId,
                    apiName: "Report"
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detail, d).then(res=>{
            let fields = res.actions[0].returnValue.fields;
            console.log("fields:", fields);
            formState.Name = fields.Name.displayValue;
            formState.UniqueName = fields.UniqueName.displayValue;
            formState.Description = fields.Description.displayValue;
            formState.FolderId = {
                Id: fields.FolderId.value,
                Name: fields.FolderId.displayValue
            };
        })
    }
    getDetail();

    const handleOpenFolder = () => {
        data.isSelectFolder = true;
    };

    const selectOkFolder = (params) => {
        // console.log("params", params);
        formState.FolderId = params;
        data.isSelectFolder = false;
    }
    const handleCancel = ()=> {
        emit("cancel", false);
    }
    const handleSubmit = ()=> {
        formRef.value.validate().then(() => {
            let obj = {
                actions:[{
                    id: "2919;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        recordInput:{
                            allowSaveOnDuplicate: false,
                            apiName: "Report",
                            objTypeCode: 9100,
                            fields: toRaw(formState)
                        },
                        recordId: props.reportId
                    }
                }]
            };
            let d = {
                message: JSON.stringify(obj)
            }
            proxy.$post(Interface.edit, d).then(res=>{
                formRef.value.resetFields();
                Toast("保存成功！");
                emit("ok", false);
                emit("cancel", false);
            })
        }).catch((err) => {
            console.log("error", err);
        });
    }
</script>
<style lang="less">
    @import url('@/style/modal.less');
    .modalCenter{
        height: auto !important;
    }
</style>