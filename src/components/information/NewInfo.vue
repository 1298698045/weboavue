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
    const formRef = ref();
    const labelCol = ref({ style: { width: '100px' } });
    const props = defineProps({
        isShow: Boolean,
        treeData: Array
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
            var obj = {
                params: {
                    recordRep: {
                        objTypeCode: 100201,
                        fields: {
                            ContentTypeCode: 1,
                            Title: formState.name,
                            FolderId: {
                                Id: formState.column
                            }
                        }
                    }
                }
            }
            let messages = JSON.stringify(obj);
            proxy.$get(Interface.saveRecord,{
                message: messages
            }).then(res=>{
                message.success("保存成功！");
                emit("cancel", false);
            })
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