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
                <!-- <Dtable name="fileGrid" ref="fileGridRef" :columns="filesColumns" :gridUrl="Interface.files" :tableHeight="height" :isCollapsed="isCollapsed"></Dtable> -->
                <Ntable ref="fileGridRef" :columns="filesColumns" :gridUrl="Interface.list2" :tableHeight="height" :isCollapsed="isCollapsed"></Ntable>
            </div>
        </div>
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, toRaw,defineEmits } from "vue";
    import dayjs from 'dayjs';
    import 'dayjs/locale/zh-cn';
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    dayjs.locale('zh-cn');
    import calendar from 'dayjs/plugin/calendar';
    import weekday from 'dayjs/plugin/weekday';
    import localeData from 'dayjs/plugin/localeData';
    dayjs.extend(calendar);
    dayjs.extend(weekday);
    dayjs.extend(localeData);
    import useWrokDetail from "@/utils/workDetail";
    import Interface from "@/utils/Interface.js";
    // import Dtable from "@/components/Dtable.vue";
    import Ntable from "@/components/Ntable.vue";
    const { relatedList, getRelatedWork, files, getFilesWork } = useWrokDetail();
    import { useRouter, useRoute } from "vue-router";
    import { message } from "ant-design-vue";
    import { girdFormatterValue } from "@/utils/common.js";
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const fileGridRef = ref(null);
    const data = reactive({
        list: [],
        selectedRowKeys: [],
        loading: false,
        isCollapsed: false,
        fileList:[],
        height:document.documentElement.clientHeight - 200,
        queryParams: {
            filterId:'',
            objectTypeCode:'1001',
            entityName:'RelatedAttachment',
            filterQuery:'\nParentId\teq\t'+route.query.id,
            displayColumns:'Name,FileExtension,CreatedOn,CreatedBy',
            sort:'CreatedOn',
            order:'desc'
        },
    });
    const { isCollapsed,height } = toRefs(data);
    
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
            title: "文件名",
            field: "Name"
        },
        {
            title: "上传时间",
            field: "CreatedOn"
        },
        {
            title: "创建人",
            field: "CreatedBy"
        },
        {
            field: "Action",
            title: "操作",
            formatter: function formatter(value, row, index) {
            var str = `<div class="iconBox">
                <div class="popup">
                    <div class="option-item" onclick="handlePreview('${row.id}')">查看</div>
                    <div class="option-item" onclick="handleRename('${row.id}')">重命名</div>
                    <div class="option-item" onclick="handleDelete('${row.id}')">删除</div>
                    <div class="option-item" onclick="handleDownload('${row.id}')">下载</div>
                </div>
                <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg>
            </div>`;
            return str;
            }
        },
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
        fileGridRef.value.loadGrid(data.queryParams);
    };
    //查看
    const handlePreview = ()=>{
        
    }
    //重命名
    const handleRename = ()=>{
        
    }
    //删除
    const handleDelete = ()=>{
        
    }
    //下载
    const handleDownload = ()=>{
        
    }
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
    :deep .iconBox{
        text-align: center;
        .popup{
            text-align: left;
            top: 20px;
        }
        .moreaction{
            padding: 0px 1px;
            width: 18px;
            border: 1px solid #dedede;
            border-radius: 4px;
            position: relative;
            top: 1px;
        }
    }
</style>