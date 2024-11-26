<template>
    <div class="relatedWrap">
        <div class="panel">
            <div class="panel-head">
                <div class="panel-title">
                    关联事务
                </div>
                <div class="panel-btn">
                    <a-button type="primary" @click="addRelateInstance">添加关联</a-button>
                </div>
            </div>
            <div class="panel-bd">
                <!-- <Dtable name="relatedGrid" ref="gridRef" :columns="columns" :gridUrl="Interface.instanceList" :tableHeight="height" :isCollapsed="isCollapsed"></Dtable> -->
                <Ntable ref="gridRef" :columns="columns" :gridUrl="Interface.list2" :tableHeight="height" :isCollapsed="isCollapsed"></Ntable>
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
    //import Dtable from "@/components/Dtable.vue";
    import Ntable from "@/components/Ntable.vue";
    const { relatedList, getRelatedWork, files, getFilesWork } = useWrokDetail();
    import { useRouter, useRoute } from "vue-router";
    import { message } from "ant-design-vue";
    import { girdFormatterValue } from "@/utils/common.js";
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    
    const gridRef = ref(null);
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
        objectTypeCode:'128',
        entityName:'WFProcessInstanceRelated',
        filterQuery:'\nProcessInstanceId\teq\t'+route.query.id,
        displayColumns:'Name,CreatedOn,CreatedBy',
        sort:'CreatedOn',
        order:'desc'
      },
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
        {
            title: "创建人",
            field: "CreatedBy"
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
        gridRef.value.loadGrid(data.queryParams);
        //fileGridRef.value.loadGrid();
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