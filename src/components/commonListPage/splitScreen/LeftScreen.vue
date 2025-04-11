<template>
    <div class="leftScreen">
        <div class="left-screen-header">
            <div class="screen-view-row">
                <div class="screen-view-col firstHeaderRow">
                    <div class="media-avatar" :style="{background:initialData?.recordThemeInfo?.primaryPalette ? '#'+initialData?.recordThemeInfo?.primaryPalette:'red'}">
                        <img class="img" :src="Interface.pathUrl+initialData?.recordThemeInfo?.iconImageURL" alt="" />
                    </div>
                    <div class="triggerLinkTextAndIconWrapper" @click.stop="openFilterPicker">
                        <div class="page-header__name-title">
                            <span class="page-header__title">{{ currentFilter.name }}</span>
                        </div>
                        <button class="button button-reset" :class="{active:isFilterPicker}" title="选择列表视图">
                            <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                lwc-6qul4k2dv7m="" data-key="down" class="iconSvg">
                                <g lwc-6qul4k2dv7m="">
                                    <path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                                        lwc-6qul4k2dv7m=""></path>
                                </g>
                            </svg>
                        </button>
                        <div class="listViewPickerPanel" v-if="isFilterPicker" @click.stop>
                            <div class="fh-searchbox">
                                <span class="fh-icon-utility-search">
                                    <svg focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520"
                                        part="icon">
                                        <g>
                                            <path
                                                d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z">
                                            </path>
                                        </g>
                                    </svg>
                                </span>
                                <input class="fh-search" v-model="searchFilterVal" type="text" placeholder="搜索列表..."
                                    @input="serachFilter">
                            </div>
                            <ul class="fh-dropdown__list">
                                <li class="fh-dropdown__header fh-text-heading--label">最近列表视图</li>
                                <li class="fh-dropdown__item" v-for="(item, index) in filterList" :key="index"
                                    @click.stop="handleSwitchFilter(item)">
                                    <a href="javascript:void(0);">
                                        <span class="fh-icon-utility-check">
                                            <svg class="fh-svg" v-if="currentFilter.id == item.id" focusable="false"
                                                data-key="check" aria-hidden="true" viewBox="0 0 520 520" part="icon">
                                                <g>
                                                    <path
                                                        d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z">
                                                    </path>
                                                </g>
                                            </svg>
                                        </span>
                                        <span class="virtualAutocompleteOptionText">
                                            {{item.name}}
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="listViewManagerPinButtonWrapper">
                        <a-tooltip placement="topLeft" title="要取消固定，请固定其他列表视图。">
                            <a-button class="ant-btn-icon pinned" @click="handleLock">
                                <img v-if="isPinned" src="@/assets/pinned14.png" class="pinnedImg" alt="">
                                <img v-else src="@/assets/pin_italic14.png" class="pinnedImg" alt="">
                            </a-button>
                        </a-tooltip>
                    </div>
                </div>
                <div class="screen-view-col btnActions">
                    <a-dropdown :trigger="['click']">
                        <a-button title="操作" class="ant-btn-icon">
                            <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                lwc-6qul4k2dv7m="" data-key="down" class="btn_icon">
                                <g lwc-6qul4k2dv7m="">
                                    <path d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                                        lwc-6qul4k2dv7m=""></path>
                                </g>
                            </svg>
                        </a-button>
                        <template #overlay>
                            <a-menu class="fh-menu" style="width: 136px;" @click="handleClickBtn">
                                <a-menu-item class="menuItem" v-for="(item, index) in actionList"
                                    :key="item.devNameOrId">{{item.label}}</a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </div>
            <div class="screen-view-row" style="margin-top: 12px;">
                <div class="screen-view-col firstHeaderRow">
                    <div class="screen-view-desc">
                        <span class="countSortedByFilteredBy">18 个项目 • </span>
                        <span>已在 4 小时前更新</span>
                    </div>
                </div>
                <div class="screen-view-col btnActions">
                    <a-dropdown class="ml4" :trigger="['click']">
                        <a-tooltip placement="bottomLeft" title="选择列表显示">
                            <button class="button button-reset" :class="{active:isFilterPicker}" title="选择列表视图">
                                <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                    lwc-4md4vihfsb1="" data-key="side_list" class="iconSvg w13">
                                    <g lwc-4md4vihfsb1="">
                                        <path
                                            d="M485 40H215c-8 0-15 7-15 15v410c0 8 7 15 15 15h270c8 0 15-7 15-15V55c0-8-7-15-15-15zm-340 0H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h110c8 0 15-7 15-15V55c0-8-7-15-15-15zm0 120H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h110c8 0 15-7 15-15v-50c0-8-7-15-15-15zm0 120H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h110c8 0 15-7 15-15v-50c0-8-7-15-15-15zm0 120H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h110c8 0 15-7 15-15v-50c0-8-7-15-15-15z"
                                            lwc-4md4vihfsb1=""></path>
                                    </g>
                                </svg>
                                <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                    lwc-6qul4k2dv7m="" data-key="down" class="iconSvg w8">
                                    <g lwc-6qul4k2dv7m="">
                                        <path
                                            d="M83 140h354c10 0 17 13 9 22L273 374c-6 8-19 8-25 0L73 162c-7-9-1-22 10-22z"
                                            lwc-6qul4k2dv7m=""></path>
                                    </g>
                                </svg>
                            </button>
                        </a-tooltip>
                        <template #overlay>
                            <a-menu class="fh-menu listViewMenu" style="width: 136px;" @click="changePageType">
                                <span class="fh-menu-desc" style="font-weight: bold;">选择列表显示</span>
                                <a-menu-item class="listView-menuItem" key="list">
                                    <span class="successIcon">
                                        <svg v-if="viewType == 'list'" focusable="false" aria-hidden="true"
                                            viewBox="0 0 520 520" part="icon" lwc-1e39mgvor8u="" data-key="check"
                                            class="iconSvg">
                                            <g lwc-1e39mgvor8u="">
                                                <path
                                                    d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"
                                                    lwc-1e39mgvor8u=""></path>
                                            </g>
                                        </svg>
                                    </span>
                                    <span class="text">
                                        列表
                                    </span>
                                    <span class="listView-img">
                                        <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                            lwc-798fdvkdslc="" data-key="table" class="iconSvg">
                                            <g lwc-798fdvkdslc="">
                                                <path
                                                    d="M465 20H55c-8 0-15 7-15 15v50c0 8 7 15 15 15h410c8 0 15-7 15-15V35c0-8-7-15-15-15zM145 140H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 240H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 340H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zM145 440H55c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15zm160 0h-90c-8 0-15 7-15 15v30c0 8 7 15 15 15h90c8 0 15-7 15-15v-30c0-8-7-15-15-15z"
                                                    lwc-798fdvkdslc=""></path>
                                            </g>
                                        </svg>
                                    </span>
                                </a-menu-item>
                                <a-menu-item class="listView-menuItem" key="card">
                                    <span class="successIcon">
                                        <svg v-if="viewType == 'card'" focusable="false" aria-hidden="true"
                                            viewBox="0 0 520 520" part="icon" lwc-1e39mgvor8u="" data-key="check"
                                            class="iconSvg">
                                            <g lwc-1e39mgvor8u="">
                                                <path
                                                    d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"
                                                    lwc-1e39mgvor8u=""></path>
                                            </g>
                                        </svg>
                                    </span>
                                    <span class="text">
                                        卡片
                                    </span>
                                    <span class="listView-img">
                                        <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                            lwc-7ieqdqdoapk="" data-key="kanban" class="iconSvg">
                                            <g lwc-7ieqdqdoapk="">
                                                <path
                                                    d="M320 175c0-8-7-15-15-15h-90c-8 0-15 7-15 15v270c0 8 7 15 15 15h90c8 0 15-7 15-15zm-180 0c0-8-7-15-15-15H35c-8 0-15 7-15 15v310c0 8 7 15 15 15h90c8 0 15-7 15-15zm360 0c0-8-7-15-15-15h-90c-8 0-15 7-15 15v230c0 8 7 15 15 15h90c8 0 15-7 15-15zm0-140c0-8-7-15-15-15H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h450c8 0 15-7 15-15z"
                                                    lwc-7ieqdqdoapk=""></path>
                                            </g>
                                        </svg>
                                    </span>
                                </a-menu-item>
                                <a-menu-item class="listView-menuItem" key="screen">
                                    <span class="successIcon">
                                        <svg v-if="viewType == 'screen'" focusable="false" aria-hidden="true"
                                            viewBox="0 0 520 520" part="icon" lwc-1e39mgvor8u="" data-key="check"
                                            class="iconSvg">
                                            <g lwc-1e39mgvor8u="">
                                                <path
                                                    d="M191 425L26 259c-6-6-6-16 0-22l22-22c6-6 16-6 22 0l124 125a10 10 0 0015 0L452 95c6-6 16-6 22 0l22 22c6 6 6 16 0 22L213 425c-6 7-16 7-22 0z"
                                                    lwc-1e39mgvor8u=""></path>
                                            </g>
                                        </svg>
                                    </span>
                                    <span class="text">
                                        分屏视图
                                    </span>
                                    <span class="listView-img">
                                        <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                            lwc-4md4vihfsb1="" data-key="side_list" class="iconSvg">
                                            <g lwc-4md4vihfsb1="">
                                                <path
                                                    d="M485 40H215c-8 0-15 7-15 15v410c0 8 7 15 15 15h270c8 0 15-7 15-15V55c0-8-7-15-15-15zm-340 0H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h110c8 0 15-7 15-15V55c0-8-7-15-15-15zm0 120H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h110c8 0 15-7 15-15v-50c0-8-7-15-15-15zm0 120H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h110c8 0 15-7 15-15v-50c0-8-7-15-15-15zm0 120H35c-8 0-15 7-15 15v50c0 8 7 15 15 15h110c8 0 15-7 15-15v-50c0-8-7-15-15-15z"
                                                    lwc-4md4vihfsb1=""></path>
                                            </g>
                                        </svg>
                                    </span>
                                </a-menu-item>
                            </a-menu>
                        </template>
                    </a-dropdown>
                    <a-tooltip placement="bottomLeft" title="刷新" @click="refreshFilterLoad">
                        <button class="button button-reset" :class="{active:isFilterPicker}" title="选择列表视图">
                            <svg focusable="false" aria-hidden="true" viewBox="0 0 520 520" part="icon"
                                lwc-leb892lm6b="" data-key="refresh" class="iconSvg w13">
                                <g lwc-leb892lm6b="">
                                    <path
                                        d="M465 40h-30c-8 0-15 7-15 15v70c0 9-5 13-12 7l-10-10a210 210 0 10-12 309c7-6 7-16 1-22l-21-21c-5-5-14-6-20-1a152 152 0 01-172 14 152 152 0 0177-281 150 150 0 01118 58c3 8-4 12-13 12h-70c-8 0-15 7-15 15v31c0 8 6 14 14 14h183c7 0 13-6 13-13V55c-1-8-8-15-16-15z"
                                        lwc-leb892lm6b=""></path>
                                </g>
                            </svg>
                        </button>
                    </a-tooltip>
                </div>
            </div>
            <div class="screen-sarch-row">
                <a-tooltip placement="bottomLeft" title="客户所有人别名不可搜索。使用筛选器，或改为对此字段进行排序。">
                    <a-input placeholder="搜索此列表..." v-model:value="queryParams.search" @pressEnter="handleSearch">
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
                </a-tooltip>
            </div>
        </div>
        <div class="left-screen-container">
            <div class="screen-table" ref="tableRef">
                <Dtable ref="gridRef" :columns="columns" :gridUrl="gridUrl" :isCollapsed="false"
                    :tableHeight="(tableHeight)" :singleSelect="true" @onSelect="onSelect"></Dtable>
            </div>
        </div>
    </div>
