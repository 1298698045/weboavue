<template>
    <div>
        <a-modal v-model:open="props.isShow" width="550px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    新建信息
                 </div>
            </template>
            <div class="modalContainer">
                <div class="modalCenter">
                    <a-form ref="formRef" :model="formState" :label-col="labelCol">
                        <a-form-item label="标题" name="name" :rules="[{ required: true, message: '请输入标题!' }]">
                            <a-input v-model:value="formState.name" placeholder="请输入标题" />
                        </a-form-item>
                        <a-form-item label="栏目" name="column" :rules="[{ required: true, message: '请选择栏目!' }]">
                            <a-tree-select
                                v-model:value="formState.column"
                                show-search
                                style="width: 100%"
                                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                                placeholder="请选择栏目"
                                allow-clear
                                tree-default-expand-all
                                :tree-data="treeData"
                                tree-node-filter-prop="name"
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
        objectTypeCode: String
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
        currentMenu: "角色"
    })
    const { listData, menus, currentMenu } = toRefs(data);
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
                apiName: props.objectTypeCode=='100201'?'Content':'Notice',
                objTypeCode: props.objectTypeCode,
                fields: {
                    ContentTypeCode: 1,
                    Title: formState.name,
                    FolderId: formState.column
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
                    name: "InformationEditor",
                    query: {
                        id: res.actions[0].returnValue.id,
                        objectTypeCode: props.objectTypeCode,
                        //FolderId: res.actions[0].returnValue&&res.actions[0].returnValue.fields&&res.actions[0].returnValue.fields.FolderId?res.actions[0].returnValue.fields.FolderId:''
                        FolderId: formState1.column
                    }
                })
            window.open(reUrl.href); 
          }
          
        });
    }).catch(error => {
        console.log('error', error);
    });
}
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');
    .ant-radio-wrapper{
        display: flex;
        align-items: center;
        margin-top: 10px;
    }
</style>