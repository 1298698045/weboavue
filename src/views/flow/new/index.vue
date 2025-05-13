<template>
    <div class="todoListWrap">
        <div class="todoList">
            <div class="headerBar">
                <div class="headerLeft">
                    <div class="icon-circle-base">
                        <img :src="require('@/assets/img/rightMenu/morenliucheng.png')" alt="">
                    </div>
                    <span class="headerTitle">新建流程</span>
                </div>
            </div>
            <div class="todo-content">
                <div class="newFlowWrap">
                    <div class="webTabs">
                        <a-tabs v-model:activeKey="activeKey" @change="changeTab">
                            <a-tab-pane :key="1" tab="全部流程"></a-tab-pane>
                            <a-tab-pane :key="2" tab="我的收藏"></a-tab-pane>
                            <a-tab-pane :key="3" tab="最近使用"></a-tab-pane>
                        </a-tabs>
                        <a-input-search v-model:value="searchVal" placeholder="搜索流程" style="width: 200px"
                            @search="onSearch" />
                    </div>
                    <div class="flowContainer">
                        <div class="flowTypes">
                            <div class="flowTypeItem" :class="{ 'active': typeIndex === '' }"
                                @click="handleTabTypes({}, '')">
                                全部
                            </div>
                            <a class="flowTypeItem" :class="{ 'active': typeIndex === item.categoryId }"
                                v-for="(item, index) in processLists" :key="index"
                                @click="handleTabTypes(item, item.categoryId)">
                                {{ item.name }}
                            </a>
                        </div>
                        <div class="flowContent">
                            <template v-for="(item, index) in processLists" :key="index">
                                <div class="flowPanelItem" :id="item.categoryId"
                                    :style="{ 'borderColor': colors[index % 7] }"
                                    v-if="(typeIndex == item.categoryId || typeIndex == '') && item.Processes && item.Processes.length">
                                    <div class="flowPanelItemHead">
                                        <div class="typeName">
                                            <FileTextOutlined :style="{ 'color': colors[index % 7] }" />{{ item.name }}
                                            ({{
                                                item.Processes && item.Processes.length ? item.Processes.length : 0 }})
                                        </div>
                                    </div>
                                    <div class="flowPanelItemBd">
                                        <div class="flowRowItem" v-for="(row, idx) in item.Processes" :key="idx"
                                            @click="handleStartProcess(row)">
                                            <div class="flowName rowEllipsis">
                                                <a-tooltip :overlayClassName="'flowRowItem-tooltip'">
                                                    <template #title>{{ row.name }}</template>
                                                    {{ row.name }}
                                                </a-tooltip>
                                            </div>
                                            <div class="collectionIcon" :class="{ 'active': row.isFavorite }"
                                                @click.stop="handleFavorite(row)">
                                                <a-tooltip :overlayClassName="'flowRowItem-tooltip'">
                                                    <template #title>{{ row.isFavorite ? '取消收藏' : '收藏' }}</template>
                                                    <i class="iconfont icon-quxiaoshoucang" v-if="row.isFavorite"></i>
                                                    <i class="iconfont icon-tianjiashoucang" v-else></i>
                                                </a-tooltip>
                                            </div>
                                            <div class="collectionIcon" @click.stop="handleBatchStartProcess(row)">
                                                <a-tooltip :overlayClassName="'flowRowItem-tooltip'">
                                                    <template #title>{{ '批量发起' }}</template>
                                                    <i class="iconfont icon-tianjia"></i>
                                                </a-tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal">
            <a-modal v-model:open="isModal" width="550px" :style="setTop" :maskClosable="false" @cancel="handleCancel" @ok="handleOk">
                <template #title>
                    <div>
                        新建流程事务
                    </div>
                </template>
                <div class="modalContainer">
                    <div class="modalCenter" style="height:421px !important;">
                        <a-form ref="formRef" :label-col="labelCol" class="CreateProcess" :model="formState">
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
        <BatchNew
        v-if="isBatchNew"
        :isShow="isBatchNew"
        :name="formState.ProcessName"
        :row="data.rowRecord"
        @cancel="isBatchNew = false"
        />
    </div>
