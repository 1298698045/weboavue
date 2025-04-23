<template>
    <div class="todoList InvoiceAdminWrap">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base">
                    <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
                </div>
                <span class="headerTitle">发票管理</span>
            </div>
            <div class="headerRight">
                <a-button type="primary" class="ml10" @click="handleNew(1)">新建收票</a-button>
                <a-button type="primary" class="ml10" @click="handleNew(2)">新建开票</a-button>
                <a-button type="primary" class="ml10">批量添加发票</a-button>
                <a-upload accept="pdf/*" :before-upload="beforeUpload" v-model:file-list="fileList" :headers="headers"
                    @change="changeFiles" :data="uploadData" :action="Interface.uploadFiles" :showUploadList="false">
                    <a-button class="ml10" type="primary">发票识别</a-button>
                </a-upload>
                <!-- <a-button type="primary" class="ml10" @click="handleNewForm">新建合同单</a-button> -->
            </div>
        </div>
        <div class="todo-content">
            <a-row>
                <a-col :span="isCollapsed ? '24' : '19'" class="wea-left-right-layout-right">
                    <div style="height: 100%" ref="contentRef">

                        <div class="wea-header">
                            <div class="wea-tab">
                                <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                                    <a-tab-pane v-for="(item, index) in data.tabs" :key="index">
                                        <template #tab>
                                            <span>
                                                {{ item.label }}
                                            </span>
                                        </template>
                                    </a-tab-pane>
                                </a-tabs>
                                <div class="tabsBtn">
                                </div>
                            </div>
                            <HighSearch @update-height="changeHeight" @search="handleSearch"
                                :entityApiName="data.queryParams.entityName">
                            </HighSearch>
                        </div>
                        <!-- <list-form-search ref="searchRef" @search="handleSearch" entityApiName="OfficialDocumentIn"
                :SearchFields="SearchFields" @update-height="changeHeight"></list-form-search> -->
                        <div class="statistics" v-if="isStatistics">
                            <div class="statisticItem">
                                <div class="statisticLeft">
                                    <div class="statisticName">收票总金额</div>
                                    <div class="statisticCount">{{ statistics.TotalAmount || 0 }}</div>
                                </div>
                                <div class="statisticRight">
                                    <p class="icon">
                                        <PayCircleOutlined />
                                    </p>
                                </div>
                            </div>
                            <div class="statisticItem">
                                <div class="statisticLeft">
                                    <div class="statisticName">退票总额</div>
                                    <div class="statisticCount">{{ statistics.RefundAmount || 0 }}</div>
                                </div>
                                <div class="statisticRight">
                                    <p class="icon">
                                        <PayCircleOutlined />
                                    </p>
                                </div>
                            </div>
                            <div class="statisticItem">
                                <div class="statisticLeft">
                                    <div class="statisticName">本月收票总额</div>
                                    <div class="statisticCount">{{ statistics.MonthTotalAmount || 0 }}</div>
                                </div>
                                <div class="statisticRight">
                                    <p class="icon">
                                        <PayCircleOutlined />
                                    </p>
                                </div>
                            </div>
                            <div class="statisticItem">
                                <div class="statisticLeft">
                                    <div class="statisticName">本月退票总额</div>
                                    <div class="statisticCount">{{ statistics.MonthRefundAmount || 0 }}</div>
                                </div>
                                <div class="statisticRight">
                                    <p class="icon">
                                        <PayCircleOutlined />
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="wea-tabContent" :style="{ height: tableHeight + 'px' }" ref="tabContent">
                            <Ntable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :tableHeight="tableHeight"
                                :isCollapsed="isCollapsed">
                            </Ntable>
                        </div>
                    </div>
                </a-col>
            </a-row>
        </div>
        <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="isCommon = false"
            :title="data.recordId ? '编辑' : '新建'" @success="handleSearch('')" :id="recordId"
            :objectTypeCode="objectTypeCode" :entityApiName="sObjectName"
            :relatedObjectAttributeValue="relatedObjectAttributeValue"
            :relatedObjectAttributeName="relatedObjectAttributeName"></common-form-modal>
        <Delete :isShow="isDelete" v-if="isDelete" :desc="deleteDesc" @cancel="isDelete = false" @ok="handleSearch('')"
            :sObjectName="sObjectName" :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" />
        <invoiceDetail v-if="isDetail" :isShow="isDetail" :id="recordId" :InvoiceType="InvoiceType"
            @cancel="isDetail = false" />
        <addInvoice :isShow="isNew" v-if="isNew" :id="recordId" @ok="handleSearch('')" @cancel="isNew = false"
            :name="'发票'" :entityApiName="sObjectName" :objTypeCode="objectTypeCode" :entityId="entityId" :relatedObjectAttributeValue="relatedObjectAttributeValue"
            :relatedObjectAttributeName="relatedObjectAttributeName" />
    </div>
