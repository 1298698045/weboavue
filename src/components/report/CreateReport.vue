<template>
    <div>
        <a-modal v-model:open="props.isShow" width="70%" :maskClosable="false" @cancel="handleCancel"
            @ok="handleSubmit">
            <template #title>
                <div class="modal_title">创建报表</div>
            </template>
            <div class="modalContainer" ref="modelContentRef">
                <div :style="{ height: height + 'px' }">
                    <div class="reportFlex">
                        <div class="leftBox">
                            <h3 class="categoryName">类别</h3>
                            <div class="report-type-section-list">
                                <ul>
                                    <li class="nav-vertical__item" :class="{'active':current==index}"
                                        v-for="(item, index) in categorys" :key="index"
                                        @click="handleTabNav(item,index)">
                                        <a href="javascript:void(0);" :title="item.label"
                                            class="nav-vertical__action">{{item.label}}</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="rightBox">
                            <div class="report-type-list-form-withoutFooter" :class="{'col66':isDetail}">
                                <div>
                                    <div class="css-1etwb3r">
                                        <h3 class="css-pzwbx6">选择报表类型</h3>
                                    </div>
                                    <div class="searchBox">
                                        <a-input placeholder="搜索报表类型..." @pressEnter="handleSearch">
                                            <template #prefix>
                                                <svg class="fh-input__icon fh-input__icon_left" focusable="false"
                                                    data-key="search" aria-hidden="true" viewBox="0 0 520 520"
                                                    part="icon">
                                                    <g>
                                                        <path
                                                            d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z">
                                                        </path>
                                                    </g>
                                                </svg>
                                            </template>
                                        </a-input>
                                    </div>
                                </div>
                                <div class="slds-scrollable_y without-recent">
                                    <div class="report-type-recommendation-header">
                                        <h3 class="css-pzwbx6">最近使用的报表类型</h3>
                                    </div>
                                    <div class="asset-results-table">
                                        <TableList :columns="columns" :gridUrl="gridUrl" :queryParams="queryParams" @changeBtn="changeBtn"
                                            ref="gridRef" @clickCell="clickCell" />
                                    </div>
                                </div>
                            </div>
                            <!-- 详细信息 -->
                            <div class="report-type-info" v-if="isDetail">
                                <div class="report-type-details-panel">
                                    <div class="report-type-details-panel-header">
                                        <h3 class="label">详细信息</h3>
                                        <span class="icon" @click="handleCloseDetail">
                                            <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                                <path
                                                    d="M31 25.4l13-13.1c.6-.6.6-1.5 0-2.1l-2-2.1c-.6-.6-1.5-.6-2.1 0L26.8 21.2c-.4.4-1 .4-1.4 0L12.3 8c-.6-.6-1.5-.6-2.1 0l-2.1 2.1c-.6.6-.6 1.5 0 2.1l13.1 13.1c.4.4.4 1 0 1.4L8 39.9c-.6.6-.6 1.5 0 2.1l2.1 2.1c.6.6 1.5.6 2.1 0L25.3 31c.4-.4 1-.4 1.4 0l13.1 13.1c.6.6 1.5.6 2.1 0L44 42c.6-.6.6-1.5 0-2.1L31 26.8c-.4-.4-.4-1 0-1.4z">
                                                </path>
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="asset-header-card recommended-report-type-detail-header">
                                        <div class="asset-box">
                                            <div class="asset-info">
                                                <div class="asset-info-icon">
                                                    <img :src="require('@/assets/img/report_type.fb93b610c51607e576fc.svg')"
                                                        alt="">
                                                </div>
                                                <div class="asset-info-details">
                                                    <h3 class="asset-info-header slds-truncate rowEllipsis">
                                                        联系人和客户
                                                    </h3>
                                                    <div class="asset-info-desc slds-truncate rowEllipsis">标准的报表类型</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div></div>
                                        <div class="asset-actions">
                                            <a-button type="primary" @click="handleStartReport">启动报表</a-button>
                                            <a-dropdown class="ml10" :trigger="['click']">
                                                <a-button class="ant-btn-icon ml10">
                                                    <svg aria-hidden="true" class="btn_icon" viewBox="0 0 52 52">
                                                        <path
                                                            d="M8.3 14h35.4c1 0 1.7 1.3.9 2.2L27.3 37.4c-.6.8-1.9.8-2.5 0L7.3 16.2c-.7-.9-.1-2.2 1-2.2z">
                                                        </path>
                                                    </svg>
                                                </a-button>
                                                <template #overlay>
                                                    <a-menu class="fh-menu" style="width: 136px;"
                                                        @click="handleMenuClick">
                                                        <a-menu-item key="1">隐藏报表类型</a-menu-item>
                                                    </a-menu>
                                                </template>
                                            </a-dropdown>
                                        </div>
                                    </div>
                                    <div class="slds-tabs_default">
                                        <ul class="slds-tabs_default__nav">
                                            <li class="slds-tabs_default__item" :class="{'active':detailTab==0}" @click="handleDetailTab(0)" role="presentation"
                                                id="0uxQ5ocufF-slds-tabs_tab-1">
                                                <a class="slds-tabs_default__link" href="javascript:;" role="tab"
                                                    tabindex="-1" aria-controls="0uxQ5ocufF-slds-tabs_panel-1"
                                                    aria-selected="false"><span><svg aria-hidden="true" class="btn_icon"
                                                            viewBox="0 0 52 52">
                                                            <path
                                                                d="M26 2C12.7 2 2 12.7 2 26s10.7 24 24 24 24-10.7 24-24S39.3 2 26 2zm0 42C16 44 8 36 8 26S16 8 26 8s18 8 18 18-8 18-18 18z">
                                                            </path>
                                                            <path
                                                                d="M26 14.1c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zM31 35.1c0 .5-.4.9-1 .9h-8c-.5 0-1-.3-1-.9v-2c0-.5.4-1.1 1-1.1.5 0 1-.3 1-.9v-4c0-.5-.4-1.1-1-1.1-.5 0-1-.3-1-.9v-2c0-.5.4-1.1 1-1.1h6c.5 0 1 .5 1 1.1v8c0 .5.4.9 1 .9.5 0 1 .5 1 1.1v2z">
                                                            </path>
                                                        </svg></span>详细信息</a>
                                            </li>
                                            <li class="slds-tabs_default__item" :class="{'active':detailTab==1}" @click="handleDetailTab(1)" role="presentation"
                                                id="0uxQ5ocufF-slds-tabs_tab-1"><a class="slds-tabs_default__link"
                                                    href="javascript:;" role="tab" tabindex="-1"
                                                    aria-controls="0uxQ5ocufF-slds-tabs_panel-1"
                                                    aria-selected="false"><span><svg aria-hidden="true" class="btn_icon"
                                                            viewBox="0 0 52 52">
                                                            <path
                                                                d="M48.3 14.9H16.4c-.9 0-1.6-.7-1.6-1.6v-3.2c0-.9.7-1.6 1.6-1.6h31.9c.9 0 1.6.7 1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6zM48.3 29.2H16.4c-.9 0-1.6-.7-1.6-1.6v-3.2c0-.9.7-1.6 1.6-1.6h31.9c.9 0 1.6.7 1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6zM6.9 29.2H3.7c-.9 0-1.6-.7-1.6-1.6v-3.2c0-.9.7-1.6 1.6-1.6h3.2c.9 0 1.6.7 1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6zM6.9 14.9H3.7c-.9 0-1.6-.7-1.6-1.6v-3.2c0-.9.7-1.6 1.6-1.6h3.2c.9 0 1.6.7 1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6zM6.9 43.5H3.7c-.9 0-1.6-.7-1.6-1.6v-3.2c0-.9.7-1.6 1.6-1.6h3.2c.9 0 1.6.7 1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6zM48.3 43.5H16.4c-.9 0-1.6-.7-1.6-1.6v-3.2c0-.9.7-1.6 1.6-1.6h31.9c.9 0 1.6.7 1.6 1.6v3.2c0 .9-.7 1.6-1.6 1.6z">
                                                            </path>
                                                        </svg></span>字段 (133)</a></li>
                                        </ul>
                                        <div class="slds-tabs_default__content" v-if="detailTab==0">
                                            <div class="css-3qs05t">
                                                <div class="report-type-details">
                                                    <div class="createdByYou">
                                                        <div class="suggested-content">
                                                            <h3 class="css-gsey3q">由您创建</h3>
                                                            <div class="report-type-details-asset-box">
                                                                <div class="row-box">
                                                                    <div class="row-box-icon">
                                                                        <svg aria-hidden="true" class="iconSvg"
                                                                            viewBox="0 0 100 100">
                                                                            <path
                                                                                d="M39 32h22c1.1 0 2-.9 2-2v-4c0-3.3-2.7-6-6-6H43c-3.3 0-6 2.7-6 6v4c0 1.1.9 2 2 2z">
                                                                            </path>
                                                                            <path
                                                                                d="M72 25h-2c-.6 0-1 .4-1 1v4c0 4.4-3.6 8-8 8H39c-4.4 0-8-3.6-8-8v-4c0-.6-.4-1-1-1h-2c-3.3 0-6 2.7-6 6v43c0 3.3 2.7 6 6 6h44c3.3 0 6-2.7 6-6V31c0-3.3-2.7-6-6-6zM43 66c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V56c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v10zm10 0c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V47c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v19zm10 0c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V51c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v15z">
                                                                            </path>
                                                                        </svg>
                                                                    </div>
                                                                    <div class="row-box-detail">
                                                                        <a class="link-text">
                                                                            我的客户联系人
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="row-box">
                                                                    <div class="row-box-icon">
                                                                        <svg aria-hidden="true" class="iconSvg"
                                                                            viewBox="0 0 100 100">
                                                                            <path
                                                                                d="M39 32h22c1.1 0 2-.9 2-2v-4c0-3.3-2.7-6-6-6H43c-3.3 0-6 2.7-6 6v4c0 1.1.9 2 2 2z">
                                                                            </path>
                                                                            <path
                                                                                d="M72 25h-2c-.6 0-1 .4-1 1v4c0 4.4-3.6 8-8 8H39c-4.4 0-8-3.6-8-8v-4c0-.6-.4-1-1-1h-2c-3.3 0-6 2.7-6 6v43c0 3.3 2.7 6 6 6h44c3.3 0 6-2.7 6-6V31c0-3.3-2.7-6-6-6zM43 66c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V56c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v10zm10 0c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V47c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v19zm10 0c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V51c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v15z">
                                                                            </path>
                                                                        </svg>
                                                                    </div>
                                                                    <div class="row-box-detail">
                                                                        <a class="link-text">
                                                                            我的客户联系人
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                                <div class="row-box">
                                                                    <div class="row-box-icon">
                                                                        <svg aria-hidden="true" class="iconSvg"
                                                                            viewBox="0 0 100 100">
                                                                            <path
                                                                                d="M39 32h22c1.1 0 2-.9 2-2v-4c0-3.3-2.7-6-6-6H43c-3.3 0-6 2.7-6 6v4c0 1.1.9 2 2 2z">
                                                                            </path>
                                                                            <path
                                                                                d="M72 25h-2c-.6 0-1 .4-1 1v4c0 4.4-3.6 8-8 8H39c-4.4 0-8-3.6-8-8v-4c0-.6-.4-1-1-1h-2c-3.3 0-6 2.7-6 6v43c0 3.3 2.7 6 6 6h44c3.3 0 6-2.7 6-6V31c0-3.3-2.7-6-6-6zM43 66c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V56c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v10zm10 0c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V47c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v19zm10 0c0 1.1-.9 2-2 2h-2c-1.1 0-2-.9-2-2V51c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v15z">
                                                                            </path>
                                                                        </svg>
                                                                    </div>
                                                                    <div class="row-box-detail">
                                                                        <a class="link-text">
                                                                            我的客户联系人
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="createdByOthers">
                                                        <div class="suggested-content">
                                                            <h3 class="css-gsey3q">由其他人创建</h3>
                                                            <div class="css-ex4wd6">
                                                                <div class="no-report css-1sq1gba">尚无报表</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="report-details-field-list">
                                                    <h3 class="report-details-field-label">在报表类型中使用的对象</h3>
                                                    <div class="report-type-details-sobject">
                                                        <div v-for="item in 10">
                                                            <div class="listitem-container">
                                                                <div class="listitem-icon">
                                                                    <div class="slds-icon_container">
                                                                        <svg aria-hidden="true" class="iconSvg" viewBox="0 0 100 100"><path opacity=".5" d="M44.6 32.8c2.1-2.1 4.9-3.4 8.1-3.4 4.2 0 7.9 2.3 9.9 5.7 1.7-.7 3.6-1.2 5.6-1.2C75.8 34 82 40.1 82 47.6c0 7.6-6.2 13.7-13.8 13.7-.9 0-1.8-.1-2.7-.3-1.7 3-5 5.1-8.8 5.1-1.6 0-3.1-.4-4.4-1-1.8 4-5.8 6.9-10.6 6.9-5 0-9.2-3.1-10.8-7.4-.7.1-1.4.2-2.2.2-5.9 0-10.7-4.7-10.7-10.6 0-3.9 2.1-7.4 5.3-9.2-.7-1.5-1-3.1-1-4.8 0-6.7 5.6-12.2 12.4-12.2 4.1 0 7.7 1.9 9.9 4.8"></path></svg>
                                                                    </div>
                                                                </div>
                                                                <div class="listitem-text">
                                                                    <div class="listitem-label">
                                                                        <a href="javascript:;" class="listitem-label-link">角色</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="slds-tabs_default__content" v-if="detailTab==1">
                                            <div class="report-details-field-list">
                                                <div class="report-details-field-search">
                                                    <a-input placeholder="快速查找" @pressEnter="handleSearch">
                                                        <template #prefix>
                                                            <svg class="fh-input__icon fh-input__icon_left" focusable="false" data-key="search" aria-hidden="true" viewBox="0 0 520 520" part="icon"><g><path d="M496 453L362 320a189 189 0 10-340-92 190 190 0 00298 135l133 133a14 14 0 0021 0l21-21a17 17 0 001-22zM210 338a129 129 0 11130-130 129 129 0 01-130 130z"></path></g></svg>
                                                        </template>
                                                    </a-input>
                                                </div>
                                                <div class="report-type-details-fields-scroll">
                                                    <div class="listitem-container" v-for="item in 10">
                                                        <div class="listitem-icon"></div>
                                                        <div class="listitem-text">
                                                            <div class="listitem-label">
                                                                <span>联系人所有人</span>
                                                            </div>
                                                            <div class="listitem-label listitem-desc">
                                                                <span>联系人：一般</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template #footer>
                <div>
                    <a-button @click="handleCancel">取消</a-button>
                    <a-button type="primary" @click.prevent="handleSubmit">确认</a-button>
                </div>
            </template>
        </a-modal>
    </div>
