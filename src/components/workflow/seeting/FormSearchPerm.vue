<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    表单查询权限
                </div>
                <div class="panel-btn">
                    <a-button type="primary" @click="handleAddUser">添加用户</a-button>
                    <a-button type="primary" class="ml10" @click="handleAddFilter">添加筛选器</a-button>
                </div>
            </div>
            <div class="panel-bd">
                <a-table :columns="columns" :data-source="listData">
                 <template #bodyCell="{ column, record, index }">
                    <template v-if="column.dataIndex === 'number'">
                        {{index+1}}
                    </template>
                    <template v-if="column.dataIndex === 'Action'">
                      <a-button type="text" size="small">权限</a-button>
                      <a-button type="text" size="small">办理人员</a-button>
                      <a-button type="text" size="small">预览人员</a-button>
                    </template>
                  </template>
                </a-table>
            </div>
        </div>
        <AddFlowUser v-if="isAddFlowUser" :isShow="isAddFlowUser" @cancel="isAddFlowUser=false" />
        <AddFilter v-if="isAddFilter" :isShow="isAddFilter" @cancel="isAddFilter=false" />
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import { ref, toRefs, reactive, toRaw, onMounted, watch, getCurrentInstance } from "vue";
    import AddFlowUser from "@/components/workflow/seeting/AddFlowUser.vue";
    import AddFilter from "@/components/commonModal/AddFilter.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    var columns = [
        {
            title: "类型",
            dataIndex: "ObjectTypeName"
        },
        {
            title: "名称",
            dataIndex: "ObjectIdName"
        },
        {
            title: "操作",
            dataIndex: "Action"
        }
    ]
    const data = reactive({
        listData: [],
        isAddFlowUser: false,
        isAddFilter: false
    })
    const formState = reactive({
        name: "",
        status: "",
        depart: "",
        
    })
    const { listData, isAddFlowUser, isAddFilter } = toRefs(data);
    const columnList = toRaw(columns);
    const loadList = () => {
      proxy.$get(Interface.flow.formSearchPerm,{
        processId: ""
      }).then(res=>{
        data.listData = res.rows;
      })
    };
    loadList();
    const handleAddUser = () => {
        data.isAddFlowUser = true;
    }
    const handleAddFilter = () => {
        data.isAddFilter = true;
    }
</script>
<style lang="less">
    .relatedWrap{
        width: 100%;
    }
    .ant-btn.ant-btn-text,.ant-btn.ant-btn-text:hover{
        color: var(--textColor);
    }
    .formWrap{
        display: flex;
        justify-content: space-between;
        .ant-form{
            display: flex;
            .ant-form-item{
                width: 150px;
                margin-right: 10px;
            }
        }
    }
</style>