</template>
<script setup>
import {
    UnorderedListOutlined,
    DownOutlined,
    CaretDownOutlined,
    UserOutlined,
    PayCircleOutlined,
    FileTextOutlined
} from "@ant-design/icons-vue";
import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, nextTick } from "vue";
import Interface from "@/utils/Interface.js";
import { message } from "ant-design-vue";
import Ntable from "@/components/Ntable.vue";
import ListFormSearch from "@/components/ListFormSearch.vue";
import SearchQuery from "@/components/listView/SearchQuery.vue";
import { useRouter, useRoute } from "vue-router";
import useWorkAdmin from "@/utils/flow/workAdmin";
import CommonFormModal from "@/components/listView/CommonFormModal.vue";
import Delete from "@/components/listView/Delete.vue";
import invoiceDetail from "@/components/reimburse/invoice/invoiceDetail.vue";
import addInvoice from "@/components/reimburse/invoice/addInvoice.vue";
import { formTreeData, girdFormatterValue } from "@/utils/common.js";
import HighSearch from "@/components/HighSearch.vue";
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();

const token = localStorage.getItem("token");
let data = reactive({
    isCollapsed: true,
    tableHeight: '',
    fieldNames: {
        children: 'children', title: 'name', key: 'id'
    },
    tabs0: [
    ],
    tabs: [],
    activeKey: 0,
    entityType: 'I0E',
    queryParams: {
        filterId: '',
        objectTypeCode: '1090',
        entityName: 'Invoice',
        //filterQuery:'\nCreatedBy\teq-userid',
        //displayColumns:'',
        sort: 'CreatedOn',
        order: 'desc'
    },
    layoutName: 'invoiceOwner',
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
    formSearchFilterquery: "",
    SearchFields: [],
    isCommon: false,
    recordId: '',
    objectTypeCode: '1090',
    sObjectName: 'Invoice',
    relatedObjectAttributeValue: '',
    relatedObjectAttributeName: '',
    isDelete: false,
    deleteDesc: '确定要删除吗？',
    external: false,
    uploadData: {
        parentId: '',
        entityName: ''
    },
    headers: {
        Authorization: token,
        Token: token,
    },
    fileList: [],
    isDetail: false,
    isNew: false,
    entityId: '',
    InvoiceType: '',
    rowRecord: {},
    top: 0,
    isStatistics: true,
    statistics: {},
    hightSearchParams: {}
});
const { InvoiceType, queryParams, hightSearchParams, statistics, isStatistics, top, rowRecord, entityId, isNew, isDetail, fileList, uploadData, headers, isDelete, deleteDesc, external, isCommon, recordId, objectTypeCode, sObjectName, relatedObjectAttributeValue, relatedObjectAttributeName, isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, searchVal, entityType, layoutName,
    isCategory, treeId, isEditFlow, id, isJump, isCountersign, isRelease, ProcessInstanceId, SearchFields } = toRefs(data);
