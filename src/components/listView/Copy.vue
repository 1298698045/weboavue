<template>
    <div>
        <a-modal v-model:open="props.isShow" width="550px" :maskClosable="false" @cancel="handleCancel" @ok="handleSubmit">
            <template #title>
                <div>
                    复制
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
                        <div class="tips">谁可以查看此列表视图？</div>
                        <a-form-item>
                            <a-radio-group v-model:value="formState.resource">
                              <a-radio value="1">只有我可以查看此列表视图</a-radio>
                              <a-radio value="2">所有用户均可以查看此列表视图</a-radio>
                              <a-radio value="3">与用户小组共享列表视图</a-radio>
                            </a-radio-group>
                        </a-form-item>
                        <a-form-item name="role" v-if="formState.resource==3">
                            <div class="menuRow">
                                <a-dropdown>
                                    <template #overlay>
                                      <a-menu @click="handleMenu">
                                        <a-menu-item v-for="(item,index) in menus" :key="item.key">
                                          <UserOutlined />
                                          {{item.name}}
                                        </a-menu-item>
                                      </a-menu>
                                    </template>
                                    <a-button>
                                      <UserOutlined />
                                      <DownOutlined />
                                    </a-button>
                                </a-dropdown>
                                <a-select
                                    class="aselect"
                                    v-model:value="formState.role"
                                    show-search
                                    mode="multiple"
                                    :placeholder="'搜索'+currentMenu"
                                    :default-active-first-option="false"
                                    :filter-option="false"
                                    :not-found-content="null"
                                    @search="handleSearch"
                                    @change="handleChange"
                                    @dropdownVisibleChange="getPeople"
                                >
                                    <template #suffixIcon><SearchOutlined class="ant-select-suffix" /></template>
                                    <a-select-option :value="item.ID" v-for="(item,index) in listData" :key="index">{{item.Name}}</a-select-option>
                                </a-select>
                            </div>
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
    import { SearchOutlined, DownOutlined, UserOutlined } from "@ant-design/icons-vue";
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
        apiname: "",
        Resources: "",
        role: []
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
</script>
<style lang="less" scoped>
    @import url('@/style/modal.less');
    .ant-radio-wrapper{
        display: flex;
        align-items: center;
        margin-top: 10px;
    }
    .menuRow{
        display: flex;
        align-items: center;
        .ant-btn{
            border-radius: 4px 0 0 4px;
        }
        :deep .ant-select-selector{
            border-radius: 0 4px 4px 0 !important;
            margin-left: -1px !important;
        }
    }
</style>