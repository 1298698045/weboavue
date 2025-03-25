<template>
    <div class="MoreContentWrap">
        <!-- <div class="headerBar">
            <div class="headerLeft">
                <div class="icon-circle-base" style="background: #217346;">
                    <img :src="require('@/assets/img/rightMenu/xiaozu.png')" alt="">
                </div>
                <span class="headerTitle">小组</span>
            </div>
            <div class="headerRight">
                <a-button class="ml10" type="primary" @click="handleNew">新建</a-button>
            </div>
        </div> -->
        <div class="todoListWrap">
            <div class="leftTree" v-if="isLeft">
                <div>
                    <div class="wea-left-tree-search wea-left-tree-search-MoreContentWrap">
                        <a-input-search v-model:value="searchTreeVal" placeholder="输入查询栏目" @search="onSearchTree" />
                    </div>
                </div>
                <div class="leftTreeWrap">
                    <a-tree :tree-data="treeData" block-node :selectedKeys="selectedKeys" :fieldNames="fieldNames"
                        @select="handleTreeSelect" @expand="onExpand" :expanded-keys="expandedKeys"
                        :auto-expand-parent="autoExpandParent">
                        <template #switcherIcon="{ switcherCls }">
                            <CaretDownOutlined :class="switcherCls" style="color: rgb(163, 163, 163); font-size: 14px">
                            </CaretDownOutlined>
                        </template>
                        <template #title="{ name }">
                            <span>{{ name }}</span>
                        </template>
                    </a-tree>
                </div>
            </div>
            <div class="rightContainer">
                <div class="sanlan" :class="{ 'active': !isLeft }" @click="handleLeftShow">
                    <!-- <span class="icon">
                        <LeftOutlined v-if="isLeft" />
                        <RightOutlined v-else />
                    </span> -->
                </div>
                <div class="rightTab">
                    <a-tabs v-model:activeKey="activeKey" @change="changeRightTab">
                        <a-tab-pane key="1">
                            <template #tab>未读<span class="unreadcount">{{ unreadcount || 0 }}</span></template>
                        </a-tab-pane>
                        <a-tab-pane key="2">
                            <template #tab>已读</template>
                        </a-tab-pane>
                        <a-tab-pane key="3" tab="全部"></a-tab-pane>
                    </a-tabs>
                    <div class="rWrap">
                        <a-button class="ml10">批量导出</a-button>
                        <!-- <a-input-search
                            class="ml10"
                            v-model:value="searchVal"
                            placeholder="请输入关键字"
                            style="width: 150px;"
                            @search="onSearch"
                        /> -->
                        <!-- <a-dropdown class="ml10">
                            <template #overlay>
                              <a-menu @click="handleMenuClick">
                                <a-menu-item key="1" @click="choiceSort('全部','')">
                                  全部
                                </a-menu-item>
                                <a-menu-item key="2" @click="choiceSort('按名称(A-Z)','Pinyin')">
                                    按名称(A-Z)
                                </a-menu-item>
                                <a-menu-item key="3" @click="choiceSort('按工号','EmployeeId')">
                                    按工号
                                </a-menu-item>
                              </a-menu>
                            </template>
                            <a-button>
                              {{sortField.name}}
                              <SortAscendingOutlined />
                            </a-button>
                          </a-dropdown> -->
                    </div>
                </div>
                <div class="rightHeader">
                    <div class="lform">
                        <!-- <a-input-search class="ml10" v-model:value="searchVal" placeholder="搜索此列表" style="width: 200px;"
                            @search="onSearch" /> -->
                        <a-form :model="formState" ref="formRef">
                            <a-form-item name="Name">
                                <a-input v-model:value="formState.Name" placeholder="请输入标题"></a-input>
                            </a-form-item>
                            <a-form-item name="time" class="timeForm">
                                <a-range-picker v-model:value="formState.time" format="YYYY-MM-DD"
                                    value-format="YYYY-MM-DD" allow-clear />
                            </a-form-item>
                            <a-form-item name="BusinessUnitId" class="searchItem">
                                <a-select mode="single" v-model:value="formState.BusinessUnitId"
                                    :default-active-first-option="false" :filter-option="false" showSearch
                                    @dropdownVisibleChange="(e) => { searchlookup('', 10, 'BusinessUnitId') }"
                                    @search="(e) => { searchlookup(e, 10, 'BusinessUnitId'); }" placeholder="请选择部门">
                                    <template #suffixIcon></template>
                                    <a-select-option v-for="(item, index) in search.BusinessUnitId" :key="index"
                                        :value="item.ID">{{
                                            item.Name }}</a-select-option>
                                </a-select>
                                <div class="selectIcon">
                                    <SearchOutlined class="ant-select-suffix"
                                        @click="handleOpenLook(10, 'BusinessUnitId')" />
                                </div>
                            </a-form-item>
                        </a-form>
                    </div>
                    <div class="rBtns">
                        <a-button class="ml10" type="primary" @click="onSearch">查询</a-button>
                        <a-button class="ml10" @click="onClear">重置</a-button>
                        <!-- <a-button class="ml10" type="primary">新建</a-button> -->
                    </div>
                </div>
                <div class="tableWrap" ref="tablelist">
                    <a-table style="height: 100%;" :scroll="{ y: tableHeight }" :dataSource="dataSource"
                        :columns="columns" :pagination="data.pagination" @change="handleTableChange">
                        <template #bodyCell="{ column, text, record }">
                            <!-- <div v-if="column.key == 'AvatarUrl'">
                                <img :src="record.AvatarUrl ? '/' + Interface.viewAvatar + '/Group/' + record.id : defaultImg"
                                    :on-error="defaultImg" alt="" class="group_list_avatar" />
                            </div> -->
                            <div v-if="column.key == 'Title'">
                                <a href="javascript:;" @click="handleDetail(record.id)"
                                    style="color:var(--textColor);">{{ text }}</a>
                            </div>
                            <!-- <div v-if="column.key == 'Action'">
                                <div class="iconBox">
                                    <div class="popup">
                                        <div class="option-item" @click="handleDetail(record.id)">查看</div>
                                        <div class="option-item" @click="handleEdit(record.id)">编辑</div>
                                        <div class="option-item" @click="handleDelete(record.id)">删除</div>
                                    </div>
                                    <svg class="moreaction" width="15" height="20" viewBox="0 0 520 520" fill="none"
                                        role="presentation" data-v-69a58868="">
                                        <path
                                            d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                                            fill="#747474" data-v-69a58868=""></path>
                                    </svg>
                                </div>
                            </div> -->
                        </template>
                    </a-table>
                </div>
            </div>
        </div>
        <!-- <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="recordId?'编辑':'新建'" @load="onSearch" :id="recordId" :objectTypeCode="objectTypeCode" :entityApiName="sObjectName"></common-form-modal> -->
        <add-group :isShow="isCommon" v-if="isCommon" @cancel="handleCommonCancel" :title="recordId ? '编辑' : '新建'"
            @load="onSearch" :id="recordId"></add-group>
        <Delete :isShow="isDelete" :desc="deleteDesc" @cancel="cancelDelete" @ok="onSearch" :sObjectName="sObjectName"
            :recordId="recordId" :objTypeCode="objectTypeCode" :external="external" />
        <radio-dept v-if="isRadioDept" :isShow="isRadioDept" @cancel="cancelDeptModal" @selectVal="handleDeptParams" />
    </div>
