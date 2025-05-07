<template>
    <grid-layout :layout.sync="layout" :col-num="48" :row-height="10" :is-draggable="true" :is-resizable="true"
        :is-mirrored="false" :vertical-compact="true" :margin="[10, 10]" :use-css-transforms="true">
        <grid-item v-for="(item, index) in layout" :num="index" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
            :i="item.i" :key="item.i" :minH="2" drag-allow-from=".card-header" :isDraggable="false"
            drag-ignore-from=".no-drag" :isResizable="false">
            <div class="gridItemWrapper" v-if="item.componentType == 'list'">
                <ListCom :item="item" :themeType="themeType" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'applaunch'">
                <IconGrid :item="item" :themeType="themeType" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'text-grid'">
                <TextGrid :item="item" :themeType="themeType" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'swiper'">
                <Swiper :item="item" :themeType="themeType" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'calendar'">
                <Calendar :item="item" :themeType="themeType" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'chart'">
                <Chart :item="item" :themeType="themeType" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'tablist'">
                <TabList :item="item" :themeType="themeType" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'statchart'">
                <StatsChart :item="item" :themeType="themeType" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'statcard'">
                <StatsCard :item="item" :themeType="themeType" />
            </div>
            <div class="gridItemWrapper" v-else-if="item.componentType == 'processtasklist'">
                <ProcessTasklist :item="item" :themeType="themeType" />
            </div>
            <a-card v-else :bordered="false" class="widgetItem">
                <template #title>
                    <div class="card-header">
                        <div class="p-font-24 fontBold">{{item.i}}</div>
                    </div>
                </template>
                <div class="no-drag">
                    <p>{{item.componentType}}</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </div>
            </a-card>
            <!-- <div class="weapp-ebde-toolbar" v-if="item.i == current">
                <a-tooltip placement="bottom">
                    <template #title>
                      <span>另存为</span>
                    </template>
                    <span>
                        <span class="ui-icon">
                            <PlusSquareOutlined />
                        </span>
                    </span>
                </a-tooltip>
                <a-tooltip placement="bottom">
                    <template #title>
                      <span>复制</span>
                    </template>
                    <span>
                        <span class="ui-icon">
                            <CopyOutlined />
                        </span>
                    </span>
                </a-tooltip>
                <a-tooltip placement="bottom">
                    <template #title>
                      <span>复制id</span>
                    </template>
                    <span>
                        <span class="ui-icon">
                            <PlusSquareOutlined />
                        </span>
                    </span>
                </a-tooltip>
                <a-tooltip placement="bottom">
                    <template #title>
                      <span>删除</span>
                    </template>
                    <span @click="handleItemDelete(item, index)">
                        <span class="ui-icon">
                            <DeleteOutlined />
                        </span>
                    </span>
                </a-tooltip>
            </div> -->
        </grid-item>
    </grid-layout>