</template>
<script setup>
    import { ref, watch, reactive, toRefs, onMounted, getCurrentInstance, onUpdated, h, nextTick, defineProps, defineEmits } from "vue";
    import Dtable from "@/components/Dtable.vue";
    import { message } from "ant-design-vue";

    import { useRouter, useRoute } from "vue-router";
    const router = useRouter();
    const route = useRoute();
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const gridRef = ref(null);
    const tableRef = ref(null);
    const emit = defineEmits(['type','params','clickBtn']);


    const props = defineProps({
        entityApiName: String
    })


    const data = reactive({
        filterList: [],
        filterListFixed: [],
        isFilterPicker: false,
        queryParams: {
            entityType: props.entityApiName,
            search: "",
            filterId: "",
            filterCondition: ""
        },
        columns: [],
        gridUrl: Interface.listView.list,
        entityName: props.entityApiName,
        initialData: {},
        currentFilter: {},
        title: "",
        isPinned: false,
        tableHeight: 0,
        actionList: [],
        viewType: 'screen',
        searchFilterVal: "",
        rowId: ""
    });
    const { filterList, filterListFixed, isFilterPicker, queryParams, columns, gridUrl,
        entityName, initialData, currentFilter, title, isPinned, tableHeight, actionList, viewType, searchFilterVal, rowId } = toRefs(data);
    if(props.entityApiName){
        data.queryParams.entityType = props.entityApiName;
        data.entityName = props.entityApiName;
    }

    onMounted(() => {
        window.addEventListener("click", () => {
            data.isFilterPicker = false;
        })
        nextTick(() => {
            data.tableHeight = tableRef.value.clientHeight;
        })
    });

    const onSelect = (e) => {
        console.log("123123", e);
        data.rowId = e.LIST_RECORD_ID;
        emit("params", data.rowId);
    };

    const handleClickBtn = ({ key }) => {
        emit("clickBtn", key);
    }

    const serachFilter = () => {
        data.filterList = data.filterListFixed.filter(item => {
            return item.name.indexOf(data.searchFilterVal) !== -1;
        })
    }
    const changePageType = ({ key }) => {
        data.viewType = key;
        emit("type", { key: key });
    };

    const handleLock = () => {
        data.isPinned = !data.isPinned;
        if (!data.isPinned) { return false }
        let url = Interface.listView.pinListView;
        let d = {
            actions: [{
                id: "7696;a",
                descriptor: "serviceComponent://ui.force.components.controllers.lists.listViewManager.ListViewManagerController/ACTION$updateListView",
                callingDescriptor: "UNKNOWN",
                params: {
                    entityKeyPrefixOrApiName: data.sObjectName,
                    listViewIdOrName: data.currentFilter.id
                }
            }]
        };
        let obj = {
            message: JSON.stringify(d)
        };
        proxy.$post(url, obj).then(res => {
            if (res && res.actions && res.actions[0] && res.actions[0].state == 'SUCCESS') {
                message.success("固定成功");
                getFilterList();
            }
            else {
                if (res && res.actions && res.actions[0] && res.actions[0].errorMessage) {
                    message.error(res.actions[0].errorMessage);
                }
                else {
                    message.error("固定失败");
                }
            }
        })
    }

    // 获取元数据
    const getMetadataInitialLoad = async () => {
        let response;
        await proxy.$get(Interface.listView.getMetadataInitialLoad, {
            entityType: data.entityName,
            entityName: data.entityName,
        }).then(res => {
            console.log("res1", res);
            response = res;
        })
        return response;
    };

    const initLoad = () => {
        getMetadataInitialLoad().then(res => {
            data.initialData = res.actions[0].returnValue;
            data.currentFilter = {
                id: data.initialData.listViewId,
                name: data.initialData.listViewLabel
            }
            data.title = data.initialData.breadCrumbList.length ? data.initialData.breadCrumbList[0].label : '';
            data.queryParams.filterId = data.currentFilter.id;
            // getActions();
            getListConfig();
            getFilterList();
        });
    };
    initLoad();

    const refreshFilterLoad = () => {
        // getActions();
        getListConfig();
        getFilterList();
    }

    const getFilterList = () => {
        proxy.$get(Interface.listView.filterList, {
            entityType: data.entityName,
            objectTypeCode: '',
            search: ""
        }).then(res => {
            data.filterList = res.actions[0].returnValue;
            data.filterListFixed = JSON.parse(JSON.stringify(res.actions[0].returnValue));
            let row = data.filterList.find(item => item.id == data.currentFilter.id);
            data.isPinned = row.isPinned;
        })
    };

    const getActions = () => {
        let obj = {
            actions: [{
                id: "3817;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: null,
                    context: "LIST_VIEW",
                    entityApiName: data.entityName,
                    record: null,
                    listNameOrId: data.currentFilter.id,
                    size: 5,
                    maxWidth: -1,
                    actionTypes: [],
                    bulkedAction: false,
                    actionNames: [],
                    enableActionsConfiguration: false,
                    isLABPreview: false,
                    actionsRequestId: 5
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.listView.actions, d).then(res => {
            if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
                data.actionList = res.actions[0].returnValue;
            };
        })
    }

    const getListConfig = () => {
        data.columns = [];
        proxy.$get(Interface.listView.getFilterInfo, {
            entityType: data.entityName,
            objectTypeCode: '',
            search: "",
            filterId: data.currentFilter.id
        }).then(res => {
            let { fields } = res.actions[0].returnValue;
            fields.forEach(item => {
                data.columns.push({
                    field: item.name,
                    title: item.label,
                    sortable: true
                });
            });
            gridRef.value.loadGrid(data.queryParams);
        })
    };


    const openFilterPicker = () => {
        data.isFilterPicker = !data.isFilterPicker;
    }

    const handleSwitchFilter = (item) => {
        data.isFilterModal = false;
        data.currentFilter = {
            id: item.id,
            name: item.name
        };
        data.isFilterPicker = false;
        let row = data.filterList.find(item => item.id == data.currentFilter.id);
        data.isPinned = row.isPinned;
        data.queryParams.filterId = item.id;
        columns.value = [];
        getListConfig();
    };

    const handleSearch = () => {
        gridRef.value.loadGrid(data.queryParams);
    };

</script>

<style lang="less" scoped>
    .leftScreen {
        width: 100%;
        height: 100%;
        background: #f3f3f3;
        border-radius: 4px;

        .left-screen-header {
            padding: 8px 8px 8px 12px;
            border-bottom: 1px solid #c9c9c9;

            .screen-view-row {
                display: flex;

                .screen-view-col {
                    &.firstHeaderRow {
                        flex: 1 1 0%;
                        min-width: 0;
                        display: flex;
                        align-items: center;

                        .media-avatar {
                            width: 32px;
                            height: 32px;
                            display: inline-block;
                            margin-right: 14px;
                            border-radius: 4px;
                            background: #FF5D2D;

                            img {
                                width: 100%;
                                height: 100%;
                                border-radius: 4px;
                            }
                        }

                        .triggerLinkTextAndIconWrapper {
                            display: inline-flex;
                            padding-right: 8px;
                            max-width: 100%;
                            color: #181818;
                            white-space: nowrap;
                            align-items: center;
                            cursor: pointer;
                            border-bottom: 1px solid transparent;
                            position: relative;

                            &:hover {
                                border-color: #333;
                            }

                            .page-header__name-title {
                                min-width: 0;

                                .page-header__title {
                                    font-size: 16px;
                                    line-height: 1.75;
                                    padding-left: 4px;
                                    display: block;
                                    font-weight: 700;
                                }
                            }

                            .button-reset {
                                width: 24px;
                                height: 24px;
                                text-align: center;
                                line-height: 24px;
                                color: #181818;

                                &.active,
                                &:hover {
                                    color: #0b5cab;
                                }

                                .iconSvg {
                                    width: 12px;
                                    height: 12px;
                                    vertical-align: middle;
                                }
                            }
                        }

                        .listViewManagerPinButtonWrapper {
                            .ant-btn-icon.pinned {
                                width: 24px;
                                height: 24px;
                                text-align: center;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            }

                            .pinnedImg {
                                width: 14px;
                                height: 14px;
                            }
                        }
                    }

                    &.btnActions {
                        .button-reset {
                            color: #747474;
                            display: inline-flex;
                            align-items: center;
                            cursor: pointer;
                            padding: 0 8px;

                            &.active,
                            &:hover {
                                color: #0b5cab;
                            }

                            .iconSvg.w13 {
                                width: 13px;
                                height: 13px;
                            }

                            .iconSvg.w8 {
                                width: 8px;
                                height: 8px;
                                margin-left: 4px;
                            }
                        }
                    }
                }
            }

            .screen-sarch-row {
                width: 100%;
                margin-top: 12px;
            }

            .screen-view-desc {
                color: #444444;
                font-size: 12px;
            }
        }

        .left-screen-container {
            height: calc(100% - 123px);

            .screen-table {
                height: 100%;
            }
        }
    }

    .listViewPickerPanel {
        position: absolute;
        top: 120%;
        left: 0;
        width: 598px;
        height: 287px;
        background: #fff;
        z-index: 999;
        padding: 12px 0 0 0;
        border: 1px solid #B6B6B6;
        border-radius: 5px;

        .fh-dropdown__list {
            height: calc(100% - 36px);
            overflow-y: auto;

            .fh-dropdown__header {
                line-height: 1.5;
                font-weight: 400;
                padding: 8px 12px;

                &.fh-text-heading--label {
                    font-size: 12px;
                    line-height: 1.25;
                    color: #444444;
                    text-transform: uppercase;
                    letter-spacing: .0625rem;
                    font-weight: 400;
                }
            }

            .fh-dropdown__item {
                line-height: 1.5;
                font-weight: 400;

                &:hover {
                    background: #f3f3f3;
                }

                a {
                    position: relative;
                    display: flex;
                    align-items: center;
                    padding: 8px 12px;
                    color: #181818;
                    white-space: nowrap;
                    cursor: pointer;
                }
            }

            .fh-icon-utility-check {
                width: 16px;
                height: 16px;
                display: inline-block;
                line-height: 1;
                color: #747474;
                margin-right: 12px;
                font-size: 16px;
                padding-right: 8px;

                .fh-svg {
                    width: 14px;
                    height: 14px;
                    color: #0176d3;
                    fill: currentColor;
                }
            }
        }
    }
</style>