</template>
<script setup>
import {
    ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, defineProps, defineExpose,
    defineEmits, h
} from "vue";
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
import { useRouter, useRoute } from "vue-router";
import { SearchOutlined, MoreOutlined, CopyOutlined, SortAscendingOutlined, LeftOutlined, RightOutlined, PlusOutlined, CaretDownOutlined } from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import { formTreeData, girdFormatterValue } from "@/utils/common.js";
import { message } from "ant-design-vue";
//import CommonFormModal from "@/components/listView/CommonFormModal.vue";
import Delete from "@/components/listView/Delete.vue";
import AddGroup from "@/components/groupDetail/AddGroup.vue";
import RadioDept from "@/components/commonModal/RadioDept.vue";
const tablelist = ref();
const { proxy } = getCurrentInstance();
const router = useRouter();
const formRef = ref();
const autoExpandParent = ref(true);
const expandedKeys = ref([]);
const onExpand = (keys) => {
    expandedKeys.value = keys;
    autoExpandParent.value = false;
};
const data = reactive({
    treeData: [],
    treeDataAll: [],
    pageNumber: 1,
    pageSize: 12,
    listData: [],
    searchVal: "",
    total: 0,
    isLeft: true,
    selectedKeys: [],
    dataSource: [],
    columns: [
        // {
        //     title: '头像',
        //     dataIndex: 'AvatarUrl',
        //     key: 'AvatarUrl',
        //     width: 120
        // },
        {
            title: '标题',
            dataIndex: 'Title',
            key: 'Title',
        },
        {
            title: '发布时间',
            dataIndex: 'CreatedOn',
            key: 'CreatedOn',
            width: 200
        },
        {
            title: '栏目',
            dataIndex: 'FolderId',
            key: 'FolderId',
            width: 200
        },
        {
            title: '发布部门',
            dataIndex: 'BusinessUnitId',
            key: 'BusinessUnitId',
            width: 200
        },
        {
            title: '发布人',
            dataIndex: 'CreatedBy',
            key: 'CreatedBy',
            width: 200
        },
        // {
        //     title: '操作',
        //     dataIndex: 'Action',
        //     key: 'Action',
        //     width: 120
        // },
    ],
    groupList: [],
    groupListAll: [],
    isCommon: false,
    recordId: '',
    objectTypeCode: '9',
    sObjectName: 'Group',
    isDelete: false,
    deleteDesc: '确定要删除吗？',
    external: false,
    pagination: {
        hideOnSinglePage: false,
        showSizeChanger: true,
        showQuickJumper: true,
        total: 0,//数据总数
        pageSize: 10,
        current: 1,
        showTotal: ((total) => {
            return `共${total}条`
        })
    },
    tableHeight: 0,
    defaultImg: require('@/assets/img/avatar-r.png'),
    searchTreeVal: '',
    search: {
        EmployeeId: [],
        BusinessUnitId: []
    },
    isRadioDept: false,
    fieldName: "",
    lookEntityApiName: "",
    activeKey: "1",
    fieldNames: {
        children: 'children', title: 'name', key: 'id'
    },
    SelectKey: '',
    SelectName: '',
    folderActionsConfig: {
        canAdd: false,
        canAdmin: false,
        canDelete: false,
        canRead: false
    },
    unreadcount: 0
})
const { unreadcount, SelectKey, SelectName, folderActionsConfig, treeDataAll, fieldNames, activeKey, isRadioDept, fieldName, lookEntityApiName, search, groupListAll, searchTreeVal, treeData, pageNumber, pageSize, listData, defaultImg,
    searchVal, total, isLeft, selectedKeys, dataSource, columns, groupList, isCommon, recordId, objectTypeCode, sObjectName, isDelete, deleteDesc, external, pagination, tableHeight } = toRefs(data);

