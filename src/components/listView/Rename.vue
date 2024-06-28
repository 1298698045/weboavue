<template>
    <div>
        <a-modal v-model:open="props.isShow" width="640px" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div class="modal_title">
                    重命名列表视图
                 </div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div class="modalCenter">
                    <a-form :model="formState">
                        <a-form-item label="列表名称" :rules="[{ required: true, message: '请输入列表名称!' }]">
                            <a-input v-model:value="formState.name" />
                        </a-form-item>
                        <a-form-item label="列表 API 名称">
                            <a-input v-model:value="formState.apiname" disabled />
                        </a-form-item>
                        <!-- <a-form-item label="谁可以查看此列表视图？">
                            <a-input class="readonly" value="只有我可以查看此列表视图" readonly  />
                        </a-form-item> -->
                    </a-form>
                    <!-- <div class="slds-p-top_medium">
                        <label class="slds-form-element__label slds-no-flex" for="input-670">谁可以查看此列表视图？</label>

                    </div> -->
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
        defineEmits, computed } from "vue";
    import { SearchOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean,
        sObjectName:String,
        recordId:String
    })
    const emit = defineEmits(['cancel','load']);
    const modelContentRef = ref(null);
    const getData = ()=> {
        proxy.$get(Interface.listView.getListView, {
            id: props.recordId
            }).then(res=>{
                if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
                    let item = res.actions[0].returnValue;
                    formState.apiname=item.apiName||'';
                    formState.name=item.label||'';
                    let visibility=item.visibility||'GLOBAL';
                    if(visibility=='PRIVATE'){
                        formState.resource='1';
                    }else if(visibility=='GLOBAL'){
                        formState.resource='2';
                    }else if(visibility=='SHARED'){
                        formState.resource='3';
                    }
                }
            })
    }
    const handleCancel = ()=> {
        emit("cancel", false);
    }
    const handleSubmit = ()=> {
        let visibility='GLOBAL';
        if(formState.resource=='1'){
            visibility='PRIVATE';
        }else if(formState.resource=='2'){
            visibility='GLOBAL';
        }else if(formState.resource=='3'){
            visibility='SHARED';
        }
        let url = Interface.listView.updateListView;
            let d = {
                actions:[{
                    id: "4854;a",
                    descriptor: "serviceComponent://ui.force.components.controllers.lists.listViewManager.ListViewManagerController/ACTION$updateListView",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        entityKeyPrefixOrApiName: props.sObjectName,
                        listViewIdOrName:props.recordId,
                        developerName: formState.apiname||'',
                        label: formState.name||'',
                        visibility: visibility,
                        displayColumnApiNames: null,
                        listViewFieldCriteria: null,
                        listViewScope: null,
                        shareIds: null
                        // shareIds: [
                        //     {   
                        //         "objectTypeCode":8,
                        //         "entityName":"SystemUser",
                        //         "id":"00G90000002JvmLEAS"
                        //     }
                        // ]
                    }
                }]
            };
            let obj = {
                message: JSON.stringify(d)
            }
            proxy.$post(url, obj).then(res => {
                if(res&&res.actions&&res.actions[0]&&res.actions[0].state=='SUCCESS'){
                    message.success("重命名成功");
                    emit("load", false);
                }
                else{
                    if(res&&res.actions&&res.actions[0]&&res.actions[0].errorMessage){
                        message.success(res.actions[0].errorMessage);
                    }
                    else{
                        message.success("重命名失败");
                    }
                }
                setTimeout(function(){
                    emit("cancel", false);
                },1000)
            })
    }
    const data = reactive({
        listData: [],
        top: ""
    })
    const { listData, top } = toRefs(data);
    const formState = reactive({
        name: "",
        apiname: "",
        resource: "",
        role: ""
    })
    const handleSearch = (val) =>{
        console.log('val',val);
        getPeople(val)
    }
    const handleChange = (e) =>{
    }
    onMounted(()=>{
        let h = modelContentRef.value.clientHeight;
        data.top = (h + 126) / 2 + 'px';
        getData();
    })
    const setTop = computed(() => ({
        top: data.top
    }));
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');
    .modalCenter{
        height: auto !important;
    }
</style>