</template>
<script setup>
import "@/style/flow/icon/iconfont.css";
import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineEmits, toRaw, watch, computed } from "vue";
import { HeartFilled, FileTextOutlined } from "@ant-design/icons-vue";
import Interface from "@/utils/Interface.js";
import BatchNew from "@/components/workflow/BatchNew.vue";
const { proxy } = getCurrentInstance();
import { message } from "ant-design-vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const data = reactive({
    searchVal: "",
    currentTab: 0,
    currentTab2: 0,
    processLists: [],
    rowRecord: {},
    activeKey: 1,
    typeIndex: "",
    userId: '',
    colors: ['rgb(85, 210, 212)', 'rgb(55, 178, 255)', 'rgb(255, 94, 86)', 'rgb(179, 123, 250)', 'rgb(255, 198, 46)', 'rgb(255, 149, 55)', 'rgb(141, 206, 54)'],
    isBatchNew: false
})
const { userId, colors, searchVal, processLists, currentTab, currentTab2, rowRecord, activeKey, typeIndex, isBatchNew } = toRefs(data);
const getProcessType = () => {
    data.processLists = [];
    let obj = {
        actions: [{
            id: "4270;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                search: data.searchVal
            }
        }]
    }
    let d = {
        message: JSON.stringify(obj)
    }
    proxy.$post(Interface.workflow.processType, d).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.rows && res.actions[0].returnValue.rows.length) {
            for (var i = 0; i < res.actions[0].returnValue.rows.length; i++) {
                var item = res.actions[0].returnValue.rows[i];
                item.Processes = [];
                data.processLists.push(item);
            }
            data.processLists.push({
                name: '其他',
                categoryId: '123',
                Processes: []
            })
            getProcessList();
        }
    })
}

const getProcessList = () => {
    let url = '';
    if (data.activeKey == 1) {
        url = Interface.workflow.getAuthorizedProcess;
    } else if (data.activeKey == 2) {
        url = Interface.workflow.getFavorites;
    } else if (data.activeKey == 3) {
        url = Interface.workflow.getCommonUses;
    }
    for (var m = 0; m < data.processLists.length; m++) {
        data.processLists[m].Processes = [];
    }
    let obj = {
        actions: [{
            id: "4270;a",
            descriptor: "",
            callingDescriptor: "UNKNOWN",
            params: {
                search: data.searchVal
            }
        }]
    }
    let d = {
        message: JSON.stringify(obj)
    }
    proxy.$post(url, d).then(res => {
        if (res && res.actions && res.actions[0] && res.actions[0].returnValue && res.actions[0].returnValue.rows && res.actions[0].returnValue.rows.length) {
            for (var i = 0; i < res.actions[0].returnValue.rows.length; i++) {
                var item = res.actions[0].returnValue.rows[i];
                var isHasFolder = false;
                if (item && item.name && item.name.indexOf(data.searchVal) != -1) {
                    for (var j = 0; j < data.processLists.length; j++) {
                        var type = data.processLists[j];
                        if (item.folderId == type.categoryId) {
                            data.processLists[j].Processes.push(item);
                            isHasFolder = true;
                        }
                    }
                    if (!isHasFolder) {
                        (data.processLists[data.processLists.length - 1]).Processes.push(item);
                    }
                }
            }
        }
    })
}