const formState = reactive({
    Name: "",
    startDate: "",
    endDate: "",
    time: null,
    BusinessUnitId: undefined,
});
const handleTreeSelect = (keys, { node }) => {
    if (keys && keys.length) {
        data.folderActionsConfig = {
            canAdd: false,
            canAdmin: false,
            canDelete: false,
            canRead: false
        }
        data.SelectKey = node.id;
        data.SelectName = node.name;
        data.selectedKeys = [node.id];
        if (node.folderActionsConfig) {
            data.folderActionsConfig = node.folderActionsConfig;
        }
    }
    data.pagination.current = 1;
    getQuery();
}
const handleLeftShow = () => {
    data.isLeft = !data.isLeft;
}
const getQuery = () => {
    let url = Interface.list2;
    let filterQuery = '';
    if (formState.time && formState.time.length && formState.time[0] && formState.time[1]) {
        filterQuery += '\nCreatedOn\tgt\t' + formState.time[0];
        filterQuery += '\nCreatedOn\tlt\t' + formState.time[1];
    }
    if (formState.BusinessUnitId) {
        filterQuery += '\nBusinessUnitId\teq\t' + formState.BusinessUnitId;
    }
    if (data.SelectKey) {
        filterQuery += '\nFolderId\teq\t' + data.SelectKey;
    }
    let d = {
        filterId: '',
        objectTypeCode: '2021',
        entityName: 'RecordReadLog',
        filterQuery: filterQuery,
        search: formState.Name || '',
        page: data.pagination.current,
        rows: data.pagination.pageSize,
        sort: 'CreatedOn',
        order: 'desc',
        displayColumns: 'Name,ObjectId,CreatedOn,FolderId,BusinessUnitId,CreatedBy'
    }
    if (data.activeKey * 1 == 1) {
        data.unreadcount = 0;
        d.filterQuery += '\nReaderId\teq-userid\nIsRead\tneq\ttrue';
    }
    else if (data.activeKey * 1 == 2) {
        d.filterQuery += '\nReaderId\teq-userid\nIsRead\teq\ttrue';
    }
    else {
        // d.objectTypeCode = '100201';
        // d.entityName = 'Content';
        // d.displayColumns = 'Name,Title,CreatedOn,FolderId,BusinessUnitId,CreatedBy';
    }
    data.dataSource = [];
    data.pagination.total = 0;
    proxy.$post(url, d).then(res => {
        let list = [];
        if (res && res.nodes) {
            data.pagination.total = res.pageInfo ? res.pageInfo.total : 0;
            if (data.activeKey * 1 == 1) {
                data.unreadcount = res.pageInfo ? res.pageInfo.total : 0;
            }
            for (var i = 0; i < res.nodes.length; i++) {
                var item = res.nodes[i];
                for (var cell in item) {
                    if (cell != 'id' && cell != 'nameField') {
                        item[cell] = girdFormatterValue(cell, item);
                    }
                    if (cell == 'Title') {
                        item.Name = item.Title || item.ObjectId;
                    }
                    if (cell == 'CreatedOn') {
                        item[cell] = item[cell] ? dayjs(item[cell]).format("YYYY-MM-DD HH:mm") : '';
                    }
                }
                list.push(item);
            }
        }
        data.dataSource = list;
    })
}
getQuery();
const onSearch = (e) => {
    getQuery();
}
const onClear = (e) => {
    data.folderActionsConfig = {
        canAdd: false,
        canAdmin: false,
        canDelete: false,
        canRead: false
    }
    data.SelectKey = '';
    data.SelectName = '';
    data.selectedKeys = [];
    formRef.value.resetFields();
    getQuery();
}
const handleMenuClick = (e) => {
    console.log("e", e);
}
const handleDetail = (id) => {
    let routeData = router.resolve({
        name: 'ContentView',
        query: {
            id: id,
            objectTypeCode: 100201
        }
    });
    window.open(routeData.href, '_blank');
}
//改变页码
const handleTableChange = (pag, filters, sorter) => {
    data.pagination.current = pag.current;
    data.pagination.pageSize = pag.pageSize
    getQuery();
}
//新建
const handleNew = (e) => {
    data.recordId = '';
    data.isCommon = true;
}
//编辑
const handleEdit = (key) => {
    console.log(key, 2222222)
    data.recordId = key;
    data.isCommon = true;
}
// 通用弹窗关闭
const handleCommonCancel = (params) => {
    data.isCommon = false;
};
//删除
const handleDelete = (key) => {
    data.recordId = key;
    data.isDelete = true;
}
//删除关闭
const cancelDelete = (e) => {
    data.isDelete = false;
};
const getTreeData = () => {
    let filterQuery = '';
    data.treeData = [];
    data.treeDataAll = [];
    let url = Interface.content.folder.get;
    let d = {
        actions: [{
        id: "2919;a",
        descriptor: "",
        callingDescriptor: "UNKNOWN",
        params: {
        }
        }]
    };
    let obj = {
        message: JSON.stringify(d)
    }
    proxy.$post(url, obj).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
            let formTree = (list) => {
                list.forEach(item => {
                    if (item.children) {
                        formTree(item.children);
                    }
                    item.key = item.id;
                    item.value = item.id;
                    item.isFavor = item.isFavor || false;
                })
            }
            let response = res.actions[0].returnValue;
            formTree(response);
            console.log("formTree", response);
            data.treeData = response;
            data.treeDataAll = response;
        }
    })
}
getTreeData();
const uniqu = (array, name) => {
    var arr = []
    for (var j = 0; j < array.length; j++) {
        if (JSON.stringify(arr).indexOf(array[j][name]) == -1) {
            arr.push(array[j])
        }
    }
    return arr
}
const searchlookup = (search, Lktp, fieldApiName) => {
    let obj = {
        actions: [{
            id: "6129;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                objectApiName: 'Content',
                fieldApiName: fieldApiName,
                pageParam: 1,
                pageSize: 25,
                q: search,
                searchType: "Recent",
                targetApiName: 'BusinessUnit',
                body: {
                    sourceRecord: {
                        apiName: 'Content',
                        fields: {
                            Id: null,
                            RecordTypeId: ""
                        }
                    }
                }
            }
        }]
    }
    if (Lktp * 1 == 10) {
        obj.actions[0].params.targetApiName = 'BusinessUnit';
    }
    let d = {
        message: JSON.stringify(obj)
    }
    proxy.$post(Interface.lookup, d).then(res => {
        let list = res.actions[0].returnValue.lookupResults.records;
        let arr = [];
        list.forEach(item => {
            arr.push({
                ID: item.fields.Id.value,
                Name: item.fields.Name.value
            })
        });
        data.search[fieldApiName] = data.search[fieldApiName].concat(arr);
        data.search[fieldApiName] = uniqu(data.search[fieldApiName], 'ID');
    })

};
const handleOpenLook = (Lktp, fieldApiName) => {
    data.fieldName = fieldApiName;
    if (Lktp * 1 == 10) {
        data.lookEntityApiName = "BusinessUnit";
        data.isRadioDept = true;
    }
}
const cancelDeptModal = () => {
    data.isRadioDept = false;
};
const handleDeptParams = (e) => {
    console.log('e123', e);
    if (data.search[data.fieldName]) { } else {
        data.search[data.fieldName] = [];
    }
    let isBook = data.search[data.fieldName].some(item => item.ID == e.ID);
    if (!isBook) {
        data.search[data.fieldName].push({
            Name: e.Name,
            ID: e.ID
        })
    }
    formState[data.fieldName] = e.ID;
    data.isRadioDept = false;
};
const onSearchTree = (e) => {
    data.treeData = data.treeDataAll.filter(item => {
        return item.name.indexOf(data.searchTreeVal) !== -1;
    })
};
// 右侧tab
const changeRightTab = (e) => {
    data.activeKey = e;
    data.pagination.current = 1;
    getQuery();
}
function changeHeight() {
    let h = tablelist.value.clientHeight;
    data.tableHeight = h - 40;
    getQuery();
}
onMounted(() => {
    let h = tablelist.value.clientHeight;
    data.tableHeight = h - 40;
    window.addEventListener('resize', changeHeight)
})
</script>
<style lang="less" scoped>
:deep .ant-tabs .ant-tabs-nav {
    margin: 0 !important;
}