</template>
<script setup>
    import {
        ref,
        watch,
        reactive,
        toRefs,
        onMounted,
        getCurrentInstance,
        onUpdated,
        defineProps,
        defineExpose,
        defineEmits,
        computed
    } from "vue";
    import { SearchOutlined, DeleteOutlined } from "@ant-design/icons-vue";
    import { message } from "ant-design-vue";
    import Interface from "@/utils/Interface.js";
    import TableList from "@/components/TableList_small.vue";
    const { proxy } = getCurrentInstance();
    const labelCol = ref({ style: { width: "100px" } });
    const props = defineProps({
        isShow: Boolean,
    });
    const gridRef = ref(null);
    const emit = defineEmits(["cancel", "ok"]);

    const handleCancel = () => {
        emit("cancel", false);
    };
    const handleSubmit = () => {
        emit("ok", props.step);
    };

    const data = reactive({
        height: document.documentElement.clientHeight - 300,
        categorys: [],
        current: 0,
        columns: [
            {
                field: "Name",
                title: "报表类型名称",
                isClick: true,
                formatter: (item) => {
                    return '<a href="javascript:;">'+item.textValue+'</a>'
                }
            },
            {
                field: "isCustomReportType",
                title: "类别",
                formatter: (val, item) => {
                    return val ? '自定义' : '标准';
                }
            },
            {
                field: "Action",
                formmatterActions: function (item) {
                    let actions = [{ name: "详细信息", field: "detail" }, { name: "启动报表", field: "delete" }, { name: "隐藏报表类型", field: "delete1" }];
                    return actions;
                }
            },
        ],
        gridUrl: Interface.list2,
        queryParams: {
            entityType: "ReportType",
            objectTypeCode: 20087,
            filterQuery: "\neq-userid"
        },
        isDetail: false,
        detailTab: 0,
        rowId: ""
    });
    const { height, categorys, current, columns, gridUrl, isDetail, detailTab, queryParams, rowId } = toRefs(data);

    const getCategory = () => {
        let d = {
            entityType: "ReportTypeFolder",
            objectTypeCode: 20599,
        };
        proxy.$post(Interface.list2, d).then(res => {
            data.categorys = res.nodes.map(item=>{
                item.label = item.Name.textValue;
                return item;
            });
            data.categorys.unshift({
                label: "全部",
                id: ""
            });
            // data.categorys.unshift({
            //     label: "最近使用",
            //     id: ""
            // });
            // let filterQuery = '\nCategory\teq\t' + data.categorys[0].id;
            // data.queryParams.filterQuery += filterQuery;
            gridRef.value.loadGrid();
        })
    }
    getCategory();

    const getReportType = () => {
        let d = {
            entityType: "ReportType",
            objectTypeCode: 20087,
        };
        proxy.$post(Interface.list2, d).then(res=>{
            console.log("d", d);
        })
    }
    // getReportType();

    const handleTabNav = (item, index) => {
        data.current = index;
        let filterQuery = "\neq-userid";
        if(item.id){
            filterQuery += '\nCategory\teq\t' + item.id;
        }
        data.queryParams.filterQuery = filterQuery;
        gridRef.value.loadGrid();
    }

    const handleSearch = () => {

    }

    const changeBtn = (e, item) => {
        data.rowId = item.id;
        if(e.field=='detail'){
            getDetail();
        }
    }

    const handleMenuClick = (e) => {

    }
    const handleDetailTab = (e) => {
        data.detailTab = e;
    }
    const handleCloseDetail = () => {
        data.isDetail = false;
    }
    const handleEdit = (item) => {
        console.log("item",item);
    }
    const clickCell = (item) => {
        data.rowId = item.id;
        data.isDetail = true;
    }
    const getDetail = () => {
        let obj = {
            actions:[{
                id: "4270;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    recordId: data.rowId,
                    apiName: "Report"
                }
            }]
        };
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.detail, d).then(res=>{
            data.isDetail = true;
        })
    }
    const handleStartReport = () => {
        let obj = {
            actions:[{
                id: "3514;a",
                descriptor: "",
                callingDescriptor: "UNKNOWN",
                params: {
                    reportTypeId: data.rowId
                }
            }]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.report.newReport, d).then(res=>{
            if(res.actions[0].state=='SUCCESS'){
                let id = res.actions[0].returnValue.reportMetadata.id;
                message.success("保存成功！");
                emit("ok", id);
                emit("cancel", false);
            }else {
                message.error("保存失败！");
            }
        })
    }
