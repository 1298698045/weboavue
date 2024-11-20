<template>
    <div>
        <a-modal v-model:open="props.isShow" width="550px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    {{ModalTitle}}
                 </div>
            </template>
            <div class="modalContainer NewInfoWrap">
                <div class="modalCenter">
                    <a-form ref="formRef" :model="formState" :label-col="labelCol">
                        <a-form-item label="标题" name="name" :rules="[{ required: true, message: '请输入标题!' }]">
                            <a-input v-model:value="formState.name" placeholder="请输入标题" />
                        </a-form-item>
                        <a-form-item label="目录" name="column" :rules="[{ required: true, message: '请选择目录!' }]">
                            <a-tree-select
                                v-model:value="formState.column"
                                show-search
                                style="width: 100%"
                                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                placeholder="请选择目录"
                                allow-clear
                                tree-default-expand-all
                                :tree-data="treeData"
                                tree-node-filter-prop="name"
                                :disabled="formState.column=='00000000-0000-0000-0000-000000002000'||props.objectTypeCode=='100311'||props.objectTypeCode=='100201'"
                            >
                                <template #title="{ value: val, name }">
                                    <span>{{ name }}</span>
                                </template>
                            </a-tree-select>
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
        defineEmits, toRaw } from "vue";
    import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons-vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const formRef = ref();
    const labelCol = ref({ style: { width: '60px' } });
    const props = defineProps({
        isShow: Boolean,
        treeData: Array,
        objectTypeCode: String,
        RegardingObjectId:String,
        RegardingObjectTypeCode:String,
        FolderId:String,
        RegardingObjectName:String
    })
    import { message } from "ant-design-vue";

    const emit = defineEmits(['cancel']);
    const handleCancel = ()=> {
        emit("cancel", false);
    }
    const data = reactive({
        listData: [],
        menus: [
            {
                key: 1,
                name: "角色"
            },
            {
                key: 2,
                name: "小组"
            },
            {
                key: 3,
                name: "部门"
            },
            {
                key: 4,
                name: "用户"
            }
        ],
        currentMenu: "角色",
        ModalTitle:'新建信息',
        sObjectName:'Content',
        userId:'',
        userName:''
    })
    const { listData, menus, currentMenu,ModalTitle,sObjectName,userId,userName } = toRefs(data);
    const formState = reactive({
        name: "",
        column: ""
    })
    const handleMenu = (e)=> {
        console.log("e",e);
        data.currentMenu = data.menus.find(item=>item.key==e.key).name;
    }
    const handleSearch = (val) =>{
        console.log('val',val);
        getPeople(val)
    }
    const handleChange = (e) =>{
    }
    const getPeople = (val="")=>{
        proxy.$get(Interface.uilook,{
            Lktp: 30020,
            lksrch: val
        }).then(res=>{
            data.listData = res.listData;
        })
    }
    const handleSubmit = ()=> {
        formRef.value.validate().then(() => {
            console.log('values', formState, toRaw(formState));
            let url=Interface.create;
        let d = {
        actions:[{
            id: "2919;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
              recordInput: {
                allowSaveOnDuplicate: false,
                apiName: data.sObjectName,
                objTypeCode: props.objectTypeCode,
                fields: {
                    ContentTypeCode: 1,
                    Title: formState.name,
                    FolderId: formState.column,
                    CreatedBy:data.userId
                }
              }              
            }
        }]
    };
    if(props.id){
        d.actions[0].params.recordInput.Id=props.id;
        d.actions[0].params.recordId=props.id;
        url='Interface.edit';
    }
    if(props.RegardingObjectId){
        d.actions[0].params.recordInput.fields.RegardingObjectId=props.RegardingObjectId;
        d.actions[0].params.recordInput.fields.RegardingObjectTypeCode=props.RegardingObjectTypeCode;
    }
    if(props.objectTypeCode=='100311'){
        d.actions[0].params.recordInput.fields={
            SubjectId:formState.column,
            Name: formState.name,
            CreatedBy:data.userId
        };
    }
    let obj = {
        message: JSON.stringify(d)
    }
    var formState1=formState;
        proxy.$post(url,obj).then(res=>{
          formRef.value.resetFields();
          message.success("保存成功！");
          emit("cancel", false);
          if(res&&res.actions&&res.actions[0]&&res.actions[0].returnValue){
                let reUrl = router.resolve({
                    name: "visualEditor",
                    query: {
                        id: res.actions[0].returnValue.id,
                        objectTypeCode: props.objectTypeCode,
                        //FolderId: res.actions[0].returnValue&&res.actions[0].returnValue.fields&&res.actions[0].returnValue.fields.FolderId?res.actions[0].returnValue.fields.FolderId:''
                        FolderId: formState1.column,
                        RegardingObjectId:props.RegardingObjectId||'',
                        RegardingObjectTypeCode:props.RegardingObjectTypeCode||''
                    }
                })
                if(props.objectTypeCode=='100311'){
                    reUrl = router.resolve({
                        name: "visualEditor",
                        query: {
                            id: res.actions[0].returnValue.ContentId,
                            objectTypeCode: '100201',
                            FolderId: formState1.column,
                            RegardingObjectId:props.RegardingObjectId||'',
                            RegardingObjectTypeCode:props.RegardingObjectTypeCode||''
                        }
                    })
                }
            window.open(reUrl.href); 
          }
          
        });
    }).catch(error => {
        console.log('error', error);
    });
}
if(props.RegardingObjectTypeCode=='5000'){
    data.ModalTitle='新建会议纪要'
    formState.column=props.FolderId;
    formState.name=props.RegardingObjectName;
    data.sObjectName='Content';
}
else if(props.objectTypeCode=='100311'){
    data.ModalTitle='新建知识文章';
    formState.column=props.FolderId;
    data.sObjectName='KbSubjectContent';
}
else if(props.objectTypeCode=='100201'){
    data.ModalTitle='新建文档';
    formState.column=props.FolderId;
    data.sObjectName='Content';
}
else if(props.objectTypeCode=='100202'){
    data.ModalTitle='新建通知';
    formState.column=props.FolderId;
    data.sObjectName='Notice';
}
let userInfo=window.localStorage.getItem('userInfo');
if(userInfo){
    userInfo=JSON.parse(userInfo);
    data.userId=userInfo.userId;
    data.userName=userInfo.fullName;
    if(data.userId=='jackliu'){
        data.userId='2EC00CF2-A484-4136-8FEF-E2A2719C5ED6'
    }
}
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');
    .ant-radio-wrapper{
        display: flex;
        align-items: center;
        margin-top: 10px;
    }
    .NewInfoWrap{
        :deep .ant-form-item-label{
            text-align: left;
        }
        .modalCenter{
            padding: 10px 45px !important;
        }
        .ant-form-item{
            margin-bottom: 30px !important;
            margin-top: 10px !important;
        }
    }
</style>