.MoreContentWrap {
    width: 100%;
    height: 100%;
    background: #fff;

    .todoListWrap {
        height: calc(~"100% - 0px");
        display: flex;

        .leftTree {
            width: 252px;
            height: 100%;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            padding: 20px;
            box-sizing: border-box;

            /* overflow: auto; */
            .switchWrap {
                margin-bottom: 15px;
                margin-top: 20px;
                text-align: center;

                .spaceWrap {
                    padding: 3px 4px;
                    box-sizing: border-box;
                    background: #f2f3f5;
                    margin: 0 auto;
                    display: inline-block;

                    .spaceItem {
                        line-height: 26px;
                        padding: 0 16px;
                        font-size: 14px;
                        background: transparent;
                        color: #4e5969;
                        cursor: pointer;
                        border-radius: 2px;
                        display: inline-block;
                    }

                    .spaceItem.active {
                        background: #fff;
                        color: var(--textColor);
                        font-weight: bold;
                    }

                    .spaceItem:hover {
                        background: #fff;
                        color: #4e5969;
                    }
                }
            }

            .leftTreeWrap {
                height: calc(~"100% - 42px");
                overflow: auto;
                margin-top: 16px;
            }

            .personalWrap {
                .rowMyGroup {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 10px 0;
                    color: #86909c;
                    padding-left: 24px;
                }
            }
        }

        .rightContainer {
            flex: 1;
            height: 100%;
            padding: 16px 20px;
            background: #fff;
            border-left: 1px solid #e5e6eb;
            box-sizing: border-box;
            position: relative;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            width: calc(100% - 252px);

            .rightTab {
                width: 100%;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid rgba(5, 5, 5, 0.06);

            }
        }
    }
}

