<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    附件信息
                </div>
                <div class="panel-btn">
                    <a-upload v-model:file-list="fileList" action="#" :showUploadList="false">
                        <a-button type="primary">添加附件</a-button>
                    </a-upload>
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
                <Dtable name="fileGrid" ref="fileGridRef" :columns="filesColumns" :gridUrl="Interface.files" :tableHeight="height" :isCollapsed="isCollapsed"></Dtable>
            </div>
        </div>
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, toRaw,defineEmits } from "vue";
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
        isCollapsed: false,
        fileList:[],
        height:document.documentElement.clientHeight - 200
    });
    const { isCollapsed,height } = toRefs(data);
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
    const emit = defineEmits(['addRelateInstance']);
    const addRelateInstance = ()=>{
        emit("addRelateInstance");
    }
    onMounted(()=>{
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 200;
        });
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
        padding: 20px 20px 17px 20px;
        .panel-head{
            padding: 0px;
        }
    }
</style>