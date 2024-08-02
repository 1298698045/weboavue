<template>
    <div class="relatedListWrap">
        <div class="left_relateds">
            <ul class="relatedMenu">
                <li class="relatedMenuItem" :class="{'active':currentTab==index}" v-for="(item, index) in relatedList" :key="index" @click="changeMenuTabs(item, index)">
                    {{item.label}} (1)
                </li>
            </ul>
        </div>
        <div class="right_RelatedGrid">
            <div class="relatedHead">
                <h2 class="relatedHeadName">
                    {{ relatedName }}
                </h2>
                <div class="relatedHeadActions">
                    <div class="btnBox" v-for="(item, index) in actionList" :key="index">
                        <div class="btnGroup ml10" v-if="Array.isArray(item)">
                          <a-button
                            v-for="(row, idx) in item"
                            :key="idx"
                            @click="handleBtnActions(row.devNameOrId)"
                            >{{ row.label }}</a-button
                          >
                        </div>
                        <a-button class="ml10" @click="handleBtnActions(item.devNameOrId)" v-else>{{ item.label }}</a-button>
                    </div>
                </div>
            </div>
            <TableList ref="tableRef" :columns="columns" :gridUrl="gridUrl" :id="id" :relatedId="relatedId" :relatedEntityName="relatedEntityName" :fieldApiName="fieldApiName" @changeBtn="changeBtn" />
        </div>
    </div>
    <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="isCommon=false" :title="modalTitle" @success="loadRelatedQuery" :id="relatedRowId" :objectTypeCode="objectTypeCode" :entityApiName="relatedEntityName" :relatedObjectAttributeName="fieldApiName" :relatedObjectAttributeValue="relatedObjectAttributeValue"></common-form-modal>
    <Delete
        :isShow="isDelete"
        v-if="isDelete"
        desc="是否确定要删除？"
        @cancel="isDelete=false"
        @ok="getRelatedListLoad"
        :sObjectName="relatedEntityName"
        :recordId="relatedRowId"
      />