const changeTab = (e) => {
    //console.log('e',e)
    data.activeKey = e;
    getProcessList();
}
const onSearch = (e) => {
    //console.log('e',e)
    getProcessList();
}
// 弹窗
const isModal = ref(false);
const labelCol = ref({ style: { width: '100px' } });
const formState = reactive({
    ProcessName: "",
    BusinessUnitId: "",
    Title: "",
    Priority: "0",
    Description: "",
    BusinessUnitList: [],
})
//发起流程
const handleStartProcess = (row) => {
    formState.ProcessName = row.name;
    data.rowRecord = row;
    //getUserInfo();
    getDeptList();
    isModal.value = true;
}
//批量发起
const handleBatchStartProcess = (row) => {
    formState.ProcessName = row.name;
    data.rowRecord = row;
    data.isBatchNew = true;
}
const handleFavorite = (row) => {
    if (!row.isFavorite) {
        let url = Interface.create;
        let d = {
            actions: [{
                id: "2919;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordInput: {
                        allowSaveOnDuplicate: false,
                        apiName: 'WFProcessFavorite',
                        objTypeCode: '20608',
                        fields: {
                            Name: row.name,
                            ProcessId: row.processId,
                            CreatedBy: data.userId
                        }
                    }
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        }
        proxy.$post(url, obj).then(res => {
            if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].state == 'SUCCESS') {
                message.success("收藏成功！");
                getProcessList();
            }
            else {
                if (res && res.actions && res.actions[0] && res.actions[0].state && res.actions[0].errorMessage) {
                    message.success(res.actions[0].errorMessage);
                }
                else {
                    message.success("收藏失败！");
                }
            }
        });
    }
    else {
        let filterQuery = '\nProcessId\teq\t' + row.processId + '\nCreatedBy\teq\t' + data.userId;
        proxy.$post(Interface.list2, {
            filterId: '',
            objectTypeCode: '20608',
            entityName: 'WFProcessFavorite',
            filterQuery: filterQuery,
            search: '',
            page: 1,
            rows: 10,
            sort: 'CreatedOn',
            order: 'DESC',
            displayColumns: 'Name'
        }).then(res => {
            if (res && res.nodes && res.nodes.length) {
                let obj = {
                    actions: [{
                        id: "2919;a",
                        descriptor: "",
                        callingDescriptor: "UNKNOWN",
                        params: {
                            recordId: res.nodes[0].id,
                            apiName: 'WFProcessFavorite',
                            objTypeCode: '20608',
                        }
                    }]
                };
                let d = {
                    message: JSON.stringify(obj)
                };
                proxy.$post(Interface.delete, d).then(res => {
                    if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
                        message.success("取消收藏成功");
                        getProcessList();
                    } else {
                        if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
                            message.success(res.actions[0].errorMessage);
                        }
                        else {
                            message.error("取消收藏失败");
                        }
                    }
                })
            }
        })

    }
}
const handleOk = () => {
    isModal.value = false;
}
const handleCancel = () => {
    isModal.value = false;
}
const formRef = ref();
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

const getUserInfo = async () => {
    // await proxy.$get(Interface.userInfo,{}).then(res=>{

    // })
}
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
const scrollToAnchor = (event, item) => {
    event.preventDefault();
    const anchorElement = document.getElementById(item.AppId);
    if (anchorElement) {
        anchorElement.scrollIntoView({ behavior: 'smooth' });
    }
};
const handleTabTypes = (item, index) => {
    data.typeIndex = index;
};
const setTop = computed(() => ({
  top: `calc(50% - 290px)`,
}));
onMounted(() => {
    let userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
        data.userId = userInfo.userId;
    }
    getProcessType();
})
</script>
<style lang="less" scoped>
@import "@/style/flow/treeList.less";