:deep .ant-pagination {
    text-align: right;
}

.businessWrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    height: calc(~"100% - 52px");
    margin-bottom: 20px;
    overflow: auto;
}

.businessWrapper {
    width: 100%;
    height: calc(~"100% - 55px");
    padding-top: 20px;
}

.businessWrap .businessCartItem {
    width: 24%;
    height: 216px;
    border: 1px solid #e5e6eb;
    background: #fff;
    border-radius: 4px;
    margin-bottom: 16px;
    padding: 16px;
    box-sizing: border-box;
    cursor: pointer;
}

.minBoxWrap {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
}

.businessWrap .fake_item {
    flex: 0 0 24%;
    height: 0;
}

.businessWrap .businessCartItem:hover {
    box-shadow: 4px 4px 10px 0px rgba(0, 0, 0, .1);
}

.businessWrap .businessCartItem .cartItemHead {
    display: flex;
}

.businessWrap .businessCartItem .cartItemHead .cartAvatar {
    width: 62px;
    height: 62px;
    border-radius: 50%;
}

.businessWrap .businessCartItem .cartItemHead .cartAvatar .img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.businessWrap .businessCartItem .cartItemHead .cartAvatar .iconfont {
    color: #C9CDD4;
    text-align: center;
    font-size: 62px;
}