const tabContent = ref(null);
const contentRef = ref(null);
const searchRef = ref(null);
const formState = reactive({
    ProcessName: "",
    BusinessUnitId: "",
    Title: "",
    Priority: "0",
    Description: "",
    BusinessUnitList: [],
})
let formSearchHeight = ref(null);
const gridRef = ref(null);
const beforeUpload = (e) => {
    console.log("beforeUpload", e);
}
const changeFiles = (e) => {
    // console.log("e", e);
    if (e.file.status == "done") {
        message.success("上传成功！");
        handleSearch();
    } else if (e.file.status == "error") {
        message.error("上传失败！");
    }
}
function changeHeight(h) {
    let contentHeight = document.documentElement.clientHeight - 120;
    let tabsHeight = 46;
    let height = contentHeight - tabsHeight - 4;
    data.tableHeight = height;
    if (data.isStatistics) {
        data.tableHeight = height - 100;
    }
    //data.top = (document.documentElement.clientHeight - 565) / 2;

}

const handleSearch = (obj) => {
    data.queryParams = {
        filterId: data.queryParams.filterId,
        objectTypeCode: '1090',
        entityName: 'Invoice',
        sort: 'CreatedOn',
        order: 'desc'
    };
    // data.formSearchFilterquery = filterquery;
    // if (filterquery) {
    //   data.queryParams.filterQuery += filterquery;
    // }
    if (obj) {
        data.hightSearchParams = obj;
        if (data.hightSearchParams) {
            if (data.hightSearchParams.search) {
                data.queryParams.search = data.hightSearchParams.search;
            }
            if (data.hightSearchParams.filterCondition) {
                data.queryParams.filterCondition = data.hightSearchParams.filterCondition;
            }
        }
    }
    else {
        data.hightSearchParams = {}
    }
    if (data.treeId) {
        //data.queryParams.filterQuery = '\nDocumentTypeCode\tin\t' + data.treeId;
    }
    gridRef.value.loadGrid(data.queryParams);
}
//获取显示列
const getColumns = (id) => {
    let columnslist = [{
        field: 'ids',
        checkbox: true
    },
    {
        field: "Action",
        title: "操作",
        formatter: function formatter(value, row, index) {
            var str = `
                  <div class="iconBox">
              <div class="popup">
              <div class="option-item" id=${row.id} onclick="handleDetail('${row.id}','${row.InvoiceType && row.InvoiceType.value ? row.InvoiceType.value : ''}')">查看</div>
              <div class="option-item" id=${row.id} onclick="handleEdit('${row.id}')">退票</div>
              <div class="option-item" id=${row.id} onclick="handleEdit('${row.id}')">编辑</div>
              <div class="option-item" id=${row.id} onclick="handleDelete('${row.id}')">删除</div>
              </div>
              <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></div>
          `
            return str;
        }
    },];
    proxy.$get(Interface.listView.getFilterInfo, {
        entityType: data.entityType,
        objectTypeCode: data.queryParams.objectTypeCode,
        search: "",
        filterId: id
    }).then(res => {
        if (res && res.actions && res.actions[0]) { } else { return }
        let fields = res.actions[0].returnValue.fields;
        fields.forEach(item => {
            if (item.name == 'Name') {
                columnslist.push({
                    field: item.name,
                    title: item.label,
                    sortable: true,
                    formatter: function formatter(value, row, index) {
                        let url = row.viewUrl;
                        return '<a style="color:#015ba7;font-size:13px;" href="' + url + '" target="_blank">' + girdFormatterValue(item.name, row) + '</a>';
                    }
                });
            }
            else if (item.name == 'PaymentPercentage') {
                columnslist.push({
                    field: item.name,
                    title: item.label,
                    sortable: true,
                    formatter: function formatter(value, row, index) {
                        let percentage = value ? value.value : 0;
                        return '<div class="PaymentPercentage"><div role="progressbar" class="ant-progress ant-progress-line ant-progress-status-success ant-progress-show-info ant-progress-8 css-dev-only-do-not-override-kqecok td-progress"><div class="ant-progress-outer" style="height: 8px;"><div class="ant-progress-inner"><div class="ant-progress-bg" style="width: ' + (percentage || 0) + '%; height: 8px;"></div><!----></div></div></div><div class="td-progress-text">' + ((percentage * 1).toFixed(2)) + '%</div></div>';
                    }
                });
            }
            else if (item.name == 'StateCode') {
                columnslist.push({
                    field: item.name,
                    title: item.label,
                    sortable: true,
                    formatter: function formatter(value, row, index) {
                        let StateCode = value ? value.value : '';
                        let color = '#FF5722';
                        if (StateCode * 1 == 0) {
                            color = '#FF5722';
                        } else if (StateCode * 1 == 1) {
                            color = '#5AAAFF';
                        } else if (StateCode * 1 == 2) {
                            color = '#31BA6A';
                        } else if (StateCode * 1 == 3) {
                            color = '#555';
                        } else if (StateCode * 1 == 4) {
                            color = 'orange';
                        } else if (StateCode * 1 == 5) {
                            color = '#aaa';
                        } else if (StateCode * 1 == 6) {
                            color = '#FF5722';
                        }
                        return '<div class="badge" style="background:' + color + ';">' + girdFormatterValue(item.name, row) + '</div>';
                    }
                });
            }
            else {
                columnslist.push({
                    field: item.name,
                    title: item.label,
                    sortable: true,
                    formatter: function formatter(value, row, index) {
                        return girdFormatterValue(item.name, row);
                    }
                });
            }
        })
        columns.value = columnslist;
        nextTick(() => {
            gridRef.value.loadGrid(data.queryParams);
            //searchRef.value.getSearchLayout();
        })

    })
}