.newFlowWrap {
    height: 100%;

    .webTabs {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #eaeaea;
        padding-right: 10px;

        :deep .ant-tabs-nav::before {
            border-bottom: none !important;
        }
    }

    .flowContainer {
        padding: 20px;
        height: calc(~"100% - 44px");
        overflow-y: auto;

        .flowTypes {
            display: flex;
            flex-wrap: wrap;

            .flowTypeItem {
                padding: 5px 10px;
                background: #f5f5f5;
                border-radius: 1px;
                margin-right: 2px;
                cursor: pointer;
                font-weight: bold;
                margin-bottom: 2px;
                color: #333;

                &:hover,
                &.active {
                    background: #108ee9;
                    color: #fff;
                }
            }
        }

        .flowContent {
            margin-top: 20px;

            .flowPanelItem {
                padding: 0 20px;
                //border: 1px solid #f5f5f5;
                height: auto !important;
                padding-bottom: 10px;
                margin-bottom: 20px;
                border-top: 4px solid #55d2d4;

                .flowPanelItemHead {
                    padding: 10px 0;

                    .typeName {
                        color: #55d2d4;
                        font-weight: bold;
                    }
                }

                .flowPanelItemBd {
                    display: flex;
                    flex-wrap: wrap;

                    .flowRowItem {
                        width: calc(~"20% - 10px");
                        height: 58px;
                        background: #f5f5f5;
                        margin-bottom: 10px;
                        cursor: pointer;
                        padding: 16px 24px 16px 10px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-right: 10px;

                        &:hover {
                            box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);

                            .collectionIcon {
                                visibility: visible;
                            }
                        }

                        .flowName {
                            color: #1d2129;
                            font-weight: bold;
                            flex: 1;
                        }

                        .collectionIcon {
                            visibility: hidden;
                            margin-left: 10px;
                            &.active {
                                visibility: visible;
                                color: #f7ba1e;
                            }

                            .icon-tianjiashoucang {
                                opacity: .6;

                                &:hover {
                                    opacity: 1;
                                }
                            }
                            .icon-tianjia{
                                opacity: .6;
                                font-size: 13px;
                                &:hover {
                                    opacity: 1;
                                }
                            }
                        }
                    }

                    .flowRowItem:nth-child(5n) {
                        margin-right: 0 !important;
                    }
                }
            }
        }

        .flowContent {
            margin-top: 15px;
            column-count: 4;
            column-gap: 15px;
            column-width: 10px;

            .flowPanelItem {
                //width: 24%;
                margin: 0 0 15px 0;
                height: auto;
                background: #f5f5f5;
                height: 100%;
                padding: 0;
                padding-bottom: 10px;
                break-inside: avoid;

                .flowPanelItemHead {
                    padding: 20px 0;

                    .typeName {
                        font-size: 16px;
                        width: 100%;
                        text-align: center;
                        color: #292929;
                        font-weight: normal;

                        .anticon {
                            font-size: 26px;
                            margin-right: 8px;
                            position: relative;
                            top: 4px;
                        }
                    }
                }

                .flowPanelItemBd {
                    .flowRowItem {
                        width: calc(~'100% - 0px');
                        height: 20px !important;
                        margin-right: 0;
                        padding: 16px 24px 16px 26px;
                        font-size: 12px;
                        margin: 0;

                        .flowName {
                            font-weight: normal;
                            color: #7a7a7a;
                            font-size: 13px;
                        }

                        .iconfont {
                            font-size: 14px;
                        }
                    }

                    .flowRowItem:hover {
                        box-shadow: none;
                    }
                }
            }

            .flowPanelItem:hover {
                background: #fff;
                //border-left:1px solid #dedede !important;
                //border-right:1px solid #dedede !important;
                //border-bottom:1px solid #dedede !important;
                box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.2);

                .flowRowItem {
                    background: #fff;
                }

                .flowRowItem:hover {
                    background: #f5f5f5;
                }
            }
        }

        .flowTypes {
            .flowTypeItem {
                margin-right: 8px;
                margin-bottom: 8px;
                font-weight: normal;
                font-size: 14px;
            }
        }
    }

}

:deep .CreateProcess {
    .ant-form-item {
        margin-bottom: 20px !important;
    }

    .processTitle .ant-row .ant-col .ant-form-item-required {
        color: rgba(0, 0, 0, 0.88) !important;
    }

    .processTitle .ant-row .form-tip1 {
        color: rgba(0, 0, 0, 0.88) !important;
    }

    .ProcessName {
        color: rgba(0, 0, 0, 0.88) !important;
    }

    .form-tip {
        font-size: 12px;
        margin-bottom: 12px;
        color: #606266;
    }
}

.todoListWrap {
    height: 100%;
}
.ant-tooltip.flowRowItem-tooltip{
    .ant-tooltip-inner {
    padding: 9px 8px;
  }
}
</style>