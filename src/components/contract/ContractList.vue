<template>
    <div class="todoList">
        <div>
            <div class="headerBar">
                <div class="headerLeft">
                    <div class="icon-circle-base" :style="{background:backColor}">
                        <img :src="rightMenuImg" alt="">
                    </div>
                    <span class="headerTitle">{{title}}</span>
                </div>
                <div class="headerRight">
                    <a-button :type="item.type" :disabled="item.disabled" class="ml10" v-for="(item, index) in headerBtns" :key="index">{{item.label}}</a-button>
                </div>
            </div>
            <div class="wea-tab" v-if="isTab">
                    <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                        <a-tab-pane v-for="(item,index) in tabs" :key="index">
                            <template #tab>
                                <span>
                                    {{item.label}}
                                </span>
                            </template>
                        </a-tab-pane>
                    </a-tabs>
                    <div class="tabsBtn">
                    </div>
            </div>
            <div class="searchWrap" v-if="isSearch">
                <list-form-search  ref="searchRef" @update-height="changeHeight"></list-form-search>
            </div>
        </div>
        <div class="todo-content">
            <div style="height: 100%" ref="contentRef">
                <div class="statistics" v-if="isStatistics">
                    <div class="statisticItem">
                        <div class="statisticLeft">
                            <div class="statisticName">应付款金额</div>
                            <div class="statisticCount">{{statistics.TotalAmount || 0}}</div>
                        </div>
                        <div class="statisticRight">
                            <p class="icon">
                                <MoneyCollectOutlined />
                            </p>
                        </div>
                    </div>
                    <div class="statisticItem">
                        <div class="statisticLeft">
                            <div class="statisticName">实际付款金额</div>
                            <div class="statisticCount">{{statistics.RefundAmount || 0}}</div>
                        </div>
                        <div class="statisticRight">
                            <p class="icon">
                                <MoneyCollectOutlined />
                            </p>
                        </div>
                    </div>
                  </div>
                <div class="wea-tabContent" :style="{height:tableHeight+'px'}" ref="tabContent">
                    <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight"
                        :isCollapsed="isCollapsed"></Dtable>
                </div>
            </div>
        </div>
        <NewReceiving :isShow="isNew" v-if="isNew" @cancel="isNew=false" />
    </div>
