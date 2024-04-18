<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    关联事务
                </div>
                <div class="panel-btn">
                    <a-button type="primary">添加关联</a-button>
                </div>
            </div>
            <div class="panel-bd">
                <!-- <a-table :columns="columns" :data-source="relatedList"
                 :row-selection="{ selectedRowKeys: data.selectedRowKeys, onChange: onSelectChange }">
                 <template #bodyCell="{ column }">
                    <template v-if="column.key === 'Action'">
                      <a-button type="text" size="small">查看</a-button>
                      <a-button type="text" size="small">删除</a-button>
                    </template>
                  </template>
                </a-table> -->
                <Dtable name="relatedGrid" ref="gridRef" :columns="columns" :gridUrl="Interface.instanceList" :tableHeight="200" :isCollapsed="isCollapsed"></Dtable>
            </div>
        </div>
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    备注和附件
                </div>
                <div class="panel-btn">
                    <a-button type="primary">添加附件</a-button>
                </div>
            </div>
            <div class="panel-bd">
                <!-- <a-table :columns="filesColumns" :data-source="files"
                :row-selection="{ selectedRowKeys: data.selectedRowKeys, onChange: onSelectChange }">
                    <template #bodyCell="{ column }">
                        <template v-if="column.key === 'Action'">
                            <a-button type="text" size="small">编辑</a-button>
                            <a-button type="text" size="small">重命名</a-button>
                            <a-button type="text" size="small">查看</a-button>
                            <a-button type="text" size="small">删除</a-button>
                            <a-button type="text" size="small">下载</a-button>
                        </template>
                    </template>
                </a-table> -->
                <Dtable name="fileGrid" ref="fileGridRef" :columns="filesColumns" :gridUrl="Interface.files" :tableHeight="200" :isCollapsed="isCollapsed"></Dtable>
            </div>
        </div>
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, toRaw } from "vue";
    import useWrokDetail from "@/utils/workDetail";
    import Interface from "@/utils/Interface.js";
    import Dtable from "@/components/Dtable.vue";
    const { relatedList, getRelatedWork, files, getFilesWork } = useWrokDetail();

    // var columns = [
    //     {
    //         title: "关联事务",
    //         dataIndex: "Name"
    //     },
    //     {
    //         title: "关联时间",
    //         dataIndex: "CreatedOn"
    //     },
    //     {
    //         title: "操作",
    //         key: 'Action',
    //         width: 150
    //     }
    // ]
    // var filesColumns = [
    //     {
    //         title: "类型",
    //         dataIndex: "FileExtension"
    //     },
    //     {
    //         title: "标题",
    //         dataIndex: "Name"
    //     },
    //     {
    //         title: "关联时间",
    //         dataIndex: "CreatedOn"
    //     },
    //     {
    //         title: "创建人",
    //         dataIndex: "createdByName"
    //     },
    //     {
    //         title: "操作",
    //         key: 'Action',
    //         width: 300
    //     },
    // ]
    const gridRef = ref(null);
    const fileGridRef = ref(null);
    const data = reactive({
        list: [],
        selectedRowKeys: [],
        loading: false,
        isCollapsed: false
    });
    const { isCollapsed } = toRefs(data);
    // const columnList = toRaw(columns);
    // const columnList2 = toRaw(filesColumns);

    const columns = ref([
        {
            field: 'ids',
            checkbox: true
        },
        {
            title: "关联事务",
            field: "Name"
        },
        {
            title: "关联时间",
            field: "CreatedOn"
        },
    ]);
    const filesColumns = ref([
        {
            field: 'ids',
            checkbox: true
        },
        {
            title: "类型",
            field: "FileExtension"
        },
        {
            title: "标题",
            field: "Name"
        },
        {
            title: "关联时间",
            field: "CreatedOn"
        },
        {
            title: "创建人",
            field: "createdByName"
        }
    ])
    const gridUrl = ref(Interface.draftsList);

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        data.selectedRowKeys = selectedRowKeys;
    };
    onMounted(()=>{
        loadList();
    })
    const loadList = async () => {
        //   try {
        //     await getRelatedWork();
        //     await getFilesWork();
        //   } catch (err) {
        //     // 处理加载错误
        //     console.error('Error loading data:', err);
        //   }
        gridRef.value.loadGrid();
        fileGridRef.value.loadGrid();
    };
</script>
<style lang="less" scoped>
    .relatedWrap{
        width: 100%;
    }
    .ant-btn.ant-btn-text,.ant-btn.ant-btn-text:hover{
        color: var(--textColor);
    }
    .panel{
        padding: 20px 0 0 0;
        .panel-head{
            padding: 0 20px;
        }
    }
</style>