</script>
<style lang="less">
    @import url("@/style/modal.less");
</style>
<style lang="less" scoped>
    .reportFlex {
        display: flex;
        height: 100%;

        .leftBox {
            width: 20%;

            .categoryName {
                padding: 8px 0px 0px 32px;
                font-weight: 700;
                font-size: 14px;
            }

            .report-type-section-list {
                padding: 12px 0 0 0;
                height: calc(~"100% - 30px");
                overflow-y: auto;
            }

            ul {
                .nav-vertical__item {
                    position: relative;

                    &:before {
                        position: absolute;
                        top: 0;
                        right: 0;
                        bottom: 0;
                        left: 0;
                        content: '';
                    }

                    &.active:before {
                        background: #f0f3fd;
                    }

                    .nav-vertical__action {
                        position: relative;
                        display: flex;
                        align-items: center;
                        width: 100%;
                        padding: 8px 24px 8px 32px;
                        color: #181818;
                        border-top: 1px solid transparent;
                        border-bottom: 1px solid transparent;
                        border-radius: 0;
                        cursor: pointer;
                        z-index: 1;
                        white-space: nowrap;
                    }

                    &:hover {
                        &:before {
                            background: #f0f3fd;
                        }

                        .nav-vertical__action {
                            text-decoration: none;
                            box-shadow: inset 2px 0 0 #4194f9;
                        }
                    }

                    &.active {
                        .nav-vertical__action {
                            font-weight: bold;
                            box-shadow: inset 4px 0 0 #4194f9;
                        }
                    }
                }
            }
        }

        .rightBox {
            width: 80%;
            border-left: 1px solid #c9c9c9;
            display: flex;

            .report-type-list-form-withoutFooter {
                padding: 12px 0 0 0;
                height: 100%;
                overflow-y: auto;
                display: flex;
                flex-flow: column;
                flex: 1;
                &.col66 {
                    width: 66.6666666667%;
                }

                .searchBox {
                    padding: 12px;
                }

                .without-recent {
                    height: 100%;
                    overflow-y: auto;
                }

                .report-type-recommendation-header {
                    padding: 0 12px 12px 12px;
                }
            }

            .report-type-info {
                width: 33.3333333333%;
                height: 100%;
                padding: 12px 8px;
                border-left: 1px solid #c9c9c9;
                background-color: #fff;
                overflow: auto;

                .report-type-details-panel {
                    height: 100%;
                    .report-type-details-panel-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px solid #e5e5e5;
                        padding: 0 8px;
                        padding-bottom: 12px;

                        .label {
                            font-weight: inherit;
                        }

                        .icon {
                            color: #747474;
                            cursor: pointer;
                        }
                    }

                    .asset-header-card {
                        padding: 16px 0 16px 16px;
                        margin-bottom: 0;
                        padding-left: 24px;

                        .asset-box {
                            .asset-info {
                                padding-top: 0;
                                display: flex;
                                align-items: center;
                                line-height: initial;

                                .asset-info-icon {
                                    display: inline-block;
                                    border-radius: 4px;
                                    line-height: 1;
                                    background: #3ba755;
                                    width: 32px;
                                    height: 32px;
                                    fill: currentColor;
                                    margin-right: 8px;

                                    img {
                                        max-width: 100%;
                                        height: auto;
                                    }
                                }

                                .asset-info-details {
                                    .asset-info-header {
                                        font-size: 16px;
                                        font-weight: bold;
                                        margin-bottom: 2px;
                                    }

                                    .asset-info-desc {
                                        color: #444;
                                        font-size: 15px;
                                    }
                                }
                            }
                        }

                        .asset-actions {
                            margin-top: 20px;
                            display: flex;
                        }
                    }
                    .slds-tabs_default{
                        height: calc(~"100% - 156px");
                    }
                    .slds-tabs_default__nav {
                        display: flex;
                        align-items: flex-start;
                        border-bottom-width: 1px;
                        border-bottom-style: solid;
                        border-bottom-color: #747474;

                        .slds-tabs_default__item {
                            color: #444444;
                            position: relative;
                            padding: 0 12px;
                            font-size: 14px;
                            margin-bottom: -2px;
                            flex: 1;

                            &::after {
                                display: block;
                                content: '';
                                bottom: 0;
                                left: 0;
                                right: 0;
                                height: 0;
                                position: absolute;
                            }

                            &.active {
                                color: #181818;

                                &::after {
                                    height: 4px;
                                    background: #4194f9;
                                }

                                .slds-tabs_default__link {
                                    font-weight: 700;
                                }
                            }

                            &:hover::after {
                                height: 3px;
                                background: #2376cc;
                            }

                            .slds-tabs_default__link {
                                max-width: 100%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                                display: block;
                                text-decoration: none;
                                cursor: pointer;
                                height: 40px;
                                line-height: 40px;
                                color: currentColor;
                                border: 0;
                                text-transform: inherit;
                                padding: 0 32px;

                                .btn_icon {
                                    width: 16px;
                                    height: 16px;
                                    fill: #747474;
                                    margin-right: 4px;
                                }
                            }
                        }
                    }

                    .slds-tabs_default__content {
                        position: relative;
                        padding: 12px 0;
                        height: calc(~"100% - 40px");
                        .css-3qs05t {
                            height: 100%;
                            overflow: hidden auto;

                            .report-type-details {
                                .suggested-content {
                                    padding: 12px 0 12px 24px;

                                    .report-type-details-asset-box {}
                                }
                            }

                            .report-details-field-list {
                                padding: 0 0 16px 24px;

                                .report-details-field-label {
                                    padding-top: 12px;
                                    font-weight: bold;
                                    font-size: 14px;
                                }

                                .report-type-details-sobject {
                                    .listitem-container{
                                        display: flex;
                                        align-items: center;
                                        overflow: hidden;
                                        margin: 16px 16px 0 0;
                                        .listitem-icon{
                                            flex: 0 0 auto;
                                            vertical-align: middle;
                                            .slds-icon_container{
                                                display: inline-block;
                                                background: #939393;
                                                border-radius: 4px;
                                                line-height: 1;
                                                .iconSvg{
                                                    width: 24px;
                                                    height: 24px;
                                                    line-height: 1;
                                                    fill: #ffffff;
                                                }
                                            }
                                        }
                                        .listitem-text{
                                            display: block;
                                            line-height: 0;
                                            font-size: 13px;
                                            margin-left: 4px;
                                            .listitem-label{
                                                overflow-x: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;
                                                line-height: 1.5;
                                                margin-left: 4px;
                                                .listitem-label-link{
                                                    width: 100%;
                                                    color: #0b5cab;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .report-details-field-list{
                        height: 100%;
                        padding: 0 0 16px 24px;
                        .report-details-field-search{
                            padding: 4px 16px 4px 0;
                            position: relative;
                            min-width: 0;
                        }
                        .report-type-details-fields-scroll{
                            height: calc(~"100% - 12px");
                            overflow-y: auto;
                            .listitem-container{
                                display: flex;
                                align-items: center;
                                overflow: hidden;
                                margin: 16px 16px 0 0;
                                .listitem-icon{
                                    flex: 0 0 auto;
                                    vertical-align: middle;
                                }
                                .listitem-text{
                                    display: block;
                                    line-height: 0;
                                    font-size: 13px;
                                    margin-left: 4px;
                                    .listitem-label{
                                        overflow-x: hidden;
                                        text-overflow: ellipsis;
                                        white-space: nowrap;
                                        line-height: 1.5;
                                        margin-left: 4px;
                                        &.listitem-desc{
                                            color: #444;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    .css-1etwb3r {
        padding-left: 16px;
    }

    .css-gsey3q {
        font-weight: 700;
        font-size: 14px;
    }

    .css-pzwbx6 {
        font-size: 18px;
        line-height: 24px;
        font-weight: inherit;
    }

    .row-box {
        display: flex;
        padding-top: 16px;

        .row-box-icon {
            margin-right: 12px;
            display: inline-block;
            border-radius: 4px;
            line-height: 1;
            background: #06a59a;
            height: 24px;

            .iconSvg {
                width: 24px;
                height: 24px;
                fill: #fff;
            }
        }

        .row-box-detail {
            .link-text {
                padding: 1px;
                color: #0b5cab;
                cursor: pointer;
            }
        }
    }
</style>