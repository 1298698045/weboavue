<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    附件列表
                </div>
                <div class="panel-btn">
                    <!-- <a-button type="primary" @click="handleNewAdd">新建</a-button> -->
                </div>
            </div>
            <div class="panel-bd">
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
    import { ref, toRefs, reactive, toRaw, onMounted, watch, getCurrentInstance, defineProps, defineEmits } from "vue";
    const props = defineProps({
        id: String,
        addClass: Function
    })
    import Interface from "@/utils/Interface.js";
    const emit = defineEmits(["addClass"]);
    const { proxy } = getCurrentInstance();
    var columns = [
        {
            title: "名称",
            dataIndex: "CategoryName"
        },
        {
            title: "创建人",
            dataIndex: "CreatedBy"
        },
        {
            title: "创建时间",
            dataIndex: "CreatedOn"
        }
        // {
        //     title: "邀请时间",
        //     key: 'Action',
        //     width: 150
        // }
    ]
    const data = reactive({
        listData: [],
        
    })
    const { listData } = toRefs(data);
    const columnList = toRaw(columns);
    const loadList = () => {
      proxy.$get(Interface.information.categoryList,{
        contentId: props.id
      }).then(res=>{
        data.listData = res.data;
      })
    };
    loadList();
    const handleNewAdd = ()=> {
        emit('addClass',true);
    }
</script>
<style lang="less">
    .relatedWrap{
        width: 100%;
    }
    .ant-btn.ant-btn-text,.ant-btn.ant-btn-text:hover{
        color: var(--textColor);
    }
</style>