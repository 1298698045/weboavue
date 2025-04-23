<template>
    <div class="todoList ContractAuditWrap">
        <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base">
                    <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
                </div>
                <span class="headerTitle">合同审计</span>
            </div>
            <div class="headerRight">
                <a-button type="primary" class="ml10" @click="handleNew">新增审计合同</a-button>
                <a-button type="primary" class="ml10">批量删除</a-button>
                <a-button type="primary" class="ml10">审计抽查</a-button>
                <a-button type="primary" class="ml10">生成审计报告</a-button>
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
                                    <div class="statisticName">合同总数</div>
                                    <div class="statisticCount">
                                        {{ statistics.ContractNumber }}
                                    </div>
                                </div>
                                <div class="statisticRight">
                                    <p class="icon">
                                        <FileTextOutlined />
                                    </p>
                                </div>
                            </div>
                            <div class="statisticItem">
                                <div class="statisticLeft">
                                    <div class="statisticName">合同总金额</div>
                                    <div class="statisticCount">{{ statistics.Total }}</div>
                                </div>
                                <div class="statisticRight">
                                    <p class="icon">
                                        <PayCircleOutlined />
                                    </p>
                                </div>
                            </div>
                            <div class="statisticItem">
                                <div class="statisticLeft">
                                    <div class="statisticName">履行中金额</div>
                                    <div class="statisticCount">
                                        {{ statistics.ImplementTotal }}
                                    </div>
                                </div>
                                <div class="statisticRight">
                                    <p class="icon">
                                        <PayCircleOutlined />
                                    </p>
                                </div>
                            </div>
                            <div class="statisticItem">
                                <div class="statisticLeft">
                                    <div class="statisticName">暂停合同总金额</div>
                                    <div class="statisticCount">{{ statistics.StopTotal }}</div>
                                </div>
                                <div class="statisticRight">
                                    <p class="icon">
                                        <PayCircleOutlined />
                                    </p>
                                </div>
                            </div>
                            <div class="statisticItem">
                                <div class="statisticLeft">
                                    <div class="statisticName">解除合同总金额</div>
                                    <div class="statisticCount">
                                        {{ statistics.SuspendedTotal }}
                                    </div>
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
            :objectTypeCode="data.queryParams.objectTypeCode" :entityApiName="data.queryParams.entityName"
            :relatedObjectAttributeValue="relatedObjectAttributeValue"
            :relatedObjectAttributeName="relatedObjectAttributeName"></common-form-modal>
        <Delete :isShow="isDelete" v-if="isDelete" :desc="deleteDesc" @cancel="isDelete = false" @ok="handleSearch('')"
            :sObjectName="data.queryParams.entityName" :recordId="recordId"
            :objTypeCode="data.queryParams.objectTypeCode" :external="external" />
        <RelatedDetail v-if="isDetail" :isShow="isDetail" :sObjectName="data.queryParams.entityName" :title="'审计详情'"
            :objectTypeCode="data.queryParams.objectTypeCode" :id="recordId" @cancel="isDetail = false" />
        <div class="modal">
            <a-modal v-model:open="isModal" width="550px" :style="'top:' + top + 'px'" :maskClosable="false"
                @cancel="handleCancel" @ok="handleOk">
                <template #title>
                    <div>
                        新建审计合同
                    </div>
                </template>
                <div class="modalContainer">
                    <div class="modalCenter" style="height:440px;">
                        <a-form ref="formRef" :label-col="labelCol" class="CreateProcess1" :model="formState">
                            <div class="form-tip">请输入流程事务标题，建立事务</div>
                            <a-form-item label="流程：" name="ProcessName">
                                <div class="ProcessName">{{ formState.ProcessName || '' }}</div>
                            </a-form-item>
                            <a-form-item name="BusinessUnitId" label="创建身份："
                                :rules="[{ required: true, message: '请选择发起部门' }]">
                                <a-select v-model:value="formState.BusinessUnitId">
                                    <a-select-option v-for="(item, index) in formState.BusinessUnitList" :key="index"
                                        :value="item.BusinessUnitId">{{ item.organizationIdName }}/{{
                                            item.businessUnitIdName
                                        }}</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item class="processTitle" label="标题：" name="Title"
                                :rules="[{ required: true, message: '标题不能为空' }]">
                                <a-input v-model:value="formState.Title" />
                                <div class="form-tip1">默认标题是 流程名称 部门名称，为了查询方便，请输入流程真实标题。</div>
                                <div class="form-tip1">如收文 关于XX来文 XX科室 XX人。</div>
                            </a-form-item>
                            <a-form-item name="Priority" label="紧急程度：">
                                <a-select v-model:value="formState.Priority">
                                    <a-select-option value="0">普通</a-select-option>
                                    <a-select-option value="1">紧急</a-select-option>
                                    <a-select-option value="2">加急</a-select-option>
                                </a-select>
                            </a-form-item>
                            <a-form-item label="备注：" name="Description">
                                <a-textarea :rows="3" v-model:value="formState.Description" />
                            </a-form-item>
                        </a-form>
                    </div>
                </div>
                <template #footer>
                    <div>
                        <a-button type="primary" @click.prevent="handleSubmit">确定</a-button>
                        <a-button @click="handleCancel">取消</a-button>
                    </div>
                </template>
            </a-modal>
        </div>
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
import { formTreeData, girdFormatterValue } from "@/utils/common.js";
import HighSearch from "@/components/HighSearch.vue";
import RelatedDetail from "@/components/commonModal/RelatedDetail.vue";
const route = useRoute();
const router = useRouter();
const { proxy } = getCurrentInstance();
const handleOk = () => {
    isModal.value = false;
}
const handleCancel = () => {
    isModal.value = false;
}
const formRef = ref();
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
    entityType: 'C85',
    queryParams: {
        filterId: '',
        objectTypeCode: '10185',
        entityName: 'ContractAudit',
        //filterQuery:'\nCreatedBy\teq-userid',
        //displayColumns:'',
        sort: 'CreatedOn',
        order: 'desc'
    },
    layoutName: 'ContractAudit',
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
    objectTypeCode: '10185',
    sObjectName: 'ContractAudit',
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
    rowRecord: {},
    top: 0,
    isStatistics: false,
    statistics: {},
    hightSearchParams: {}
});
const { queryParams, hightSearchParams, statistics, isStatistics, top, rowRecord, entityId, isNew, isDetail, fileList, uploadData, headers, isDelete, deleteDesc, external, isCommon, recordId, objectTypeCode, sObjectName, relatedObjectAttributeValue, relatedObjectAttributeName, isCollapsed, tableHeight, fieldNames, tabs, activeKey, isModal, isCirculation, searchVal, entityType, layoutName,
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

function changeHeight(h) {
    if (typeof h == 'number') {
        formSearchHeight.value = h;
    }
    let contentHeight = document.documentElement.clientHeight - 120;
    let tabsHeight = 46;
    let height = contentHeight - tabsHeight - 4;
    data.tableHeight = height;
    if (data.isStatistics) {
        data.tableHeight = height - 100;
    }
    data.top = (document.documentElement.clientHeight - 565) / 2;

}

const handleSearch = (obj) => {
    data.queryParams = {
        filterId: data.queryParams.filterId,
        objectTypeCode: '10185',
        entityName: 'ContractAudit',
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
                <div class="option-item" id=${row.id} onclick="handleToDo2('${row.id}')">查看审批单</div>
                <div class="option-item" id=${row.id} onclick="handleDetail('${row.id}','${row.viewUrl}')">查看</div>
                <div class="option-item" id=${row.id} onclick="handleEdit('${row.id}')">编辑</div>
                <div class="option-item" id=${row.id} onclick="handleDelete('${row.id}')">删除</div>
              </div>
              <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></div>
          `
            if (data.activeKey * 1 == 0) {
                str = `
                  <div class="iconBox">
              <div class="popup">
                <div class="option-item" id=${row.id} onclick="handleToDo('${row.id}')">审批</div>
                <div class="option-item" id=${row.id} onclick="handleDetail('${row.viewUrl}')">查看</div>
                <div class="option-item" id=${row.id} onclick="handleEdit('${row.id}')">编辑</div>
                <div class="option-item" id=${row.id} onclick="handleDelete('${row.id}')">删除</div>
              </div>
              <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none" role="presentation" data-v-69a58868=""><path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z" fill="#747474" data-v-69a58868=""></path></svg></div>
          `
            }
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
                        let val = girdFormatterValue(item.name, row);
                        if (data.activeKey * 1 == 0) {
                            url = '/#/lightning/r/Workflow/instance/detail?id=' + row.id + '&reurl=/lightning/page/contract/audit/home';
                        }
                        return '<a class="namefield" title="' + val + '" href="' + url + '" target="_blank">' + val + '</a>';
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
                            color = '#8DAAFF';
                        } else if (StateCode * 1 == 3) {
                            color = '#31BA6A';
                        } else if (StateCode * 1 == 4) {
                            color = '#F9A6AB';
                        } else if (StateCode * 1 == 5) {
                            color = '#555';
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
        objectTypeCode: '10185',
        entityName: 'ContractAudit',
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
const handleNew = () => {
    data.recordId = '';
    data.isCommon = true;
    //data.isNew = true;
}
//新建审计合同
const handleNewForm = () => {
    formState.ProcessName = '合同会签单';
    data.rowRecord = {
        description: null,
        folderId: "C6707ACE-50A5-469E-96CA-B2956B5AC59D",
        isFavorite: false,
        name: "02 合同会签单",
        processId: "A39549B4-6F8F-44FD-93C1-6455B845F765"
    };
    getDeptList();
    data.isModal = true;
}
//编辑
const handleEdit = (id) => {
    data.recordId = id;
    data.isCommon = true;
    //data.isNew = true;
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
//审批
const handleToDo = (id) => {
    let url = router.resolve({
        name: "FlowDetail",
        query: {
            id: id,
            reurl: '/lightning/page/contract/audit/home',
        },
    });
    window.open(url.href);
}
window.handleToDo = handleToDo;
//查看审批单
const handleToDo2 = (id) => {
    let url = router.resolve({
        name: "ProcessInstanceDetail",
        query: {
            id: id,
            entityType: 'WFProcessInstance',
            objectTypeCode: '122'
        },
    });
    window.open(url.href);
}
window.handleToDo2 = handleToDo2;
//打开详情
const handleDetail = (id, viewUrl) => {
    //window.open(viewUrl);
    data.recordId = id;
    data.isDetail = true;
}
window.handleDetail = handleDetail;
//获取统计数据
const getStatistics = () => {
    proxy.$get(Interface.contract.execution.statistics, {
        Type: 0,
        ContractType: 2,
        objtypecode: 1010,
    }).then((res) => {
        //console.log("res", res);
        data.statistics = res.data.listData.Table[0];
    });
};
// 获取部门
const getDeptList = () => {
    // proxy.$get(Interface.businessunitList,{}).then(res=>{
    //     formState.BusinessUnitList = res.businessUnits;
    //     formState.Title = data.rowRecord.name + ' ' + res.businessUnits[0].name;
    //     formState.BusinessUnitId =  res.businessUnits[0].id;
    // })
    const now = new Date();
    const nowtime = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    let userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
        formState.BusinessUnitId = userInfo.businessUnitId;
        data.userId = userInfo.userId;
    }
    proxy.$post(Interface.user.getBusinessUnits, {}).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.length) {
            formState.BusinessUnitList = res.actions[0].returnValue;
            for (var i = 0; i < formState.BusinessUnitList.length; i++) {
                if (formState.BusinessUnitList[i].BusinessUnitId == formState.BusinessUnitId) {
                    formState.Title = data.rowRecord.name + ' ' + formState.BusinessUnitList[i].businessUnitIdName + ' ' + formState.BusinessUnitList[i].FullName + ' ' + nowtime;
                }
            }
        }
    })
};
const handleSubmit = () => {
    formRef.value.validate().then(() => {
        //console.log('values', formState, toRaw(formState));
        let obj = {
            "actions": [
                {
                    "id": "4270;a",
                    "descriptor": "aura://RecordUiController/ACTION$getRecordWithFields",
                    "callingDescriptor": "UNKNOWN",
                    "params": {
                        "processId": data.rowRecord.processId,
                        "priority": formState.Priority,
                        "name": formState.Title,
                        "businessUnitId": formState.BusinessUnitId,
                        "description": formState.Description
                    }
                }
            ]
        };
        let d = {
            message: JSON.stringify(obj)
        };
        proxy.$post(Interface.workflow.new, d).then(res => {
            if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
                message.success("新建流程成功");
                let url = router.resolve({
                    name: "FlowDetail",
                    query: {
                        id: res.actions[0].returnValue.id,
                        reurl: '/lightning/o/workflow/doing'
                    },
                });
                window.open(url.href);
                handleCancel();
            } else {
                if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
                    message.success(res.actions[0].errorMessage);
                }
                else {
                    message.error("新建流程失败");
                }
            }
        })
    }).catch(err => {
        console.log('error', err);
    });
}
onMounted(() => {
    changeHeight();
    data.top = (document.documentElement.clientHeight - 565) / 2;
    window.addEventListener('resize', changeHeight)
    getTabs();
    getStatistics();
})
</script>
<style lang="less">
@import "@/style/flow/treeList.less";
</style>
<style lang="less" scoped>
.ContractAuditWrap {
    .wea-left-tree-search {
        padding-left: 14px;
    }

    .wea-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        //border-bottom: 1px solid #eaeaea;
        padding-right: 0;
        border: 0 !important;
    }

    .todo-content .ant-row .wea-tab {
        height: 45px !important;

        :deep .ant-tabs-nav::before {
            display: none;
        }
    }

    .todo-content .ant-row .wea-tab :deep .ant-tabs .ant-tabs-nav .ant-tabs-nav-wrap {
        height: 45px !important;
    }

    .wea-left-tree-scroll {
        height: calc(~'100% - 50px') !important;
    }

    :deep .namefield {
        color: #1677ff;
        text-decoration: none;
        max-width: 500px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
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