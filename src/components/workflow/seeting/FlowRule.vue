<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    流程规则
                </div>
                <div class="panel-btn">
                    <!-- <a-button type="primary">添加关联</a-button> -->
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
        
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import { ref, toRefs, reactive, toRaw, onMounted, watch, getCurrentInstance } from "vue";

    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    var columns = [
        {
            title: "类型",
            dataIndex: "ObjectName"
        },
        {
            title: "名称",
            dataIndex: "UserName"
        },
        {
            title: "权限",
            dataIndex: "Right"
        },
        {
            title: "操作",
            dataIndex: "Action"
        }
    ]
    const data = reactive({
        listData: [],
        
    })
    const formState = reactive({
        name: "",
        status: "",
        depart: "",
        
    })
    const { listData } = toRefs(data);
    const columnList = toRaw(columns);
    const loadList = () => {
      proxy.$get(Interface.flow.ruleList,{
        processId: ""
      }).then(res=>{
        data.listData = res;
      })
    };
    loadList();
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