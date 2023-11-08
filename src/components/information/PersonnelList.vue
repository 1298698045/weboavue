<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    人员信息
                </div>
                <div class="panel-btn">
                    <!-- <a-button type="primary">添加关联</a-button> -->
                </div>
            </div>
            <div class="panel-bd">
                <div class="formWrap">
                    <div class="col">
                        <a-form ref="formRef" :model="formState" :label-col="labelCol">
                            <a-form-item name="name">
                                <a-input v-model:value="formState.name" placeholder="请输入姓名" />
                            </a-form-item>
                            <a-form-item name="status">
                                <a-select v-model:value="formState.status" placeholder="请选择状态">
                                    <a-select-option value="">全部</a-select-option>
                                    <a-select-option value="1">已阅读</a-select-option>
                                    <a-select-option value="0">未阅读</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item name="depart">
                                <a-input v-model:value="formState.depart" placeholder="请选择部门" />
                            </a-form-item>
                        </a-form>
                    </div>
                    <div class="col">
                        <a-button class="ml10" type="primary">查询</a-button>
                        <a-button class="ml10">重置</a-button>
                        <a-button class="ml10">邀请参与人</a-button>
                        <a-button class="ml10">查看范围</a-button>
                        <a-button class="ml10">导出</a-button>
                    </div>
                </div>
                <a-table :columns="columns" :data-source="listData">
                 <template #bodyCell="{ column, record, index }">
                    <template v-if="column.dataIndex === 'number'">
                        {{index+1}}
                    </template>
                    <template v-if="column.key === 'Action'">
                      <a-button type="text" size="small">查看</a-button>
                      <a-button type="text" size="small">删除</a-button>
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
            title: "序号",
            dataIndex: "number"
        },
        {
            title: "部门",
            dataIndex: "BusinessUnitIdName"
        },
        {
            title: "状态",
            dataIndex: "StateCodeName"
        },
        {
            title: "阅读时间",
            dataIndex: "ModifiedOn"
        },
        {
            title: "IP地址",
            dataIndex: "IPAddr"
        },
        {
            title: "阅读次数",
            dataIndex: "ReadTimes"
        },
        {
            title: "姓名",
            dataIndex: "CreatedOn"
        },
        // {
        //     title: "邀请时间",
        //     key: 'Action',
        //     width: 150
        // }
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
      proxy.$get(Interface.information.peopleList,{}).then(res=>{
        data.listData = res.rows;
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