</template>
<script setup>
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        UserOutlined,
        MoneyCollectOutlined
    } from "@ant-design/icons-vue";
    import "@/style/contractList.less";
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, nextTick } from "vue";
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();

    import { message } from "ant-design-vue";
    import Dtable from "@/components/Dtable.vue";
    import ListFormSearch from "@/components/ListFormSearch.vue";
    import NewReceiving from "@/components/documentAdmin/NewReceiving.vue";
    import moduleTabs from "@/utils/tabs/index.js";

    // import tabsData from "@/utils/tabs/reimburse/reimburse.js";
    import { useRouter, useRoute } from "vue-router";
    import usePayment from "@/utils/contract/payment";
    const { tabList } = usePayment();

    const props = defineProps({
        title: {
            type: String,
            default: '标题'
        },
        isStatistics:  {
            type: Boolean,
            default: false
        },
        isTab: {
            type: Boolean,
            default: false
        },
        isSearch: {
            type: Boolean,
            default: true
        },
        tabName: {
            type: String,
            default: ''
        },
        moduleName: String,
        rightMenuImg: {
            type: String,
            default: require('@/assets/img/rightMenu/hetong.png')
        },
        backColor: {
          type: String,
          default: "#0079de"
        }
    })

    console.log("props", props.isSearch)


    console.log("tabList", tabList);

    
    const route = useRoute();
    const router = useRouter();




    let data = reactive({
        isCollapsed: false,
        tableHeight: '',
        fieldNames: {
            children: 'children', title: 'name', key: 'id'
        },
        tabs: [],
        activeKey: 0,
        queryParams: {},
        isModal: false,
        isCirculation: false,
        searchVal: "",
        isCategory: false,
        treeId: "",
        isEditFlow: false,
        id: "",
        isJump: false,
        isCountersign: false,
        isRelease: false,
        ProcessInstanceId: "",
        isNew: false,
        statistics: {},
        headerBtns: []
    });

    const { isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, searchVal,
        isCategory, treeId, isEditFlow, id, isJump, isCountersign, isRelease, ProcessInstanceId, isNew, statistics, headerBtns } = toRefs(data);
    if(props.tabName){
        data.tabs = moduleTabs[props.moduleName][props.tabName] && moduleTabs[props.moduleName][props.tabName].tabs;
        data.headerBtns = moduleTabs[props.moduleName][props.tabName].headerBtns;
    }
    if(data.tabs && data.tabs.length && data.tabs[0] && data.tabs[0].headerBtns){
        data.headerBtns = data.tabs[0].headerBtns;
    }
    const tabContent = ref(null);
    const contentRef = ref(null);
    let formSearchHeight = ref(null);
    const gridRef = ref(null);
    onMounted(() => {
        window.addEventListener('resize', changeHeight);
        changeHeight();
        
    })
    const onSearch = (e) => {

    }
    const getStatistics = () => {
        proxy.$get(Interface.contract.invoice.statistics,{
            Type: 7,
            objtypecode: 1090
        }).then(res=>{
            console.log('res',res);
            data.statistics = res.data.listData.Table[0];
        })
    }
  getStatistics();
    const handleNew = () => {
        data.isNew = true;
    }
    function changeHeight(h) {
        if (typeof h == 'number') {
            formSearchHeight.value = h;
        }
        let contentHeight = contentRef.value.clientHeight;
        let tabsHeight = 46;
        let height = contentHeight - tabsHeight - formSearchHeight.value;
        let tableHeight;
        if(props.isStatistics){
            tableHeight = height - 50;
        }else {
            tableHeight = height + 46;
        }
        if(props.isTab){
            tableHeight = tableHeight - 42;
        }
        data.tableHeight = tableHeight;
        console.log('data', data.tableHeight);
        // console.log("gridRef", gridRef.value.loadGrid())
        if(!props.isSearch){
            nextTick(()=>{
                gridRef.value.loadGrid();
            })
        }else {
            nextTick(()=>{
                gridRef.value.loadGrid();
            })
        }
    }
    const cancelRelase = (e) => {
        data.isRelease = e;
    }
    // 获取tabs
    const getTabs = () => {
        proxy.$get(Interface.todoList.tabs, {
            a: 1
        }).then(res => {
            console.log("tabs", res)
            data.tabs = res.list;
        })
    }
    // getTabs();

    const handleMenuClick = () => {

    }
    const DelegateRef = ref();

    function handleTo(WFRuleLogId) {
        console.log("WFRuleLogId", WFRuleLogId);
        router.push({
            path: "/detail",
            query: {
                id: WFRuleLogId
            }
        });
    }
    const EditFlow = (id) => {
        console.log("id", id);
        data.id = id;
        data.isEditFlow = true;
    }
    const DelegateData = reactive({
        params: {}
    })
    const CirculationData = reactive({
        params: {}
    })
    const jumpData = reactive({
        params: {}
    })
    const CountersignData = reactive({
        params: {}
    })
    const updateStatus = (e) => {
        data.isModal = e;
        data.isCirculation = e;
    }
    const imgUrl = require("@/assets/flow/checkbox_checked.gif");
    const gridUrl = ref(Interface.contract.invoice.list);

    let columnsArray;
    if(!props.isTab){
        columnsArray = moduleTabs[props.moduleName][props.tabName].table.columnsArray;
    }else {
        columnsArray = data.tabs[0].table.columnsArray;
    }
    const columns = ref(columnsArray);
    
    const changeTab = (e) => {
        console.log("e", e);
        data.activeKey = e;
        data.queryParams.activeKey = e;
        if(data.tabs[e].headerBtns){
            data.headerBtns = data.tabs[e].headerBtns;
        }
        columns.value = data.tabs[e].table.columnsArray;
        gridRef.value.loadGrid(data.queryParams);
    }
</script>