.businessWrap .businessCartItem .cartItemHead .cartInfo {
    flex: 1;
    margin-left: 10px;
}

.businessWrap .businessCartItem .cartItemHead .cartInfo .name {
    font-size: 14px;
    color: #1d2129;
    font-weight: bold;
}

.businessWrap .businessCartItem .cartItemHead .cartInfo .depart {
    color: #4e5969;
    line-height: 20px;
}

.businessWrap .businessCartItem .cartItemHead .cartInfo .desc {
    color: #86909c;
}

.businessWrap .businessCartItem .phoneBox {
    margin-top: 24px;
}

.businessWrap .businessCartItem .departWrap .name {
    font-weight: bold;
}

.businessWrap .businessCartItem .departWrap .phoneBox {
    margin-top: 11px;
}

.businessWrap .businessCartItem .departWrap .peoples {
    position: relative;
    margin-top: 30px;
    display: flex;
    align-items: center;
}

.businessWrap .businessCartItem .departWrap .peoples span .iconfont {
    font-size: 20px;
}

.businessWrap .businessCartItem .departWrap .peoples .text {
    color: #86909c;
    /*margin-left: 100px;*/
}

.businessWrap .businessCartItem .label {
    color: #86909c;
}

.businessWrap .businessCartItem .val {
    color: #4e5969;
    font-size: 14px;
    line-height: 1.7;

}

.businessWrap .businessCartItem .emailBox {
    margin-top: 11px;
}

.businessWrap .businessCartItem .copyBoxWrap {
    display: inline-block;
}

.businessWrap .businessCartItem .copyBoxWrap .copyIconBox {
    display: inline-block;
    position: relative;
}

.businessWrap .businessCartItem .copyBoxWrap .copyIconBox .iconfont {
    font-size: 14px;
    color: #4e5969;
}

.businessWrap .businessCartItem .copyBoxWrap:hover .child_tips {
    display: block;
}

