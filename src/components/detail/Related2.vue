<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    {{props.title||''}}
                </div>
                <div class="panel-btn">
                    <a-button type="primary" @click="exportExcel">导出</a-button>
                </div>
            </div>
            <div class="panel-bd">
                <Dtable name="relatedGrid" ref="gridRef" :columns="columns" :gridUrl="Interface.instanceList" :tableHeight="height" :isCollapsed="isCollapsed"></Dtable>
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
    const props = defineProps({
        id: String,
        entityApiName: String,
        title: String,
    });
    const gridRef = ref(null);
    const fileGridRef = ref(null);
    const data = reactive({
        list: [],
        selectedRowKeys: [],
        loading: false,
        isCollapsed: false,
        height:document.documentElement.clientHeight - 190,
    });
    const { isCollapsed,height } = toRefs(data);
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
   
    const gridUrl = ref(Interface.draftsList);

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        data.selectedRowKeys = selectedRowKeys;
    };
    const emit = defineEmits([]);
    const exportExcel = ()=>{
        
    }
    onMounted(()=>{
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 190;
        });
        loadList();
    })
    const loadList = async () => {
        gridRef.value.loadGrid();
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