// 获取tabs
const getTabs = () => {
    proxy.$get(Interface.getTabs, {
        entityName: data.queryParams.entityName,
        layoutName: data.layoutName
    }).then(res => {
        if (res && res.tabs && res.tabs.length) {
            let list = res.tabs;
            list.forEach(item => {
                item.label = item.title;
                item.filterId = item.filter.filterId;
                item.filterquery = item.filterquery || '';
            })
            data.tabs = list;
        }
        else {
            //data.tabs=data.tabs0;
        }

        let filterColumnsList = (data.tabs)[0].filterableColumns;
        data.SearchFields = filterColumnsList;
        data.queryParams.filterId = data.tabs[0].filterId || '';
        getColumns(data.queryParams.filterId);
    })
}

window.data = data;
const gridUrl = ref(Interface.list2);

const columns = ref([]);
const changeTab = (e) => {
    data.activeKey = e;
    data.queryParams = {
        filterId: data.queryParams.filterId,
        objectTypeCode: '1090',
        entityName: 'Invoice',
        sort: 'CreatedOn',
        order: 'desc'
    };
    let filterColumnsList = (data.tabs)[e].filterableColumns;
    data.SearchFields = filterColumnsList;
    data.queryParams.filterId = data.tabs[e].filterId || '';
    // if (data.formSearchFilterquery) {
    //   data.queryParams.filterQuery += data.formSearchFilterquery;
    // }
    if (data.hightSearchParams) {
        if (data.hightSearchParams.search) {
            data.queryParams.search = data.hightSearchParams.search;
        }
        if (data.hightSearchParams.filterCondition) {
            data.queryParams.filterCondition = data.hightSearchParams.filterCondition;
        }
    }
    if (data.treeId) {
        //data.queryParams.filterQuery = '\nDocumentTypeCode\tin\t' + data.treeId;
    }
    getColumns(data.queryParams.filterId);
}

//新建
const handleNew = (type) => {
    data.recordId = '';
    //data.isCommon = true;
    data.relatedObjectAttributeName = 'InvoiceDirection';
    data.relatedObjectAttributeValue = { value: type+'' };
    data.isNew = true;
}
//编辑
const handleEdit = (id) => {
    data.recordId = id;
    //data.isCommon = true;
    data.isNew = true;
}
window.handleEdit = handleEdit;
//删除
const handleDelete = (id) => {
    data.isDelete = true;
    data.recordId = id;
};
window.handleDelete = handleDelete;
// 通用弹窗关闭
const handleCommonCancel = (params) => {
    data.isCommon = false;
};