</template>
<script setup>
    import { ref, reactive, onMounted, toRefs, getCurrentInstance, defineProps, defineEmits, toRaw, computed } from "vue";
    import {
        UnorderedListOutlined,
        DownOutlined,
        CaretDownOutlined,
        DeleteFilled,
        DeleteOutlined
    } from "@ant-design/icons-vue";
    import TableList from "@/components/detail/TableList.vue";
    import CommonFormModal from "@/components/listView/CommonFormModal.vue";
    import Delete from "@/components/listView/Delete.vue";

    import Interface from "@/utils/Interface.js";
    const tableRef = ref(null);
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        id: String,
        objectTypeCode: String,
        entityApiName: String,
        fullName: String
    });
    const data = reactive({
        relatedList: [],
        currentTab: 0,
        relatedId: "",
        columns: [],
        gridUrl: Interface.detailObj.relatedListData,
        actions: [],
        queryParams: {},
        relatedListId: "",
        relatedEntityName: "",
        fieldApiName: "",
        pageNumber: 1,
        pageSize: 10,
        relatedName: "",
        actionList: [],
        isCommon: false,
        relatedRowId: "",
        objectTypeCode: "",
        entityApiName: "",
        isDelete: false,
        relatedObjectAttributeValue: {
            name: "",
            value: ""
        }
    })
    const { relatedList, currentTab, relatedId, columns, gridUrl, actions, queryParams,
        relatedListId, relatedEntityName, fieldApiName,  pageNumber, pageSize, relatedName, actionList, isCommon,
        relatedRowId, objectTypeCode, entityApiName, isDelete, relatedObjectAttributeValue
     } = toRefs(data);
    if(props.fullName){
        data.relatedObjectAttributeValue.name = props.fullName;
        data.relatedObjectAttributeValue.value = props.id;
    }
    const modalTitle = computed(()=>{
        let str = '新建';
        if(data.relatedRowId!=''){
            str = '编辑';
        }
        let title = str + data.relatedName
        return title;
    })

    const handleBtnActions = (type) => {
        console.log("type", type);
        if(type=='New'){
            data.relatedRowId = '';
            data.isCommon = true;
        }
    }
    const getRelatedListInfo = () => {
        let obj = {
            actions:[{
                id: "562;a",
                descriptor: "serviceComponent://ui.global.components.one.actionsManager.ActionsManagerController/ACTION$handleAction",
                callingDescriptor: "UNKNOWN",
                params: {
                    parentObjectApiName: props.entityApiName,
                    layoutId: ""
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detailObj.relatedListInfo, d).then(res=>{
            data.relatedList = res.actions[0].returnValue;
            data.relatedId = data.relatedList[0].id;
            data.relatedName = data.relatedList[0].label;
            data.relatedListId = data.relatedList[0].relatedListId;
            data.relatedEntityName = data.relatedList[0].objectApiName;
            data.fieldApiName = data.relatedList[0].fieldApiName;
            getRelatedActions();
            getListColumn();
        })
    };

    getRelatedListInfo();

    const getListColumn = () => {
        let obj = {
            actions:[{
                id: "562;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    parentObjectApiName: props.entityApiName,
                    relatedListId: data.relatedId
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detailObj.relatedListColumn, d).then(res=>{
            let { displayColumns } = res.actions[0].returnValue;
            displayColumns.push({
                fieldApiName: "Action"
            })
            data.columns = displayColumns;
        })
    }

    const changeMenuTabs = (item, index) => {
        data.currentTab = index;
        data.relatedId = item.id;
        data.relatedListId = item.relatedListId;
        data.relatedEntityName = item.objectApiName;
        getListColumn();
        getRelatedActions();
    }

    const getRelatedActions = () => {
        let obj = {
            actions:[{
                id: "13285;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: props.id,
                    context: "RELATED_LIST",
                    entityApiName: data.relatedEntityName,
                    record: null,
                    listNameOrId: "CampaignMembers",
                    inContextOfComponent: "force:relatedListCardDesktop",
                    size: 2,
                    maxWidth: -1,
                    actionTypes: [],
                    bulkedAction: false,
                    actionNames:  [],
                    enableActionsConfiguration: false,
                    isLABPreview: false,
                    actionsRequestId: 2
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detailObj.relatedActions, d).then(res=>{
            console.log("res", res);
            let actionList = res.actions[0].returnValue;
            var temp = [];
            for (var i = 0; i < actionList.length; i++) {
                let item = actionList[i];
                if (item.isSeparator) {
                    temp.push([item]);
                } else {
                    if (Array.isArray(temp[temp.length - 1])) {
                        temp[temp.length - 1].push(item);
                    } else {
                        temp.push(item);
                    }
                }
            }
            data.actionList = temp;
        })
    }
    const getRelatedListLoad = () => {
        tableRef.value.loadGrid();
    }

    const loadRelatedQuery = () => {
        data.isCommon = false;
        getRelatedListLoad();
    };
    
    const changeBtn = (action, item) => {
        console.log(action, item);
        data.relatedRowId = item.id;
        if(action.devNameOrId=='Edit'){
            data.isCommon = true;
        } else if(action.devNameOrId == 'Delete'){
            data.isDelete = true;
        }
    }
</script>
<style lang="less" scoped>
    .relatedListWrap{
        display: flex;
        height: 100%;
        .left_relateds{
            width: 15%;
            height: 100%;
            border-right: 1px solid #e2e3e5;
            overflow-y: auto;
            .relatedMenu{
                .relatedMenuItem{
                    height: 35px;
                    line-height: 35px;
                    padding: 0 20px;
                    cursor: pointer;
                    &:hover{
                        background: rgba(0, 0, 0, 0.06);
                    }
                    &.active{
                        font-weight: bold;
                        box-shadow: #4194f9 4px 0 0 inset;
                        background: rgba(65, 148, 249, 0.1) ;
                    }
                }
            }
        }
        .right_RelatedGrid{
            flex: 1;
            height: 100%;
            .relatedHead{
                padding: 0 8px;
                height: 71px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .relatedHeadName{
                    font-size: 18px;
                }
            }
        }
    }
    .relatedHeadActions{
        display: flex;
    }
</style>