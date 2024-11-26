<template>
    <div class="readWrap">
        <div class="panel">
            <div class="panel-head">
                <!-- <div class="panel-title">
                    传阅记录
                </div> -->
                <div class="tabWrap">
                <a-tabs v-model:activeKey="activeKey" @change="changeTabs">
                    <a-tab-pane v-for="(item, index) in tabs" :key="index">
                    <template #tab>
                        <span>
                        {{ item.label }}
                        </span>
                    </template>
                    </a-tab-pane>
                </a-tabs>
                </div>
                <div class="panel-btn">
                </div>
            </div>
            <div class="panel-bd" v-show="activeKey==0">
                <Dtable name="recordGrid" ref="gridRef" :columns="columns" :gridUrl="Interface.readlogList" :tableHeight="height" :isCollapsed="isCollapsed"></Dtable>               
            </div>
            <div class="panel-bd" v-show="activeKey==1">
                <!-- <Dtable name="browsingHistory" ref="browsingHistoryRef" :columns="columns2" :gridUrl="Interface.readlogList" :tableHeight="height" :isCollapsed="isCollapsed"></Dtable>-->
                <Ntable ref="browsingHistoryRef" :columns="columns2" :gridUrl="Interface.list2" :tableHeight="height" :isCollapsed="isCollapsed"></Ntable>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, toRefs, reactive, toRaw, onMounted, watch, getCurrentInstance } from "vue";
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
    import Interface from "@/utils/Interface.js";
    import Dtable from "@/components/Dtable.vue";
    import Ntable from "@/components/Ntable.vue";
    import { useRouter, useRoute } from "vue-router";
    import { message } from "ant-design-vue";
    import { girdFormatterValue } from "@/utils/common.js";
    const route = useRoute();
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    const gridRef = ref(null);
    const browsingHistoryRef = ref(null);
    var columns = ref([
        // {
        //     title: "序号",
        //     // dataIndex: "FromActivityName"
        // },
        {
            title: "传阅人",
            field: "ToActivityName"
        },
        {
            title: "传阅时间",
            field: "CreatedOn"
        },
        {
            title: "接收人",
            field: "ReceiverName"
        },
        {
            title: "是否已读",
            field: "IsRead"
        }
    ]);
    var columns2 = ref([
        // {
        //     title: "序号",
        //     // dataIndex: "FromActivityName",
        //     key: "sortNumber"
        // },
        {
            title: "阅读人",
            field: "CreatedBy"
        },
        {
            title: "阅读时间",
            field: "ReadOn"
        },
        {
            title: "IP地址",
            field: "IPAddr"
        },
        {
            title: "浏览器名称与版本",
            field: "BrowserName"
        }
    ]);
    const data = reactive({
        list: [],
        list2: [],
        height:document.documentElement.clientHeight - 200,
        activeKey:0,
        tabs: [
      {
        label: "传阅记录",
      },
      {
        label: "浏览记录",
      },
    ],
    queryParams2: {
        filterId:'',
        objectTypeCode:'2021',
        entityName:'RecordReadLog',
        filterQuery:'\nObjectId\teq\t'+route.query.id,
        displayColumns:'CreatedOn,CreatedBy,IPAddr,BrowserName,ReadOn',
        sort:'CreatedOn',
        order:'desc'
      },
    })
    const { list, list2,height,activeKey,tabs } = toRefs(data);
    // const columnList = toRaw(columns);
    // const columnList2 = toRaw(columns2);
    const changeTabs = (e) => {
        data.activeKey = e;
        if(e==0){
            gridRef.value.loadGrid();
        }else{
            //browsingHistoryRef.value.loadGrid();
            browsingHistoryRef.value.loadGrid(data.queryParams2);
        }
    };
    const getList = async () => {
        await proxy.$get(Interface.readlogList,{
            processInstanceId: "9fd5ec7f-86c8-44e2-b7ee-aa73f7730c2c"
        }).then(res=>{
            data.list2 = res.rows;
        })
    }
    onMounted(()=>{
        window.addEventListener("resize", (e) => {
            data.height = document.documentElement.clientHeight - 200;
        });
        gridRef.value.loadGrid();
        
        getList();
    })
</script>
<style lang="less">
    .readWrap{
        width: 100%;
        .tabWrap{
          width: 100%;
          height: 30px;
          line-height: 30px;
          //border-bottom: 1px solid #d9d9d9;
        }
        .ant-tabs-tab{
        //   padding: 14px 24px !important;
        //   padding-top: 0 !important;
        //   margin-left: 0 !important;
        //   font-size: 14px !important;
        //   color: #484848 !important;
          padding: 9px 8px !important;
          padding-top: 0 !important;
          margin-right: 24px !important;
          font-size: 14px !important;
        }
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