</template>
<script setup>
    import { ref, reactive, toRefs, onMounted, getCurrentInstance, watch, defineExpose } from "vue";
    import { PlusSquareOutlined, CopyOutlined, DeleteOutlined } from '@ant-design/icons-vue';
    import ListCom from "@/components/portal/widget/List.vue";
    import IconGrid from "@/components/portal/widget/IconGrid.vue";
    import Swiper from "@/components/portal/widget/Swiper.vue";
    import TextGrid from "@/components/portal/widget/TextGrid.vue";
    import Calendar from "@/components/portal/widget/Calendar.vue";
    import Chart from "@/components/portal/widget/Chart.vue";
    import TabList from "@/components/portal/widget/TabList.vue";
    import StatsCard from "@/components/portal/widget/StatsCard.vue";
    import ProcessTasklist from "@/components/portal/widget/ProcessTasklist.vue";
    import StatsChart from "@/components/portal/widget/StatsChart.vue";
    import { useStore } from "vuex";
    let store = useStore();
    import Interface from "@/utils/Interface.js";
    const { proxy } = getCurrentInstance();
    const props = defineProps({
        themeType: String,
        dashboardId: String
    })
    const data = reactive({
        layout: [
            // { "x": 0, "y": 0, "w": 3, "h": 3, "i": "10", name: "统计标题", master: { name: "订单总数", content: "" }, sub: { name: "送货中", content: "" }, componentType: "statcard" },
            // { "x": 0, "y": 1, "w": 6, "h": 6, "i": "0", name: "信息", componentType: "list" },
            // { "x": 2, "y": 1, "w": 4, "h": 6, "i": "1", name: "快捷入口", componentType: "applaunch" },
            // { "x": 4, "y": 1, "w": 4, "h": 8, "i": "2", name: "轮播图", componentType: "swiper" },
            // { "x": 6, "y": 1, "w": 4, "h": 6, "i": "3", name: "常用链接", componentType: "text-grid" },
            // { "x": 0, "y": 5, "w": 6, "h": 8, "i": "6",  name: "待办事务", componentType: "process-tasklist" },
            // { "x": 0, "y": 14, "w": 6, "h": 8, "i": "11", name: "tablist", componentType: "tablist", tabs: [
            //     {
            //         footer: null,
            //         title: "tab1",
            //         properties: {
            //             aggregates: [],
            //             autoSelectColumns: false,
            //             drillUrl: null,
            //             filterColumns: [],
            //             groupings: [],
            //             maxRows: 10,
            //             reportFormat: "TABULAR",
            //             useReportChart: false,
            //             detailUrl: "detailUrl",
            //             moreUrl: "moreUrl",
            //             showTableHeader: true,
            //             tableColumns: [
            //                 {
            //                     "label": "到期日期",
            //                     "column": "DUE_DATE",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label2",
            //                     "column": "USERS.NAME",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label3",
            //                     "column": "ACCOUNT.NAME",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label4",
            //                     "column": "ADDRESS1_STATE",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label5",
            //                     "column": "RATING",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 }
            //             ],
            //             visualizationProperties: {
            //                 breakPoints: [],
            //                 decimalPrecision: -1,
            //                 displayUnits: "auto",
            //                 flexTableType: "tabular",
            //                 showChatterPhotos: false
            //             },
            //             visualizationType: "FlexTable",
            //             entity: {
            //                 label: "人员档案",
            //                 name: "HREmployee",
            //                 objectTypeCode: 30020
            //             }
            //         },
            //         reportId: ""
            //     },
            //     {
            //         footer: null,
            //         title: "tab2",
            //         properties: {
            //             aggregates: [],
            //             autoSelectColumns: false,
            //             drillUrl: null,
            //             filterColumns: [],
            //             groupings: [],
            //             maxRows: 10,
            //             reportFormat: "TABULAR",
            //             useReportChart: false,
            //             detailUrl: "detailUrl2",
            //             moreUrl: "moreUrl2",
            //             showTableHeader: true,
            //             tableColumns: [
            //                 {
            //                     "label": "到期日期2",
            //                     "column": "DUE_DATE",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label2",
            //                     "column": "USERS.NAME",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label3",
            //                     "column": "ACCOUNT.NAME",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label4",
            //                     "column": "ADDRESS1_STATE",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 },
            //                 {
            //                     "label": "label5",
            //                     "column": "RATING",
            //                     "showSubTotal": false,
            //                     "showTotal": false,
            //                     "type": "detail"
            //                 }
            //             ],
            //             visualizationProperties: {
            //                 breakPoints: [],
            //                 decimalPrecision: -1,
            //                 displayUnits: "auto",
            //                 flexTableType: "tabular",
            //                 showChatterPhotos: false
            //             },
            //             visualizationType: "FlexTable",
            //             entity: {
            //                 label: "人员档案",
            //                 name: "HREmployee",
            //                 objectTypeCode: 30020
            //             }
            //         },
            //         reportId: ""
            //     }
            // ] },
            // { "x": 4, "y": 5, "w": 5, "h": 7, "i": "8", name: "图表", componentType: "chart", chartType: "line-category" },
            // { "x": 6, "y": 3, "w": 4, "h": 15, "i": "9", name: "日历", componentType: "calendar" },
        ],
        colNum: 12,
        current: ""
    });
    const { layout, colNum, current } = toRefs(data);
    // store.currentData = data.layout[0];
    const handleSelectItem = (item, index) => {
        console.log("item", item);
        data.current = index;
        // store.currentData = item;
    };

    const handleItemDelete = (item, index) => {
        data.layout.splice(index, 1);
    };

    onMounted(() => {
    });

    const getQuery = () => {
        let obj = {
            actions: [
                {
                    id: "18;a",
                    descriptor: "",
                    callingDescriptor: "UNKNOWN",
                    params: {
                        dashboardId: props.dashboardId,
                        networkId: "000000000000000",
                        runningUser: "0059000000390WhAAI",
                        requestOrigin: ""
                    }
                }
            ]
        }
        let d = {
            message: JSON.stringify(obj)
        }
        proxy.$post(Interface.portal.layoutList, d).then(res => {
            let layoutList = [];
            if (res && res.actions && res.actions[0] && res.actions[0].returnValue) {
                let { attributes, dashboardMetadata, picklistColors, components, theme } = res.actions[0].returnValue;
                store.commit("setTheme", theme);
                let list = components;
                const maxY = Math.max(...data.layout.map(item => item.y + item.h));
                list.forEach(item => {
                    if (item) {
                        let obj = {
                            // x:  (data.layout.length * 2) % (data.colNum || 12),
                            // y: maxY,
                            x: item.layout.x,
                            y: item.layout.y,
                            w: item.layout.w,
                            h: item.layout.h,
                            i: item?.id,
                            name: item?.header,
                            type: item.type,
                            componentType: item?.type
                        };
                        layoutList.push({ ...obj, ...item });
                    }
                });
            }
            data.layout = layoutList;
        })
    };

    watch(() => props.dashboardId, (newVal, oldVal) => {
        if (props.dashboardId) {
            getQuery();
        }
    }, { immediate: true });

    defineExpose({ getQuery });


