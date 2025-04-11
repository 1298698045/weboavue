<template>
    <div style="height: 100%;">
        <div class="relatedListWrap" v-if="relatedList.length">
            <div class="left_relateds">
                <div class="search-related">
                    <a-input placeholder="搜索" v-model:value="searchVal"
                        @pressEnter="getRelatedListInfo">
                        <template #prefix>
                            <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search"
                                aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                <g>
                                    <path
                                        d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z">
                                    </path>
                                </g>
                            </svg>
                        </template>
                    </a-input>
                </div>
                <ul class="relatedMenu">
                    <li class="relatedMenuItem" :class="{'active':currentTab==index}"
                        v-for="(item, index) in relatedList" :key="index" @click="changeMenuTabs(item, index)">
                        {{item.label}}
                    </li>
                </ul>
            </div>
            <div class="right_RelatedGrid">
                <div class="relatedHead">
                    <!-- <h2 class="relatedHeadName">
                        {{ relatedName }}
                    </h2> -->
                    <div class="related-module-info">
                        <div class="module-img" :style="{background:themeInfo?.color ? themeInfo?.color:'red'}">
                            <img class="img" :src="Interface.pathUrl+themeInfo?.iconUrl" alt="" />
                        </div>
                        <div class="module-title">{{ relatedName }}</div>
                    </div>
                    <div class="relatedHeadActions">
                        <div class="fh-btn-group ml10">
                            <div class="fh-btn" v-for="(item, index) in actionList.slice(0,3)" :key="index"
                                @click="handleBtnActions(item.apiName)">{{item.label}}</div>
                            <a-dropdown :trigger="['click']" v-if="actionList.length > 3">
                                <div class="fh-btn fh-btn-icon">
                                    <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                        lwc-6qul4k2dv7m="" data-key="down" class="slds-icon slds-icon_x-small">
                                        <g lwc-6qul4k2dv7m="">
                                            <path
                                                d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                                                lwc-6qul4k2dv7m=""></path>
                                        </g>
                                    </svg>
                                </div>
                                <template #overlay>
                                    <a-menu :trigger="['click']"
                                        style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
                                        <a-menu-item
                                            style="min-width: 98px;padding: 8px 12px; color:#355d96;font-size: 12px;"
                                            v-for="(item, index) in actionList.slice(3)" :key="item.apiName">
                                            {{ item.label }}
                                        </a-menu-item>
                                    </a-menu>
                                </template>
                            </a-dropdown>
                        </div>
                        <a-dropdown :trigger="['click']">
                            <a-button class="ml10 btnMore">
                                <svg class="btn_icon" focusable="false" aria-hidden="true" viewBox="0 0 520 520"
                                    part="icon" lwc-31cpu082oko="" data-key="settings">
                                    <g lwc-31cpu082oko="">
                                        <path
                                            d="M261 191c-39 0-70 31-70 70s31 70 70 70 70-31 70-70-31-70-70-70zm210 133l-37-31a195 195 0 000-68l37-31c12-10 16-28 8-42l-16-28a34 34 0 00-40-14l-46 17a168 168 0 00-59-34l-8-47c-3-16-17-25-33-25h-32c-16 0-30 9-33 25l-8 46a180 180 0 00-60 34l-46-17-11-2c-12 0-23 6-29 16l-16 28c-8 14-5 32 8 42l37 31a195 195 0 000 68l-37 31a34 34 0 00-8 42l16 28a34 34 0 0040 14l46-17c18 16 38 27 59 34l8 48a33 33 0 0033 27h32c16 0 30-12 33-28l8-48a170 170 0 0062-37l43 17 12 2c12 0 23-6 29-16l15-26c9-11 5-29-7-39zm-210 47c-61 0-110-49-110-110s49-110 110-110 110 49 110 110-49 110-110 110z"
                                            lwc-31cpu082oko=""></path>
                                    </g>
                                </svg>
                                <svg class="btn_icon btn_icon_small" focusable="false" aria-hidden="true"
                                    viewBox="0 0 520 520" part="icon" lwc-6qul4k2dv7m="" data-key="down">
                                    <g lwc-6qul4k2dv7m="">
                                        <path
                                            d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                                            lwc-6qul4k2dv7m=""></path>
                                    </g>
                                </svg>
                            </a-button>
                            <template #overlay>
                                <a-menu :trigger="['click']"
                                        style="padding: 10px 0;border: 1px solid #333;border-radius: 4px;">
                                    <a-menu-item style="min-width: 98px;padding: 8px 12px; color:#355d96;font-size: 12px;" key="1">
                                        设置显示列
                                    </a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                        <!-- <div class="btnBox" v-for="(item, index) in actionList" :key="index">
                            <div class="fh-btn-group ml10" v-if="Array.isArray(item)">
                                <div class="fh-btn" v-for="(row, idx) in item" :key="idx" @click="handleBtnActions(row.devNameOrId)">{{row.label}}</div>
                            </div>
                            <a-button class="ml10" @click="handleBtnActions(item.devNameOrId)" v-else>{{ item.label }}</a-button>
                        </div> -->
                    </div>
                </div>
                <div class="relatedBody">
                    <TableList ref="tableRef" :columns="columns" :gridUrl="gridUrl" :id="id" :relatedId="relatedId"
                        :relatedEntityName="relatedEntityName" :fieldApiName="fieldApiName" @changeBtn="changeBtn" />
                </div>
            </div>
        </div>
        <div class="empty" v-else>
            <img src="@/assets/img/OpenRoad.svg" alt="">
            <div class="empty-desc">没有相关列表</div>
        </div>
    </div>
    <common-form-modal :isShow="isCommon" v-if="isCommon" @cancel="isCommon=false" :title="modalTitle"
        @success="loadRelatedQuery" :id="relatedRowId" :objectTypeCode="objectTypeCode"
        :entityApiName="relatedEntityName" :relatedObjectAttributeName="fieldApiName"
        :relatedObjectAttributeValue="relatedObjectAttributeValue"></common-form-modal>
    <Delete :isShow="isDelete" v-if="isDelete" desc="是否确定要删除？" @cancel="isDelete=false" @ok="getRelatedListLoad"
        :sObjectName="relatedEntityName" :recordId="relatedRowId" />
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
        },
        themeInfo: {},
        searchVal: ""
    })
    const { relatedList, currentTab, relatedId, columns, gridUrl, actions, queryParams,
        relatedListId, relatedEntityName, fieldApiName, pageNumber, pageSize, relatedName, actionList, isCommon,
        relatedRowId, objectTypeCode, entityApiName, isDelete, relatedObjectAttributeValue, themeInfo, searchVal
    } = toRefs(data);
    if (props.fullName) {
        data.relatedObjectAttributeValue.name = props.fullName;
        data.relatedObjectAttributeValue.value = props.id;
    }
    const modalTitle = computed(() => {
        let str = '新建';
        if (data.relatedRowId != '') {
            str = '编辑';
        }
        let title = str + data.relatedName
        return title;
    })

    const handleBtnActions = (type) => {
        console.log("type", type);
        if (type == 'New') {
            data.relatedRowId = '';
            data.isCommon = true;
        }
    }
    const getRelatedListInfo = () => {
        let obj = {
            actions: [{
                id: "562;a",
                descriptor: "serviceComponent://ui.global.components.one.actionsManager.ActionsManagerController/ACTION$handleAction",
                callingDescriptor: "UNKNOWN",
                params: {
                    parentObjectApiName: props.entityApiName,
                    layoutId: "",
                    search: data.searchVal
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detailObj.relatedListInfo, d).then(res => {
            data.relatedList = res.actions[0].returnValue;
            if(data.relatedList.length){
                data.relatedId = data.relatedList[0].id;
                data.relatedName = data.relatedList[0].label;
                data.relatedListId = data.relatedList[0].relatedListId;
                data.relatedEntityName = data.relatedList[0].objectApiName;
                data.fieldApiName = data.relatedList[0].fieldApiName;
                data.themeInfo = data.relatedList[0].themeInfo;
                getRelatedActions();
                getListColumn();
            }
        })
    };

    getRelatedListInfo();

    const getListColumn = () => {
        let obj = {
            actions: [{
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
        proxy.$post(Interface.detailObj.relatedListColumn, d).then(res => {
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
        data.relatedName = item.label;
        data.themeInfo = item.themeInfo;
        getListColumn();
        getRelatedActions();
    }

    const getRelatedActions = () => {
        let obj = {
            actions: [{
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
                    actionNames: [],
                    enableActionsConfiguration: false,
                    isLABPreview: false,
                    actionsRequestId: 2
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detailObj.relatedActions, d).then(res => {
            console.log("res", res);
            let actionList = res.actions[0].returnValue.actions
            data.actionList = actionList;
            // var temp = [];
            // for (var i = 0; i < actionList.length; i++) {
            //     let item = actionList[i];
            //     if (item.isSeparator) {
            //         temp.push([item]);
            //     } else {
            //         if (Array.isArray(temp[temp.length - 1])) {
            //             temp[temp.length - 1].push(item);
            //         } else {
            //             // temp.push(item);
            //           (temp[0] ||= []).push(item);

            //         }
            //     }
            // }
            // data.actionList = temp;
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
        if (action.devNameOrId == 'Edit') {
            data.isCommon = true;
        } else if (action.devNameOrId == 'Delete') {
            data.isDelete = true;
        }
    }
</script>
<style lang="less" scoped>
    .relatedListWrap {
        display: flex;
        height: 100%;

        .left_relateds {
            width: 15%;
            height: 100%;
            border-right: 1px solid #e2e3e5;
            /* overflow-y: auto; */
            min-width: 15%;
            .search-related{
                padding: 10px 5px;
            }
            .relatedMenu {
                height: calc(100% - 52px);
                overflow-y: auto;
                .relatedMenuItem {
                    height: 35px;
                    line-height: 35px;
                    padding: 0 20px;
                    cursor: pointer;

                    &:hover {
                        background: rgba(0, 0, 0, 0.06);
                    }

                    &.active {
                        font-weight: bold;
                        box-shadow: #4194f9 4px 0 0 inset;
                        background: rgba(65, 148, 249, 0.1);
                    }
                }
            }
        }

        .right_RelatedGrid {
            /* flex: 1; */
            width: 85%;
            height: 100%;
            box-shadow: 0 2px 10px 0 rgba(0, 0, 0, .05);
            border: 1px solid #c9c9c9;
            border-left: none;
            border-radius: 0 4px 4px 4px;

            .relatedHead {
                padding: 0 8px;
                height: 71px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #f3f3f3;
                border-bottom: 1px solid #e2e3e5;

                .relatedHeadName {
                    font-size: 18px;
                }
            }
            .relatedBody{
                width: 100%;
                height: calc(100% - 71px);
            }
        }
    }

    .relatedHeadActions {
        display: flex;
    }

    .related-module-info {
        display: flex;
        align-items: center;

        .module-img {
            width: 32px;
            height: 32px;
            border-radius: 4px;
            margin-right: 12px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .module-title {
            color: #444444;
            font-weight: bold;
        }
    }

    .empty {
        text-align: center;
        margin-top: 20px;

        img {
            max-width: 600px;
            max-height: 400px;
        }

        .empty-desc {
            line-height: 1.25;
            color: #444444;
            font-size: 18px;
        }
    }
</style>