.businessWrap .businessCartItem .child_tips {
    position: absolute;
    bottom: 120%;
    left: -22px;
    border-radius: 2px;
    width: 62px;
    height: 34px;
    background: rgba(0, 0, 0, 0.8);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, .2);
    color: #fff;
    text-align: center;
    line-height: 34px;
    box-sizing: border-box;
    border-radius: 2px;
    display: none;
}

.businessWrap .businessCartItem .child_tips .popper__arrow {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
    border-color: transparent;
    border-style: solid;
    border-width: 6px;
    bottom: -6px;
    border-top-color: #303133;
    border-bottom-width: 0;
    left: calc(50% - 6px);
}

.sanlan {
    width: 18px;
    height: 60px;
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -30px;
    z-index: 11;
    cursor: pointer;
    background: url("~@/assets/img/leftTree-show.png") no-repeat -2px 0;
}

.sanlan:hover {
    background: url("~@/assets/img/leftTree-show-hover.png") no-repeat -2px 0;
}

.sanlan.active {
    background: url("~@/assets/img/leftTree-hide.png") no-repeat -2px 0;
}

.sanlan.active:hover {
    background: url("~@/assets/img/leftTree-hide-hover.png") no-repeat -2px 0;
}

.rightContainer {
    .rightHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20px 0;
    }

    .tableWrap {
        height: calc(~"100% - 115px");
    }
}

.group_list_avatar {
    height: 40px;
}

.MoreContentWrap {
    :deep .ant-table-tbody .ant-table-cell {
        padding: 8px 16px !important;
    }

    :deep .ant-tabs-tab {
        padding: 12px 6px !important;
        margin-right: 20px !important;
    }

    .group_list_avatar {
        position: relative;
        top: 4px;
    }

    .iconBox .moreaction {
        padding: 0px 1px;
        width: 18px;
        border: 1px solid #dedede;
        border-radius: 4px;
        position: relative;
        top: 1px;
    }

    .iconBox .popup {
        top: 25px;
        right: 0;
        width: max-content;
        min-width: 88px;
    }

    :deep .ant-table-wrapper .ant-table-thead>tr>th {
        background-color: #f7fbfe !important;
        padding: 8.5px 16px !important;
    }

    :deep .ant-table-tbody tr:hover,
    :deep .ant-table-tbody tr:hover td {
        background-color: #e9f7ff !important;
        color: #108def !important;
    }

    :deep .ant-table-tbody tr:nth-child(odd) {
        background-color: rgb(250, 250, 250) !important;
        /* 奇数行背景色 */
    }

    :deep .ant-table-tbody tr:nth-child(even) {
        background-color: #fff !important;
        /* 偶数行背景色 */
    }

    :deep .ant-pagination {
        .ant-pagination-item {
            border: 1px solid #d9d9d9;
        }

        .ant-pagination-item:hover {
            border: 1px solid #1677ff;
            background: #fff !important;
        }

        .ant-pagination-item-active,
        .ant-pagination-item-active:hover {
            border: 1px solid #1677ff;
            background: #1677ff !important;

            a {
                color: #fff;
            }
        }
    }

    .lform {
        .ant-form {
            display: flex !important;

            .ant-form-item {
                position: relative !important;
                margin-bottom: 0 !important;
                margin-right: 10px !important;
                min-width: 180px;
                max-width: 230px
            }

            .ant-picker-active-bar {
                width: 0 !important;
            }
        }
    }

    .ant-picker,
    .ant-select-selector,
    .ant-input {
        border-radius: 4px !important;
    }

    :deep .ant-spin-container,
    :deep .ant-table-wrapper,
    :deep .ant-spin-nested-loading,
    :deep .ant-table-container {
        height: 100% !important;
    }

    .rightContainer .tableWrap[data-v-e6568ab1] {
        height: calc(100% - 170px);
    }

    :deep .anticon {
        color: #9999 !important;
    }

    :deep .anticon-swap-right {
        position: relative;
        left: -3px;
    }

    .unreadcount {
        color: red;
        margin-left: 5px;
        font-weight: bold;
    }

    :deep .ant-tree-switcher .ant-tree-switcher-icon {
        position: relative;
        top: 2px;
        left: 5px;
    }
}
</style>