</script>
<style lang="less" scoped>
    .smartwidget {
        box-sizing: border-box;
        background: #fff;
        box-shadow: 0 1px 2px #0000000d;
        border: 1px solid #ebeef5;
        width: 100%;
        transition: .3s;
    }

    .smartwidget.is-always-shadow,
    .smartwidget.is-hover-shadow:hover {
        box-shadow: 0 0 10px #e9e9e9;
    }

    .vue-grid-layout .smartwidget {
        height: inherit;
        width: inherit;
    }

    .vue-grid-item.vue-grid-placeholder {
        background: #7cbeff;
        opacity: .2;
        transition-duration: .1s;
        z-index: 2;
        -webkit-user-select: none;
        user-select: none;
    }

    .widgetItem {
        width: 100%;
        height: 100%;
        background: #fff;
        border-radius: 12px;
        box-shadow: rgba(0, 0, 0, 0.058823529411764705) 0px 3px 6px 2px;
        overflow: hidden;
    }

    .gridItemWrapper {
        width: 100%;
        height: 100%;
        border: 1px solid transparent;
    }

    .vue-grid-item.active {
        .gridItemWrapper {
            border: 1px solid #5d9cec;
        }
    }

    .weapp-ebde-toolbar {
        position: absolute;
        bottom: 0;
        right: 0;
        z-index: 9999999;
        display: flex;
        cursor: pointer;

        &>span {
            width: 22px;
            height: 22px;
            background: #5d9cec;
            color: #fff;
            justify-content: center;
            align-items: center;
            display: flex;
        }
    }
</style>