//打开详情
const handleDetail = (id, InvoiceType) => {
    data.recordId = id;
    data.InvoiceType = InvoiceType;
    data.isDetail = true;
}
window.handleDetail = handleDetail;
//获取统计数据
const getStatistics = () => {
    proxy.$get(Interface.contract.invoice.statistics, {
        Type: 7,
        objtypecode: 1090
    }).then(res => {
        console.log('res', res);
        data.statistics = res.data.listData.Table[0];
    })
};
onMounted(() => {
    changeHeight();
    window.addEventListener('resize', changeHeight)
    getTabs();
    getStatistics();
})
</script>
<style lang="less">
@import "@/style/flow/treeList.less";
</style>
<style lang="less" scoped>
.InvoiceAdminWrap {
    .wea-left-tree-search {
        padding-left: 14px;
    }

    .wea-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eaeaea;
        padding-right: 0;
    }

    .treeRow {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 10px;

        .num {
            color: #aaa;
        }
    }

    .todo-content .ant-row .wea-left-right-layout-left .wea-left-tree .wea-left-tree-search {
        padding-left: 14px;
    }

    :where(.css-dev-only-do-not-override-kqecok).ant-col-5 {
        max-width: unset !important;
        width: 220px !important;
        flex: unset;
    }

    :where(.css-dev-only-do-not-override-kqecok).ant-col-19 {
        max-width: 100% !important;
        flex: 1;
    }

    :where(.css-dev-only-do-not-override-kqecok).ant-input {
        border-color: #d9d9d9;
    }

    .ant-row .wea-left-right-layout-left .wea-left-tree .wea-left-tree-scroll .ant-tree-treenode:hover .tree-num {
        display: none;
    }

    .statistics {
        display: flex;
        padding: 10px;
        background: #efeff4;

        .statisticItem {
            flex: 1;
            border: 1px solid #eee;
            margin-right: 10px;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 80px;
            border: 1px solid #e5e5e5 !important;
            border-left: 5px solid #e5e5e5 !important;
            color: #666;
            line-height: 1.6;
            background: #fff;

            .statisticLeft {
                .statisticCount {
                    font-weight: 700;
                    font-size: 22px;
                }
            }

            .statisticRight {
                .icon {
                    font-size: 44px;
                    color: var(--textColor);
                    position: relative;
                    top: -1px;
                }
            }
        }

        .statisticItem:last-child {
            margin-right: 0;
        }
    }

    :deep .badge {
        display: block;
        margin: 0 auto;
        width: 69px;
        line-height: 24px;
        color: #fff;
        background: #8DAAFF;
        font-size: 12px;
        border-radius: 10px;
        text-align: center;
        height: 23px;
        box-sizing: border-box;
    }

    :deep .PaymentPercentage {
        font-size: 12px;

        .td-progress {
            margin: 0 !important;

            .ant-progress-inner {
                background-color: #e5e5e5;
                border-radius: 6px;
            }

            .ant-progress-outer {
                padding-top: 3px !important;
            }

            .ant-progress-bg {
                background-color: #1677ff !important;
                border-radius: 6px;
            }

            .anticon-check-circle,
            .ant-progress-text {
                display: none !important;
            }
        }

        .td-progress-text {
            margin-top: 2px;
            color: #666;
            margin-left: 1px;
        }
    }
}

:deep .iconBox {
    text-align: center;

    .popup {
        text-align: left;
        top: 20px;
    }

    .moreaction {
        padding: 0px 1px;
        width: 18px;
        border: 1px solid #dedede;
        border-radius: 4px;
        position: relative;
        top: 1px;
    }
}
</style>