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
                <!-- <Ntable ref="gridRef" :columns="columns" :gridUrl="Interface.list2" :tableHeight="height"
                    :isCollapsed="isCollapsed"></Ntable> -->
                <Dtable ref="gridRef" name="datagridFilter" :columns="columns" :gridUrl="Interface.list2"
                :tableHeight="height" :loadFilter="loadFilter"></Dtable>
            </div>
        </div>
        <RelateInstance v-if="isRelateInstance" :isShow="isRelateInstance" @select="handleSelectLook" @cancel="isRelateInstance=false" />
    </div>
</template>
<script setup>
    import "@/style/common.less";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, toRaw, defineEmits, defineProps } from "vue";
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
    // import Ntable from "@/components/Ntable.vue";
    import Dtable from "@/components/Dtable_nodes.vue";
    import RelateInstance from "@/components/workflow/RelateInstance.vue";

    const { relatedList, getRelatedWork, files, getFilesWork } = useWrokDetail();
    import { useRouter, useRoute } from "vue-router";
    import { message } from "ant-design-vue";
    import { girdFormatterValue } from "@/utils/common.js";
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        processInstanceId: String
    })
    const gridRef = ref(null);
    const fileGridRef = ref(null);
    const data = reactive({
        list: [],
        selectedRowKeys: [],
        loading: false,
        isCollapsed: false,
        fileList: [],
        height: document.documentElement.clientHeight - 200,
        queryParams: {
            filterId: '',
            objectTypeCode: '128',
            entityName: 'WFProcessInstanceRelated',
            filterQuery: '\nProcessInstanceId\teq\t' + props.processInstanceId,
            displayColumns: 'RelateInstanceId,Name,CreatedOn,CreatedBy',
            sort: 'CreatedOn',
            order: 'desc'
        },
        isRelateInstance: false
    });
    const { isCollapsed, height, isRelateInstance } = toRefs(data);

    const columns = ref([
        {
            field: 'ids',
            checkbox: true
        },
        {
            title: "关联流程事务",
            field: "RelateInstanceId",
            formatter: function formatter(value, row, index) {
                let href = "/#/lightning/r/Workflow/instance/view?id="+row.RelateInstanceId2
                return `<a href="${href}" target="_blank">${row.RelateInstanceId}</a>`
            }
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

    const gridUrl = ref(Interface.draftsList);

    const loadFilter = (res) => {
        let fields = data.queryParams.displayColumns.split(',');
        var data0 = { rows: [], total: 0 }
        if (res) {
            if (res.nodes) {
                let list = [];
                fields.forEach(field => {
                    list = res.nodes.map(row => {
                        if(field == 'RelateInstanceId'){
                            row.RelateInstanceId2 = row.RelateInstanceId.lookupValue.value;
                        }
                        if (field != 'id' && field != 'nameField') {
                            row[field] = girdFormatterValue(field, row);
                        }
                        row.LIST_RECORD_ID = row.id;
                        return row;
                    })
                })
                data0.rows = list;
            } else {
                data0.rows = res;
            }
        }
        data0.total = res && res.totalCount ? Number(res.totalCount) : data0.rows.length;
        return data0
    }

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        data.selectedRowKeys = selectedRowKeys;
    };
    const emit = defineEmits(['addRelateInstance']);
    const addRelateInstance = () => {
        // emit("addRelateInstance");
        data.isRelateInstance = true;
    }
    onMounted(() => {
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

    //关联事务选中
    const handleSelectLook = (e) => {
        let RelateInstanceId = e.id;
        if(e.ProcessInstanceId2){
            RelateInstanceId = e.ProcessInstanceId2;
        };
        let obj = {
            actions:[{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                  recordInput: {
                    allowSaveOnDuplicate: false,
                    apiName: 'WFProcessInstanceRelated',
                    objTypeCode: 128,
                    fields: {
                        ProcessInstanceId: props.processInstanceId,
                        RelateInstanceId: RelateInstanceId
                    }
                  }
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.create, d).then(res=>{
            if(res && res.actions && res.actions[0].state == 'SUCCESS'){
                message.success("添加关联成功!");
                data.isRelateInstance = false;
                loadList();
            }
        })
    }
</script>
<style lang="less" scoped>
    .relatedWrap {
        width: 100%;
    }

    .ant-btn.ant-btn-text,
    .ant-btn.ant-btn-text:hover {
        color: var(--textColor);
    }

    .panel {
        padding: 20px 20px 17px 20px;

        .panel-head {
            padding: 0px;
        }
    }
</style>