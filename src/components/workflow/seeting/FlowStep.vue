<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    流程步骤
                </div>
                <div class="panel-btn">
                    <!-- <a-button type="primary">添加关联</a-button> -->
                </div>
            </div>
            <div class="panel-bd">
                <div class="formWrap">
                    <div class="col">
                        <a-form ref="formRef" :model="formState">
                            <a-form-item name="name">
                                <a-input v-model:value="formState.name" placeholder="请输入姓名" />
                            </a-form-item>
                        </a-form>
                    </div>
                    <div class="col">
                        <a-button class="ml10" type="primary">查询</a-button>
                    </div>
                </div>
                <a-table :columns="columns" :data-source="listData">
                 <template #bodyCell="{ column, record, index }">
                    <template v-if="column.dataIndex === 'number'">
                        {{index+1}}
                    </template>
                    <template v-if="column.dataIndex === 'Action'">
                      <a-button type="text" size="small" @click="handlePerm(record)">权限</a-button>
                      <a-button type="text" size="small" @click="handlePeopleOpen(record)">办理人员</a-button>
                      <a-button type="text" size="small">预览人员</a-button>
                    </template>
                  </template>
                </a-table>
            </div>
        </div>
        <PermSeeting v-if="isPerm" :isShow="isPerm" :stepId="stepId" @cancel="cancelPerm"></PermSeeting>
        <HandlePeople v-if="isHandlePeople" :isShow="isHandlePeople" @cancel="cancelPeople" :stepId="stepId" :stepCode="stepCode" />
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import { ref, toRefs, reactive, toRaw, onMounted, watch, getCurrentInstance } from "vue";
    import PermSeeting from "@/components/workflow/seeting/PermSeeting.vue";
    import HandlePeople from "@/components/workflow/seeting/HandlePeople.vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    var columns = [
        {
            title: "步骤名称",
            dataIndex: "name"
        },
        {
            title: "步骤代码",
            dataIndex: "stepCode"
        },
        {
            title: "办理时限",
            dataIndex: "names"
        },
        {
            title: "办理人员",
            dataIndex: "participators"
        },
        {
            title: "权限",
            dataIndex: "stepSights"
        },
        {
            title: "操作",
            dataIndex: "Action"
        }
    ]
    const data = reactive({
        listData: [],
        isPerm: false,
        stepId: "",
        isHandlePeople: false,
        stepCode: ""
    })
    const formState = reactive({
        name: "",
        status: "",
        depart: "",
        
    })
    const { listData, isPerm, stepId, isHandlePeople, stepCode } = toRefs(data);
    const columnList = toRaw(columns);
    const loadList = () => {
      proxy.$get(Interface.flow.stepList,{
        processId: ""
      }).then(res=>{
        data.listData = res;
      })
    };
    loadList();
    // 权限
    const handlePerm = (item) => {
        // console.log("item",item);
        data.stepId = item.id;
        data.isPerm = true;
    }
    // 办理人员
    const handlePeopleOpen = (item) => {
        data.stepId = item.id;
        data.stepCode = item.stepCode;
        data.isHandlePeople = true;
    }
    const cancelPerm = (e) => {
        data.isPerm = e;
    }
    const cancelPeople = (e) => {
        data.isHandlePeople = e;
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